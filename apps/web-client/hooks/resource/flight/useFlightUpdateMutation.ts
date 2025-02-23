import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAccessToken from "@/hooks/useAccessToken";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useFlightUpdateMutation = () => {
  const queryClient = useQueryClient();
  const accessToken = useAccessToken();
  const updateFlight = useMutation({
    mutationKey: ["updateFlightMutation"],
    mutationFn: async (useFlightUpdateData: ResourceTypes.Flight.Mutations.UpdateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.SERVER.BASE_URL,
            port: Number(config.SERVER.PORT),
            endpoint: {
              prefix: config.SERVER.API_PREFIX,
              controller: "flight",
              action: "update",
            },
          },
          method: "PATCH",
          auth: { accessToken: accessToken },
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
