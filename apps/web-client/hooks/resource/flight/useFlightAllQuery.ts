import { useQuery } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useFlightAllQuery = () => {
  const flights = useQuery({
    queryKey: ["flightQuery"],
    queryFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "flight",
              action: "getAll",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<ResourceTypes.Flight.Queries.QueryResponseParams>, null>();
      return response;
    },
  });
  return flights;
};

export default useFlightAllQuery;
