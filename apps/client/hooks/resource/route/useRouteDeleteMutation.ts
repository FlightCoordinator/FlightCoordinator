import { useMutation, useQueryClient } from "@tanstack/react-query";

import ResourceTypes from "@/types/resource";

import useAccessToken from "../../useAccessToken";
import Requester from "@/utils/requester";

const useRouteDeleteMutation = () => {
  const queryClient = useQueryClient();
  const accessToken = useAccessToken();
  const deleteRoute = useMutation({
    mutationKey: ["deleteRouteMutation"],
    mutationFn: async (routeDeleteData: ResourceTypes.Route.Mutations.DeleteMutationParams) => {
      const response = await new Requester()
        .setConfig({
          method: "DELETE",
          endpoint: { controller: "route", action: "delete" },
          payload: routeDeleteData,
          accessToken: accessToken,
        })
        .sendRequest();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["routeQuery"] }),
  });
  return deleteRoute;
};

export default useRouteDeleteMutation;
