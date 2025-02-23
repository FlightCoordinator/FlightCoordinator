import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAccessToken from "@/hooks/useAccessToken";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useRouteCreateMutation = () => {
  const queryClient = useQueryClient();
  const accessToken = useAccessToken();
  const createRoute = useMutation({
    mutationKey: ["createRouteMutation"],
    mutationFn: async (routeCreateData: ResourceTypes.Route.Mutations.CreateMutationParams) => {
      const response = requester
        .setRequestConfig({
          url: {
            baseURL: config.SERVER.BASE_URL,
            port: Number(config.SERVER.PORT),
            endpoint: {
              prefix: config.SERVER.API_PREFIX,
              controller: "route",
              action: "create",
            },
          },
          method: "POST",
          auth: { accessToken: accessToken },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Route.Mutations.CreateMutationParams>(
          routeCreateData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["routeQuery"] }),
  });
  return createRoute;
};

export default useRouteCreateMutation;
