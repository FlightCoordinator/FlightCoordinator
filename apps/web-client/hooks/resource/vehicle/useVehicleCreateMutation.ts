import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useVehicleCreateMutation = () => {
  const queryClient = useQueryClient();
  const createVehicle = useMutation({
    mutationKey: ["createVehicleMutation"],
    mutationFn: async (vehicleCreateData: ResourceTypes.Vehicle.Mutations.CreateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "vehicle",
              action: "create",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Vehicle.Mutations.CreateMutationParams>(
          vehicleCreateData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vehicleQuery"] }),
  });
  return createVehicle;
};

export default useVehicleCreateMutation;
