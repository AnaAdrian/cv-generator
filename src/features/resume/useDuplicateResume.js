import { useQueryClient, useMutation } from "@tanstack/react-query";

import { duplicateResume } from "../../services/apiResume";
import { showToast } from "../../ui/Toast";

export function useDuplicateResume() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: duplicateResume,

        // Before the mutation, predict and apply the changes optimistically
        onMutate: async (resumeId) => {
            // Cancel any outgoing refetches to not overwrite our optimistic update
            await queryClient.cancelQueries(['resumes']);

            // Snapshot the previous value
            const previousResumes = queryClient.getQueryData(['resumes']);

            //Find the resume object by id
            const resume = previousResumes.find(resume => resume.id === resumeId);
            const newResume = { ...resume };
            newResume.title = `Copy of ${resume.title}`;
            newResume.updated_at = new Date().toISOString();

            // ID is set to -1 temporary to indicate that this is a new resume
            newResume.id = -1;

            // Optimistically update to the new value
            queryClient.setQueryData(['resumes'], old => {
                const resumes = [...old, newResume];
                return resumes.sort((a, b) => {
                    // Convert 'updated_at' to Date objects for comparison
                    const dateA = new Date(a.updated_at);
                    const dateB = new Date(b.updated_at);

                    // Sort in descending order (newest first)
                    return dateB - dateA;
                });
            });

            // Return a context object with the snapshotted value
            return { previousResumes };
        },

        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (error, _, context) => {
            queryClient.setQueryData(['resumes'], context.previousResumes);
            showToast("Something went wrong", "error");
            console.error(error);
        },

        // After the mutation, manually update the cache to the new value
        // Saves a network request
        onSettled: (data) => {
            queryClient.setQueryData(['resumes'], old => {
                return old.map(resume => {
                    if (resume.id === -1) {
                        return data[0];
                    }
                    return resume;
                });
            });
        },
    });
}
