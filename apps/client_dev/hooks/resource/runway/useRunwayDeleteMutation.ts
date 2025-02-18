import { useMutation, useQueryClient } from "@tanstack/react-query";

import ResourceTypes from "@/types/resource";

import useAccessToken from "../../useAccessToken";
import Requester from "@/utils/requester";

const useRunwayDeleteMutation = () => {
  const queryClient = useQueryClient();
  const accessToken = useAccessToken();
  const deleteRunway = useMutation({
    mutationKey: ["deleteRunwayMutation"],
    mutationFn: async (runwayDeleteData: ResourceTypes.Runway.Mutations.DeleteMutationParams) => {
      const response = await new Requester()
        .setConfig({
          method: "DELETE",
          endpoint: { controller: "runway", action: "delete" },
          payload: runwayDeleteData,
          accessToken: accessToken,
        })
        .sendRequest();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["runwayQuery"] }),
  });
  return deleteRunway;
};

export default useRunwayDeleteMutation;
