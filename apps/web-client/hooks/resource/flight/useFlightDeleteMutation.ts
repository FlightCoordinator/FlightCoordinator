import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useFlightDeleteMutation = () => {
  const queryClient = useQueryClient();
  const deleteFlight = useMutation({
    mutationKey: ["deleteFlightMutation"],
    mutationFn: async (flightDeleteData: ResourceTypes.Flight.Mutations.DeleteMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "flight",
              action: "delete",
            },
          },
          method: "DELETE",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Flight.Mutations.DeleteMutationParams>(
          flightDeleteData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["flightQuery"] }),
  });
  return deleteFlight;
};

export default useFlightDeleteMutation;
