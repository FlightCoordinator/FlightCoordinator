// import { useQuery } from "@tanstack/react-query";

// import ResourceTypes from "@/types/resource";

// import useAccessToken from "../../auth/useValidateAuth";
// import Requester from "@/utils/requester";

// const useAlgorithmRunAllQuery = () => {
//   const accessToken = useAccessToken();
//   const algorithmRuns = useQuery({
//     queryKey: ["algorithmRunQuery"],
//     queryFn: async () => {
//       const response = await new Requester()
//         .setConfig({
//           method: "POST",
//           endpoint: { controller: "algorithm/run", action: "getAll" },
//           accessToken: accessToken,
//         })
//         .sendRequest<ResourceTypes.AlgorithmRun.Queries.QueryResponseParams>();
//       return response;
//     },
//   });
//   return algorithmRuns;
// };

// export default useAlgorithmRunAllQuery;
