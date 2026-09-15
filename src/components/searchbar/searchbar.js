import './_searchbar.scss';

export default function Searchbar() {

    const searchbarElement = document.createElement('div');
    searchbarElement.classList.add("searchbar")

    searchbarElement.innerHTML = `
        <label for="search"></label>
        <input type="text" placeholder="Search news" id="search"/>
    `;
    return searchbarElement;
}