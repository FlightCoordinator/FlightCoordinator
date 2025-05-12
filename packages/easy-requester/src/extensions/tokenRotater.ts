import type { RequestConfig } from "../types/globals";

import RequestQueuer from "../core/handlers/requestQueuer";
import Generator from "../utils/generator";

class TokenRotater {
  private targetUrl: RequestConfig["url"];
  private requestQueuer: RequestQueuer;

  constructor(tokenRotationUrl: RequestConfig["url"], requestQueuer: RequestQueuer) {
    this.targetUrl = tokenRotationUrl;
    this.requestQueuer = requestQueuer;
  }

  public async tryGetNewRefreshToken(): Promise<boolean> {
    const generatedURL: string = Generator.generateURL(this.targetUrl);

    const requestFn = async () => {
      try {
        const requestConfig: RequestInit = {
          method: "POST",
          credentials: "include",
          headers: { contentType: "application/json" },
        };
        const response = await fetch(generatedURL, requestConfig);
        return response.status === 200 ? true : false;
      } catch (error) {
        return false;
      }
    };
    return this.requestQueuer.enqueueRequest(requestFn);
  }
}

export default TokenRotater;
