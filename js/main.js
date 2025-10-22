// Main JavaScript file for Pink Lips website

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update cart count badge in navigation (called on page load)
function updateCartCountBadge() {
    if (window.cart) {
        window.cart.updateCartDisplay();
    }
}

// Newsletter subscription
function subscribeNewsletter(email) {
    if (!email || !email.includes('@')) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    localStorage.setItem('newsletterSubscribed', 'true');
    localStorage.setItem('newsletterEmail', email);
    showNotification('Thank you for subscribing to our newsletter!', 'success');
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    }`;
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} text-xl"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Search functionality
function handleSearch() {
    const searchInput = document.querySelector('input[type="search"]');
    if (searchInput) {
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `dresses.html?search=${encodeURIComponent(query)}`;
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Update cart count immediately (no setTimeout)
    updateCartCountBadge();
    
    // Check for applied promo code
    const promoCode = localStorage.getItem('appliedPromoCode');
    if (promoCode) {
        console.log('Active promo code:', promoCode);
    }
    
    // Add search functionality
    const searchButtons = document.querySelectorAll('.fa-search');
    searchButtons.forEach(btn => {
        btn.parentElement.addEventListener('click', () => {
            const input = prompt('Search for dresses:');
            if (input) {
                window.location.href = `dresses.html?search=${encodeURIComponent(input)}`;
            }
        });
    });
});

// Contact form submission
function handleContactForm(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    const data = {
        type: formData.get('inquiry-type') || document.getElementById('inquiry-type').value,
        name: formData.get('full-name') || document.getElementById('full-name').value,
        email: formData.get('email') || document.getElementById('email').value,
        subject: formData.get('subject') || document.getElementById('subject').value,
        message: formData.get('message') || document.getElementById('message').value
    };
    
    // Store in localStorage (in production, send to backend)
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    contacts.push({ ...data, date: new Date().toISOString() });
    localStorage.setItem('contacts', JSON.stringify(contacts));
    
    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
    form.reset();
}

// Add event listener to contact form if it exists
const contactForm = document.querySelector('.contact-form, form');
if (contactForm && window.location.pathname.includes('contact')) {
    contactForm.addEventListener('submit', handleContactForm);
}

// Export functions for global use
window.toggleMobileMenu = toggleMobileMenu;
window.subscribeNewsletter = subscribeNewsletter;
window.showNotification = showNotification;
window.handleSearch = handleSearch;
window.updateCartCountBadge = updateCartCountBadge;

