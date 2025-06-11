import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { requester } from "@/shared/lib/requester";

import { config } from "@/shared/app-config";

import type { GlobalTypes } from "@/types/globals";
import type { ResourceTypes } from "@/types/resource";

const useFlightPlansQuery = () => {
  const flightPlans = useQuery({
    queryKey: ["flightPlanQuery"],
    queryFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "flightPlan",
              action: "getAll",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<ResourceTypes.FlightPlan.Queries.QueryResponseParams>, null>();
      return response;
    },
  });
  return flightPlans;
};

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

export { useFlightPlansQuery, useFlightPlanCreateMutation, useFlightPlanDeleteMutation };
