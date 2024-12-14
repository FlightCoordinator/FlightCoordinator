import AirportTypes from "@/types/controllers/airport";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Requester from "@/utils/requester";

const useAirportCreateMutation = () => {
  const queryClient = useQueryClient();

  const createAirport = useMutation({
    mutationKey: ["createAirportMutation"],
    mutationFn: async (airportCreateData: AirportTypes.Mutations.CreateMutationParams) => {
      const { accessToken, ...requestData } = airportCreateData;
      const response = await new Requester({
        method: "POST",
        endpoint: { controller: "airport", action: "create" },
        accessToken: accessToken,
        payload: requestData,
      }).sendRequest();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["airportQuery"] }),
  });
  return createAirport;
};

export default useAirportCreateMutation;