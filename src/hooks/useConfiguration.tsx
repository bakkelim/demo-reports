import { useEffect, useState } from "react";
import short from "short-uuid";
import { toast } from "react-toastify";

const LOCALSTORAGE_INGEST_CONFIG = "ik_graphingest_configs";

export type Config = {
  id: string;
  title: string;
  value: string;
};

type LocalStorageIngestConfig = {
  configs: Config[];
};

const readLocalConfigurations = () => {
  const localIngestConfig = localStorage.getItem(LOCALSTORAGE_INGEST_CONFIG);
  if (!localIngestConfig) return [];

  const parsedConfigs = JSON.parse(
    localIngestConfig ?? ""
  ) as unknown as LocalStorageIngestConfig;

  return parsedConfigs.configs;
};

const useConfiguration = () => {
  const [configurations, setConfigurations] = useState<Config[]>([]);
  const localIngestConfig = localStorage.getItem(LOCALSTORAGE_INGEST_CONFIG);

  useEffect(() => {
    setConfigurations(readLocalConfigurations());
  }, [localIngestConfig]);

  const addConfigurationRecord = (config: Omit<Config, "id">) => {
    const id = short.generate();
    const localConfigs = readLocalConfigurations();

    let data = {
      configs: [
        {
          id: `config-${id}`,
          ...config,
        },
      ],
    };

    if (localConfigs.length > 0) {
      const parsedLocalIngestConfig = JSON.parse(
        localIngestConfig ?? ""
      ) as unknown as LocalStorageIngestConfig;

      data = {
        configs: [
          ...parsedLocalIngestConfig.configs,
          {
            id: `config-${id}`,
            ...config,
          },
        ],
      };
    }

    localStorage.setItem(
      LOCALSTORAGE_INGEST_CONFIG,
      JSON.stringify(data satisfies LocalStorageIngestConfig)
    );

    toast("Configuration was added.", {
      type: "success",
      position: "top-right",
    });
  };

  const deleteConfigurationRecord = (id: string) => {
    const localConfigs = readLocalConfigurations();
    if (!localConfigs) {
      toast("No configurations found", {
        type: "error",
        position: "top-right",
      });
      return;
    }

    const configs = localConfigs.filter((config) => config.id !== id);

    localStorage.setItem(
      LOCALSTORAGE_INGEST_CONFIG,
      JSON.stringify({
        configs,
      } satisfies LocalStorageIngestConfig)
    );

    toast("Configuration was deleted", {
      type: "success",
      position: "top-right",
    });
  };

  return {
    addConfigurationRecord,
    deleteConfigurationRecord,
    configurations,
  };
};

export default useConfiguration;
