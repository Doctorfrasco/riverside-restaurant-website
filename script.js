const menuItems = [
    { 
        name: "Samosa", 
        price: 30 
    },
    { 
        name: "Spring Roll", 
        price: 40, 
        image: "images/spring-roll.txt" 
    },
    { 
        name: "Bread Pakora", 
        price: 35, 
        image: "images/bread-pakora.txt" 
    },
    { 
        name: "Aalo Tikki", 
        price: 25, 
        image: "images/aalo-tikki.txt" 
    },
    { 
        name: "Malai Soya Chaap", 
        price: 50, 
        image: "images/soya-chaap.txt" 
    },
    { 
        name: "Kulcha", 
        price: 10 
    }
];

// Modified cart to track quantities
const cart = [];

function renderMenu() {
    const menuContainer = document.getElementById('menu-items');
    menuContainer.innerHTML = menuItems.map(item => `
        <div class="menu-item">
            ${item.image ? `<img src="${item.image}" alt="${item.name}" class="menu-item-image">` : ''}
            <div class="menu-item-details">
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
                <div class="cart-controls">
                    <button onclick="addToCart('${item.name}', ${item.price}, '${item.image || ''}')">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

function addToCart(name, price, image) {
    // Find existing item in cart
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        // Increment quantity if item exists
        existingItem.quantity += 1;
    } else {
        // Add new item to cart
        cart.push({ 
            name, 
            price, 
            image, 
            quantity: 1 
        });
    }
    
    // Add animation to the added item's button
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        if (item.querySelector('h3').textContent === name) {
            item.classList.add('cart-item-added');
            setTimeout(() => {
                item.classList.remove('cart-item-added');
            }, 500);
        }
    });
    
    updateCart();
}

function removeFromCart(name) {
    const itemIndex = cart.findIndex(item => item.name === name);
    
    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            // Decrease quantity
            cart[itemIndex].quantity -= 1;
        } else {
            // Remove item completely if quantity is 1
            cart.splice(itemIndex, 1);
        }
        
        updateCart();
    }
}

function updateCart() {
    const cartList = document.getElementById('cart-items');
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartList.innerHTML = cart.map(item => `
        <li class="cart-item">
            ${item.image ? `<img src="${item.image}" alt="${item.name}" class="cart-item-image">` : ''}
            <div class="cart-item-details">
                <span>${item.name}</span>
                <span>₹${item.price}</span>
                <div class="cart-item-quantity">
                    <button onclick="removeFromCart('${item.name}')">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="addToCart('${item.name}', ${item.price}, '${item.image || ''}')">+</button>
                </div>
                <span>Total: ₹${item.price * item.quantity}</span>
            </div>
        </li>
    `).join('');
    
    document.getElementById('cart-checkout-btn').textContent = 
        `Checkout (Total: ₹${totalPrice})`;
}

// Checkout button event listener
document.getElementById('cart-checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items before checkout.');
        return;
    }
    
    // Show checkout section
    const checkoutSection = document.getElementById('checkout');
    checkoutSection.style.display = 'block';
    
    // Optional: Scroll to checkout section
    checkoutSection.scrollIntoView({ behavior: 'smooth' });
});

function prepareWhatsAppMessage(orderDetails) {
    const phoneNumber = '+919646336832'; // Your specified number
    
    // Construct message
    const message = `New Order Details:
Name: ${orderDetails.customerName}
Phone: ${orderDetails.phoneNumber}
Address: ${orderDetails.houseDetails}, ${orderDetails.villageName}

Order Items:
${orderDetails.items.join('\n')}

Total Price: ₹${orderDetails.totalPrice}

Payment Method: Cash on Delivery`;
    
    // Encode message for WhatsApp
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

document.getElementById('customer-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Collect form data
    const name = document.getElementById('full-name').value;
    const phone = document.getElementById('phone-number').value;
    const houseDetails = document.getElementById('house-details').value;
    const villageName = document.getElementById('village-name').value;
    const paymentMethod = document.getElementById('payment-method').value;
    
    // Prepare order details
    const orderDetails = {
        customerName: name,
        phoneNumber: phone,
        houseDetails: houseDetails,
        villageName: villageName,
        items: cart.map(item => `• ${item.name} x${item.quantity} = ₹${item.price * item.quantity}`),
        totalPrice: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
    
    // Send message based on payment method
    if (paymentMethod === 'cash') {
        prepareWhatsAppMessage(orderDetails);
    }
    
    // Reset cart and form
    cart = [];
    updateCart();
    e.target.reset();
    document.getElementById('checkout').style.display = 'none';
});

// Initialize
document.addEventListener('DOMContentLoaded', renderMenu);

// EmailJS Integration
// Note: You'll need to sign up at https://www.emailjs.com/ and get your credentials
const EMAIL_JS_USER_ID = 'YOUR_USER_ID';
const EMAIL_JS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAIL_JS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
