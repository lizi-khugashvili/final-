export function Hero(bookCount = 0) {
  return `
    <section class="hero glass">
      <div class="hero-layout">
        <div>
          <h2>Discover your next favorite book in a cosmic reading space.</h2>
          <p>
            Explore beautifully presented titles, open detailed previews, manage your cart,
            and send a checkout request through your connected backend.
          </p>

          <div class="hero-badges">
            <span class="hero-badge">Premium UI</span>
            <span class="hero-badge">Backend Connected</span>
            <span class="hero-badge">${bookCount} Books Available</span>
          </div>
        </div>

        <div class="hero-side-card">
          <div class="hero-side-number">${bookCount}</div>
          <div class="hero-side-text">Books currently visible in your storefront</div>
        </div>
      </div>
    </section>
  `;
}