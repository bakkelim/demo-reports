import { toast } from "react-toastify";

const UPSERT_NODES_ENDPOINT =
  "/indykite.ingest.v1beta3.IngestAPI/BatchUpsertNodes";
const UPSERT_RELATIONSHIPS_ENDPOINT =
  "/indykite.ingest.v1beta3.IngestAPI/BatchUpsertRelationships";
const DELETE_NODE_ENDPOINT =
  "/indykite.ingest.v1beta3.IngestAPI/BatchDeleteNodes";
const DELETE_RELATIONSHIP_ENDPOINT =
  "/indykite.ingest.v1beta3.IngestAPI/BatchDeleteRelationships";

interface BatchDeleteNodes {
  nodes: DeleteNode[];
}
interface DeleteNode {
  externalId: string;
  type: string;
}
interface BatchDeleteRelationships {
  relationships: DeleteNode[];
}
interface DeleteRelationship {
  source: DeleteNode;
  target: DeleteNode;
  type: string;
}
interface RelationshipNode {
  externalId: string;
  type: string;
}
interface DeleteNode {
  externalId: string;
  type: string;
}
interface BatchUpsertNodesPayload {
  nodes: UpsertNode[];
}
interface BatchUpsertRelationships {
  relationships: UpsertRelationship[];
}
interface UpsertNode {
  externalId: string;
  type: string;
  tags: string[];
  isIdentity: boolean;
  properties: Property[];
}
interface UpsertRelationship {
  source: RelationshipNode;
  target: RelationshipNode;
  type: string;
  properties: Property[];
}
interface RelationshipNode {
  externalId: string;
  type: string;
}
interface Property {
  type: string;
  value: any;
}

export const performArrowDataIngest = async (data: any): Promise<void> => {
  try {
    const credential = JSON.parse(data.credential);
    const baseUrl = credential.baseUrl;
    if (!baseUrl) {
      toast("baseUrl not found in credential config", {
        type: "error",
        position: "top-right",
      });
      return;
    }
    const token = credential.token;
    if (!token) {
      toast("token not found in credential config", {
        type: "error",
        position: "top-right",
      });
      return;
    }
    const action = (data.action || "").toUpperCase();
    if (!token) {
      toast("action not found", {
        type: "error",
        position: "top-right",
      });
      return;
    }
    const externalId = data.externalId;
    if (!token) {
      toast("externalId not found", {
        type: "error",
        position: "top-right",
      });
      return;
    }
    const arrowsData = JSON.parse(data.data);
    if (!arrowsData) {
      toast("data not found", {
        type: "error",
        position: "top-right",
      });
      return;
    }

    if (action === "UPSERT") {
      await performUpsert(arrowsData, baseUrl, token, externalId);
      toast("Data ingested.", {
        type: "success",
        position: "top-right",
      });
    }
    if (action === "DELETE") {
      await performDelete(arrowsData, baseUrl, token, externalId);
      toast("Data deleted.", {
        type: "success",
        position: "top-right",
      });
    }
  } catch (e) {
    console.error(e);
    toast("Error performing ingest.", {
      type: "error",
      position: "top-right",
    });
    return;
  }
};

const performDelete = async (
  data: any,
  baseUrl: string,
  token: string,
  externalId: string
) => {
  await performRelationshipDelete(data, baseUrl, token, externalId);
  await performNodeDelete(data, baseUrl, token, externalId);
};
const performNodeDelete = async (
  data: any,
  baseUrl: string,
  token: string,
  externalId: string
) => {
  const nodes = data.nodes.map((n: any) => parseDeleteNode(n, externalId));
  if (nodes.length > 0) {
    const payload: BatchDeleteNodes = { nodes: nodes };
    await callNodeDelete(payload, baseUrl, token);
  }
};
const performRelationshipDelete = async (
  data: any,
  baseUrl: string,
  token: string,
  externalId: string
) => {
  const relationships = data.relationships.map((r: any) => parseDeleteRelationship(r, data.nodes, externalId));
  if (relationships.length > 0) {
    const payload: BatchDeleteRelationships = { relationships: relationships };
    await callRelationshipDelete(payload, baseUrl, token);
  }
};
const parseDeleteNode = (node: any, extid: string): DeleteNode => {
  const labels = node.labels.filter((l: String) => l !== "DigitalTwin");
  const externalId = !!extid ? node.properties[extid] : node.id;

  return {
    externalId: externalId,
    type: labels[0],
  };
};
const parseDeleteRelationship = (
  relationship: any,
  nodes: any[],
  extid: string
): DeleteRelationship => {
  const fromNode = findNode(nodes, relationship.fromId);
  const toNode = findNode(nodes, relationship.toId);
  const fromLabels = fromNode.labels.filter((l: String) => l !== "DigitalTwin");
  const toLabels = toNode.labels.filter((l: String) => l !== "DigitalTwin");

  return {
    source: {
      externalId: !!extid ? fromNode.properties[extid] : relationship.fromId,
      type: fromLabels[0],
    },
    target: {
      externalId: !!extid ? toNode.properties[extid] : relationship.toId,
      type: toLabels[0],
    },
    type: relationship.type,
  };
};
const callNodeDelete = async (
  payload: BatchDeleteNodes,
  baseUrl: string,
  token: string
) => {
  const url = baseUrl + DELETE_NODE_ENDPOINT;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status !== 200) {
    throw new Error("Could not ingest data.");
  }
};
const callRelationshipDelete = async (
  payload: BatchDeleteRelationships,
  baseUrl: string,
  token: string
) => {
  const url = baseUrl + DELETE_RELATIONSHIP_ENDPOINT;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status !== 200) {
    throw new Error("Could not ingest data.");
  }
};

