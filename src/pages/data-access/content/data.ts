import { toast } from "react-toastify";

// const ENDPOINT_URL="https://api-pc2dqv6u0z.3edges.io/graphql"
// const ACCESS_TOKEN=""

export interface Result {
  rows: Row[];
}

export interface Row {
  identity: string;
  email: string;
  type: string;
  username: string;
  group: string;
  accessType: string;
  dataElement: string;
  dataType: string;
  dataZone: string;
  description: string;
}

export const perform3EdgesQuery = async (data: any): Promise<Result> => {
  const result: Result = { rows: [] };

  // const endpointUrl = ENDPOINT_URL;
  const endpointUrl = data.endpointUrl;
  if (!endpointUrl) {
    toast("endpointUrl not provided", {
      type: "error",
      position: "top-right",
    });
    return result;
  }

  // const accessToken = ACCESS_TOKEN;
  const accessToken = data.accessToken;
  if (!accessToken) {
    toast("accessToken not provided", {
      type: "error",
      position: "top-right",
    });
    return result;
  }

  try {
    const query = JSON.stringify({
      "query": `query {
  User {
    email
    name
    type
    username
    MEMBER_OF_Group {
      to {
        name
        CAN_ACCESS_DataElement {
          to {
            externalID
            name
            source
          }
        }
        CAN_ACCESS_DataType {
          to {
            name
            ID
          }
        }
        CAN_READ_DataZone {
          to {
            name
            ID
            CONTAINS_DataElement {
              to {
                name
                source
                externalID
              }
            }
            CONTAINS_DataType {
              to {
                name
                CONTAINS_DataElement {
                  to {
                    name
                    source
                    externalID
                  }
                }
              }
            }
          }
        }
        CAN_SEARCH_DataZone {
          to {
            name
          }
        }
        CAN_UPDATE_DataZone {
          to {
            ID
            name
          }
        }
      }
    }
  }
}`
       });

    const request = await fetch(endpointUrl, {
      method: "POST",
      body: query,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
    });
    const response = await request;
    if (response.status === 200) {
      const data = await response.json();
      return parseGraphQLResponse(data);
    } else {
      throw new Error("Could not read data.");
    }
  } catch (e) {
    console.error(e);

    toast("Error performing query.", {
      type: "error",
      position: "top-right",
    });
    return result;
  }
};

const parseGraphQLResponse = (response: any): Result => {
  const rows: Row[] = [];

  (response.data.User || []).forEach((user: any) => {
    const identityName = user.name;
    (user.MEMBER_OF_Group || []).forEach((groupWrapper: any) => {
      const group = groupWrapper.to.name;
      const canAccessDataElement = (groupWrapper.to.CAN_ACCESS_DataElement || []).length > 0;
      const canAccessDataType = (groupWrapper.to.CAN_ACCESS_DataType || []).length > 0;
      const canReadDataZone = (groupWrapper.to.CAN_READ_DataZone || []).length > 0;
      if (canAccessDataElement) {
        (groupWrapper.to.CAN_ACCESS_DataElement || []).forEach((elementWrapper: any) => {
          const dataElement = elementWrapper.to.name;
          rows.push({
            identity: identityName,
            email: user.email,
            type: user.type,
            username: user.username,
            group,
            accessType: 'Element',
            dataElement,
            dataType: '',
            dataZone: '',
            description: '',
          });
        });
      }
      if (canAccessDataType) {
        (groupWrapper.to.CAN_ACCESS_DataType || []).forEach((typeWrapper: any) => {
          const dataType = typeWrapper.to.name;
          rows.push({
            identity: identityName,
            email: user.email,
            type: user.type,
            username: user.username,
            group,
            accessType: 'Type',
            dataElement: '',
            dataType,
            dataZone: '',
            description: '',
          });
        });

      }
      if (canReadDataZone) {
        (groupWrapper.to.CAN_READ_DataZone || []).forEach((zoneWrapper: any) => {
          const dataZone = zoneWrapper.to.name;
          const containsDataElement = (zoneWrapper.to.CONTAINS_DataElement || []).length > 0;
          const containsDataType = (zoneWrapper.to.CONTAINS_DataType || []).length > 0;
          (zoneWrapper.to.CONTAINS_DataElement || []).forEach((elementWrapper: any) => {
            const dataElement = elementWrapper.to.name;
            rows.push({
              identity: identityName,
              email: user.email,
              type: user.type,
              username: user.username,
              group,
              accessType: 'Zone',
              dataElement,
              dataType: '',
              dataZone,
              description: '',
            });
          });
          (zoneWrapper.to.CONTAINS_DataType || []).forEach((typeWrapper: any) => {
            const dataType = typeWrapper.to.name;
            const containsDataElement = (typeWrapper.to.CONTAINS_DataElement || []).length > 0;
            if (!containsDataElement) {
              rows.push({
                identity: identityName,
                email: user.email,
                type: user.type,
                username: user.username,
                group,
                accessType: 'Zone',
                dataElement: '',
                dataType,
                dataZone,
                description: '',
              });
            } else {
              (typeWrapper.to.CONTAINS_DataElement || []).forEach((elementWrapper: any) => {
                const dataElement = elementWrapper.to.name;
                rows.push({
                  identity: identityName,
                  email: user.email,
                  type: user.type,
                  username: user.username,
                  group,
                  accessType: 'Zone',
                  dataElement,
                  dataType,
                  dataZone,
                  description: '',
                });
              });
            }
          });
        });
      }
    });
  });

  return { rows };
};
