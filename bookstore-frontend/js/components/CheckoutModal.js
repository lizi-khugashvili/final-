function getCartTotal(cart = []) {
  return cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}

export function CheckoutModal(cart = [], isOpen = false) {
  if (!isOpen) {
    return "";
  }

  const total = getCartTotal(cart);

  return `
    <div class="modal-overlay" id="checkoutOverlay">
      <div class="modal-box">
        <button class="modal-close" id="closeCheckoutBtn">✕</button>

        <h2 style="margin-top: 0;">Checkout</h2>
        <p style="color: #94a3b8;">Complete your request and send it to the backend.</p>

        <form id="checkoutForm" class="checkout-form">
          <input
            id="customerName"
            class="checkout-input"
            type="text"
            placeholder="Your name"
            required
          />

          <input
            id="customerEmail"
            class="checkout-input"
            type="email"
            placeholder="Your email"
          />

          <input
            id="customerPhone"
            class="checkout-input"
            type="text"
            placeholder="Your phone number"
          />

          <div class="checkout-summary">
            <span>Total</span>
            <strong>${total} ₾</strong>
          </div>

          <button class="primary-btn" type="submit">Send Checkout Request</button>
        </form>
      </div>
    </div>
  `;
}