import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAccessToken from "@/hooks/useAccessToken";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";
import ResourceTypes from "@/types/resource";

const useCertificationCreateMutation = () => {
  const queryClient = useQueryClient();
  const accessToken = useAccessToken();
  const createCertification = useMutation({
    mutationKey: ["createCertificationMutation"],
    mutationFn: async (certificationCreateData: ResourceTypes.Certification.Mutations.CreateMutationParams) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.SERVER.BASE_URL,
            port: Number(config.SERVER.PORT),
            endpoint: {
              prefix: config.SERVER.API_PREFIX,
              controller: "certification",
              action: "create",
            },
          },
          method: "POST",
          auth: { accessToken: accessToken },
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
