import { useMutation, useQueryClient } from "@tanstack/react-query";

import ResourceTypes from "@/types/resource";

import useAccessToken from "../../useAccessToken";
import Requester from "@/utils/requester";

const useRunwayUpdateMutation = () => {
  const queryClient = useQueryClient();
  const accessToken = useAccessToken();
  const updateRunway = useMutation({
    mutationKey: ["updateRunwayMutation"],
    mutationFn: async (useRunwayUpdateData: ResourceTypes.Runway.Mutations.UpdateMutationParams) => {
      const { runwayId, ...requestData } = useRunwayUpdateData;
      const response = await new Requester()
        .setConfig({
          method: "PATCH",
          endpoint: { controller: "runway", action: "update" },
          payload: { runwayId: runwayId, ...requestData },
          accessToken: accessToken,
        })
        .sendRequest();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["runwayQuery"] }),
  });
  return updateRunway;
};

export default useRunwayUpdateMutation;
