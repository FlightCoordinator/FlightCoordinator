import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useCrewUpdateMutation = () => {
  const queryClient = useQueryClient();
  const updateCrew = useMutation({
    mutationKey: ["updateCrewMutation"],
    mutationFn: async (useCrewUpdateData: ResourceTypes.Crew.Mutations.UpdateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "crew",
              action: "update",
            },
          },
          method: "PATCH",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Crew.Mutations.UpdateMutationParams>(
          useCrewUpdateData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["crewQuery"] }),
  });
  return updateCrew;
};

export default useCrewUpdateMutation;
