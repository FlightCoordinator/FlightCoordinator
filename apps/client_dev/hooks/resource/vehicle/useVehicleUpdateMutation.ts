import { useMutation, useQueryClient } from "@tanstack/react-query";

import ResourceTypes from "@/types/resource";

import useAccessToken from "../../useAccessToken";
import Requester from "@/utils/requester";

const useVehicleUpdateMutation = () => {
  const queryClient = useQueryClient();
  const accessToken = useAccessToken();
  const updateVehicle = useMutation({
    mutationKey: ["updateVehicleMutation"],
    mutationFn: async (useVehicleUpdateData: ResourceTypes.Vehicle.Mutations.UpdateMutationParams) => {
      const { vehicleId, ...requestData } = useVehicleUpdateData;
      const response = await new Requester()
        .setConfig({
          method: "PATCH",
          endpoint: { controller: "vehicle", action: "update" },
          payload: { vehicleId: vehicleId, ...requestData },
          accessToken: accessToken,
        })
        .sendRequest();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vehicleQuery"] }),
  });
  return updateVehicle;
};

export default useVehicleUpdateMutation;
