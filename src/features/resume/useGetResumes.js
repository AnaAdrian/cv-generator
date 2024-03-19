import { useQuery } from "@tanstack/react-query";
import { getAllResumes } from "../../services/apiResume";

export function useGetResumes() {
  return useQuery({
    queryKey: ["resumes"],
    queryFn: getAllResumes,
    meta: {
      errorMessage: "Failed to fetch resumes",
    },
  });
}
