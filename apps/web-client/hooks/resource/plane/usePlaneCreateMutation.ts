import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAccessToken from "@/hooks/useAccessToken";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const usePlaneCreateMutation = () => {
  const queryClient = useQueryClient();
  const accessToken = useAccessToken();
  const createPlane = useMutation({
    mutationKey: ["createPlaneMutation"],
    mutationFn: async (planeCreateData: ResourceTypes.Plane.Mutations.CreateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.SERVER.BASE_URL,
            port: Number(config.SERVER.PORT),
            endpoint: {
              prefix: config.SERVER.API_PREFIX,
              controller: "plane",
              action: "create",
            },
          },
          method: "POST",
          auth: { accessToken: accessToken },
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
