import { useQuery } from "@tanstack/react-query";
import { getCountries } from "../../../services/apiResume";

export function useGetCountries(searchTerm) {
    return useQuery({
        queryKey: ["countries", searchTerm],
        queryFn: ({ queryKey }) => {
            const [, searchTerm] = queryKey;
            return getCountries(searchTerm);
        },
        onError: (error) => {
            console.error("Error fetching countries", error);
        },
        cacheTime: 60 * 1000
    });
}