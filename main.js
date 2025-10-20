import { CartModule } from './modules/cart.module.js';
import { initBooks, initSearch, updateCartDisplay } from './modules/app.module.js';

document.addEventListener('DOMContentLoaded', () => {
    CartModule.init();
    initBooks();
    initSearch();
});