
export default async function fetchArticles(api_url) {
const url = api_url;


const response = await fetch(url);
const articles = await response.json();

return articles.results;

}