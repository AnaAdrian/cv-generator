import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateResume } from "../../services/apiResume";

import { showToast } from "../../ui/Toast";

export function useUpdateResume() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (obj) => updateResume(obj.tableName, obj.id, obj.updates),
        onMutate: async (obj) => {
            const previousResume = queryClient.getQueryData(["resume", `${obj.id}`]);
            const previousResumes = queryClient.getQueryData(["resumes"]);

            if (previousResume) {
                queryClient.setQueryData(["resume", `${obj.id}`], (oldResume) => {
                    return { ...oldResume, ...obj.updates };
                });
            }

            if (previousResumes) {
                queryClient.setQueryData(["resumes"], (oldResumes) => {
                    return oldResumes.map((resume) => {
                        if (resume.id === Number(obj.id)) {
                            return { ...resume, ...obj.updates };
                        }
                        return resume;
                    });
                });
            }
            return { previousResume, previousResumes };
        },
        onError: (error, _, context) => {
            if (context.previousResume) {
                queryClient.setQueryData(["resume", `${context.previousResume.id}`], context.previousResume);
            }

            if (context.previousResumes) {
                queryClient.setQueryData(["resumes"], context.previousResumes);
            }
            showToast("Something went wrong", "error");
            console.error(error);

        }
    });
}


