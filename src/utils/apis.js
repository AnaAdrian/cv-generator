import countries from '../assests/countries.json';

export function getCountries(search) {
    if (!search) return [];

    return countries
        .filter((country) => country.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            const aIndex = a.name.toLowerCase().indexOf(search.toLowerCase());
            const bIndex = b.name.toLowerCase().indexOf(search.toLowerCase());
            // Prioritize matches at the beginning of the string
            return aIndex - bIndex || a.name.localeCompare(b.name);
        })
        .slice(0, 5);
}

export async function getCities(country) {
    try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/cities");
        const data = await response.json();
        const cities = data.data.map((country) => country.cities).flat();
    }
    catch (error) {
        console.error("Error fetching cities:", error);
    }
}

export async function getJobTitles(search) {
    return await fetch("https://api.jobinja.ir/v4/job_titles")
        .then((res) => res.json())
        .then((data) => data.items.map((job) => job.title));
}
