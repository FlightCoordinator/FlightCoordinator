import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAccessToken from "@/hooks/useAccessToken";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useVehicleCreateMutation = () => {
  const queryClient = useQueryClient();
  const accessToken = useAccessToken();
  const createVehicle = useMutation({
    mutationKey: ["createVehicleMutation"],
    mutationFn: async (vehicleCreateData: ResourceTypes.Vehicle.Mutations.CreateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.SERVER.BASE_URL,
            port: Number(config.SERVER.PORT),
            endpoint: {
              prefix: config.SERVER.API_PREFIX,
              controller: "vehicle",
              action: "create",
            },
          },
          method: "POST",
          auth: { accessToken: accessToken },
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
