import "../../styles/SearchResults.css"

const SearchResults = ({ results, isLoading, viewMode, searchQuery }) => {
  // Render skeleton loading
  const renderSkeletons = () => {
    return Array(8)
      .fill()
      .map((_, index) => (
        <div key={index} className={`product-card skeleton ${viewMode}`}>
          <div className="product-image skeleton-image"></div>
          <div className="product-info">
            <div className="skeleton-title"></div>
            <div className="skeleton-category"></div>
            <div className="skeleton-price"></div>
            <div className="skeleton-rating"></div>
          </div>
        </div>
      ))
  }

  // Render hasil pencarian kosong
  const renderEmptyResults = () => {
    return (
      <div className="empty-results">
        <div className="empty-icon">
          <i className="fas fa-search"></i>
        </div>
        <h3>Tidak ada hasil ditemukan</h3>
        <p>
          Tidak ada produk yang cocok dengan "{searchQuery}".
          <br />
          Coba kata kunci lain atau kurangi filter.
        </p>
      </div>
    )
  }

  // Render hasil pencarian
  const renderResults = () => {
    return results.map((product) => (
      <div key={product.id} className={`product-card ${viewMode}`}>
        <div className="product-image">
          <img src={product.image || "/placeholder.svg"} alt={product.name} />
          <div className="eco-score">
            <span>{product.eco_score.toFixed(1)}</span>
            <small>Eco Score</small>
          </div>
        </div>

        <div className="product-info">
          <h3 className="product-name">{highlightMatch(product.name, searchQuery)}</h3>

          <div className="product-category">{highlightMatch(product.category, searchQuery)}</div>

          <div className="product-price">Rp {product.price.toLocaleString("id-ID")}</div>

          <div className="product-rating">
            <div className="stars">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <i key={i} className={`fas fa-star ${i < Math.floor(product.rating) ? "filled" : ""}`}></i>
                ))}
              {product.rating % 1 > 0 && <i className="fas fa-star-half-alt filled"></i>}
            </div>
            <span>{product.rating.toFixed(1)}</span>
          </div>

          <div className="product-tags">
            {product.tags.map((tag) => (
              <span key={tag} className="product-tag">
                {highlightMatch(tag, searchQuery)}
              </span>
            ))}
          </div>

          <div className="product-actions">
            <button className="view-details-btn">Lihat Detail</button>
            <button className="add-to-cart-btn">
              <i className="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
      </div>
    ))
  }

  return (
    <div className={`search-results ${viewMode}-view`}>
      {isLoading ? renderSkeletons() : results.length === 0 ? renderEmptyResults() : renderResults()}
    </div>
  )
}

// Fungsi untuk menyorot bagian yang cocok dengan query
const highlightMatch = (text, query) => {
  if (!query) return text

  const parts = text.split(new RegExp(`(${query})`, "gi"))

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={index} className="highlight">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}

export default SearchResults
