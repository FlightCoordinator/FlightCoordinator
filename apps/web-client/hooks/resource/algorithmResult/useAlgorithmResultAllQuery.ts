// import { useQuery } from "@tanstack/react-query";

// import ResourceTypes from "@/types/resource";

// import useAccessToken from "../../auth/useValidateAuth";
// import Requester from "@/utils/requester";

// const useAlgorithmResultAllQuery = () => {
//   const accessToken = useAccessToken();
//   const algorithmResults = useQuery({
//     queryKey: ["algorithmResultQuery"],
//     queryFn: async () => {
//       const response = await new Requester()
//         .setConfig({
//           method: "POST",
//           endpoint: { controller: "algorithm/result", action: "getAll" },
//           accessToken: accessToken,
//         })
//         .sendRequest<ResourceTypes.AlgortihmResult.Queries.QueryResponseParams>();
//       return response;
//     },
//   });
//   return algorithmResults;
// };

// export default useAlgorithmResultAllQuery;
