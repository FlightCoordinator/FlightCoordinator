import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useVehicleDeleteMutation = () => {
  const queryClient = useQueryClient();
  const deleteVehicle = useMutation({
    mutationKey: ["deleteVehicleMutation"],
    mutationFn: async (vehicleDeleteData: ResourceTypes.Vehicle.Mutations.DeleteMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "vehicle",
              action: "delete",
            },
          },
          method: "DELETE",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Vehicle.Mutations.DeleteMutationParams>(
          vehicleDeleteData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vehicleQuery"] }),
  });
  return deleteVehicle;
};

export default useVehicleDeleteMutation;
