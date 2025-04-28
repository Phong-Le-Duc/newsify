import './style/style.scss';
import Button from './components/button/button';




document.querySelector('#app').innerHTML = `
<img class="login-image" src="src/img/newsify_logo.svg" alt="">
<h1 class="login-newsify">Newsify</h1>
<p class="login-welcome-text">Welcome! Let’s dive into your account!</p>


${Button("Continue with Facebook").outerHTML}
${Button("Continue with Google").outerHTML}

<div class="divider"><span>or</span></div>

${Button("Sign in with password", "button--green").outerHTML}

<p class="no-account">Don’t have an account? <button id="sign-up">Sign up</button> </p>

<dialog id="dialog">
 <div class="dialog-content">
    <h2>Create username</h2>
    <input type="text" id="inputField" placeholder="Username...">
    <h2>Create password</h2>
    <input type="text" id="inputField" placeholder="Password...">
    <button id="submit">Submit</button>
    <button id="close">Close</button>
 </div>
</dialog>
`;


const signUpButton = document.querySelector('#sign-up');
console.log(signUpButton);

const dialog = document.querySelector('#dialog');
console.log(dialog);

const closeButton = document.querySelector('#close');

// Open the dialog when the "Sign up" button is clicked
signUpButton.addEventListener('click', function() {
    console.log("Sign up button clicked!");
    dialog.showModal(); // Open dialog


  });
  
  // Close the dialog when the close button is clicked
  closeButton.addEventListener('click', function()  {
    dialog.close(); // Close dialog
  });

