import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAccessToken from "@/hooks/useAccessToken";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const usePlaneUpdateMutation = () => {
  const queryClient = useQueryClient();
  const accessToken = useAccessToken();
  const updatePlane = useMutation({
    mutationKey: ["updatePlaneMutation"],
    mutationFn: async (usePlaneUpdateData: ResourceTypes.Plane.Mutations.UpdateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.SERVER.BASE_URL,
            port: Number(config.SERVER.PORT),
            endpoint: {
              prefix: config.SERVER.API_PREFIX,
              controller: "plane",
              action: "update",
            },
          },
          method: "PATCH",
          auth: { accessToken: accessToken },
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
