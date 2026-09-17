import './_news.scss';

// for the settings page to get all categories...
export function getUniqueCategories(allArticles) {
    const allCategories = allArticles.map(article => article.section);
    return [...new Set(allCategories)]; // Return unique categories
}

export default function News(categoryName, articleElements) {
    const newsElement = document.createElement("section")
    newsElement.classList.add("category")


    newsElement.innerHTML = `
<details class="category__detail">
  <summary> <img class="category-icon" src="/img/newsify_logo.svg" alt=""><span class="category-name">${categoryName}</span><img class="arrow" src="/img/arrow.svg" alt=""></summary>
    <div class="category__detail-content"></div>
</details>
`;

    newsElement.querySelector('.category__detail-content').append(...articleElements)
    return newsElement;
}





