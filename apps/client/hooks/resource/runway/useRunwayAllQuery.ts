import { useQuery } from "@tanstack/react-query";

import ResourceTypes from "@/types/resource";

import useAccessToken from "../../useAccessToken";
import Requester from "@/utils/requester";

const useRunwayAllQuery = () => {
  const accessToken = useAccessToken();
  const runways = useQuery({
    queryKey: ["runwayQuery"],
    queryFn: async () => {
      const response = await new Requester()
        .setConfig({
          method: "POST",
          endpoint: { controller: "runway", action: "getAll" },
          accessToken: accessToken,
        })
        .sendRequest<ResourceTypes.Runway.Queries.QueryResponseParams>();
      return response;
    },
  });
  return runways;
};

export default useRunwayAllQuery;
