"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "../styles/QuickViewModal.css"

const QuickViewModal = ({ product, onClose }) => {
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  // Filter out placeholder images and take the first valid image
  const productImages = [
    product.image,
    product.comparisonImage,
    "/placeholder.svg?key=b6bkb",
    "/placeholder.svg?key=wspvl",
  ].filter(image => image && !image.includes("placeholder.svg"));

  // Set activeImage to 0 if valid images exist, otherwise -1
  useEffect(() => {
    if (productImages.length === 0) {
      setActiveImage(-1);
    } else if (activeImage >= productImages.length) {
      setActiveImage(0);
    }
  }, [productImages, activeImage]);

  // Format price in IDR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
  }

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "auto"
    }
  }, [onClose])

  // Prevent click inside modal from closing it
  const handleModalClick = (e) => {
    e.stopPropagation()
  }

  // Increment quantity
  const incrementQuantity = () => {
    setQuantity(quantity + 1)
  }

  // Decrement quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="quick-view-modal" onClick={handleModalClick}>
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        <div className="modal-content">
          <div className="modal-gallery">
            {productImages.length > 0 && (
              <div className="main-image">
                <img src={productImages[0]} alt={product.name} />
              </div>
            )}
          </div>

          <div className="modal-info">
            <h2>{product.name}</h2>

            <div className="modal-price">{formatPrice(product.price)}</div>

            <div className="modal-rating">
              <div className="stars" style={{ "--rating": product.rating }}></div>
              <span className="review-count">{product.reviewCount} ulasan</span>
            </div>

            <div className="modal-description">{product.description}</div>

            <div className="sustainability-impact">
              <h4>Dampak Lingkungan</h4>
              <div className="impact-meter">
                <div className="impact-bar">
                  <div className="impact-fill" style={{ width: `${product.sustainabilityScore}%` }}></div>
                </div>
                <div className="impact-score">{product.sustainabilityScore}/100</div>
              </div>
              <ul className="impact-list">
                {Object.entries(product.impact).map(([key, value]) => (
                  <li key={key}>
                    <i className="fas fa-leaf"></i> {value}
                  </li>
                ))}
              </ul>
            </div>

            <div className="modal-actions">
              <div className="quantity-selector">
                <button className="quantity-btn" onClick={decrementQuantity}>
                  <i className="fas fa-minus"></i>
                </button>
                <input type="number" value={quantity} readOnly />
                <button className="quantity-btn" onClick={incrementQuantity}>
                  <i className="fas fa-plus"></i>
                </button>
              </div>

              <button className="btn btn-primary add-to-cart-btn">
                <i className="fas fa-shopping-cart"></i> Tambahkan ke Keranjang
              </button>
            </div>

            {/* <div className="modal-footer">
              <Link to={`/products/${product.id}`} className="view-details">
                Lihat Detail Lengkap <i className="fas fa-arrow-right"></i>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickViewModal