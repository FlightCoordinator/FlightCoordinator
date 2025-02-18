import { useQuery } from "@tanstack/react-query";

import ResourceTypes from "@/types/resource";

import useAccessToken from "../../useAccessToken";
import Requester from "@/utils/requester";

const useCrewAllQuery = () => {
  const accessToken = useAccessToken();
  const crews = useQuery({
    queryKey: ["crewQuery"],
    queryFn: async () => {
      const response = await new Requester()
        .setConfig({
          method: "POST",
          endpoint: { controller: "crew", action: "getAll" },
          accessToken: accessToken,
        })
        .sendRequest<ResourceTypes.Crew.Queries.QueryResponseParams>();
      return response;
    },
  });
  return crews;
};

export default useCrewAllQuery;
