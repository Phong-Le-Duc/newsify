// Lightweight client-side authentication helper.
// There is no backend, so "accounts" are stored in localStorage. Passwords are
// never stored in plain text -- only a SHA-256 hash -- so a peek at localStorage
// doesn't reveal the real password.

const ACCOUNTS_KEY = 'accounts';
const SESSION_KEY = 'loggedInUser';

async function hashPassword(password) {
    const data = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
}

function getAccounts() {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY)) || [];
}

function saveAccounts(accounts) {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

// Creates a new account and logs the user in. Throws if the username is taken.
export async function signUp(username, password) {
    const accounts = getAccounts();

    if (accounts.some(account => account.username.toLowerCase() === username.toLowerCase())) {
        throw new Error('An account with that username already exists.');
    }

    accounts.push({ username, passwordHash: await hashPassword(password) });
    saveAccounts(accounts);
    localStorage.setItem(SESSION_KEY, username);
}

// Logs an existing user in. Throws if the username/password don't match.
export async function signIn(username, password) {
    const accounts = getAccounts();
    const passwordHash = await hashPassword(password);

    const account = accounts.find(function (candidate) {
        return candidate.username.toLowerCase() === username.toLowerCase() && candidate.passwordHash === passwordHash;
    });

    if (!account) {
        throw new Error('Incorrect username or password.');
    }

    localStorage.setItem(SESSION_KEY, account.username);
}

export function logOut() {
    localStorage.removeItem(SESSION_KEY);
}

// Returns the logged-in username, or null if nobody is logged in.
export function getCurrentUser() {
    return localStorage.getItem(SESSION_KEY);
}
