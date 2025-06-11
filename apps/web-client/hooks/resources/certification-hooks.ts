import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { requester } from "@/shared/lib/requester";

import { config } from "@/shared/app-config";

import type { GlobalTypes } from "@/types/globals";
import type { ResourceTypes } from "@/types/resource";

const useCertificationsQuery = () => {
  const certifications = useQuery({
    queryKey: ["certificationQuery"],
    queryFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "certification",
              action: "getAll",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<ResourceTypes.Certification.Queries.QueryResponseParams>, null>();
      return response;
    },
  });
  return certifications;
};

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

export {
  useCertificationsQuery,
  useCertificationCreateMutation,
  useCertificationUpdateMutation,
  useCertificationDeleteMutation,
};
