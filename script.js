document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validation
    if (!name || !email || !message) {
        showMessage('Please fill in all fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    const btn = this.querySelector('.send-btn');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    
    try {
        const formData = new FormData();
        formData.append('access_key', '9fd44835-9dce-4f70-8ce4-12965f386f52'); // Get from web3forms.com
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);
        formData.append('subject', 'New Contact Form Submission from ' + name);
        // Optional: Redirect after success
        formData.append('redirect', 'https://yourwebsite.com/thank-you.html');
        
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            this.reset();
        } else {
            showMessage('Oops! Something went wrong. Please try again.', 'error');
        }
    } catch (error) {
        showMessage('Oops! Something went wrong. Please try again or email me directly.', 'error');
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
});

function showMessage(text, type) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.textContent = text;
    messageDiv.className = 'form-message ' + type;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});
// ============================
// HAMBURGER MENU FUNCTIONALITY
// ============================

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });
}

// Close menu function
function closeMenu() {
    if (navLinks && hamburger) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks && hamburger) {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// Close menu on window resize to desktop size
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        if (navLinks && hamburger) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});