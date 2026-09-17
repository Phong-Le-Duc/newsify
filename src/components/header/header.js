import './_header.scss';
import { getCurrentUser } from '../../auth';

export default function Header() {

    const headerElement = document.createElement("header")
    headerElement.classList.add("header")


    headerElement.innerHTML = `
<img src="/img/newsify_logo.svg" alt="">
<div class="header__text">
<h1>Newsify</h1>
</div>
`

    const username = getCurrentUser();
    if (username) {
        const greeting = document.createElement('p');
        greeting.className = 'header__greeting';
        greeting.textContent = `Hello, ${username}!`;
        headerElement.querySelector('.header__text').appendChild(greeting);
    }

    return headerElement;
}

