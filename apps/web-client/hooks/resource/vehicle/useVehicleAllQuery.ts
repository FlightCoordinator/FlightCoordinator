import { useQuery } from "@tanstack/react-query";

import useAccessToken from "@/hooks/useAccessToken";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useVehicleAllQuery = () => {
  const accessToken = useAccessToken();
  const vehicles = useQuery({
    queryKey: ["vehicleQuery"],
    queryFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.SERVER.BASE_URL,
            port: Number(config.SERVER.PORT),
            endpoint: {
              prefix: config.SERVER.API_PREFIX,
              controller: "vehicle",
              action: "getAll",
            },
          },
          method: "POST",
          auth: { accessToken: accessToken },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Vehicle.Queries.QueryResponseParams>();
      return response;
    },
  });
  return vehicles;
};

export default useVehicleAllQuery;
