"use client";

import { EasyRequester } from "easy-requester";

import { config } from "../appConfig";

const requester: EasyRequester = new EasyRequester({
  onNewRequest: "enqueue-new",
  isDebugMode: false,
  tokenRotationUrl: {
    baseURL: config.AUTH.BASE_URL,
    port: Number(config.AUTH.PORT),
    endpoint: {
      prefix: config.AUTH.API_PREFIX,
      controller: "auth",
      action: "rotateToken",
    },
  },
});

export default requester;
