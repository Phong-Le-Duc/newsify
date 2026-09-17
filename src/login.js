import './style/style.scss';
import Button from './components/button/button';
import { initTheme } from './theme';
import { signIn, signUp, getCurrentUser } from './auth';

initTheme();

// Already logged in? Skip straight to the app.
if (getCurrentUser()) {
  window.location.href = './index.html';
}

const signInButton = Button("Sign in", "button--green");
signInButton.type = "submit";


document.querySelector('#app').innerHTML = `
<img class="login-image" src="/img/newsify_logo.svg" alt="">
<h1 class="login-newsify">Newsify</h1>
<p class="login-welcome-text">Welcome! Let’s dive into your account!</p>

<form id="login-form" class="login-form">
  <label class="dialog-field">
    <span>Username</span>
    <input type="text" id="login-username" placeholder="Username..." autocomplete="username">
  </label>

  <label class="dialog-field">
    <span>Password</span>
    <input type="password" id="login-password" placeholder="Password..." autocomplete="current-password">
  </label>

  <p class="form-error" id="login-error" hidden></p>

  ${signInButton.outerHTML}
</form>

<p class="no-account">Don’t have an account? <button id="sign-up" type="button">Sign up</button> </p>

<dialog id="dialog">
 <div class="dialog-content">
    <button id="close" class="dialog-close" type="button" aria-label="Close">&times;</button>
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

    <p class="form-error" id="signup-error" hidden></p>

    <button id="submit" type="button" class="button button--green">Create account</button>
 </div>
</dialog>
`;

const loginForm = document.querySelector('#login-form');
const loginError = document.querySelector('#login-error');

function showError(element, message) {
  element.textContent = message;
  element.hidden = false;
}

function hideError(element) {
  element.hidden = true;
}

loginForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  hideError(loginError);

  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (!username || !password) {
    showError(loginError, 'Please fill in both fields.');
    return;
  }

  try {
    await signIn(username, password);
    window.location.href = './index.html';
  } catch (error) {
    showError(loginError, error.message);
  }
});

const signUpButton = document.querySelector('#sign-up');
const dialog = document.querySelector('#dialog');
const closeButton = document.querySelector('#close');
const signupError = document.querySelector('#signup-error');

// Open the dialog when the "Sign up" button is clicked
signUpButton.addEventListener('click', function () {
  hideError(signupError);
  dialog.showModal(); // Open dialog
});

// Close the dialog when the close button is clicked
closeButton.addEventListener('click', function () {
  dialog.close(); // Close dialog
});

const submitButton = document.querySelector('#submit');

// Create the account and continue when the submit button is clicked
submitButton.addEventListener('click', async function () {
  hideError(signupError);

  const username = document.getElementById('signup-username').value.trim();
  const password = document.getElementById('signup-password').value.trim();

  if (!username || !password) {
    showError(signupError, 'Please fill in both fields.');
    return;
  }

  try {
    await signUp(username, password);
    dialog.close();
    window.location.href = './index.html';
  } catch (error) {
    showError(signupError, error.message);
  }
});

