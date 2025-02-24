import { useQuery } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useCrewAllQuery = () => {
  const crews = useQuery({
    queryKey: ["crewQuery"],
    queryFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "crew",
              action: "getAll",
            },
          },
          method: "POST",
        })
        .sendRequest<GlobalTypes.ServerResponseParams<ResourceTypes.Crew.Queries.QueryResponseParams>, null>();
      return response;
    },
  });
  return crews;
};

export default useCrewAllQuery;
