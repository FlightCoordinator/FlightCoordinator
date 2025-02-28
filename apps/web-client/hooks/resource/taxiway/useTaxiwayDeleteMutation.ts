import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useTaxiwayDeleteMutation = () => {
  const queryClient = useQueryClient();
  const deleteTaxiway = useMutation({
    mutationKey: ["deleteTaxiwayMutation"],
    mutationFn: async (taxiwayDeleteData: ResourceTypes.Taxiway.Mutations.DeleteMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "taxiway",
              action: "delete",
            },
          },
          method: "DELETE",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Taxiway.Mutations.DeleteMutationParams>(
          taxiwayDeleteData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["taxiwayQuery"] }),
  });
  return deleteTaxiway;
};

export default useTaxiwayDeleteMutation;
