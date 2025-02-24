import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import ResourceTypes from "@/types/resource";

const useCertificationDeleteMutation = () => {
  const queryClient = useQueryClient();
  const deleteCertification = useMutation({
    mutationKey: ["deleteCertificationMutation"],
    mutationFn: async (certificationDeleteData: ResourceTypes.Certification.Mutations.DeleteMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "certification",
              action: "delete",
            },
          },
          method: "DELETE",
          auth: { includeCookies: true },
        })
        .sendRequest(certificationDeleteData);
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["certificationQuery"] }),
  });
  return deleteCertification;
};

export default useCertificationDeleteMutation;
