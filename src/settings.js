import './style/style.scss';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import { getUniqueCategories } from './components/news/news'; // Importer categories
import fetchArticles, { NYT_API_KEY } from './newyorkapi/newyorkfetch';
import { initTheme, getTheme, toggleTheme } from './theme';

initTheme();

let allArticles = await fetchArticles(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${NYT_API_KEY}`);
const categories = getUniqueCategories(allArticles);

// Load user preferences or default to all categories enabled
let enabledCategories = JSON.parse(localStorage.getItem('enabledCategories')) || categories;

// Setting up HTML structure
document.querySelector('#app').innerHTML = `
  ${Header().outerHTML}
  <h1 class="settings-headline">Settings</h1>
  <h3 class="Category-headline">Categories</h3>
  <section class="grid" id="settings-section"></section>
  ${Footer().outerHTML}
`;

// Access the settings section to append elements
const settingsSection = document.querySelector('#settings-section');

// Dark mode button creation
const darkModeButton = document.createElement('button');
darkModeButton.id = 'dark-mode-toggle';
darkModeButton.classList.add('dark-mode-button');
darkModeButton.textContent = getTheme() === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';

darkModeButton.addEventListener('click', () => {
    const newTheme = toggleTheme();
    darkModeButton.textContent = newTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
});

// TOGGLE category 
categories.forEach(category => {
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container'); // Wrapper for each category

    // Logo
    const logo = document.createElement('img');
    logo.src = '/img/newsify_logo.svg'; // Add the path to your logo here
    logo.alt = 'Logo';
    logo.classList.add('category-logo'); // Class for the logo

    // Category name
    const categoryName = document.createElement('span');
    categoryName.textContent = category;
    categoryName.classList.add('category-name'); // Class for the category name

    // Toggle button
    const toggleButton = document.createElement('button');
    toggleButton.setAttribute('aria-label', `Toggle ${category}`);
    toggleButton.classList.add('toggle-button');

    if (enabledCategories.includes(category)) {
        toggleButton.classList.add('enabled');
    }

    toggleButton.addEventListener('click', () => {
        if (enabledCategories.includes(category)) {
            enabledCategories = enabledCategories.filter(c => c !== category);
            toggleButton.classList.remove('enabled');
        } else {
            enabledCategories.push(category);
            toggleButton.classList.add('enabled');
        }

        localStorage.setItem('enabledCategories', JSON.stringify(enabledCategories));
    });

    // Append elements to the category container
    categoryContainer.appendChild(logo);
    categoryContainer.appendChild(categoryName);
    categoryContainer.appendChild(toggleButton);

    // Append the category container to the settings section
    settingsSection.appendChild(categoryContainer);
});

// Append dark mode button at the bottom of settings-section
settingsSection.appendChild(darkModeButton);