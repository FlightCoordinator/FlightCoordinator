import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useRunwayCreateMutation = () => {
  const queryClient = useQueryClient();
  const createRunway = useMutation({
    mutationKey: ["createRunwayMutation"],
    mutationFn: async (runwayCreateData: ResourceTypes.Runway.Mutations.CreateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "runway",
              action: "create",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Runway.Mutations.CreateMutationParams>(
          runwayCreateData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["runwayQuery"] }),
  });
  return createRunway;
};

export default useRunwayCreateMutation;
