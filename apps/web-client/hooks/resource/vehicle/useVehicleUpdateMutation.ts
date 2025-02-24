import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useVehicleUpdateMutation = () => {
  const queryClient = useQueryClient();
  const updateVehicle = useMutation({
    mutationKey: ["updateVehicleMutation"],
    mutationFn: async (useVehicleUpdateData: ResourceTypes.Vehicle.Mutations.UpdateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "vehicle",
              action: "update",
            },
          },
          method: "PATCH",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Vehicle.Mutations.UpdateMutationParams>(
          useVehicleUpdateData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vehicleQuery"] }),
  });
  return updateVehicle;
};

export default useVehicleUpdateMutation;
