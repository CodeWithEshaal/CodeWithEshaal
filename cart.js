// ================== GLOBAL PRODUCTS ARRAY ==================
window.products = [
    // Plushies
    { id: 1, name: "Stuffed Bunny", price: 1500, image: "images/Stuffed-Bunny.png" },
    { id: 2, name: "Plush Teddy", price: 1600, image: "images/Plush-Teddy.png" },
    // Cars
    { id: 3, name: "Race Car", price: 1800, image: "images/Racing-car.png" },
    { id: 4, name: "Lego Car", price: 2500, image: "Images/Lego Car.png" },
    // Dolls
    { id: 5, name: "Barbie Doll", price: 2000, image: "Images/Barbie doll.png" },
    { id: 6, name: "Baby Doll", price: 1700, image: "Images/Baby doll.png" },
    // Puzzles
    { id: 7, name: "Wooden Puzzle", price: 2000, image: "Images/Woden puzzule.png" },
    { id: 8, name: "3D Puzzle", price: 2200, image: "Images/3D puzzle.png" }
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
