# The Riverside Restaurant

A simple food delivery website for The Riverside Restaurant, featuring Northern Indian cuisine.

## Features
- Interactive menu
- Cart functionality
- Checkout process
- Multiple payment options

## Setup
1. Clone the repository
2. Open `index.html` in your browser
3. Customize menu items and styles as needed

## Order Sending Options

### Cash Payment
- When selecting cash payment, an order message is copied to your clipboard
- You can easily paste and send this message via SMS to your preferred number

### WhatsApp Order
- Selecting WhatsApp will open a pre-filled WhatsApp message
- Simply review and send the order details

## Email and WhatsApp Integration Setup

### EmailJS Configuration
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service
3. Create an email template
4. Replace these placeholders in `script.js`:
   - `EMAIL_JS_USER_ID`: Your EmailJS User ID
   - `EMAIL_JS_SERVICE_ID`: Your EmailJS Service ID
   - `EMAIL_JS_TEMPLATE_ID`: Your EmailJS Template ID

### WhatsApp Integration
1. Replace `'+919999999999'` in `script.js` with your WhatsApp business number
2. Ensure the number includes country code

## Menu Items

Current menu items:
1. Samosa - ₹30
2. Spring Roll - ₹40
3. Bread Pakora - ₹35
4. Aalo Tikki - ₹25
5. Malai Soya Chaap - ₹50
6. Kulcha - ₹10

### Current Image Status
⚠️ **PENDING**: Images needed for:
- Spring Roll
- Bread Pakora
- Aalo Tikki
- Malai Soya Chaap
- Kulcha

### How to Add Real Images
1. Replace `.txt` files in `images/` directory with actual image files
2. Recommended image names:
   - `samosa.jpg` or `samosa.png`
   - `spring-roll.jpg` or `spring-roll.png`
   - `bread-pakora.jpg` or `bread-pakora.png`
   - `aalo-tikki.jpg` or `aalo-tikki.png`
   - `soya-chaap.jpg` or `soya-chaap.png`
   - `kulcha.jpg` or `kulcha.png`

### Image Sourcing Recommendations
- Use free stock photo websites:
  1. [Unsplash](https://unsplash.com/)
  2. [Pexels](https://www.pexels.com/)
  3. [Pixabay](https://pixabay.com/)

### Image Guidelines
- Minimum resolution: 500x500 pixels
- File size: Under 1MB
- Formats: JPEG or PNG preferred
- Clear, well-lit food images
- Consistent background or styling

## Deployment
This site is deployed using GitHub Pages.
