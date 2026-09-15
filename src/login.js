import './style/style.scss';
import Button from './components/button/button';
import { initTheme } from './theme';

initTheme();

const fbButton = Button("Continue with Facebook");
fbButton.id = "continue-fb";

const googleButton = Button("Continue with Google");
googleButton.id = "continue-google";

const passwordButton = Button("Sign in with password", "button--green");
passwordButton.id = "continue-password";


document.querySelector('#app').innerHTML = `
<img class="login-image" src="src/img/newsify_logo.svg" alt="">
<h1 class="login-newsify">Newsify</h1>
<p class="login-welcome-text">Welcome! Let’s dive into your account!</p>


${fbButton.outerHTML}
${googleButton.outerHTML}

<div class="divider"><span>or</span></div>

${passwordButton.outerHTML}


<p class="no-account">Don’t have an account? <button id="sign-up">Sign up</button> </p>

<dialog id="dialog">
 <div class="dialog-content">
    <h2>Create username</h2>
    <input type="text" id="signup-username" placeholder="Username...">
    <h2>Create password</h2>
    <input type="password" id="signup-password" placeholder="Password...">
    <button id="submit">Submit</button>
    <button id="close">Close</button>
 </div>
</dialog>
`;

document.getElementById("continue-fb").addEventListener("click", function () {
  window.location.href = "./index.html";
});

document.getElementById("continue-google").addEventListener("click", function () {
  window.location.href = "./index.html";
});

document.getElementById("continue-password").addEventListener("click", function () {
  alert('No password created!')
  window.location.href = "./index.html";
});

const signUpButton = document.querySelector('#sign-up');
console.log(signUpButton);

const dialog = document.querySelector('#dialog');
console.log(dialog);

const closeButton = document.querySelector('#close');

// Open the dialog when the "Sign up" button is clicked
signUpButton.addEventListener('click', function () {
  console.log("Sign up button clicked!");
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

