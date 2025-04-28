import './style/style.scss';
import Header from './components/header/header';
import Searchbar from './components/searchbar/searchbar';
import Footer from './components/footer/footer';
import News from './components/news/news';
import Article from './components/article/article';
import fetchArticles from './newyorkapi/newyorkfetch';

let healthArticles = await fetchArticles(`https://api.nytimes.com/svc/topstories/v2/health.json?api-key=LAGBQJTdzIx7FqnBMl0KWINanq0u9AeG`)
console.log(healthArticles);

let healthArticlesHTML = healthArticles.map(article => {
    return Article(article.multimedia[0].url, article.title, article.abstract)
})


document.querySelector('#app').innerHTML = `

${Header().outerHTML}
${Searchbar().outerHTML}

<section class="grid">

${News("Health", healthArticlesHTML).outerHTML}

    ${News("Sport", [
    Article("https://cataas.com/cat", "rejse", "sport"),
    Article("https://cataas.com/cat?2", "Kage", "mmmmmh"),
]).outerHTML}

</section>

${Footer().outerHTML}


`

// fetchArticles( `https://api.nytimes.com/svc/topstories/v2/business.json?api-key=LAGBQJTdzIx7FqnBMl0KWINanq0u9AeG`)

// document.querySelector('#app').append(Header())