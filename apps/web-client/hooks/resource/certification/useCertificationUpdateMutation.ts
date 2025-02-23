import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAccessToken from "@/hooks/useAccessToken";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useCertificationUpdateMutation = () => {
  const queryClient = useQueryClient();
  const accessToken = useAccessToken();
  const updateCertification = useMutation({
    mutationKey: ["updateCertificationMutation"],
    mutationFn: async (useCertificationUpdateData: ResourceTypes.Certification.Mutations.UpdateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.SERVER.BASE_URL,
            port: Number(config.SERVER.PORT),
            endpoint: {
              prefix: config.SERVER.API_PREFIX,
              controller: "certification",
              action: "update",
            },
          },
          method: "PATCH",
          auth: { accessToken: accessToken },
        })
        .sendRequest<
          GlobalTypes.ServerResponseParams<null>,
          ResourceTypes.Certification.Mutations.UpdateMutationParams
        >(useCertificationUpdateData);
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["certificationQuery"] }),
  });
  return updateCertification;
};

export default useCertificationUpdateMutation;
