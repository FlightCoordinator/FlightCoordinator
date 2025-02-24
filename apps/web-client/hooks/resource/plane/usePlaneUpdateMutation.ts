import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const usePlaneUpdateMutation = () => {
  const queryClient = useQueryClient();
  const updatePlane = useMutation({
    mutationKey: ["updatePlaneMutation"],
    mutationFn: async (usePlaneUpdateData: ResourceTypes.Plane.Mutations.UpdateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "plane",
              action: "update",
            },
          },
          method: "PATCH",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Plane.Mutations.UpdateMutationParams>(
          usePlaneUpdateData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["planeQuery"] }),
  });
  return updatePlane;
};

export default usePlaneUpdateMutation;
