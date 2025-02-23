"use client";

import { EasyRequester } from "easy-requester";

const requester: EasyRequester = new EasyRequester({
  onNewRequest: "enqueue-new",
  isDebugMode: false,
});

export default requester;
