import './_footer.scss';

export default function Footer() {

    const footerElement = document.createElement("footer")
    footerElement.classList.add("footer")

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    const links = [
        { href: 'index.html', icon: 'home', label: 'Home' },
        { href: 'archive.html', icon: 'archive', label: 'Archive' },
        { href: 'popular.html', icon: 'popular', label: 'Popular' },
        { href: 'settings.html', icon: 'settings', label: 'Settings' },
    ];

    footerElement.innerHTML = links.map(function (link) {
        const isActive = currentPage === link.href;
        const iconSrc = `/img/${link.icon}${isActive ? '_visited' : ''}.svg`;

        return `
<a href="${link.href}" class="footer__container${isActive ? ' footer__container--active' : ''}">
<img src="${iconSrc}" alt="">
<p>${link.label}</p>
</a>`;
    }).join('');

    return footerElement;
}