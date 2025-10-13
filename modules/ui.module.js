import { DM } from './data.module.js'

export function renderBooks(containerId, books) {
    const bookList = books || DM.getBookList();
    const booksContainer = document.getElementById(containerId);
    if (!containerId) return;

    booksContainer.innerHTML = '';

    if (bookList.length === 0) {
        booksContainer.innerHTML = `
        <div class="no-results">
        <p>Sorry! Nothing found to match your query.</p>
        </div>
        `;
        return;
    } else {
    bookList.forEach((book) => {
        booksContainer.innerHTML += `
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
        `;
    });
}
}