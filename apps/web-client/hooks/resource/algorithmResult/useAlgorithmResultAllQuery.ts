// import { useQuery } from "@tanstack/react-query";

// import ResourceTypes from "@/types/resource";
// import requester from "@/shared/lib/requester";

// const useAlgorithmResultAllQuery = () => {
//   const algorithmResults = useQuery({
//     queryKey: ["algorithmResultQuery"],
//     queryFn: async () => {
//       const response = await requester
//         .setRequestConfig({
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
