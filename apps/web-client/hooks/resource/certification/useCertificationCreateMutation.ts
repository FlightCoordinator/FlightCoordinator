import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useCertificationCreateMutation = () => {
  const queryClient = useQueryClient();
  const createCertification = useMutation({
    mutationKey: ["createCertificationMutation"],
    mutationFn: async (certificationCreateData: ResourceTypes.Certification.Mutations.CreateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "certification",
              action: "create",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<
          GlobalTypes.ServerResponseParams<null>,
          ResourceTypes.Certification.Mutations.CreateMutationParams
        >(certificationCreateData);
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["certificationQuery"] }),
  });
  return createCertification;
};

export default useCertificationCreateMutation;
