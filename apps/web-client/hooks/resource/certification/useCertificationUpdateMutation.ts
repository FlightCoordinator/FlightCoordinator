import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useCertificationUpdateMutation = () => {
  const queryClient = useQueryClient();
  const updateCertification = useMutation({
    mutationKey: ["updateCertificationMutation"],
    mutationFn: async (useCertificationUpdateData: ResourceTypes.Certification.Mutations.UpdateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "certification",
              action: "update",
            },
          },
          method: "PATCH",
          auth: { includeCookies: true },
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
