import { storage_key, classes } from './general.js';
import { DM } from './data.module.js';

  let bookList = DM.getBookList();
  let cart = JSON.parse(localStorage.getItem(storage_key)) || []; 
  let totalElements = document.querySelectorAll(classes.total_value);

 export function addToCart(id) {
    if (cart.some((item) => item.id === id)) {
        updateItemQuantity("plus", id);
    } else {
        const item = bookList.find((book) => book.id === id);
        cart.push({
            ...item, 
            amount: 1,
        });
    }

    saveCart(); 
    updateCartDisplay();
}

export function updateCartDisplay() {
    updateCounters();
    displayCartItems();
    orderSummary();
}

function getTotalItems() {
    return cart.reduce((total, item) => total + (item.amount || 0), 0);
}

function updateCounters() {
    const total = getTotalItems();
    document.querySelectorAll('.cart-counter').forEach(counter => {
        counter.textContent = total;
    });
    const itemsLabel = document.querySelector('.cart-items');
    if (itemsLabel) itemsLabel.textContent = `${total} items`;
}

export function updateItemQuantity(action, id) { 
    cart = cart.map((item) => {
        if (item.id === id) {
            let amount = item.amount;
            
            if (action === "minus" && amount > 1) {
                amount--;
            } else if (action === "plus") {
                amount++;
            }
            
            return {
                ...item,
                amount
            };
        }
        return item;
    });
    
    saveCart();
    updateCartDisplay();
}

function displayCartItems() {
    const container = document.getElementById('cartItemsContainer');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-but-empty">
                <h2>Your cart is empty right now.</h2>
                <p>Not too late to fill it, though. ;)</p>
                <a href="index.html" class="continue-shopping-btn">Back to Shopping</a>
            </div>
        `;
        return;
    }

    container.innerHTML = cart.map(item => {
        return `
            <div class="cart-item" data-id="${item.id}">
                <div class="item-info">
                    <img class="item-cover" src="${item.cover}" alt="${item.title}"/>
                    <div class="item-author-title">
                        <h4 class="item-title">${item.title}</h4>
                        <p class="item-author">${item.author}</p>
                    </div>
                    <div class="units-remove">
                    <div class="unit">
                        <div class="plus">+</div>
                        <div class="number">${item.amount}</div>
                        <div class="minus">-</div>
                    </div>
                    <button class="remove-btn">x</button>
                </div>
                </div>
            </div>
        `;
    }).join('');

}

function orderSummary() {
    let totalSummary = 0;
    let totalItems = 0; 

    cart.forEach((item) => {
        totalSummary += item.price * item.amount;
        totalItems += item.amount;
    });
    
    totalElements.forEach(element => {
        element.textContent = `$${totalSummary.toFixed(2)}`;
    });
}

    export function removeFromCart(itemId) { 
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartDisplay(); 
}

function saveCart() {
    localStorage.setItem(storage_key, JSON.stringify(cart));
}