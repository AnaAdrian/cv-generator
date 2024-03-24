import { useQueryClient, useMutation } from "@tanstack/react-query";

import { copyResume } from "../../services/apiResume";
import { showToast } from "../../ui/Toast";

export function useCopyResume() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: copyResume,

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
            delete newResume.id;

            // Optimistically update to the new value
            // ID is set to -1 temporary to indicate that this is a new resume
            queryClient.setQueryData(['resumes'], old => [...old, { ...newResume, id: -1 }]);

            // Return a context object with the snapshotted value
            return { previousResumes };
        },

        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (err, context) => {
            queryClient.setQueryData(['resumes'], context.previousResumes);
            console.error(err);
            showToast("Something went wrong", "error");
        },

        // After the mutation, manually update the cache to the new value
        // Saves a network request
        onSettled: (data) => {
            queryClient.setQueriesData(['resumes'], old => {
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
