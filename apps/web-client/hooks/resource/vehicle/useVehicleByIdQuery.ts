import { useQuery } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useVehicleAllQuery = () => {
  const vehicles = useQuery({
    queryKey: ["vehicleQuery"],
    queryFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "vehicle",
              action: "getAll",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Vehicle.Queries.QueryResponseParams>();
      return response;
    },
  });
  return vehicles;
};

export default useVehicleAllQuery;
