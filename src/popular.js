import './style/style.scss';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import News from './components/news/news';
import Article from './components/article/article';
import fetchArticles, { NYT_API_KEY } from './newyorkapi/newyorkfetch';
import { initTheme } from './theme';

initTheme();

// Fetch popular articles
let allArticles = await fetchArticles(`https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=${NYT_API_KEY}`)
console.log(allArticles);

// Extract categories
const allCategories = allArticles.map(article => article.section)
const uniqueCategories = [...new Set(allCategories)];
console.log(uniqueCategories);

// Setup HTML structure without the Searchbar
document.querySelector('#app').innerHTML = `
  ${Header().outerHTML}
  <section class="grid" id="news-section"></section>
  ${Footer().outerHTML}
`;

const newsContainer = document.querySelector('#news-section');

// Loop through unique categories to create category elements (without toggle buttons)
const categoryElements = uniqueCategories.map(function (categoryName) {
    // Filter articles by category
    const articlesInCategory = allArticles.filter(article => categoryName === article.section)
    console.log(articlesInCategory);

    // Generate article elements for the category
    const articleElements = articlesInCategory.map(function (relevantArticle) {
        if (relevantArticle.media[0] === undefined) {
            return;
        }
        let imgSrc = relevantArticle.media[0]["media-metadata"][0].url;
        return Article(imgSrc, relevantArticle.title, relevantArticle.abstract, relevantArticle.url);
    });

    // Create a container for the category (no toggle button here)
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    // Append articles for this category
    const categoryArticles = News(categoryName, articleElements);
    categoryContainer.appendChild(categoryArticles);

    return categoryContainer;
});

// Append all category elements to the news container
newsContainer.append(...categoryElements);