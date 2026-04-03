export function Toolbar({ search, genre, sort }) {
  return `
    <section class="section">
      <div class="glass toolbar-box">
        <h3 class="toolbar-title">Search & Filters</h3>
        <p class="toolbar-subtitle">Search by title, filter by genre, and sort by price.</p>

        <div class="toolbar-grid">
          <input
            id="searchInput"
            type="text"
            placeholder="Type title and press Enter..."
            value="${search}"
            class="toolbar-control"
          />

          <select id="genreSelect" class="toolbar-control toolbar-select">
            <option value="All Genres" ${genre === "All Genres" ? "selected" : ""}>All Genres</option>
            <option value="Fantasy" ${genre === "Fantasy" ? "selected" : ""}>Fantasy</option>
            <option value="Sci-Fi" ${genre === "Sci-Fi" ? "selected" : ""}>Sci-Fi</option>
            <option value="Classic" ${genre === "Classic" ? "selected" : ""}>Classic</option>
            <option value="Self-Help" ${genre === "Self-Help" ? "selected" : ""}>Self-Help</option>
          </select>

          <select id="sortSelect" class="toolbar-control toolbar-select">
            <option value="Default" ${sort === "Default" ? "selected" : ""}>Default</option>
            <option value="Price: Low to High" ${sort === "Price: Low to High" ? "selected" : ""}>Price: Low to High</option>
            <option value="Price: High to Low" ${sort === "Price: High to Low" ? "selected" : ""}>Price: High to Low</option>
          </select>

          <button id="resetBtn" class="primary-btn toolbar-reset-btn">Reset</button>
        </div>
      </div>
    </section>
  `;
}