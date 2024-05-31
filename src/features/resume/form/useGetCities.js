import { useQuery } from "@tanstack/react-query";
import { getCities } from "../../../services/apiResume";

export function useGetCities(searchTerm, countryCode) {

    return useQuery({
        queryKey: ["cities", searchTerm, countryCode],
        queryFn: ({ queryKey }) => {
            const [, searchTerm, countryCode] = queryKey;
            return getCities(searchTerm, countryCode);
        },
        onError: (error) => {
            console.error("Error fetching cities", error);
        },
        cacheTime: 60 * 1000
    });
}