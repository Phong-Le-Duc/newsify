import './_article.scss';

export default function Article(imgUrl, headline, text, articleUrl, isArchive = false) {
    const articleElement = document.createElement("article");
    articleElement.classList.add("article");

    if (articleUrl) {
        articleElement.classList.add("article--clickable");
    }

    articleElement.innerHTML = `
        <img class="article__image" src="${imgUrl}" alt="">
        <div class="article__textcontainer">
            <h3 class="article__textcontainer__headline">${headline}</h3>
            <p class="article__textcontainer__text">${text}</p>
            <button class="${isArchive ? 'delete-button' : 'save-button'}">
                ${isArchive ? 'Delete' : 'Save'}
            </button>
        </div>
    `;

    const button = articleElement.querySelector('button');

    // Tapping the article (anywhere except the save/delete button) opens the full story.
    if (articleUrl) {
        articleElement.addEventListener('click', function () {
            window.open(articleUrl, '_blank', 'noopener,noreferrer');
        });
    }

    if (isArchive) {
        button.addEventListener('click', function (event) {
            event.stopPropagation();
            let saved = JSON.parse(localStorage.getItem('savedArticles')) || [];
            saved = saved.filter(a => a.title !== headline); // remove by title
            localStorage.setItem('savedArticles', JSON.stringify(saved));
            articleElement.remove(); // remove from DOM
        });
    } else {
        button.addEventListener('click', function (event) {
            event.stopPropagation();
            const articleData = {
                image: imgUrl,
                title: headline,
                summary: text,
                url: articleUrl
            };

            const saved = JSON.parse(localStorage.getItem('savedArticles')) || [];
            const isDuplicate = saved.some(savedItem => savedItem.title === articleData.title);

            if (!isDuplicate) {
                saved.push(articleData);
                localStorage.setItem('savedArticles', JSON.stringify(saved));
                alert('Article saved');
            } else {
                alert('Article already saved');
            }
        });
    }

    return articleElement;
}