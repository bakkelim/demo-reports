import { toast } from "react-toastify";

const READ_ENDPOINT = "/indykite.tda.v1beta1.TrustedDataAccessAPI/DataAccess";
const GRANT_ENDPOINT =
  "/indykite.tda.v1beta1.TrustedDataAccessAPI/GrantConsent";
const REVOKE_ENDPOINT =
  "/indykite.tda.v1beta1.TrustedDataAccessAPI/RevokeConsent";
const LIST_ENDPOINT = "/indykite.tda.v1beta1.TrustedDataAccessAPI/ListConsents";

export interface ReadResult {
  properties: Property[] | undefined;
}

export interface Property {
  type: string;
  value: any;
}

export const read = async (data: any): Promise<ReadResult> => {
  const result: ReadResult = { properties: undefined };
  try {
    const credential = JSON.parse(data.credential);
    const baseUrl = credential.baseUrl;
    if (!baseUrl) {
      toast("baseUrl not found in credential config", {
        type: "error",
        position: "top-right",
      });
      return result;
    }
    const token = credential.token;
    if (!token) {
      toast("token not found in credential config", {
        type: "error",
        position: "top-right",
      });
      return result;
    }
    const subject = data.subject;
    if (!subject) {
      toast("invalid subject", {
        type: "error",
        position: "top-right",
      });
      return result;
    }
    const consentId = data.consentId;
    if (!consentId) {
      toast("invalid consentId", {
        type: "error",
        position: "top-right",
      });
      return result;
    }

    const payload = {
      user: {
        userId: subject,
      },
      consentId: consentId,
    };

    const url = baseUrl + READ_ENDPOINT;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      result.properties = parseResponseToProperties(data);
      return result;
    } else {
      throw new Error("Could not read data.");
    }
  } catch (e) {
    console.error(e);
    toast("Error performing request", {
      type: "error",
      position: "top-right",
    });
    return result;
  }
};
export const grant = async (data: any): Promise<boolean> => {
  try {
    const credential = JSON.parse(data.credential);
    const baseUrl = credential.baseUrl;
    if (!baseUrl) {
      toast("baseUrl not found in credential config", {
        type: "error",
        position: "top-right",
      });
      return false;
    }
    const token = credential.token;
    if (!token) {
      toast("token not found in credential config", {
        type: "error",
        position: "top-right",
      });
      return false;
    }
    const subject = data.subject;
    if (!subject) {
      toast("invalid subject", {
        type: "error",
        position: "top-right",
      });
      return false;
    }
    const consentId = data.consentId;
    if (!consentId) {
      toast("invalid consentId", {
        type: "error",
        position: "top-right",
      });
      return false;
    }

    const payload = {
      user: {
        userId: subject,
      },
      consentId: consentId,
    };

    const url = baseUrl + GRANT_ENDPOINT;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      await response.json();
      toast("Data access granted", {
        type: "success",
        position: "top-right",
      });
      return true;
    } else {
      throw new Error("Could not read data.");
    }
  } catch (e) {
    console.error(e);
    toast("Error performing request", {
      type: "error",
      position: "top-right",
    });
    return false;
  }
};
export const revoke = async (data: any): Promise<boolean> => {
  try {
    const credential = JSON.parse(data.credential);
    const baseUrl = credential.baseUrl;
    if (!baseUrl) {
      toast("baseUrl not found in credential config", {
        type: "error",
        position: "top-right",
      });
      return false;
    }
    const token = credential.token;
    if (!token) {
      toast("token not found in credential config", {
        type: "error",
        position: "top-right",
      });
      return false;
    }
    const subject = data.subject;
    if (!subject) {
      toast("invalid subject", {
        type: "error",
        position: "top-right",
      });
      return false;
    }
    const consentId = data.consentId;
    if (!consentId) {
      toast("invalid consentId", {
        type: "error",
        position: "top-right",
      });
      return false;
    }

    const payload = {
      user: {
        userId: subject,
      },
      consentId: consentId,
    };

    const url = baseUrl + REVOKE_ENDPOINT;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      await response.json();
      toast("Data access revoked", {
        type: "success",
        position: "top-right",
      });
      return true;
    } else {
      throw new Error("Could not read data.");
    }
  } catch (e) {
    console.error(e);
    toast("Error performing request", {
      type: "error",
      position: "top-right",
    });
    return false;
  }
};
export const list = async (data: any): Promise<ReadResult> => {
  const result: ReadResult = { properties: undefined };
  try {
    const credential = JSON.parse(data.credential);
    const baseUrl = credential.baseUrl;
    if (!baseUrl) {
      toast("baseUrl not found in credential config", {
        type: "error",
        position: "top-right",
      });
      return result;
    }
    const token = credential.token;
    if (!token) {
      toast("token not found in credential config", {
        type: "error",
        position: "top-right",
      });
      return result;
    }
    const subject = data.subject;
    if (!subject) {
      toast("invalid subject", {
        type: "error",
        position: "top-right",
      });
      return result;
    }
    const applicationId = credential.applicationId;
    if (!applicationId) {
      toast("invalid applicationId", {
        type: "error",
        position: "top-right",
      });
      return result;
    }

    const payload = {
      user: {
        userId: subject,
      },
      applicationId: applicationId,
    };

    const url = baseUrl + LIST_ENDPOINT;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      result.properties = parseListResponseToProperties(data);
      return result;
    } else {
      throw new Error("Could not read data.");
    }
  } catch (e) {
    console.error(e);
    toast("Error performing request", {
      type: "error",
      position: "top-right",
    });
    return result;
  }
};

const parseResponseToProperties = (data: any): Property[] => {
  return parseNodes(data.nodes || []).sort((a: Property, b: Property) =>
    a.type.localeCompare(b.type)
  );
};

const parseNodes = (nodes: any[]): Property[] => {
  return (nodes || []).flatMap((node: any) => {
    return parseNode(node);
  });
};

const parseNode = (node: any): Property[] => {
  const digital_twin_properties = (node.properties || []).map((p: any) =>
    parseProperty(p)
  );
  const related_node_properties = parseNodes(node.nodes);
  return [...digital_twin_properties, ...related_node_properties];
};

const parseProperty = (property: any): Property => {
  return {
    type: property.type,
    value:
      property.value.stringValue ||
      parseInt(property.value.integerValue, 10) ||
      property.value.boolValue,
  };
};

const parseListResponseToProperties = (data: any): Property[] => {
  return (data.consents || []).map((consent: any) => {
    return {
      type: "id",
      value: consent.id,
    };
  });
};
