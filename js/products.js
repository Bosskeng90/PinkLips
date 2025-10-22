// Product functionality and data

const products = [
    {
        id: 'dress-001',
        name: 'Elegant Evening Dress',
        price: '₱299',
        originalPrice: '₱399',
        rating: 4.8,
        reviews: 124,
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&h=600&fit=crop',
        badges: ['New', 'Sale']
    },
    {
        id: 'dress-002',
        name: 'Summer Floral Midi',
        price: '₱159',
        rating: 4.9,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop',
        badges: []
    },
    {
        id: 'dress-003',
        name: 'Classic Black Dress',
        price: '₱199',
        originalPrice: '₱249',
        rating: 4.7,
        reviews: 203,
        image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500&h=600&fit=crop',
        badges: ['Sale']
    },
    {
        id: 'dress-004',
        name: 'Casual Day Dress',
        price: '₱129',
        rating: 4.6,
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&h=600&fit=crop',
        badges: []
    },
    {
        id: 'dress-005',
        name: 'Party Cocktail Dress',
        price: '₱249',
        rating: 4.9,
        reviews: 78,
        image: 'https://images.unsplash.com/photo-1585487000143-5b51ea7677b3?w=500&h=600&fit=crop',
        badges: ['New']
    },
    {
        id: 'dress-006',
        name: 'Office Professional Dress',
        price: '₱179',
        rating: 4.5,
        reviews: 92,
        image: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?w=500&h=600&fit=crop',
        badges: []
    }
];

// Add to cart from product card
function addToCartFromCard(productId) {
    const product = products.find(p => p.id === productId);
    if (product && window.cart) {
        window.cart.addItem(product);
    }
}

// Toggle wishlist from product card
function toggleWishlistFromCard(productId, buttonElement) {
    const product = products.find(p => p.id === productId);
    if (product && window.wishlist) {
        const isAdded = window.wishlist.toggleItem(product);
        
        // Update button appearance
        if (buttonElement) {
            const icon = buttonElement.querySelector('i');
            if (isAdded) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                buttonElement.classList.add('bg-pink-600', 'text-white');
                buttonElement.classList.remove('bg-white');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                buttonElement.classList.remove('bg-pink-600', 'text-white');
                buttonElement.classList.add('bg-white');
            }
        }
    }
}

// Initialize product cards with functionality
function initializeProductCards() {
    // Don't add click handlers here - we're using onclick attributes in HTML to avoid duplicates
    
    // Update wishlist button states
    document.querySelectorAll('[data-wishlist-id]').forEach(button => {
        const productId = button.getAttribute('data-wishlist-id');
        if (window.wishlist && window.wishlist.isInWishlist(productId)) {
            const icon = button.querySelector('i');
            icon.classList.remove('far');
            icon.classList.add('fas');
            button.classList.add('bg-pink-600', 'text-white');
            button.classList.remove('bg-white');
        }
    });
}

// Search functionality
function searchProducts(query) {
    const lowerQuery = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(lowerQuery)
    );
}

// Filter by price range
function filterByPrice(minPrice, maxPrice) {
    return products.filter(product => {
        const price = parseFloat(product.price.replace('₱', ''));
        return price >= minPrice && price <= maxPrice;
    });
}

// Sort products
function sortProducts(sortBy) {
    const sorted = [...products];
    
    switch(sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => {
                const priceA = parseFloat(a.price.replace('₱', ''));
                const priceB = parseFloat(b.price.replace('₱', ''));
                return priceA - priceB;
            });
        case 'price-high':
            return sorted.sort((a, b) => {
                const priceA = parseFloat(a.price.replace('₱', ''));
                const priceB = parseFloat(b.price.replace('₱', ''));
                return priceB - priceA;
            });
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'popular':
            return sorted.sort((a, b) => b.reviews - a.reviews);
        default:
            return sorted;
    }
}

// Make functions available globally
window.products = products;
window.addToCartFromCard = addToCartFromCard;
window.toggleWishlistFromCard = toggleWishlistFromCard;
window.initializeProductCards = initializeProductCards;
window.searchProducts = searchProducts;
window.filterByPrice = filterByPrice;
window.sortProducts = sortProducts;

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeProductCards);

