import { storage_key, classes } from './general.js';
import { DM } from './data.module.js';

export const CartModule = {
    cart: JSON.parse(localStorage.getItem(storage_key)) || [],

    init() {
        this.updateCartDisplay();
    },

   async addToCart(id) {
    
    const existingItem = this.cart.find(item => item.id === id);
    if (existingItem) {
        this.updateItemQuantity("plus", id);
        return;
    }

    const bookList = await DM.getBookList();
    const item = bookList.find((book) => book.id === id);
    if (item) {
        this.cart.push({
            ...item,
            amount: 1,
        });
        this.saveCart();
        this.updateCartDisplay();
    }

        this.saveCart();
        this.updateCartDisplay();
    },

    updateCartDisplay() {
        this.updateCounters();
        this.displayCartItems();
        this.orderSummary();
    },

    getTotalItems() {
        return this.cart.reduce((total, item) => total + (item.amount || 0), 0);
    },

    updateCounters() {
        const total = this.getTotalItems();
        document.querySelectorAll(classes.cart_counter).forEach(counter => {
            counter.textContent = total;
        });
        const itemsLabel = document.querySelector(classes.cart_items);
        if (itemsLabel) itemsLabel.textContent = `${total} items`;
    },

    updateItemQuantity(action, id) {
        this.cart = this.cart.map((item) => {
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

        this.saveCart();
        this.updateCartDisplay();
    },

    displayCartItems() {
        const container = document.getElementById(classes.cart_items_container);
        if (!container) return;

        if (this.cart.length === 0) {
            container.innerHTML = `
            <div class="cart-but-empty">
                <h2>Your cart is empty right now.</h2>
                <p>Not too late to fill it, though. ;)</p>
                <a href="index.html" class="continue-shopping-btn">Back to Shopping</a>
            </div>
        `;
            return;
        }

        container.innerHTML = this.cart.map(item => `
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
`).join('');
    },

    orderSummary() {
        let totalSummary = 0;
        let totalItems = 0;

        this.cart.forEach((item) => {
            totalSummary += item.price * item.amount;
            totalItems += item.amount;
        });

        const totalElements = document.querySelectorAll(classes.total_value);
        totalElements.forEach(element => {
            element.textContent = `$${totalSummary.toFixed(2)}`;
        });
    },

    removeFromCart(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateCartDisplay();
    },

    saveCart() {
        localStorage.setItem(storage_key, JSON.stringify(this.cart));
    }
};