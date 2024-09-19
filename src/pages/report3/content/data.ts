import { toast } from "react-toastify";

// const ENDPOINT_URL="https://api-ent.3edges.io/graphql"
// const ACCESS_TOKEN="0PxnQWjNDXzzV_50rjY-dn-pTvHWWzqVDX5zgG3AvUQ"

export interface Result {
  rows: Row[];
}

export interface Row {
  identity: string;
  account: string;
  source: string;
  entitlement: string;
  entitlementType: string;
  description: string;
}

export const perform3EdgesQuery = async (data: any): Promise<Result> => {
  const result: Result = { rows: [] };

  const endpointUrl = data.endpointUrl;
  if (!endpointUrl) {
    toast("endpointUrl not provided", {
      type: "error",
      position: "top-right",
    });
    return result;
  }

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
  Identity{
    Identifier
    OWNS_Account{
      to{
        AccountID
          PART_OF_Source{
            to{
              Name
            }
          }
          HAS_Entitlement{
            to{
              Name
              Description
              EntitlementType
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

  (response.data.Identity || []).forEach((identity: any) => {
    const identityName = identity.Identifier;

    (identity.OWNS_Account || []).forEach((accountWrapper: any) => {
      const account = accountWrapper.to.AccountID;
      const hasSources = (accountWrapper.to.PART_OF_Source || []).length > 0;
      const hasEntitlements = (accountWrapper.to.HAS_Entitlement || []).length > 0;  
      
      if (!hasSources && !hasEntitlements) {
        rows.push({
          identity: identityName,
          account,
          source: '',
          entitlement: '',
          entitlementType: '',
          description: '',
        });
      } else if (hasSources && hasEntitlements) {
        (accountWrapper.to.PART_OF_Source || []).forEach((sourceWrapper: any) => {
          const source = sourceWrapper.to.Name;

          (accountWrapper.to.HAS_Entitlement || []).forEach((entitlementWrapper: any) => {
            rows.push({
              identity: identityName,
              account,
              source,
              entitlement: entitlementWrapper.to.Name,
              entitlementType: entitlementWrapper.to.EntitlementType,
              description: entitlementWrapper.to.Description,
            });
          });
        });
      } else if (hasEntitlements && !hasSources) {
        (accountWrapper.to.HAS_Entitlement || []).forEach((entitlementWrapper: any) => {
          rows.push({
            identity: identityName,
            account,
            source: '',
            entitlement: entitlementWrapper.to.Name,
            entitlementType: entitlementWrapper.to.EntitlementType,
            description: entitlementWrapper.to.Description
          });
        });
      } else if (hasSources && !hasEntitlements) {
        (accountWrapper.to.PART_OF_Source || []).forEach((sourceWrapper: any) => {
          const source = sourceWrapper.to.Name;
          rows.push({
            identity: identityName,
            account,
            source,
            entitlement: '',
            entitlementType: '',
            description: '',
          });
        });
      }
    });
  });

  return { rows };
};
