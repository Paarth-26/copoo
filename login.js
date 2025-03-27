// Get user type from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const userType = urlParams.get('type');

// Update login page based on user type
document.addEventListener('DOMContentLoaded', () => {
    if (userType === 'student') {
        document.getElementById('loginTitle').textContent = 'Student Login';
        document.getElementById('loginSubtitle').textContent = 'Welcome back, Student!';
        document.querySelector('.btn-primary').classList.remove('btn-primary');
        document.querySelector('.btn-primary').classList.add('btn-info');
    } else if (userType === 'faculty') {
        document.getElementById('loginTitle').textContent = 'Faculty Login';
        document.getElementById('loginSubtitle').textContent = 'Welcome back, Faculty!';
        document.querySelector('.btn-primary').classList.remove('btn-primary');
        document.querySelector('.btn-primary').classList.add('btn-success');
    }
});

// Function to toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.querySelector('.btn-outline-secondary i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.classList.remove('bx-show');
        toggleButton.classList.add('bx-hide');
    } else {
        passwordInput.type = 'password';
        toggleButton.classList.remove('bx-hide');
        toggleButton.classList.add('bx-show');
    }
}

// Function to handle login
async function handleLogin(event) {
    event.preventDefault();

    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    try {
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Find user by ID and password
        const user = users.find(u => u.id === userId && u.password === password);

        if (user) {
            // Store user session if remember me is checked
            if (rememberMe) {
                localStorage.setItem('currentUser', JSON.stringify({
                    id: user.id,
                    userType: user.userType,
                    fullName: user.fullName,
                    department: user.department
                }));
            } else {
                sessionStorage.setItem('currentUser', JSON.stringify({
                    id: user.id,
                    userType: user.userType,
                    fullName: user.fullName,
                    department: user.department
                }));
            }

            // Redirect based on user type
            const redirectUrl = user.userType === 'faculty' 
                ? 'faculty-dashboard.html' 
                : 'student-dashboard.html';
            
            window.location.href = redirectUrl;
        } else {
            alert('Invalid User ID or Password');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
    }
}

// Function to handle forgot password
function forgotPassword() {
    const userId = document.getElementById('userId').value;
    
    if (!userId) {
        alert('Please enter your User ID first');
        return;
    }

    // In a real app, this would send a password reset email
    alert('Password reset instructions have been sent to your registered email address.');
}

// Check if user is already logged in
function checkExistingSession() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser') || 'null');
    
    if (currentUser) {
        const redirectUrl = currentUser.userType === 'faculty' 
            ? 'faculty-dashboard.html' 
            : 'student-dashboard.html';
        window.location.href = redirectUrl;
    }
}

// Run session check when page loads
document.addEventListener('DOMContentLoaded', checkExistingSession); 