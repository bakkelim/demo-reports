import { useEffect, useState } from "react";
import short from "short-uuid";
import { toast } from "react-toastify";

const LOCALSTORAGE_QUERY = "ik_querys";

export type Query = {
  id: string;
  title: string;
  value: string;
};

export type QueryCollectionEntry = {
  name: string;
  query: string;
};

type LocalStorageQuery = {
  queries: Query[];
};

const readLocalQueries = () => {
  const localStorageValue = localStorage.getItem(LOCALSTORAGE_QUERY);
  if (!localStorageValue) return [];

  const parsedConfigs = JSON.parse(
    localStorageValue ?? ""
  ) as unknown as LocalStorageQuery;

  return parsedConfigs.queries;
};

const useQuery = () => {
  const [queries, setQueries] = useState<Query[]>([]);
  const localStorageValue = localStorage.getItem(LOCALSTORAGE_QUERY);

  useEffect(() => {
    setQueries(readLocalQueries());
  }, [localStorageValue]);

  const addQuery = (config: Omit<Query, "id">) => {
    const id = short.generate();
    const localQueries = readLocalQueries();

    let data = {
      queries: [
        {
          id: `config-${id}`,
          ...config,
        },
      ],
    };

    if (localQueries.length > 0) {
      const parsedLocalIngestConfig = JSON.parse(
        localStorageValue ?? ""
      ) as unknown as LocalStorageQuery;

      data = {
        queries: [
          ...parsedLocalIngestConfig.queries,
          {
            id: `config-${id}`,
            ...config,
          },
        ],
      };
    }

    localStorage.setItem(
      LOCALSTORAGE_QUERY,
      JSON.stringify(data satisfies LocalStorageQuery)
    );

    toast("Query was added.", {
      type: "success",
      position: "top-right",
    });
  };

  const deleteQuery = (id: string) => {
    const localQueries = readLocalQueries();
    if (!localQueries) {
      toast("No queries found", {
        type: "error",
        position: "top-right",
      });
      return;
    }

    const queries = localQueries.filter((query) => query.id !== id);

    localStorage.setItem(
      LOCALSTORAGE_QUERY,
      JSON.stringify({
        queries,
      } satisfies LocalStorageQuery)
    );

    toast("Query was deleted", {
      type: "success",
      position: "top-right",
    });
  };

  const getParsedQueries = (): Query[] => {
    return queries.flatMap((q: Query): Query[] => {
      const value = JSON.parse(q.value);
      if (Array.isArray(value)) {
        return value.map((a: QueryCollectionEntry, i: number): Query => {
          return {
            id: a.name + "-" + i,
            title: a.name,
            value: JSON.stringify(a.query),
          };
        });
      } else {
        return [q];
      }
    });
  };

  return {
    addQuery,
    deleteQuery,
    queries,
    getParsedQueries,
  };
};

export default useQuery;
