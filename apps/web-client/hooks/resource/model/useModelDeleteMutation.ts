import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useModelDeleteMutation = () => {
  const queryClient = useQueryClient();
  const deleteModel = useMutation({
    mutationKey: ["deleteModelMutation"],
    mutationFn: async (modelDeleteData: ResourceTypes.Model.Mutations.DeleteMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "model",
              action: "delete",
            },
          },
          method: "DELETE",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, ResourceTypes.Model.Mutations.DeleteMutationParams>(
          modelDeleteData,
        );
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["modelQuery"] }),
  });
  return deleteModel;
};

export default useModelDeleteMutation;
