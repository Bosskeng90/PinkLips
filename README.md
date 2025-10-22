# Pink Lips - Advertisement Website

A beautiful, modern e-commerce website for elegant dresses built with HTML, Tailwind CSS, and JavaScript.

## Features

- 🏠 **Home Page** - Hero section with featured collection
- 👗 **Dresses** - Product catalog with add to cart functionality
- 📂 **Categories** - Browse by category
- 🎁 **Redeem** - Promo codes and gift cards (fully functional)
- ℹ️ **About** - Company information and features
- 📧 **Contact** - Working contact form with validation
- 🔐 **Login** - User authentication with sign up/sign in
- 🛒 **Shopping Cart** - Add/remove items, quantity management
- ❤️ **Wishlist** - Save favorite items
- 🔔 **Notifications** - Real-time feedback for user actions
- 💾 **LocalStorage** - Persistent data across sessions

## How to Run

### Method 1: Open Directly in Browser (Simplest)
1. Navigate to the project folder
2. Double-click `index.html`
3. The website will open in your default browser

### Method 2: Using Python (Recommended)
If you have Python installed:

```bash
# For Python 3.x
python -m http.server 8000

# For Python 2.x
python -m SimpleHTTPServer 8000
```

Then open your browser and go to: `http://localhost:8000`

### Method 3: Using Node.js
If you have Node.js installed:

```bash
# Install http-server globally
npm install -g http-server

# Run the server
http-server -p 8000
```

Then open your browser and go to: `http://localhost:8000`

### Method 4: Using VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## ✨ Functional Features

### Shopping Cart
- Add products to cart with one click
- Cart badge shows item count in navigation
- Persistent cart using localStorage
- Real-time notifications

### Wishlist
- Save favorite products
- Toggle wishlist with heart icon
- Visual feedback when items are added/removed

### Contact Form
- Full form validation
- Stores submissions in localStorage
- Success notifications
- All fields required

### Redeem System
Try these promo codes on the Redeem page:
- **WELCOME20** - 20% off for first-time customers
- **FREESHIP** - Free shipping on all orders
- **SUMMER3** - Buy 2 Get 1 free
- **BDAY15** - 15% birthday discount

### Login/Signup
- Toggle between sign in and sign up forms
- Password visibility toggle
- Remember me functionality
- Social login buttons (UI ready)

### Search
- Click search icon to search products
- Redirects to dresses page with query

## Technologies Used

- HTML5
- Tailwind CSS (via CDN)
- JavaScript (Vanilla)
- Font Awesome Icons

## Project Structure

```
Pinks/
├── index.html          # Home page
├── dresses.html        # Dresses catalog
├── categories.html     # Categories page
├── lookbook.html       # Lookbook gallery
├── redeem.html         # Redeem codes page
├── about.html          # About page
├── contact.html        # Contact page
├── login.html          # Login/Signup page
├── js/
│   ├── main.js        # Main JavaScript
│   ├── redeem.js      # Redeem functionality
│   └── login.js       # Login functionality
└── README.md          # This file

```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## License

© 2025 Pink Lips. All rights reserved.

