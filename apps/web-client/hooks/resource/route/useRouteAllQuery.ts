import { useQuery } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useRouteAllQuery = () => {
  const routes = useQuery({
    queryKey: ["routeQuery"],
    queryFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "route",
              action: "getAll",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<ResourceTypes.Route.Queries.QueryResponseParams>, null>();
      return response;
    },
  });
  return routes;
};

export default useRouteAllQuery;
