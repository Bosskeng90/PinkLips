# Pink Lips - Functional Features Guide

## 🛒 Shopping Cart System

### How it works:
1. Click any "Add to Bag" button on product cards
2. Cart badge appears in navigation showing item count
3. Items persist across page refreshes (localStorage)
4. Get real-time success notifications

### Features:
- Add products to cart
- Update quantities
- Remove items
- Calculate totals
- Persistent storage

## ❤️ Wishlist System

### How it works:
1. Click the heart icon on any product
2. Icon fills in to show it's saved
3. Get instant feedback notification
4. Items persist across sessions

### Features:
- Toggle favorite products
- Visual feedback (filled/unfilled heart)
- Persistent storage
- Quick add/remove

## 🎁 Promo Code Redemption

### Active Codes:
- **WELCOME20** - 20% off for first-time customers
- **FREESHIP** - Free shipping on all orders
- **SUMMER3** - Buy 2 Get 1 free
- **BDAY15** - 15% birthday discount

### How it works:
1. Go to Redeem page
2. Enter promo code
3. Get instant validation
4. Code is saved to your account

## 📧 Contact Form

### Features:
- Full form validation
- Required fields enforcement
- Email format validation
- Inquiry type selection
- Success notifications
- Stores submissions in localStorage

### How to use:
1. Fill in all required fields
2. Select inquiry type
3. Write your message
4. Click "Send Message"
5. Get confirmation notification

## 🔐 Login & Authentication

### Features:
- Sign In form
- Sign Up form
- Password visibility toggle
- Remember me checkbox
- Form validation
- Social login buttons (UI ready)

### How it works:
1. Click user icon or go to login page
2. Enter credentials or create account
3. Toggle between Sign In/Sign Up
4. Data stored in localStorage

## 🔔 Notification System

### Notification Types:
- ✅ Success (Green) - Cart additions, form submissions
- ❤️ Wishlist (Pink) - Wishlist updates
- ℹ️ Info (Blue) - General information
- ❌ Error (Red) - Validation errors

### Auto-dismiss:
- Notifications automatically fade after 3 seconds
- Smooth slide-out animation

## 🔍 Search Functionality

### How to use:
1. Click search icon in navigation
2. Enter search query in prompt
3. Redirects to Dresses page with results
4. Search works across product names

## 💾 Data Persistence

All data is stored in browser localStorage:
- Shopping cart items
- Wishlist products
- Applied promo codes
- Login status
- Contact form submissions
- Newsletter subscriptions

## 📱 Responsive Design

- Mobile-friendly navigation
- Touch-optimized buttons
- Responsive grid layouts
- Adaptive typography
- Mobile cart display

## 🎨 Interactive Elements

### Hover Effects:
- Product cards scale on hover
- Buttons change color
- Images zoom in containers
- Category cards highlight

### Click Actions:
- Add to cart
- Toggle wishlist
- Form submissions
- Navigation
- Modal triggers

## 🚀 Performance Features

- Lazy loading ready
- Optimized images
- Minimal JavaScript
- CDN-hosted Tailwind CSS
- LocalStorage caching

## 📊 Analytics Ready

Data collected in localStorage:
- Cart items and values
- Popular products (wishlist)
- Contact form submissions
- User preferences
- Promo code usage

## 🔄 Real-time Updates

- Cart count badge
- Wishlist status
- Form validation
- Notification system
- Price calculations

## 🎯 User Experience

- Instant feedback
- Clear error messages
- Loading states
- Success confirmations
- Intuitive navigation

---

## How to Test All Features:

1. **Test Shopping Cart:**
   - Go to Dresses page
   - Click "Add to Bag" on any product
   - Watch cart badge update
   - Refresh page - cart persists

2. **Test Wishlist:**
   - Click heart icon on products
   - Icon should fill in
   - Click again to remove
   - Check persistence on refresh

3. **Test Redeem:**
   - Go to Redeem page
   - Try code: **WELCOME20**
   - Get success message
   - Code saves to account

4. **Test Contact Form:**
   - Go to Contact page
   - Fill all fields
   - Submit form
   - Get success notification

5. **Test Login:**
   - Go to Login page
   - Create an account
   - Try signing in
   - Toggle password visibility

6. **Test Search:**
   - Click search icon
   - Enter "dress"
   - See results

---

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

## Mobile Support

- ✅ iOS Safari
- ✅ Android Chrome
- ✅ Mobile responsive design
- ✅ Touch optimized

---

**Need Help?** Check the console for logs or contact support!

