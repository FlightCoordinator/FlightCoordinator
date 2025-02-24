import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const usePlaneDeleteMutation = () => {
  const queryClient = useQueryClient();
  const deletePlane = useMutation({
    mutationKey: ["deletePlaneMutation"],
    mutationFn: async (planeDeleteData: ResourceTypes.Plane.Mutations.DeleteMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "plane",
              action: "delete",
            },
          },
          method: "DELETE",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Plane.Mutations.DeleteMutationParams>(
          planeDeleteData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["planeQuery"] }),
  });
  return deletePlane;
};

export default usePlaneDeleteMutation;
