import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAccessToken from "@/hooks/useAccessToken";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useRouteUpdateMutation = () => {
  const queryClient = useQueryClient();
  const accessToken = useAccessToken();
  const updateRoute = useMutation({
    mutationKey: ["updateRouteMutation"],
    mutationFn: async (useRouteUpdateData: ResourceTypes.Route.Mutations.UpdateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.SERVER.BASE_URL,
            port: Number(config.SERVER.PORT),
            endpoint: {
              prefix: config.SERVER.API_PREFIX,
              controller: "route",
              action: "update",
            },
          },
          method: "PATCH",
          auth: { accessToken: accessToken },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Route.Mutations.UpdateMutationParams>(
          useRouteUpdateData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["routeQuery"] }),
  });
  return updateRoute;
};

export default useRouteUpdateMutation;
