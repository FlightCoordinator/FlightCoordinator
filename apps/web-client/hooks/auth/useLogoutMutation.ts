"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";

const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const logout = useMutation({
    mutationKey: ["logoutMutation"],
    mutationFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.AUTH.BASE_URL,
            port: Number(config.AUTH.PORT),
            endpoint: {
              prefix: config.AUTH.API_PREFIX,
              controller: "auth",
              action: "logout",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, null>();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["logoutMutation"] }),
  });
  return logout;
};

export default useLogoutMutation;
