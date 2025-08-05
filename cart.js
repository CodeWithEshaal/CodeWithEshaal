// ================== GLOBAL PRODUCTS ARRAY ==================
window.products = [
    // Plushies
    { id: 1, name: "Stuffed Bunny", price: 1500, image: "https://images.unsplash.com/photo-1620057589233-91529b2c7b85?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Plush Teddy", price: 1600, image: "https://images.unsplash.com/photo-1616627980939-27bf99e846da?auto=format&fit=crop&w=800&q=80" },
    // Cars
    { id: 3, name: "Race Car", price: 1800, image: "https://images.unsplash.com/photo-1601979031461-9f1f77a58b18?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Lego Car", price: 2500, image: "https://images.unsplash.com/photo-1606813902914-41f0fb2f0b6f?auto=format&fit=crop&w=800&q=80" },
    // Dolls
    { id: 5, name: "Barbie Doll", price: 2000, image: "https://images.unsplash.com/photo-1596995809809-9c5d8c2c5fdd?auto=format&fit=crop&w=800&q=80" },
    { id: 6, name: "Baby Doll", price: 1700, image: "https://images.unsplash.com/photo-1604932601198-28006313fcab?auto=format&fit=crop&w=800&q=80" },
    // Puzzles
    { id: 7, name: "Wooden Puzzle", price: 2000, image: "https://images.unsplash.com/photo-1617201869587-2b1dcd5f62b2?auto=format&fit=crop&w=800&q=80" },
    { id: 8, name: "3D Puzzle", price: 2200, image: "https://images.unsplash.com/photo-1577680715838-6b1c45a62a54?auto=format&fit=crop&w=800&q=80" }
];

// ================== CART FUNCTIONS ==================

// Get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Update cart count in navbar
function updateCartCount() {
    const cart = getCart();
    const cartCountEl = document.getElementById("cart-count");
    if (cartCountEl) {
        cartCountEl.innerText = cart.length;
    }
}

// Add a product to cart
function addToCart(id) {
    let cart = getCart();
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    alert(`${product.name} added to cart!`);
}

// Remove a product from cart
function removeFromCart(id) {
    let cart = getCart().filter(item => item.id !== id);
    saveCart(cart);
    renderCart();
}

// Update item quantity in cart
function updateQuantity(id, quantity) {
    let cart = getCart();
    let item = cart.find(i => i.id === id);
    if (item) {
        item.quantity = parseInt(quantity);
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            saveCart(cart);
            renderCart();
        }
    }
}

// Render cart page
function renderCart() {
    const cart = getCart();
    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");

    if (!container || !totalEl) return; // If we're not on the cart page, skip rendering

    container.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        container.innerHTML += `
            <tr>
                <td><img src="${item.image}" width="50"> ${item.name}</td>
                <td>PKR ${item.price}</td>
                <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)"></td>
                <td>PKR ${item.price * item.quantity}</td>
                <td><button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Remove</button></td>
            </tr>
        `;
    });

    totalEl.innerText = `PKR ${total}`;
}
