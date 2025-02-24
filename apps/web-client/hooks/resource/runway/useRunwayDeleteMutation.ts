import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useRunwayDeleteMutation = () => {
  const queryClient = useQueryClient();
  const deleteRunway = useMutation({
    mutationKey: ["deleteRunwayMutation"],
    mutationFn: async (runwayDeleteData: ResourceTypes.Runway.Mutations.DeleteMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "runway",
              action: "delete",
            },
          },
          method: "DELETE",
          auth: { includeCookies: true },
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
