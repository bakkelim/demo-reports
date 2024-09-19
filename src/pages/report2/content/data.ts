import { toast } from "react-toastify";

// const ENDPOINT_URL="https://api-ent.3edges.io/graphql"
// const ACCESS_TOKEN="0PxnQWjNDXzzV_50rjY-dn-pTvHWWzqVDX5zgG3AvUQ"

export interface Result {
  rows: Row[];
}

export interface Row {
  source: string;
  account: string;
  accountType: string;
  accountPrivileged: string;
  entitlement: string;
  entitlementDescription: string;
  entitlementType: string;
  entitlementPrivileged: string;
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
      "query": `mutation {
  getOrphanAccounts
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

  (JSON.parse(response.data.getOrphanAccounts) || []).forEach((responseRow: any) => {
     rows.push({
      source: responseRow[0],
      account: responseRow[1],
      accountType: responseRow[2],
      accountPrivileged: responseRow[3],
      entitlement: responseRow[4],
      entitlementDescription: responseRow[5],
      entitlementType: responseRow[6],
      entitlementPrivileged: responseRow[7],
     });
  });

  return { rows };
};
