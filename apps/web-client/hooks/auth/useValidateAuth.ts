"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import AuthTypes from "@/types/auth";
import GlobalTypes from "@/types/globals";

const useValidateAuth = () => {
  const queryClient = useQueryClient();
  const auth = useMutation({
    mutationKey: ["validateAuth"],
    mutationFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.AUTH.BASE_URL,
            port: Number(config.AUTH.PORT),
            endpoint: {
              prefix: config.AUTH.API_PREFIX,
              controller: "auth",
              action: "validate",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<AuthTypes.Protected.AuthValidationProps>, null>();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["validateAuth"] }),
  });
  return auth;
};

export default useValidateAuth;
