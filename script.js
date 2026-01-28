// Web3Forms Implementation - 100% FREE, UNLIMITED submissions!
// Get your access key from: https://web3forms.com/

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
        formData.append('access_key', '3c3e169f-0ddb-41a7-b294-ac59ed60ef2f'); // Get from web3forms.com
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

// Add input animation effects
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