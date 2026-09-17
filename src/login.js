import './style/style.scss';
import Button from './components/button/button';
import { initTheme } from './theme';

initTheme();

const passwordButton = Button("Sign in with password", "button--green");
passwordButton.id = "continue-password";


document.querySelector('#app').innerHTML = `
<img class="login-image" src="/img/newsify_logo.svg" alt="">
<h1 class="login-newsify">Newsify</h1>
<p class="login-welcome-text">Welcome! Let’s dive into your account!</p>

${passwordButton.outerHTML}

<p class="no-account">Don’t have an account? <button id="sign-up">Sign up</button> </p>

<dialog id="dialog">
 <div class="dialog-content">
    <button id="close" class="dialog-close" aria-label="Close">&times;</button>
    <h2 class="dialog-title">Create your account</h2>
    <p class="dialog-subtitle">Join Newsify to save articles and personalize your feed.</p>

    <label class="dialog-field">
      <span>Username</span>
      <input type="text" id="signup-username" placeholder="Username...">
    </label>

    <label class="dialog-field">
      <span>Password</span>
      <input type="password" id="signup-password" placeholder="Password...">
    </label>

    <button id="submit" class="button button--green">Create account</button>
 </div>
</dialog>
`;

document.getElementById("continue-password").addEventListener("click", function () {
  alert('No password created!')
  window.location.href = "./index.html";
});

const signUpButton = document.querySelector('#sign-up');
const dialog = document.querySelector('#dialog');
const closeButton = document.querySelector('#close');

// Open the dialog when the "Sign up" button is clicked
signUpButton.addEventListener('click', function () {
  dialog.showModal(); // Open dialog
});

// Close the dialog when the close button is clicked
closeButton.addEventListener('click', function () {
  dialog.close(); // Close dialog
});

const submitButton = document.querySelector('#submit');

// Create the account and continue when the submit button is clicked
submitButton.addEventListener('click', function () {
  const username = document.getElementById('signup-username').value.trim();
  const password = document.getElementById('signup-password').value.trim();

  if (!username || !password) {
    alert('Please fill in both fields.');
    return;
  }

  // Only the username is persisted; never store passwords in localStorage.
  localStorage.setItem('account', JSON.stringify({ username }));
  dialog.close();
  window.location.href = "./index.html";
});

