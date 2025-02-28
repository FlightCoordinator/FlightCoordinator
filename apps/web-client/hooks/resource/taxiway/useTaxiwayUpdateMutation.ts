import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useTaxiwayUpdateMutation = () => {
  const queryClient = useQueryClient();
  const updateTaxiway = useMutation({
    mutationKey: ["updateTaxiwayMutation"],
    mutationFn: async (useTaxiwayUpdateData: ResourceTypes.Taxiway.Mutations.UpdateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "taxiway",
              action: "update",
            },
          },
          method: "PATCH",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Taxiway.Mutations.UpdateMutationParams>(
          useTaxiwayUpdateData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["taxiwayQuery"] }),
  });
  return updateTaxiway;
};

export default useTaxiwayUpdateMutation;
