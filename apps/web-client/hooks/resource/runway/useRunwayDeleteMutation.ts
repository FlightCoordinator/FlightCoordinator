import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAccessToken from "@/hooks/useAccessToken";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useRunwayDeleteMutation = () => {
  const queryClient = useQueryClient();
  const accessToken = useAccessToken();
  const deleteRunway = useMutation({
    mutationKey: ["deleteRunwayMutation"],
    mutationFn: async (runwayDeleteData: ResourceTypes.Runway.Mutations.DeleteMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.SERVER.BASE_URL,
            port: Number(config.SERVER.PORT),
            endpoint: {
              prefix: config.SERVER.API_PREFIX,
              controller: "runway",
              action: "delete",
            },
          },
          method: "DELETE",
          auth: { accessToken: accessToken },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Runway.Mutations.DeleteMutationParams>(
          runwayDeleteData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["runwayQuery"] }),
  });
  return deleteRunway;
};

export default useRunwayDeleteMutation;
