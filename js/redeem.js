// Redeem functionality
document.getElementById('redeemForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const codeInput = document.getElementById('redeem-code');
    const code = codeInput.value.toUpperCase().trim();
    const messageContainer = document.getElementById('message-container');
    
    // Valid codes (you can expand this list)
    const validCodes = {
        'WELCOME20': { discount: '20%', description: 'Welcome discount applied!' },
        'FREESHIP': { discount: 'Free Shipping', description: 'Free shipping applied to your order!' },
        'SUMMER3': { discount: 'Buy 2 Get 1', description: 'Summer promotion applied!' },
        'BDAY15': { discount: '15%', description: 'Birthday discount applied!' }
    };
    
    // Check if code is valid
    if (validCodes[code]) {
        const offer = validCodes[code];
        messageContainer.innerHTML = `
            <div class="bg-green-50 border-2 border-green-500 rounded-lg p-4 flex items-start gap-3">
                <i class="fas fa-check-circle text-green-500 text-2xl"></i>
                <div>
                    <h4 class="font-bold text-green-900 mb-1">Success! Code Applied</h4>
                    <p class="text-green-700">${offer.description}</p>
                    <p class="text-sm text-green-600 mt-1">Discount: <strong>${offer.discount}</strong></p>
                </div>
            </div>
        `;
        messageContainer.classList.remove('hidden');
        
        // Store code in localStorage
        localStorage.setItem('appliedPromoCode', code);
        
        // Animate success
        messageContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        messageContainer.innerHTML = `
            <div class="bg-red-50 border-2 border-red-500 rounded-lg p-4 flex items-start gap-3">
                <i class="fas fa-times-circle text-red-500 text-2xl"></i>
                <div>
                    <h4 class="font-bold text-red-900 mb-1">Invalid Code</h4>
                    <p class="text-red-700">The code you entered is not valid or has expired. Please check and try again.</p>
                </div>
            </div>
        `;
        messageContainer.classList.remove('hidden');
        messageContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Clear input
    codeInput.value = '';
});

// Check if there's already an applied code
window.addEventListener('load', function() {
    const appliedCode = localStorage.getItem('appliedPromoCode');
    if (appliedCode) {
        const messageContainer = document.getElementById('message-container');
        messageContainer.innerHTML = `
            <div class="bg-blue-50 border-2 border-blue-500 rounded-lg p-4 flex items-start gap-3">
                <i class="fas fa-info-circle text-blue-500 text-2xl"></i>
                <div>
                    <h4 class="font-bold text-blue-900 mb-1">Active Promo Code</h4>
                    <p class="text-blue-700">You have an active code: <strong>${appliedCode}</strong></p>
                    <button onclick="clearPromoCode()" class="text-sm text-blue-600 hover:text-blue-800 underline mt-2">Remove code</button>
                </div>
            </div>
        `;
        messageContainer.classList.remove('hidden');
    }
});

function clearPromoCode() {
    localStorage.removeItem('appliedPromoCode');
    location.reload();
}

