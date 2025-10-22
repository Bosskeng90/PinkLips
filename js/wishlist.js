// Wishlist Functionality

class Wishlist {
    constructor() {
        this.items = this.loadWishlist();
    }

    loadWishlist() {
        const saved = localStorage.getItem('wishlist');
        return saved ? JSON.parse(saved) : [];
    }

    saveWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(this.items));
    }

    addItem(product) {
        if (!this.items.find(item => item.id === product.id)) {
            this.items.push(product);
            this.saveWishlist();
            this.showNotification(`${product.name} added to wishlist!`, 'success');
            return true;
        } else {
            this.showNotification('Already in wishlist', 'info');
            return false;
        }
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveWishlist();
        this.showNotification('Removed from wishlist', 'info');
    }

    toggleItem(product) {
        if (this.items.find(item => item.id === product.id)) {
            this.removeItem(product.id);
            return false;
        } else {
            this.addItem(product);
            return true;
        }
    }

    isInWishlist(productId) {
        return this.items.some(item => item.id === productId);
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white transform transition-all duration-300 ${
            type === 'success' ? 'bg-pink-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        }`;
        notification.innerHTML = `
            <div class="flex items-center gap-3">
                <i class="fas fa-heart text-xl"></i>
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
}

// Initialize wishlist
const wishlist = new Wishlist();

// Make wishlist available globally
window.wishlist = wishlist;

