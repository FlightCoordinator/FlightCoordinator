import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAccessToken from "@/hooks/useAccessToken";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useCrewDeleteMutation = () => {
  const queryClient = useQueryClient();
  const accessToken = useAccessToken();
  const deleteCrew = useMutation({
    mutationKey: ["deleteCrewMutation"],
    mutationFn: async (crewDeleteData: ResourceTypes.Crew.Mutations.DeleteMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.SERVER.BASE_URL,
            port: Number(config.SERVER.PORT),
            endpoint: {
              prefix: config.SERVER.API_PREFIX,
              controller: "crew",
              action: "delete",
            },
          },
          method: "DELETE",
          auth: { accessToken: accessToken },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Crew.Mutations.DeleteMutationParams>(
          crewDeleteData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["crewQuery"] }),
  });
  return deleteCrew;
};

export default useCrewDeleteMutation;
