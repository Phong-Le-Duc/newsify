//user first visit
if (!localStorage.getItem('hasVisited')) {
    window.location.href = 'onboarding.html';
}
// If not redirected, the rest of your app runs...

import './style/style.scss';
import Header from './components/header/header';
import Searchbar from './components/searchbar/searchbar';
import Footer from './components/footer/footer';
import News from './components/news/news';
import Article from './components/article/article';
import fetchArticles, { NYT_API_KEY } from './newyorkapi/newyorkfetch';
import { initTheme } from './theme';
import { getCurrentUser } from './auth';

if (!getCurrentUser()) {
    window.location.href = 'login.html';
}

initTheme();

try {
    // Ensure the data is being fetched correctly
    let allArticles = await fetchArticles(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${NYT_API_KEY}`);
    console.log('allArticles', allArticles); // Log the fetched articles to check the data

    const allCategories = allArticles.map(article => article.section);
    const uniqueCategories = [...new Set(allCategories)];

    const enabledCategories = JSON.parse(localStorage.getItem('enabledCategories')) || uniqueCategories;
    console.log('enabledCategories', enabledCategories); // Log enabled categories

    document.querySelector('#app').innerHTML = `
    ${Header().outerHTML}
    ${Searchbar().outerHTML}
    <section class="grid" id="news-section"></section>
    ${Footer().outerHTML}
    `;

    const newsContainer = document.querySelector('#news-section');

    // Mapping enabled categories to generate article elements
    const categoryElements = enabledCategories.map(function (categoryName) {
        const articlesInCategory = allArticles.filter(article => categoryName === article.section);
        console.log('articlesInCategory', articlesInCategory); // Log articles by category

        // Safely map articles and check for multimedia
        const articleElements = articlesInCategory.map(function (relevantArticle) {
            if (!relevantArticle.multimedia || relevantArticle.multimedia.length === 0) {
                console.warn('Missing multimedia:', relevantArticle);
                return null; // Skip articles without multimedia
            }

            return Article(
                relevantArticle.multimedia[0].url,
                relevantArticle.title,
                relevantArticle.abstract,
                relevantArticle.url
            );
        }).filter(Boolean); // Remove nulls

        return News(categoryName, articleElements); // Generate and return the News component
    });

    // Append category elements to the news container
    newsContainer.append(...categoryElements);

    // Wire up the searchbar to filter articles/categories by headline text
    const searchInput = document.querySelector('#search');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const query = searchInput.value.trim().toLowerCase();

            newsContainer.querySelectorAll('.category').forEach(function (categorySection) {
                let visibleCount = 0;

                categorySection.querySelectorAll('.article').forEach(function (articleElement) {
                    const headline = articleElement.querySelector('.article__textcontainer__headline');
                    const matches = !query || (headline && headline.textContent.toLowerCase().includes(query));
                    articleElement.style.display = matches ? '' : 'none';
                    if (matches) visibleCount++;
                });

                categorySection.style.display = visibleCount > 0 ? '' : 'none';
            });
        });
    }
} catch (error) {
    console.error('Failed to load Newsify:', error);
    document.querySelector('#app').innerHTML = `
        ${Header().outerHTML}
        <p class="load-error">Sorry, we couldn't load the news right now. Please try again later.</p>
        ${Footer().outerHTML}
    `;
}