// Menu Items Data
const menuItems = [
    {
        name: "Aalo Tikki",
        price: 30,
        image: "images/aalo-tikki.jpg",
        description: "Crispy potato patties served with tangy chutney"
    },
    {
        name: "Soya Chaap",
        price: 50,
        image: "images/soya-chaap.jpg",
        description: "Delicious marinated soya chaap, grilled to perfection"
    },
    {
        name: "Kulcha",
        price: 20,
        image: "images/kulcha.jpg",
        description: "Soft, buttery traditional Indian bread"
    }
];

// Cart Management
let cart = [];

// Render Menu Items
function renderMenu() {
    const menuContainer = document.getElementById('menu-items');
    
    menuItems.forEach((item, index) => {
        const menuItemElement = document.createElement('div');
        menuItemElement.classList.add('menu-item');
        
        menuItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="menu-item-image">
            <div class="menu-item-details">
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
                <button onclick="addToCart(${index})">Add to Cart</button>
            </div>
        `;
        
        menuContainer.appendChild(menuItemElement);
    });
}

// Add to Cart Function
function addToCart(index) {
    const item = menuItems[index];
    const existingItem = cart.find(cartItem => cartItem.name === item.name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }
    
    updateCartUI();
}

// Increase Quantity
function increaseQuantity(event) {
    const index = event.target.getAttribute('data-index');
    cart[index].quantity += 1;
    updateCartUI();
}

// Decrease Quantity
function decreaseQuantity(event) {
    const index = event.target.getAttribute('data-index');
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    updateCartUI();
}

// Remove Item
function removeItem(event) {
    const index = event.target.getAttribute('data-index');
    cart.splice(index, 1);
    updateCartUI();
}

// Update Cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotal = document.getElementById('cart-total');
    const mainPageCartTotal = document.getElementById('main-page-cart-total');
    const checkoutTotalElement = document.getElementById('checkout-total');
    
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update main page cart total
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (mainPageCartTotal) {
        mainPageCartTotal.textContent = `₹${totalPrice.toFixed(2)}`;
    }
    
    // Update checkout total on main page
    if (checkoutTotalElement) {
        checkoutTotalElement.textContent = `Total: ₹${totalPrice.toFixed(2)}`;
    }
    
    // Clear existing cart items
    cartItemsContainer.innerHTML = '';
    
    // If cart is empty, show message
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div style="text-align: center; padding: 20px; color: #888;">
                Your cart is empty. Start adding items!
            </div>
        `;
    }
    
    // Populate cart items
    let detailedTotalPrice = 0;
    cart.forEach((item, index) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        
        const itemTotal = item.price * item.quantity;
        detailedTotalPrice += itemTotal;
        
        cartItemElement.innerHTML = `
            <div class="cart-item-details">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div>
                    <h3>${item.name}</h3>
                    <p>₹${item.price} each</p>
                </div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn decrease-quantity" data-index="${index}">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn increase-quantity" data-index="${index}">+</button>
                <button class="quantity-btn remove-item" data-index="${index}">🗑️</button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Update total price in modal
    cartTotal.textContent = detailedTotalPrice.toFixed(2);
    
    // Add event listeners for quantity and remove buttons
    document.querySelectorAll('.decrease-quantity').forEach(btn => {
        btn.addEventListener('click', decreaseQuantity);
    });
    
    document.querySelectorAll('.increase-quantity').forEach(btn => {
        btn.addEventListener('click', increaseQuantity);
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', removeItem);
    });
}

// Email.js Configuration
const EMAILJS_USER_ID = 'xXgYNdFCzWnlGJ2Mm';
const EMAILJS_SERVICE_ID = 'service_3qwark7';
const EMAILJS_TEMPLATE_ID = 'template_sqzhuk3';

// Initialize Email.js
function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_USER_ID);
        console.log('Email.js initialized');
    } else {
        console.error('Email.js library not loaded');
    }
}

// Send Order Confirmation Email
function sendOrderConfirmationEmail(orderDetails) {
    // Ensure Email.js is properly configured
    if (typeof emailjs === 'undefined') {
        console.error('Email.js not loaded');
        return;
    }

    const templateParams = {
        to_email: orderDetails.email,
        from_name: 'Riverside Restaurant',
        customer_name: orderDetails.name,
        customer_email: orderDetails.email,
        order_items: orderDetails.items.map(item => 
            `${item.name} x ${item.quantity} - ₹${item.price * item.quantity}`
        ).join('\n'),
        total_amount: orderDetails.total.toFixed(2),
        order_date: new Date().toLocaleString()
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(function(response) {
            console.log('Order confirmation email sent!', response.status, response.text);
            alert('Order confirmed! Check your email for details.');
        }, function(error) {
            console.error('Email send failed:', error);
            alert('Order placed, but email confirmation failed.');
        });
}

// Cart and Modal Management
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Email.js
    initEmailJS();

    // Render menu items
    renderMenu();

    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close-modal');
    const proceedToCheckout = document.getElementById('proceed-to-checkout');
    const mainPageProceedToCheckout = document.getElementById('main-page-proceed-to-checkout');
    const checkoutSection = document.getElementById('checkout');
    const checkoutForm = document.getElementById('customer-form');

    // Function to open cart modal
    function openCartModal() {
        updateCartUI();
        cartModal.style.display = 'block';
    }

    // Function to open checkout section
    function openCheckoutSection() {
        // If cart is empty, show alert
        if (cart.length === 0) {
            alert('Your cart is empty. Please add items before checkout.');
            return;
        }
        
        // Hide cart modal if open
        cartModal.style.display = 'none';
        
        // Show checkout section
        checkoutSection.style.display = 'block';
        checkoutSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Cart icon click to open modal
    cartIcon.addEventListener('click', openCartModal);

    // Close cart modal
    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Proceed to checkout from cart modal
    proceedToCheckout.addEventListener('click', openCheckoutSection);

    // Main page "Proceed to Checkout" button
    if (mainPageProceedToCheckout) {
        mainPageProceedToCheckout.addEventListener('click', openCheckoutSection);
    }

    // Checkout form submission
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const address = document.getElementById('address').value;
            const paymentMethod = document.getElementById('payment-method').value;
            
            const orderDetails = {
                name: name,
                email: email,
                phone: phone,
                address: address,
                paymentMethod: paymentMethod,
                items: cart,
                total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
            };

            // Send order confirmation email
            sendOrderConfirmationEmail(orderDetails);

            // Reset cart and form
            cart = [];
            updateCartUI();
            checkoutForm.reset();
            checkoutSection.style.display = 'none';
        });
    }
});
