"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { requester } from "@/shared/lib/requester";

import { config } from "@/shared/app-config";

import type { GlobalTypes } from "@/types/globals";

const useUserDetailsQuery = () => {
  const queryClient = useQueryClient();
  const userDetails = useMutation({
    mutationKey: ["userDetailsMutation"],
    mutationFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.AUTH.BASE_URL,
            port: Number(config.AUTH.PORT),
            endpoint: {
              prefix: config.AUTH.API_PREFIX,
              controller: "auth",
              action: "getUserDetails",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<GlobalTypes.Auth.Protected.UserDetailsProps>, null>();
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["userDetailsMutation"] }),
  });
  return userDetails;
};

const useRegisterMutation = () => {
  const queryClient = useQueryClient();
  const register = useMutation({
    mutationKey: ["registerMutation"],
    mutationFn: async (registerData: GlobalTypes.Auth.Public.RegisterProps) => {
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
        .sendRequest<GlobalTypes.ServerResponseParams<null>, GlobalTypes.Auth.Public.RegisterProps>(registerData);
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["registerMutation"] }),
  });
  return register;
};

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const login = useMutation({
    mutationKey: ["loginMutation"],
    mutationFn: async (loginData: GlobalTypes.Auth.Public.LoginProps) => {
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
        .sendRequest<GlobalTypes.ServerResponseParams<null>, GlobalTypes.Auth.Public.LoginProps>(loginData);
      return response;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["loginMutation"] }),
  });
  return login;
};

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

export { useUserDetailsQuery, useRegisterMutation, useLoginMutation, useLogoutMutation };
