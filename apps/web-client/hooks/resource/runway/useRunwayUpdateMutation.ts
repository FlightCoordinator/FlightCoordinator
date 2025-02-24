import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useRunwayUpdateMutation = () => {
  const queryClient = useQueryClient();
  const updateRunway = useMutation({
    mutationKey: ["updateRunwayMutation"],
    mutationFn: async (useRunwayUpdateData: ResourceTypes.Runway.Mutations.UpdateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "runway",
              action: "update",
            },
          },
          method: "PATCH",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Runway.Mutations.UpdateMutationParams>(
          useRunwayUpdateData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["runwayQuery"] }),
  });
  return updateRunway;
};

export default useRunwayUpdateMutation;
