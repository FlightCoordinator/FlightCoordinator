"use client";

import { useMutation } from "@tanstack/react-query";

import useAccessToken from "@/hooks/useAccessToken";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";

const useLoadSampleDataMutation = () => {
  const accessToken = useAccessToken();
  const loadSampleDate = useMutation({
    mutationKey: ["loadSampleDataMutation"],
    mutationFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.SERVER.BASE_URL,
            port: Number(config.SERVER.PORT),
            endpoint: {
              prefix: config.SERVER.API_PREFIX,
              controller: "devTools",
              action: "createSampleData",
            },
          },
          method: "POST",
          auth: { accessToken: accessToken },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, null>();
      return response;
    },
  });
  return loadSampleDate;
};

export default useLoadSampleDataMutation;
