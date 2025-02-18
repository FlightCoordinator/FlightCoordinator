import { useMutation, useQueryClient } from "@tanstack/react-query";

import ResourceTypes from "@/types/resource";

import useAccessToken from "../../useAccessToken";
import Requester from "@/utils/requester";

const useCrewCreateMutation = () => {
  const queryClient = useQueryClient();
  const accessToken = useAccessToken();
  const createCrew = useMutation({
    mutationKey: ["createCrewtMutation"],
    mutationFn: async (crewCreateData: ResourceTypes.Crew.Mutations.CreateMutationParams) => {
      const response = await new Requester()
        .setConfig({
          method: "POST",
          endpoint: { controller: "crew", action: "create" },
          payload: crewCreateData,
          accessToken: accessToken,
        })
        .sendRequest();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["crewQuery"] }),
  });
  return createCrew;
};

export default useCrewCreateMutation;
