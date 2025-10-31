import { renderBooks } from "./ui.module.js";
import { DM } from "./data.module.js"
import { CartModule } from "./cart.module.js";
import { carouselFunc } from './swiper.module.js';
import { classes, containers } from './general.js';


export async function initBooks() {
    
    showSkeletonsForAllContainers();
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

function showSkeletonsForAllContainers() {

    containers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (container) {
            renderBooks(containerId, [], true); 
        }
    });

}

export async function initSearch() {
    let searchTimeout;
    const bookList = await DM.getBookList();

    document.addEventListener('input', (e) => {
        const searchInput = document.getElementById(classes.search_form);
        if (!searchInput) return;

        clearTimeout(searchTimeout);

        showSkeletonsForAllContainers();

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

            containers.forEach(containerId => {
                if (document.getElementById(containerId)) {
                    renderBooks(containerId, searched);
                }
            });
            carouselFunc.refresh();

        }, 300);
    });
}

document.addEventListener('click', (e) => {

    if (e.target.classList.contains(classes.add_to_cart)) {
        const bookCard = e.target.closest(classes.book_card);
        if (bookCard && bookCard.dataset.id) {
            const id = Number(bookCard.dataset.id);
            CartModule.addToCart(id);
        }
        return;
    }

    const cartItem = e.target.closest(classes.cart_item);
    if (!cartItem) return;

    const id = Number(cartItem.dataset.id);
    if (e.target.classList.contains(classes.plus)) {
        CartModule.updateItemQuantity("plus", id);
    } else if (e.target.classList.contains(classes.minus)) {
        CartModule.updateItemQuantity("minus", id);
    } else if (e.target.classList.contains(classes.remove_btn)) {
        CartModule.removeFromCart(id);
    }
});