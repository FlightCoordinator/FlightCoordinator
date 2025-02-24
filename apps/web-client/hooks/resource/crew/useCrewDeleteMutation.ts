import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useCrewDeleteMutation = () => {
  const queryClient = useQueryClient();
  const deleteCrew = useMutation({
    mutationKey: ["deleteCrewMutation"],
    mutationFn: async (crewDeleteData: ResourceTypes.Crew.Mutations.DeleteMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "crew",
              action: "delete",
            },
          },
          method: "DELETE",
          auth: { includeCookies: true },
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
