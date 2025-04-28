import './_article.scss';

export default function Article(img, headline, text) {

    const articleElement = document.createElement("article")
    articleElement.classList.add("article")


   articleElement.innerHTML = `

<img class="article__image "src="${img}" alt="">
<div class="article__textcontainer">
<h3 class="article__textcontainer__headline">${headline}</h3>
<p class="article__textcontainer__text">${text}</p>
</div>
`
    return articleElement;
}