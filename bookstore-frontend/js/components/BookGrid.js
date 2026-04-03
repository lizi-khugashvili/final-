import { BookCard } from "./BookCard.js";

function SkeletonCard() {
  return `
    <article class="book-card skeleton-card">
      <div class="book-cover skeleton-block"></div>

      <div class="book-content">
        <div>
          <div class="skeleton-line skeleton-line-lg"></div>
          <div class="skeleton-line skeleton-line-sm"></div>
          <div class="skeleton-line skeleton-line-price"></div>

          <div class="book-extra">
            <div class="skeleton-line skeleton-line-md"></div>
            <div class="skeleton-line skeleton-line-sm"></div>
          </div>
        </div>

        <div class="book-actions">
          <div class="skeleton-btn"></div>
          <div class="skeleton-btn"></div>
        </div>
      </div>
    </article>
  `;
}

export function BookGrid({ books = [], loading = false, error = "" }) {
  if (loading) {
    return `
      <section class="section">
        <div class="section-top">
          <div>
            <h3 class="section-title">Featured Books</h3>
            <p class="section-subtitle">Loading your storefront collection...</p>
          </div>
        </div>

        <div class="books-grid">
          ${Array.from({ length: 6 }, () => SkeletonCard()).join("")}
        </div>
      </section>
    `;
  }

  if (error) {
    return `
      <section class="section">
        <div class="empty-state better-empty-state">
          <div class="empty-icon">⚠️</div>
          <h3>Something went wrong</h3>
          <p>${error}</p>
        </div>
      </section>
    `;
  }

  if (!books.length) {
    return `
      <section class="section">
        <div class="empty-state better-empty-state">
          <div class="empty-icon">📚</div>
          <h3>No books found</h3>
          <p>Try a different search word, choose another genre, or reset your filters.</p>
          <button class="primary-btn" id="emptyResetBtn">Reset Filters</button>
        </div>
      </section>
    `;
  }

  return `
    <section class="section">
      <div class="section-top">
        <div>
          <h3 class="section-title">Featured Books</h3>
          <p class="section-subtitle">Browse books from your connected catalog</p>
        </div>

        <div class="section-count">${books.length} item(s)</div>
      </div>

      <div class="books-grid">
        ${books.map(book => BookCard(book)).join("")}
      </div>
    </section>
  `;
}