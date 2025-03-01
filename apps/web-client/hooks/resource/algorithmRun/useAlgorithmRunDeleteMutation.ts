// import { useMutation, useQueryClient } from "@tanstack/react-query";

// import ResourceTypes from "@/types/resource";

// import useAccessToken from "../../auth/useValidateAuth";
// import Requester from "@/utils/requester";

// const useAlgorithmRunDeleteMutation = () => {
//   const queryClient = useQueryClient();
//   const accessToken = useAccessToken();
//   const deleteAlgorithmRun = useMutation({
//     mutationKey: ["deleteAlgorithmRunMutation"],
//     mutationFn: async (algorithmRunDeleteData: ResourceTypes.AlgorithmRun.Mutations.DeleteMutationParams) => {
//       const response = await new Requester()
//         .setConfig({
//           method: "DELETE",
//           endpoint: { controller: "algorithm/run", action: "delete" },
//           payload: algorithmRunDeleteData,
//           accessToken: accessToken,
//         })
//         .sendRequest();
//       return response;
//     },
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["algorithmRunQuery"] }),
//   });
//   return deleteAlgorithmRun;
// };

// export default useAlgorithmRunDeleteMutation;
