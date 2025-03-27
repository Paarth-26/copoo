// Function to generate a unique ID
function generateUniqueId(userType, department) {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const prefix = userType === 'faculty' ? 'FAC' : 'STU';
    const deptCode = department.toUpperCase().slice(0, 3);
    return `${prefix}${deptCode}${timestamp}${random}`;
}

// Function to handle registration
async function handleRegister(event) {
    event.preventDefault();

    // Get form values
    const userType = document.getElementById('userType').value;
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const department = document.getElementById('department').value;

    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Generate unique ID
    const uniqueId = generateUniqueId(userType, department);

    // Create user object
    const userData = {
        id: uniqueId,
        userType,
        fullName,
        email,
        password, // In a real app, this should be hashed
        department,
        createdAt: new Date().toISOString()
    };

    try {
        // In a real app, this would be an API call
        // For now, we'll store in localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));

        // Show success message with ID
        const message = userType === 'faculty' 
            ? `Registration successful! Your Faculty ID is: ${uniqueId}`
            : `Registration successful! Your Student ID is: ${uniqueId}`;
        
        alert(message);
        
        // Redirect to login page
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed. Please try again.');
    }
}

// Add password strength indicator
document.getElementById('password').addEventListener('input', function(e) {
    const password = e.target.value;
    const strength = checkPasswordStrength(password);
    updatePasswordStrengthIndicator(strength);
});

function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
}

function updatePasswordStrengthIndicator(strength) {
    const indicator = document.createElement('div');
    indicator.className = 'password-strength mt-1';
    
    let strengthText = '';
    let strengthClass = '';
    
    switch(strength) {
        case 0:
        case 1:
            strengthText = 'Very Weak';
            strengthClass = 'text-danger';
            break;
        case 2:
            strengthText = 'Weak';
            strengthClass = 'text-warning';
            break;
        case 3:
            strengthText = 'Medium';
            strengthClass = 'text-info';
            break;
        case 4:
            strengthText = 'Strong';
            strengthClass = 'text-primary';
            break;
        case 5:
            strengthText = 'Very Strong';
            strengthClass = 'text-success';
            break;
    }
    
    indicator.innerHTML = `<small class="${strengthClass}">Password Strength: ${strengthText}</small>`;
    
    const existingIndicator = document.querySelector('.password-strength');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    document.getElementById('password').parentNode.appendChild(indicator);
} 