const performUpsert = async (
  data: any,
  baseUrl: string,
  token: string,
  externalId: string
) => {
  await performNodeUpsert(data, baseUrl, token, externalId);
  await performRelationshipUpsert(data, baseUrl, token, externalId);
};
const performNodeUpsert = async (
  data: any,
  baseUrl: string,
  token: string,
  externalId: string
) => {
  const nodes = data.nodes.map((n: any) => parseUpsertNode(n, externalId));
  if (nodes.length > 0) {
    const payload: BatchUpsertNodesPayload = { nodes: nodes };
    await callNodeUpsert(payload, baseUrl, token);
  }
};
const performRelationshipUpsert = async (
  data: any,
  baseUrl: string,
  token: string,
  externalId: string
) => {
  const relationships = data.relationships.map((r: any) =>
    parseUpsertRelationship(r, data.nodes, externalId)
  );
  if (relationships.length > 0) {
    const payload: BatchUpsertRelationships = {
      relationships: relationships,
    };
    await callRelationshipUpsert(payload, baseUrl, token);
  }
};
const parseUpsertNode = (node: any, extid: string): UpsertNode => {
  const props: Property[] = [];
  Object.keys(node.properties).forEach(function (key) {
    if (key !== "external_id") {
      let value;
      switch (typeof node.properties[key]) {
        case "string":
          value = { string_value: node.properties[key] };
          break;
        case "number":
          value = { integer_value: node.properties[key] };
          break;
        case "boolean":
          value = { bool_value: node.properties[key] };
          break;
        // Add more cases as needed
        default:
          throw new Error(
            `Unsupported property type: ${typeof node.properties[key]}`
          );
      }
      props.push({ type: key, value: value });
    }
  });

  const isIdentity = node.labels.includes("DigitalTwin");
  const labels = node.labels.filter((l: String) => l !== "DigitalTwin");
  const externalId = !!extid ? node.properties[extid] : node.id;

  return {
    externalId: externalId,
    type: labels[0],
    isIdentity: isIdentity,
    tags: labels,
    properties: props,
  };
};
const parseUpsertRelationship = (
  relationship: any,
  nodes: any[],
  extid: string
): UpsertRelationship => {
  const props: Property[] = [];
  Object.keys(relationship.properties).forEach(function (key) {
    if (key !== "external_id") {
      let value;
      switch (typeof relationship.properties[key]) {
        case "string":
          value = { string_value: relationship.properties[key] };
          break;
        case "number":
          value = { integer_value: relationship.properties[key] };
          break;
        case "boolean":
          value = { bool_value: relationship.properties[key] };
          break;
        // Add more cases as needed
        default:
          throw new Error(
            `Unsupported property type: ${typeof relationship.properties[key]}`
          );
      }
      props.push({ type: key, value: value });
    }
  });

  const fromNode = findNode(nodes, relationship.fromId);
  const toNode = findNode(nodes, relationship.toId);
  const fromLabels = fromNode.labels.filter((l: String) => l !== "DigitalTwin");
  const toLabels = toNode.labels.filter((l: String) => l !== "DigitalTwin");

  return {
    source: {
      externalId: !!extid ? fromNode.properties[extid] : relationship.fromId,
      type: fromLabels[0],
    },
    target: {
      externalId: !!extid ? toNode.properties[extid] : relationship.toId,
      type: toLabels[0],
    },
    type: relationship.type,
    properties: props,
  };
};
const callNodeUpsert = async (
  payload: BatchUpsertNodesPayload,
  baseUrl: string,
  token: string
) => {
  const url = baseUrl + UPSERT_NODES_ENDPOINT;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status !== 200) {
    throw new Error("Could not ingest data.");
  }
};
const callRelationshipUpsert = async (
  payload: BatchUpsertRelationships,
  baseUrl: string,
  token: string
) => {
  const url = baseUrl + UPSERT_RELATIONSHIPS_ENDPOINT;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status !== 200) {
    throw new Error("Could not ingest data.");
  }
};
const findNode = (nodes: any[], id: string) => {
  return nodes.find((n) => n.id === id);
};
