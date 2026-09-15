import './style/style.scss';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Article from './components/article/article';
import { initTheme } from './theme';

initTheme();

document.querySelector('#app').innerHTML = `
  ${Header().outerHTML}
  <section class="grid" id="news-section"></section>
  ${Footer().outerHTML}
`;

const newsContainer = document.querySelector('#news-section');

const savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || [];

if (savedArticles.length === 0) {
    newsContainer.innerHTML = `<p class="no-saved">No saved articles yet.</p>`;
} else {
    savedArticles.forEach(article => {
        const articleElement = Article(article.image, article.title, article.summary, article.url, true);
        newsContainer.appendChild(articleElement);
    });
}