// ---------- LOGIN HANDLER ----------
async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginBtn = document.querySelector('.login-btn');

    // Disable button and show loading state
    loginBtn.textContent = 'Logging in...';
    loginBtn.disabled = true;

    // Remove any previous error
    removeError();

    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Save user data in localStorage
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'welcome.html';
        } else {
            showError(data.error || 'Invalid email or password.');
        }
    } catch (error) {
        console.error('Login error:', error);
        showError('Could not connect to the server. Is it running?');
    } finally {
        loginBtn.textContent = 'Login';
        loginBtn.disabled = false;
    }
}

// ---------- REGISTER HANDLER (if you create register.html) ----------
async function handleRegister(event) {
    event.preventDefault();

    const fullName = document.getElementById('full_name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ full_name: fullName, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Account created! Please log in.');
            window.location.href = 'login.html';
        } else {
            showError(data.error || 'Registration failed.');
        }
    } catch (error) {
        console.error('Register error:', error);
        showError('Could not connect to the server.');
    }
}

// ---------- HELPER: Show Error Message ----------
function showError(message) {
    removeError();
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;

    // Insert it before the login button
    const loginCard = document.querySelector('.login-card');
    const loginBtn = document.querySelector('.login-btn');
    loginCard.insertBefore(errorDiv, loginBtn);

    // Auto-remove after 5 seconds
    setTimeout(() => removeError(), 5000);
}

function removeError() {
    const existing = document.querySelector('.error-message');
    if (existing) existing.remove();
}

// ---------- WELCOME PAGE: Load User ----------
async function loadWelcomePage() {
    const userData = localStorage.getItem('user');
    if (!userData) {
        // No user found → redirect to login
        window.location.href = 'login.html';
        return;
    }

    try {
        const user = JSON.parse(userData);
        document.getElementById('user-name').textContent = user.name || 'User';
        document.getElementById('user-email').textContent = user.email || '';

        // Optional: Verify session with backend (if you want extra security)
        // const response = await fetch('http://localhost:5000/api/user', { credentials: 'include' });
        // if (!response.ok) logout();
    } catch (e) {
        console.error('Error loading user:', e);
        logout();
    }
}

// ---------- LOGOUT ----------
function logout() {
    localStorage.removeItem('user');
    // Optional: call backend logout
    // fetch('http://localhost:5000/api/logout', { method: 'POST' });
    window.location.href = 'login.html';
}

// ---------- ATTACH EVENT LISTENERS ----------
document.addEventListener('DOMContentLoaded', () => {
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register form (if you create register.html, add id="register-form")
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Welcome page
    if (window.location.pathname.includes('welcome.html')) {
        loadWelcomePage();
    }

    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});