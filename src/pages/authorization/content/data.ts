import { toast } from "react-toastify";
import { Node } from "../../../hooks/useResources";

const IS_ENDPOINT =
  "/indykite.authorization.v1beta1.AuthorizationAPI/IsAuthorized";
const WHAT_ENDPOINT =
  "/indykite.authorization.v1beta1.AuthorizationAPI/WhatAuthorized";
const WHO_ENDPOINT =
  "/indykite.authorization.v1beta1.AuthorizationAPI/WhoAuthorized";

export interface Result {
  decision: string | undefined;
  isAuthorized: IsAuthorizedResult | undefined;
  whatAuthorized: WhatAuthorizedResult | undefined;
  whoAuthorized: WhoAuthorizedResult | undefined;
}

export interface IsAuthorizedResult {
  text: string;
  allowed: boolean;
}

export interface WhatAuthorizedResult {
  type: string;
  action: string;
  subject: string;
  externalIds: string[];
}
export interface WhoAuthorizedResult {
  type: string;
  action: string;
  resource: string;
  externalIds: string[];
}

export const perfomIsAuthorized = async (data: any): Promise<Result> => {
  const result: Result = {
    decision: undefined,
    isAuthorized: undefined,
    whatAuthorized: undefined,
    whoAuthorized: undefined,
  };
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

    const subject: Node = data.subject;
    if (!subject) {
      toast("invalid subject", {
        type: "error",
        position: "top-right",
      });
      return result;
    }
    const action = data.action;
    if (!action) {
      toast("invalid action", {
        type: "error",
        position: "top-right",
      });
      return result;
    }
    const resource: Node = data.resource;
    if (!resource) {
      toast("invalid action", {
        type: "error",
        position: "top-right",
      });
      return result;
    }
    const payload = {
      subject: {
        external_id: {
          type: `${subject.type}`,
          external_id: `${subject.externalId}`,
        },
      },
      resources: [
        {
          externalId: `${resource.externalId}`,
          type: `${resource.type}`,
          actions: [`${action}`],
        },
      ],
      input_params: convertToInputParams(data.inputParams),
      policy_tags: convertToPolicyTags(data.tags),
    };

    if (!payload.input_params) {
      delete payload.input_params;
    }
    if (!payload.policy_tags) {
      delete payload.policy_tags;
    }

    const url = baseUrl + IS_ENDPOINT;
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
      result.decision = data;
      result.isAuthorized = {
        text: `${subject.externalId} -> ${action} -> ${resource.externalId}`,
        allowed: findAllow(data),
      };
      return result;
    } else {
      throw new Error("Could not read data.");
    }
  } catch (e) {
    console.error(e);
    toast("Error performing authorization", {
      type: "error",
      position: "top-right",
    });
    return result;
  }
};

export const perfomWhatAuthorized = async (data: any): Promise<Result> => {
  const result: Result = {
    decision: undefined,
    isAuthorized: undefined,
    whatAuthorized: undefined,
    whoAuthorized: undefined,
  };
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

    const subject: Node = data.subject;
    if (!subject) {
      toast("invalid subject", {
        type: "error",
        position: "top-right",
      });
      return result;
    }
    const action = data.action;
    if (!action) {
      toast("invalid action", {
        type: "error",
        position: "top-right",
      });
      return result;
    }
    const resource: Node = data.resource;
    if (!resource) {
      toast("invalid action", {
        type: "error",
        position: "top-right",
      });
      return result;
    }
    const payload = {
      subject: {
        external_id: {
          type: `${subject.type}`,
          external_id: `${subject.externalId}`,
        },
      },
      resource_types: [
        {
          type: `${resource.type}`,
          actions: [`${action}`],
        },
      ],
      input_params: convertToInputParams(data.inputParams),
      policy_tags: convertToPolicyTags(data.tags),
    };

    if (!payload.input_params) {
      delete payload.input_params;
    }
    if (!payload.policy_tags) {
      delete payload.policy_tags;
    }

    const url = baseUrl + WHAT_ENDPOINT;
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
      result.decision = data;
      result.whatAuthorized = {
        type: `${resource.type}`,
        action: `${action}`,
        subject: `${subject.externalId}`,
        externalIds: findExternalIds(data),
      };
      return result;
    } else {
      throw new Error("Could not read data.");
    }
  } catch (e) {
    console.error(e);
    toast("Error performing authorization", {
      type: "error",
      position: "top-right",
    });
    return result;
  }
};

export const perfomWhoAuthorized = async (data: any): Promise<Result> => {
  const result: Result = {
    decision: undefined,
    isAuthorized: undefined,
    whatAuthorized: undefined,
    whoAuthorized: undefined,
  };
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
    const action = data.action;
    if (!action) {
      toast("invalid action", {
        type: "error",
        position: "top-right",
      });
      return result;
    }
    const resource: Node = data.resource;
    if (!resource) {
      toast("invalid action", {
        type: "error",
        position: "top-right",
      });
      return result;
    }
    const payload = {
      resources: [
        {
          externalId: `${resource.externalId}`,
          type: `${resource.type}`,
          actions: [`${action}`],
        },
      ],
      input_params: convertToInputParams(data.inputParams),
      policy_tags: convertToPolicyTags(data.tags),
    };

    if (!payload.input_params) {
      delete payload.input_params;
    }
    if (!payload.policy_tags) {
      delete payload.policy_tags;
    }

    const url = baseUrl + WHO_ENDPOINT;
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
      result.decision = data;
      result.whoAuthorized = {
        type: `${resource.type}`,
        action: `${action}`,
        resource: `${resource.externalId}`,
        externalIds: findExternalIds(data),
      };
      return result;
    } else {
      throw new Error("Could not read data.");
    }
  } catch (e) {
    console.error(e);
    toast("Error performing authorization", {
      type: "error",
      position: "top-right",
    });
    return result;
  }
};

function findAllow(obj: any): boolean {
  for (let key in obj) {
    if (typeof obj[key] === "object") {
      let result = findAllow(obj[key]);
      if (result !== null) {
        return result;
      }
    } else if (key === "allow") {
      return obj[key] === true;
    }
  }
  return false;
}

const findExternalIds = (obj: any): string[] => {
  let ids: string[] = [];
  for (let key in obj) {
    if (typeof obj[key] === "object") {
      if (Array.isArray(obj[key])) {
        ids = ids.concat(...obj[key].map((item: any) => findExternalIds(item)));
      } else {
        ids = ids.concat(findExternalIds(obj[key]));
      }
    } else if (key === "externalId") {
      ids.push(obj[key]);
    }
  }
  return ids.sort();
};

function convertToInputParams(input: string) {
  if (!input) {
    return undefined;
  }
  const pairs = input.split(",");

  const inputParams: any = {};

  for (const pair of pairs) {
    const [key, value] = pair.split("=");
    if (value !== "") {
      inputParams[key] = { string_value: value };
    }
  }

  return inputParams;
}

function convertToPolicyTags(input: string): string[] | undefined {
  console.log("input", input);

  if (!input) {
    return undefined;
  }
  return input.split(",");
}
