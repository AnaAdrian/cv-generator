import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { createBlankResume } from "../../services/apiResume";
import { useAuth } from "../auth/AuthContext";
import { showToast } from "../../ui/Toast";

export function useCreateResume() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => createBlankResume(user.id),
        onSuccess: (resumeId) => {
            queryClient.refetchQueries(["resumes"], { active: true, exact: true });
            navigate(`/app/resumes/${resumeId}/edit`);

        },
        onError: (error) => {
            console.error(error);
            showToast("Something went wrong", "error");
        }
    });
}