"use client";

import { useMutation } from "@tanstack/react-query";

import { config } from "@/shared/appConfig";
import requester from "@/shared/lib/requester";

import GlobalTypes from "@/types/globals";

const useLoadSampleDataMutation = () => {
  const loadSampleDate = useMutation({
    mutationKey: ["loadSampleDataMutation"],
    mutationFn: async () => {
      const response = await requester
        .setRequestConfig({
          url: {
            baseURL: config.DATA.BASE_URL,
            port: Number(config.DATA.PORT),
            endpoint: {
              prefix: config.DATA.API_PREFIX,
              controller: "devTools",
              action: "createSampleData",
            },
          },
          method: "POST",
          auth: { includeCookies: true },
        })
        .sendRequest<GlobalTypes.ServerResponseParams<null>, null>();
      return response;
    },
  });
  return loadSampleDate;
};

export default useLoadSampleDataMutation;
