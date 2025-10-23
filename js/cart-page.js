// Cart Page Functionality

// Track selected items
let selectedItems = new Set();

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart');
    const cartContent = document.getElementById('cart-content');
    
    if (!window.cart || window.cart.items.length === 0) {
        cartContent.classList.add('hidden');
        emptyCartMessage.classList.remove('hidden');
        return;
    }
    
    cartContent.classList.remove('hidden');
    emptyCartMessage.classList.add('hidden');
    
    // DO NOT auto-select items - let user decide what to check
    
    cartItemsContainer.innerHTML = window.cart.items.map(item => {
        const isChecked = selectedItems.has(item.id);
        const itemTotal = parseFloat(item.price.replace(/[₱]/g, '')) * item.quantity;
        
        return `
        <div class="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <div class="flex gap-4 flex-1">
                <input type="checkbox" 
                       id="item-${item.id}" 
                       ${isChecked ? 'checked' : ''} 
                       onchange="toggleItemSelection('${item.id}')"
                       class="w-5 h-5 text-pink-600 rounded focus:ring-pink-500 cursor-pointer mt-2">
                <img src="${item.image}" alt="${item.name}" class="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg">
                <div class="flex-1 min-w-0">
                    <h3 class="font-bold text-lg text-gray-900 mb-1 truncate">${item.name}</h3>
                    <p class="text-pink-600 font-bold text-xl mb-3">${item.price}</p>
                    <div class="flex items-center gap-3">
                        <button onclick="decreaseQuantity('${item.id}')" class="w-8 h-8 bg-white border-2 border-gray-300 rounded-lg hover:border-pink-600 hover:text-pink-600 transition flex items-center justify-center font-bold">
                            <i class="fas fa-minus text-sm"></i>
                        </button>
                        <span class="font-bold text-lg w-8 text-center">${item.quantity}</span>
                        <button onclick="increaseQuantity('${item.id}')" class="w-8 h-8 bg-white border-2 border-gray-300 rounded-lg hover:border-pink-600 hover:text-pink-600 transition flex items-center justify-center font-bold">
                            <i class="fas fa-plus text-sm"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex justify-between sm:flex-col sm:justify-between sm:items-end gap-2">
                <button onclick="removeFromCart('${item.id}')" class="text-red-500 hover:text-red-700 transition p-2">
                    <i class="fas fa-trash"></i>
                </button>
                <p class="font-bold text-xl text-gray-900">
                    ₱${itemTotal.toFixed(2)}
                </p>
            </div>
        </div>
    `}).join('');
    
    updateOrderSummary();
    updateSelectAllCheckbox();
}

function toggleItemSelection(itemId) {
    if (selectedItems.has(itemId)) {
        selectedItems.delete(itemId);
    } else {
        selectedItems.add(itemId);
    }
    updateOrderSummary();
    updateSelectAllCheckbox();
}

function toggleSelectAll() {
    const selectAllCheckbox = document.getElementById('select-all');
    
    if (selectAllCheckbox.checked) {
        // Select all items
        window.cart.items.forEach(item => selectedItems.add(item.id));
    } else {
        // Deselect all items
        selectedItems.clear();
    }
    
    renderCartItems();
}

function updateSelectAllCheckbox() {
    const selectAllCheckbox = document.getElementById('select-all');
    if (!selectAllCheckbox) return;
    
    const totalItems = window.cart.items.length;
    const selectedCount = selectedItems.size;
    
    selectAllCheckbox.checked = selectedCount === totalItems && totalItems > 0;
    selectAllCheckbox.indeterminate = selectedCount > 0 && selectedCount < totalItems;
}

