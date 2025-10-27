import { DM } from './data.module.js'
import { CartModule } from './cart.module.js';
import { classes } from './general.js';


export function renderBooks(containerId, books, isLoading = false) {
    const bookList = books || DM.getBookList();
    const booksContainer = document.getElementById(containerId);
    if (!booksContainer) return;

    booksContainer.innerHTML = '';

    if (isLoading) {
        showSkeletons(booksContainer);
        return;
    }

    function showSkeletons(container) {
        const skeletonCard = `
            <div class="book-card">
                <div class="book-cover skeleton"></div>
            </div>
    `;
        container.innerHTML = skeletonCard.repeat(8);
    }
    
    if (bookList.length === 0) {
        booksContainer.innerHTML = `
        <div class="no-results">
            <p>Sorry! Nothing found to match your query.</p>
        </div>
    `;
        return;

    } else {
        booksContainer.classList.add('carousel-container');
        booksContainer.innerHTML = bookList.map(book => `
    <div class="book-card" data-id="${book.id}">
        <div class="book-cover">
            <img src="${book.cover}" alt="${book.title}">
        </div>
        <div class="title-price">
            <h3 class="book-title">${book.title}</h3>
            <span class="book-price">$${book.price}</span>
        </div>
        <div class="book-author-rating">
            <p class="book-author">${book.author}</p>
            <div class="book-rating">
                <div class="stars" style="--rating: 5;">★★★★★</div>
            </div>
        </div>
        <p class="book-desc">${book.desc}</p>
        <button class="add-to-cart">Add to Cart</button>
    </div>
`).join('');
    }
}

export function displayCartItems() {
    const container = document.getElementById(classes.cart_items_container);
    if (!container) return;

    if (CartModule.cart.length === 0) {
        container.innerHTML = `
            <div class="cart-but-empty">
                <h2>Your cart is empty right now.</h2>
                <p>Not too late to fill it, though. ;)</p>
                <a href="index.html" class="continue-shopping-btn">Back to Shopping</a>
            </div>
        `;
        return;
    }

    container.innerHTML = CartModule.cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
        <div class="item-info">
            <img class="item-cover" src="${item.cover}" alt="${item.title}"/>
            <div class="item-author-title">
                <h4 class="item-title">${item.title}</h4>
                <p class="item-author">${item.author}</p>
            </div>
            <div class="units-remove">
                <div class="unit">
                <div class="price-units">
                <span class="book-price-cart">$${item.price}</span>
                <div class="units-num">
                    <button class="plus">
                    <img src="imgs/plus.svg" class="plus">
                    </button>
                    <div class="number">${item.amount}</div>
                    <button class="minus">
                    <img src="imgs/minus.svg" class="minus">
                    </button>
                </div>    
                </div>
                </div>
                <button class="remove-btn">
                <img src="imgs/trash.svg" class="remove-btn">
                </button>
            </div>
        </div>
    </div>
`).join('');
}
