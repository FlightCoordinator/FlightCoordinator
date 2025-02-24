import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useFlightCreateMutation = () => {
  const queryClient = useQueryClient();
  const createFlight = useMutation({
    mutationKey: ["createFlightMutation"],
    mutationFn: async (flightCreateData: ResourceTypes.Flight.Mutations.CreateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "flight",
              action: "create",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Flight.Mutations.CreateMutationParams>(
          flightCreateData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["flightQuery"] }),
  });
  return createFlight;
};

export default useFlightCreateMutation;
