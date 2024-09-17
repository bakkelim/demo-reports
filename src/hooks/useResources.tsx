import { useCallback, useState } from "react";
import { toast } from "react-toastify";

const QUERY_ENDPOINT =
  "/indykite.knowledge.v1beta2.IdentityKnowledgeAPI/IdentityKnowledgeRead";

export interface Node {
  id: string;
  type: string;
  externalId: string;
  isIdentity: boolean;
}

const useResources = () => {
  const [resources, setResources] = useState<Node[]>([]);

  const fetchResources = useCallback(async (data: any) => {
    try {
      const credential = JSON.parse(data);
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

      const url = baseUrl + QUERY_ENDPOINT;
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          query: "MATCH (r:Resource)",
          input_params: {},
          returns: [{ variable: "r", properties: [] }],
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setResources(parseResponse(data));
      } else {
        throw new Error("Could not read data.");
      }
    } catch (e) {
      console.error(e);
      toast("Error performing query.", {
        type: "error",
        position: "top-right",
      });
    }
  }, []);
  return { resources, fetchResources };
};

const parseResponse = (data: any): Node[] => {
  return (data.nodes || [])
    .map((node: any) => ({
      id: node.id,
      title: `${node.type} - ${node.externalId}`,
      value: node.id,
      type: node.type,
      externalId: node.externalId,
      isIdentity: node.isIdentity,
    }))
    .sort((a: Node, b: Node) =>
      (a.type + a.externalId).localeCompare(b.type + b.externalId)
    );
};

export default useResources;
