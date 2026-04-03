function getCartTotal(cart = []) {
  return cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}

export function CartDrawer(cart = [], isOpen = false) {
  const total = getCartTotal(cart);

  return `
    <div class="cart-overlay ${isOpen ? "show" : ""}" id="cartOverlay">
      <aside class="cart-drawer ${isOpen ? "open" : ""}">
        <div class="cart-header">
  <div class="cart-header-text">
    <h2 class="cart-title">Your Cart</h2>
    <p class="cart-subtitle">Selected books for checkout</p>
  </div>
  <button class="drawer-close-btn" id="closeCartBtn">✕</button>
</div>

        ${
          cart.length === 0
            ? `
              <div class="empty-state" style="margin-top: 20px;">
                Your cart is empty.
              </div>
            `
            : `
              <div class="cart-items">
                ${cart.map(item => `
                  <div class="cart-item">
                    <div class="cart-item-left">
                      <div class="cart-item-cover">${item.coverEmoji || "📘"}</div>
                      <div>
                        <h4 style="margin: 0;">${item.title}</h4>
                        <p style="margin: 6px 0 0; color: #94a3b8;">${item.price} ₾ each</p>
                      </div>
                    </div>

                    <div class="cart-item-right">
                      <div class="cart-qty">
                        <button class="ghost-btn qty-btn" data-decrease-id="${item.id}">−</button>
                        <span>${item.quantity}</span>
                        <button class="ghost-btn qty-btn" data-increase-id="${item.id}">+</button>
                      </div>

                      <div class="cart-item-price">
                        ${item.price * item.quantity} ₾
                      </div>

                      <button class="ghost-btn remove-btn" data-remove-id="${item.id}">
                        Remove
                      </button>
                    </div>
                  </div>
                `).join("")}
              </div>

              <div class="cart-footer">
                <div class="cart-total">
                  <span>Total</span>
                  <strong>${total} ₾</strong>
                </div>

                <button class="primary-btn" id="checkoutBtn">Checkout</button>
              </div>
            `
        }
      </aside>
    </div>
  `;
}