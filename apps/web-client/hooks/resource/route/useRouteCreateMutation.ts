import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useRouteCreateMutation = () => {
  const queryClient = useQueryClient();
  const createRoute = useMutation({
    mutationKey: ["createRouteMutation"],
    mutationFn: async (routeCreateData: ResourceTypes.Route.Mutations.CreateMutationParams) => {
      const response = requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "route",
              action: "create",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
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
