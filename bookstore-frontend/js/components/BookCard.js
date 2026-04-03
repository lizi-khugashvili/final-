export function BookCard(book) {
  return `
    <article class="book-card">
      <div class="book-cover">${book.coverEmoji || "📘"}</div>

      <div class="book-content">
        <div>
          <h3 class="book-title">${book.title}</h3>
          <p class="book-author">${book.author}</p>

          <div class="price">${book.price} ₾</div>

          <div class="book-extra">
            <div class="book-genre">Genre: ${book.genre || "Unknown"}</div>
            <div class="book-stock ${book.inStock ? "in-stock" : "out-stock"}">
              ${book.inStock ? "In Stock" : "Out of Stock"}
            </div>
          </div>
        </div>

        <div class="book-actions">
          <button class="ghost-btn" data-details-id="${book.id}">Details</button>
          <button class="primary-btn" data-add-cart-id="${book.id}">Add to Cart</button>
        </div>
      </div>
    </article>
  `;
}