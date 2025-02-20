import { useMutation, useQueryClient } from "@tanstack/react-query";

import ResourceTypes from "@/types/resource";

import useAccessToken from "../../useAccessToken";
import Requester from "@/utils/requester";

const useVehicleDeleteMutation = () => {
  const queryClient = useQueryClient();
  const accessToken = useAccessToken();
  const deleteVehicle = useMutation({
    mutationKey: ["deleteVehicleMutation"],
    mutationFn: async (vehicleDeleteData: ResourceTypes.Vehicle.Mutations.DeleteMutationParams) => {
      const response = await new Requester()
        .setConfig({
          method: "DELETE",
          endpoint: { controller: "vehicle", action: "delete" },
          payload: vehicleDeleteData,
          accessToken: accessToken,
        })
        .sendRequest();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vehicleQuery"] }),
  });
  return deleteVehicle;
};

export default useVehicleDeleteMutation;
