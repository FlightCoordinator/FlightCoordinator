import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useModelUpdateMutation = () => {
  const queryClient = useQueryClient();
  const updateModel = useMutation({
    mutationKey: ["updateModelMutation"],
    mutationFn: async (useModelUpdateData: ResourceTypes.Model.Mutations.UpdateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "model",
              action: "update",
            },
          },
          method: "PATCH",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Model.Mutations.UpdateMutationParams>(
          useModelUpdateData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["modelQuery"] }),
  });
  return updateModel;
};

export default useModelUpdateMutation;
