document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
    document.querySelectorAll('.book-card').forEach(card => {
        const btn = card.querySelector('.add-to-cart');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            const title = card.querySelector('.book-title')?.textContent;
            const author = card.querySelector('.book-author')?.textContent;
            const cover = card.querySelector('.book-cover img')?.getAttribute('src');
            addToCart(id, title, author, cover);
        });
    });
});

function addToCart(bookId, bookTitle, bookAuthor, bookCover) {
    const id = String(bookId);
    const exists = cartItems.some(item => item.id === id);
    if (exists) {
        updateCartDisplay();
        return;
    }
    cartItems.push({
        id: id,
        title: bookTitle,
        author: bookAuthor,
        cover: bookCover,
        amount: 1
    });
    saveCart();
    updateCartDisplay();
}

function removeFromCart(bookId) {
    const id = String(bookId);
    cartItems = cartItems.filter(item => item.id !== id);
    saveCart();
    updateCartDisplay();
}

function displayCartItems() {
    const container = document.getElementById('cartItemsContainer');
    if (!container) return;

    if (cartItems.length === 0) {
        container.innerHTML = `
                <div class="cart-but-empty">
                    <h2>Your cart is empty right now.</h2>
                    <p>Not to late to fill it, thought. ;)</p>
                    <a href="index.html" class="continue-shopping-btn">Back to Shopping.</a>
                </div>
            `;
        return;
    }

    container.innerHTML = cartItems.map(item => {
        return `
            <div class="cart-item" data-id="${item.id}">
                <div class="item-info">
                    <img class="item-cover" src="${item.cover}" alt="${item.title}"/>
                    <div class="item-author-title">
                        <h4 class="item-title">${item.title}</h4>
                        <p class="item-author">${item.author}</p>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart('${String(item.id)}')">X</button>
                </div>
            </div>
        `;
    }).join('');
}

function updateCounters() {
    const total = getTotalItems();
    document.querySelectorAll('.cart-counter').forEach(counter => {
        counter.textContent = total;
    });
    const itemsLabel = document.querySelector('.cart-items');
    if (itemsLabel) itemsLabel.textContent = `${total} items`;
}

function updateCartDisplay() {
    updateCounters();
    if (window.location.href.includes('cart.html')) {
        displayCartItems();
    }
}

const jsonKey = 'cart';
let cartItems = JSON.parse(localStorage.getItem(jsonKey)) || [];

function saveCart() {
    localStorage.setItem(jsonKey, JSON.stringify(cartItems));
}

function getTotalItems() {
    return cartItems.reduce((total, item) => total + (item.amount || 0), 0);
}