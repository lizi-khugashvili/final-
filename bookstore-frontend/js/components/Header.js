export function Header(cartCount) {
  return `
    <header class="header glass">
      <div class="logo">
        <div class="logo-badge">📚</div>
        <div class="logo-text">
          <h1>Cosmic Library</h1>
          <p>Premium online bookstore experience</p>
        </div>
      </div>

      <button class="primary-btn" id="openCartBtn">
        Cart (${cartCount})
      </button>
    </header>
  `;
}