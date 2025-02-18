import { useMutation, useQueryClient } from "@tanstack/react-query";

import ResourceTypes from "@/types/resource";

import useAccessToken from "../../useAccessToken";
import Requester from "@/utils/requester";

const useAlgorithmResultDeleteMutation = () => {
  const queryClient = useQueryClient();
  const accessToken = useAccessToken();
  const deleteAlgorithmResult = useMutation({
    mutationKey: ["deleteAlgorithmResultMutation"],
    mutationFn: async (algorithmResultDeleteData: ResourceTypes.AlgorithmResult.Mutations.DeleteMutationParams) => {
      const response = await new Requester()
        .setConfig({
          method: "DELETE",
          endpoint: { controller: "algorithm/result", action: "delete" },
          payload: algorithmResultDeleteData,
          accessToken: accessToken,
        })
        .sendRequest();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["algorithmResultQuery"] }),
  });
  return deleteAlgorithmResult;
};

export default useAlgorithmResultDeleteMutation;
