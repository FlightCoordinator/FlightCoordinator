import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const usePlaneCreateMutation = () => {
  const queryClient = useQueryClient();
  const createPlane = useMutation({
    mutationKey: ["createPlaneMutation"],
    mutationFn: async (planeCreateData: ResourceTypes.Plane.Mutations.CreateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "plane",
              action: "create",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Plane.Mutations.CreateMutationParams>(
          planeCreateData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["planeQuery"] }),
  });
  return createPlane;
};

export default usePlaneCreateMutation;
