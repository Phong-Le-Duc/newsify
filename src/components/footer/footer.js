import './_footer.scss';

export default function Footer() {

    const footerElement = document.createElement("footer")
    footerElement.classList.add("footer")


    footerElement.innerHTML = `
   
   <a href="home.html" class="footer__container">
<img src="src/img/home.svg" alt="">
<p>Home</p>
</a>
<a href="archive.html" class="footer__container">
<img src="src/img/archive.svg" alt="">
<p>Archive</p>
</a>
<a href="popular.html" class="footer__container">
<img src="src/img/popular.svg" alt="">
<p>Popular</p>
</a>
<a href="settings.html" class="footer__container">
<img src="src/img/settings.svg" alt="">
<p>Settings</p>
</a>
`
    return footerElement;
}