function updateOrderSummary() {
    if (!window.cart) return;
    
    // Calculate only for selected items
    let subtotal = 0;
    window.cart.items.forEach(item => {
        if (selectedItems.has(item.id)) {
            const price = parseFloat(item.price.replace(/[₱$]/g, ''));
            subtotal += price * item.quantity;
        }
    });
    
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    
    document.getElementById('subtotal').textContent = `₱${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `₱${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `₱${total.toFixed(2)}`;
    
    // Update selected count display
    const selectedCountEl = document.getElementById('selected-count');
    if (selectedCountEl) {
        selectedCountEl.textContent = `${selectedItems.size} item(s) selected`;
    }
    
    // Check for applied promo code
    const appliedPromo = localStorage.getItem('appliedPromoCode');
    if (appliedPromo) {
        const promoMessage = document.getElementById('promo-message');
        promoMessage.textContent = `Promo code "${appliedPromo}" applied! 🎉`;
        promoMessage.className = 'text-sm mt-2 text-green-600 font-semibold';
        promoMessage.classList.remove('hidden');
    }
}

function increaseQuantity(productId) {
    const item = window.cart.items.find(i => i.id === productId);
    if (item) {
        window.cart.updateQuantity(productId, item.quantity + 1);
        renderCartItems();
    }
}

function decreaseQuantity(productId) {
    const item = window.cart.items.find(i => i.id === productId);
    if (item) {
        if (item.quantity > 1) {
            window.cart.updateQuantity(productId, item.quantity - 1);
        } else {
            removeFromCart(productId);
        }
        renderCartItems();
    }
}

function removeFromCart(productId) {
    if (confirm('Remove this item from cart?')) {
        window.cart.removeItem(productId);
        renderCartItems();
    }
}

function clearCart() {
    if (window.cart.items.length === 0) {
        window.showNotification('Cart is already empty', 'info');
        return;
    }
    
    if (confirm('Are you sure you want to clear your cart?')) {
        window.cart.clearCart();
        renderCartItems();
        window.showNotification('Cart cleared successfully', 'success');
    }
}

function applyPromoCode() {
    const input = document.getElementById('promo-input');
    const code = input.value.trim().toUpperCase();
    const message = document.getElementById('promo-message');
    
    if (!code) {
        message.textContent = 'Please enter a promo code';
        message.className = 'text-sm mt-2 text-red-600';
        message.classList.remove('hidden');
        return;
    }
    
    // Check if code exists in localStorage (from redeem page)
    const savedCodes = JSON.parse(localStorage.getItem('redeemedCodes') || '[]');
    const validCode = savedCodes.find(c => c.code === code);
    
    if (validCode) {
        localStorage.setItem('appliedPromoCode', code);
        message.textContent = `Success! ${validCode.discount} discount applied! 🎉`;
        message.className = 'text-sm mt-2 text-green-600 font-semibold';
        message.classList.remove('hidden');
        input.value = '';
        window.showNotification(`Promo code applied: ${validCode.discount} off!`, 'success');
    } else {
        message.textContent = 'Invalid promo code';
        message.className = 'text-sm mt-2 text-red-600';
        message.classList.remove('hidden');
        window.showNotification('Invalid promo code', 'error');
    }
}

function proceedToCheckout() {
    if (!window.cart || window.cart.items.length === 0) {
        window.showNotification('Your cart is empty', 'error');
        return;
    }
    
    if (selectedItems.size === 0) {
        window.showNotification('Please select at least one item to checkout', 'error');
        return;
    }
    
    // Calculate selected items total
    let subtotal = 0;
    const selectedItemsData = [];
    window.cart.items.forEach(item => {
        if (selectedItems.has(item.id)) {
            const price = parseFloat(item.price.replace(/[₱$]/g, ''));
            subtotal += price * item.quantity;
            selectedItemsData.push(item);
        }
    });
    
    const tax = subtotal * 0.08;
    const grandTotal = subtotal + tax;
    
    // In a real app, this would redirect to checkout page
    window.showNotification('Checkout feature coming soon! 🚀', 'info');
    
    // For demo purposes, show summary
    setTimeout(() => {
        const itemsList = selectedItemsData.map(item => `- ${item.name} (${item.quantity}x)`).join('\n');
        alert(`Order Summary:\n\nSelected Items:\n${itemsList}\n\nSubtotal: ₱${subtotal.toFixed(2)}\nTax: ₱${tax.toFixed(2)}\nTotal: ₱${grandTotal.toFixed(2)}\n\nThank you for shopping with Pink Lips! 💕`);
    }, 500);
}

// Initialize cart page
document.addEventListener('DOMContentLoaded', function() {
    // Wait for cart to be loaded
    setTimeout(() => {
        renderCartItems();
    }, 100);
    
    // Listen for Enter key on promo input
    const promoInput = document.getElementById('promo-input');
    if (promoInput) {
        promoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                applyPromoCode();
            }
        });
    }
});

// Make functions globally available
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.applyPromoCode = applyPromoCode;
window.proceedToCheckout = proceedToCheckout;
window.toggleItemSelection = toggleItemSelection;
window.toggleSelectAll = toggleSelectAll;