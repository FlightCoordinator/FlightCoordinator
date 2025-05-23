import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useFlightPlanDeleteMutation = () => {
  const queryClient = useQueryClient();
  const deleteFlightPlan = useMutation({
    mutationKey: ["deleteFlightPlanMutation"],
    mutationFn: async (flightPlanDeleteData: ResourceTypes.FlightPlan.Mutations.DeleteMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "flightPlan",
              action: "delete",
            },
          },
          method: "DELETE",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.FlightPlan.Mutations.DeleteMutationParams>(
          flightPlanDeleteData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["flightPlanQuery"] }),
  });
  return deleteFlightPlan;
};

export default useFlightPlanDeleteMutation;
