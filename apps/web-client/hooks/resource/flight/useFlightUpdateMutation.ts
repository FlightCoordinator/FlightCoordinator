import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useFlightUpdateMutation = () => {
  const queryClient = useQueryClient();
  const updateFlight = useMutation({
    mutationKey: ["updateFlightMutation"],
    mutationFn: async (useFlightUpdateData: ResourceTypes.Flight.Mutations.UpdateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "flight",
              action: "update",
            },
          },
          method: "PATCH",
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Flight.Mutations.UpdateMutationParams>(
          useFlightUpdateData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["flightQuery"] }),
  });
  return updateFlight;
};

export default useFlightUpdateMutation;
