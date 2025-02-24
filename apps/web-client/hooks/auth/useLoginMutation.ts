"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import AuthTypes from "@/types/auth";
import GlobalTypes from "@/types/globals";

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const login = useMutation({
    mutationKey: ["loginMutation"],
    mutationFn: async (loginData: AuthTypes.Public.LoginProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.AUTH.BASE_URL,
            port: Number(config.AUTH.PORT),
            endpoint: {
              prefix: config.AUTH.API_PREFIX,
              controller: "auth",
              action: "login",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, AuthTypes.Public.LoginProps>(loginData);
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["loginMutation"] }),
  });
  return login;
};

export default useLoginMutation;
