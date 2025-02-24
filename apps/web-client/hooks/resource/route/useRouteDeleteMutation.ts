import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useRouteDeleteMutation = () => {
  const queryClient = useQueryClient();
  const deleteRoute = useMutation({
    mutationKey: ["deleteRouteMutation"],
    mutationFn: async (routeDeleteData: ResourceTypes.Route.Mutations.DeleteMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "route",
              action: "delete",
            },
          },
          method: "DELETE",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Route.Mutations.DeleteMutationParams>(
          routeDeleteData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["routeQuery"] }),
  });
  return deleteRoute;
};

export default useRouteDeleteMutation;
