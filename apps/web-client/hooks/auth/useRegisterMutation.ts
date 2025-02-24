"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import AuthTypes from "@/types/auth";
import GlobalTypes from "@/types/globals";

const useRegisterMutation = () => {
  const queryClient = useQueryClient();
  const register = useMutation({
    mutationKey: ["registerMutation"],
    mutationFn: async (registerData: AuthTypes.Public.RegisterProps) => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.AUTH.BASE_URL,
            port: Number(config.AUTH.PORT),
            endpoint: {
              prefix: config.AUTH.API_PREFIX,
              controller: "auth",
              action: "register",
            },
          },
          method: "POST",
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, AuthTypes.Public.RegisterProps>(registerData);
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["registerMutation"] }),
  });
  return register;
};

export default useRegisterMutation;
