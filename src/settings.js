import './style/style.scss';
import Header from './components/header/header';
import Searchbar from './components/searchbar/searchbar';
import Footer from './components/footer/footer';


document.querySelector('#app').innerHTML = `
${Header().outerHTML}

${Footer().outerHTML}


`


// document.querySelector('#app').append(Header())