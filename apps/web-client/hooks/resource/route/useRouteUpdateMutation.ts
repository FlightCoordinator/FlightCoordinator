import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useRouteUpdateMutation = () => {
  const queryClient = useQueryClient();
  const updateRoute = useMutation({
    mutationKey: ["updateRouteMutation"],
    mutationFn: async (useRouteUpdateData: ResourceTypes.Route.Mutations.UpdateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "route",
              action: "update",
            },
          },
          method: "PATCH",
          auth: { includeCookies: true },
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
