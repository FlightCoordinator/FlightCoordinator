import { useQuery } from "@tanstack/react-query";

import useAccessToken from "@/hooks/useAccessToken";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const usePlaneAllQuery = () => {
  const accessToken = useAccessToken();
  const planes = useQuery({
    queryKey: ["planeQuery"],
    queryFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.SERVER.BASE_URL,
            port: Number(config.SERVER.PORT),
            endpoint: {
              prefix: config.SERVER.API_PREFIX,
              controller: "plane",
              action: "getAll",
            },
          },
          method: "POST",
          auth: { accessToken: accessToken },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<ResourceTypes.Plane.Queries.QueryResponseParams>, null>();
      return response;
    },
  });
  return planes;
};

export default usePlaneAllQuery;
