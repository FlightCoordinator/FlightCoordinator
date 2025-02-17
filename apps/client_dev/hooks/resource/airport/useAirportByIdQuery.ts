import { useQuery } from "@tanstack/react-query";

import ResourceTypes from "@/types/resource";

import useAccessToken from "../../useAccessToken";
import requester from "@/shared/lib/requester";
import { API_PREFIX, SERVER_BASE_URL, SERVER_PORT } from "@/shared/utils/appConfig";
import GlobalTypes from "@/types/globals";

const useAirportAllQuery = () => {
  const accessToken = useAccessToken();
  const airports = useQuery({
    queryKey: ["airportQuery"],
    queryFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: SERVER_BASE_URL,
            port: Number(SERVER_PORT),
            endpoint: {
              prefix: API_PREFIX,
              controller: "airport",
              action: "getAll",
            },
          },
          method: "POST",
          auth: { accessToken: accessToken },
        })
        .sendRequest<
          GlobalTypes.ServerResponseParams<ResourceTypes.Airport.Queries.QueryResponseParams>,
          null
        >();
      return response;
    },
  });
  return airports;
};

export default useAirportAllQuery;
