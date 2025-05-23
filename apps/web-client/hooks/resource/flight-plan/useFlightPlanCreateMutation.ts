import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useFlightPlanCreateMutation = () => {
  const queryClient = useQueryClient();
  const createFlightPlan = useMutation({
    mutationKey: ["createFlightPlanMutation"],
    mutationFn: async (flightPlanCreateData: ResourceTypes.FlightPlan.Mutations.CreateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "flightPlan",
              action: "create",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.FlightPlan.Mutations.CreateMutationParams>(
          flightPlanCreateData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["flightPlanQuery"] }),
  });
  return createFlightPlan;
};

export default useFlightPlanCreateMutation;
