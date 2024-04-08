import { useQuery } from "@tanstack/react-query";
import { getResume } from "../../services/apiResume";

export function useGetResume(resumeId) {
    return useQuery({
        queryKey: ["resume", resumeId],
        queryFn: () => getResume(resumeId),
        meta: {
            errorMessage: "Failed to fetch resume",
        },
    });
}
