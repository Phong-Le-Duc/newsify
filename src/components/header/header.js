import './_header.scss';

export default function Header() {

    const headerElement = document.createElement("header")
    headerElement.classList.add("header")


    headerElement.innerHTML = `
<img src="src/img/newsify_logo.svg" alt="">
<h1>Newsify</h1>
`
    return headerElement;
}

