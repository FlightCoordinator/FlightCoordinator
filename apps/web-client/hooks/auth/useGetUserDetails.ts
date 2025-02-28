"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";

const useGetUserDetails = () => {
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

export default useGetUserDetails;
