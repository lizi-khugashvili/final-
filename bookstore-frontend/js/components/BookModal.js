export function BookModal(book) {
  if (!book) {
    return "";
  }

  return `
    <div class="modal-overlay" id="modalOverlay">
      <div class="modal-box">
        <button class="modal-close" id="closeModalBtn">✕</button>

        <div class="modal-cover">${book.coverEmoji || "📘"}</div>

        <h2 style="margin-top: 0;">${book.title}</h2>
        <p style="color: #94a3b8; margin-top: 6px;">by ${book.author}</p>

        <div style="margin-top: 16px; font-size: 18px; font-weight: 700;">
          ${book.price} ₾
        </div>

        <div style="margin-top: 12px; color: #cbd5e1;">
          <strong>Genre:</strong> ${book.genre || "Unknown"}
        </div>

        <div style="margin-top: 8px; color: ${book.inStock ? "#86efac" : "#fca5a5"};">
          <strong>Status:</strong> ${book.inStock ? "In Stock" : "Out of Stock"}
        </div>

        <div style="margin-top: 16px; color: #cbd5e1; line-height: 1.6;">
          <strong>Description:</strong><br />
          ${book.description || "No description available."}
        </div>

        <div style="display: flex; gap: 12px; margin-top: 22px;">
          <button class="primary-btn" data-add-cart-id="${book.id}">Add to Cart</button>
          <button class="ghost-btn" id="closeModalBtnSecondary">Close</button>
        </div>
      </div>
    </div>
  `;
}