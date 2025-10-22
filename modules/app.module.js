import { renderBooks } from "./ui.module.js";
import { DM } from "./data.module.js"
import { CartModule } from "./cart.module.js";
import { carouselFunc } from './swiper.module.js';

export function addToCart(id) {
    CartModule.addToCart(id);
}

export function updateItemQuantity(action, id) {
    CartModule.updateItemQuantity(action, id);
}

export function removeFromCart(id) {
    CartModule.removeFromCart(id);
}

export function updateCartDisplay() {
    CartModule.updateCartDisplay();
}

export async function initBooks() {
    const bookList = await DM.getBookList();
    const containers = {
        'book-list-sect': bookList.slice(0, 8),
        'new-releases-sect': bookList.slice(7, 15),
        'top-rated-sect': bookList.slice(5, 13),
        'suggestions-sect': bookList.slice(3, 10),
        'popular-sect': bookList.slice(2, 9)
    };

    Object.entries(containers).forEach(([containerId, books]) => {
        if (document.getElementById(containerId)) {
            renderBooks(containerId, books);
        }
    });
    carouselFunc.init();
}

export async function initSearch() {
    let searchTimeout;
    const bookList = await DM.getBookList();

    document.addEventListener('input', (e) => {
        const searchInput = document.getElementById("search_form");
        if (!searchInput) return;

        clearTimeout(searchTimeout);

        searchTimeout = setTimeout(() => {

            const query = e.target.value.toLowerCase().trim();

            if (!query) {
                initBooks();
                return;
            }

            const searched = bookList.filter(book =>
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query) ||
                book.desc.toLowerCase().includes(query)
            );
            const availableContainers = [
                'book-list-sect',     
                'new-releases-sect',   
                'top-rated-sect',       
                'suggestions-sect',    
                'popular-sect'         
            ];

            availableContainers.forEach(containerId => {
                if (document.getElementById(containerId)) {
                    renderBooks(containerId, searched);
                }
            });
        carouselFunc.refresh();

        }, 300);
    });
}

document.addEventListener('click', (e) => {
    
    if (e.target.classList.contains('add-to-cart')) {
        const bookCard = e.target.closest('.book-card');
        if (bookCard && bookCard.dataset.id) {
            const id = Number(bookCard.dataset.id);
            addToCart(id);
        }
        return;
    }
    
    const cartItem = e.target.closest('.cart-item');
    if (!cartItem) return;
    
    const id = Number(cartItem.dataset.id);
    if (e.target.classList.contains('plus')) {
        updateItemQuantity("plus", id);
    } else if (e.target.classList.contains('minus')) {
        updateItemQuantity("minus", id);
    } else if (e.target.classList.contains('remove-btn')) {
        removeFromCart(id);
    }
});