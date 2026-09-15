

// Read from .env (VITE_NYT_API_KEY) instead of hardcoding the key in source.
export const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;

// FETCH SECTIONS
export async function fetchSections() {
    const api_url = `https://api.nytimes.com/svc/topstories/v2/sections.json?api-key=${NYT_API_KEY}`;
    const response = await fetch(api_url);
    const data = await response.json();
    console.log(data);
    const sections = data.results.map(section => section.display_name);

    return sections;
}

// FETCH ARTICLES
export default async function fetchArticles(api_url) {
    const response = await fetch(api_url);
    const articles = await response.json();

    return articles.results;

}