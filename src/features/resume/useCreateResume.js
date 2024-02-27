import { useMutation } from "@tanstack/react-query";
import { createResume } from "../../services/apiResume";

export function useCreateResume() {
    return useMutation({
        mutationFn: createResume,

    });
}