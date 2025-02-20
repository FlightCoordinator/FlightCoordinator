import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAccessToken from "@/hooks/useAccessToken";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import ResourceTypes from "@/types/resource";

const useCertificationDeleteMutation = () => {
  const queryClient = useQueryClient();
  const accessToken = useAccessToken();
  const deleteCertification = useMutation({
    mutationKey: ["deleteCertificationMutation"],
    mutationFn: async (certificationDeleteData: ResourceTypes.Certification.Mutations.DeleteMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.SERVER.BASE_URL,
            port: Number(config.SERVER.PORT),
            endpoint: {
              prefix: config.SERVER.API_PREFIX,
              controller: "certification",
              action: "delete",
            },
          },
          method: "DELETE",
          auth: { accessToken: accessToken },
        })
        .sendRequest(certificationDeleteData);
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["certificationQuery"] }),
  });
  return deleteCertification;
};

export default useCertificationDeleteMutation;
