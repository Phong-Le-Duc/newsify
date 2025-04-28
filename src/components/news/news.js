import './_news.scss';


export default function News(category, articles) {

    const newsElement = document.createElement("section")
    newsElement.classList.add("category")

    newsElement.innerHTML = `
    
  


<details class="category__bar">
<summary> <img src="src/img/newsify_logo.svg" alt="">${category} <img class="arrow" src="src/img/arrow.svg" alt=""></summary>

<div class="category__bar-content">
<!-- article loop code HER! -->
${articles.map(function (article) {
        return article.outerHTML
    }).join("")

        }

</details>
</div>
`
    return newsElement;
}



// ---------article loop code--------

