// Login and Sign Up functionality

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('login-password');
    const toggleIcon = document.getElementById('toggleIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Show signup form
function showSignup() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
    document.querySelector('.login-header h1').textContent = 'Create Account';
    document.querySelector('.login-header p').textContent = 'Join us and start shopping for elegant dresses';
}

// Show login form
function showLogin() {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
    document.querySelector('.login-header h1').textContent = 'Sign In';
    document.querySelector('.login-header p').textContent = 'Enter your credentials to access your account';
}

// Handle login form submission
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;
    
    // Simple validation (in production, this would connect to your backend)
    if (email && password) {
        // Store user info (in production, use secure authentication)
        localStorage.setItem('userEmail', email);
        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
        }
        
        alert('Login successful! Welcome back to Pink Lips.');
        window.location.href = 'index.html';
    } else {
        alert('Please enter both email and password.');
    }
});

// Handle signup form submission
document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }
    
    // Simple validation (in production, this would connect to your backend)
    if (name && email && password) {
        // Store user info (in production, use secure authentication)
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        
        alert('Account created successfully! Welcome to Pink Lips.');
        window.location.href = 'index.html';
    } else {
        alert('Please fill in all fields.');
    }
});

// Check if user is already logged in
window.addEventListener('load', function() {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail && localStorage.getItem('rememberMe') === 'true') {
        // User is already logged in
        console.log('Welcome back!', userEmail);
    }
});

// Export functions for global use
window.togglePassword = togglePassword;
window.showSignup = showSignup;
window.showLogin = showLogin;

