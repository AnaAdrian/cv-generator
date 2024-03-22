import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteResume } from '../../services/apiResume';
import { showToast } from '../../ui/Toast';

export function useDeleteResume() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteResume,
        onMutate: async (resumeId) => {
            await queryClient.cancelQueries(['resumes']);

            const previousResumes = queryClient.getQueryData(['resumes']);

            queryClient.setQueryData(['resumes'], (oldResumes) =>
                oldResumes?.filter((resume) => resume.id !== resumeId)
            );

            return { previousResumes };
        },
        onError: (context) => {
            queryClient.setQueryData(['resumes'], context.previousResumes);
            showToast("Something went wrong", "error");
        },
        onSettled: () => {
            queryClient.invalidateQueries(['resumes']);
        },
    });
}
