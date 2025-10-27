import { storage_key, classes } from './general.js';
import { DM } from './data.module.js';
import { displayCartItems } from './ui.module.js';

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
            ...structuredClone(item),
            amount: 1,
        });
        this.saveCart();
        this.updateCartDisplay();
    }
    },

    updateCartDisplay() {
        this.updateCounters();
        displayCartItems();
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