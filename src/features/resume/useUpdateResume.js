import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateResume } from "../../services/apiResume";

import { showToast } from "../../ui/Toast";

export function useUpdateResume() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (obj) => updateResume(obj.tableName, obj.id, obj.updates),
        onMutate: async (obj) => {
            const { id, updates } = obj;
            await queryClient.cancelQueries(['resumes']);
            const previousResumes = queryClient.getQueryData(['resumes']);
            const resume = previousResumes.find(resume => resume.id === id);
            const newResume = { ...resume, ...updates };
            queryClient.setQueryData(['resumes'], old => {
                return old.map(resume => {
                    if (resume.id === id) {
                        return newResume;
                    }
                    return resume;
                });
            });
            return { previousResumes };
        },
        onError: (error, _, context) => {
            queryClient.setQueryData(['resumes'], context.previousResumes);
            showToast("Something went wrong", "error");
            console.error(error);
        }
    });
}


