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
    
    updateCartUI();
}

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

function decreaseQuantity(e) {
    const index = e.target.getAttribute('data-index');
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    updateCartUI();
}

function increaseQuantity(e) {
    const index = e.target.getAttribute('data-index');
    cart[index].quantity += 1;
    updateCartUI();
}

function removeItem(e) {
    const index = e.target.getAttribute('data-index');
    cart.splice(index, 1);
    updateCartUI();
}

// Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close-modal');
    const proceedToCheckout = document.getElementById('proceed-to-checkout');

    // Open cart modal
    cartIcon.addEventListener('click', () => {
        updateCartUI();
        cartModal.style.display = 'block';
    });

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

    // Proceed to checkout
    proceedToCheckout.addEventListener('click', () => {
        cartModal.style.display = 'none';
        document.getElementById('checkout').style.display = 'block';
        document.getElementById('checkout').scrollIntoView({ behavior: 'smooth' });
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', renderMenu);

// EmailJS Integration
// Note: You'll need to sign up at https://www.emailjs.com/ and get your credentials
const EMAIL_JS_USER_ID = 'YOUR_USER_ID';
const EMAIL_JS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAIL_JS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
