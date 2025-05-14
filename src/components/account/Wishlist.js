"use client"

import { useState, useRef } from "react"
import { Heart, ShoppingCart, Trash2, GripVertical, ShoppingBag } from "react-feather"
import { formatPrice } from "../../utils/accountUtils"
import "../../styles/Wishlist.css"

const Wishlist = ({ wishlistItems }) => {
  const [items, setItems] = useState(wishlistItems || [])
  const [draggedItem, setDraggedItem] = useState(null)
  const [hoveredItem, setHoveredItem] = useState(null)
  const dragItem = useRef(null)
  const dragNode = useRef(null)

  // Handle drag start
  const handleDragStart = (e, index) => {
    dragItem.current = index
    dragNode.current = e.currentTarget
    dragNode.current.addEventListener("dragend", handleDragEnd)

    // Add a delay to apply the dragging class for animation
    setTimeout(() => {
      setDraggedItem(index)
    }, 0)
  }

  // Handle drag enter
  const handleDragEnter = (e, index) => {
    if (dragItem.current === index) return

    // Reorder the items
    const newItems = [...items]
    const draggedItemContent = newItems[dragItem.current]
    newItems.splice(dragItem.current, 1)
    newItems.splice(index, 0, draggedItemContent)

    dragItem.current = index
    setItems(newItems)
  }

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedItem(null)
    dragNode.current.removeEventListener("dragend", handleDragEnd)
    dragItem.current = null
    dragNode.current = null
  }

  // Handle mouse enter for hover effect
  const handleMouseEnter = (index) => {
    setHoveredItem(index)
  }

  // Handle mouse leave for hover effect
  const handleMouseLeave = () => {
    setHoveredItem(null)
  }

  // Remove item from wishlist
  const removeFromWishlist = (index) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    setItems(newItems)
  }

  // Add item to cart
  const addToCart = (item) => {
    console.log("Added to cart:", item)
    // Implementasi penambahan ke keranjang akan ditambahkan nanti
  }

  if (!items || items.length === 0) {
    return (
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h2>Wishlist Saya</h2>
        </div>
        <div className="empty-wishlist">
          <div className="empty-wishlist-icon">
            <Heart size={48} />
          </div>
          <h3>Wishlist Anda Kosong</h3>
          <p>Simpan produk favorit Anda di sini untuk melihatnya nanti.</p>
          <button className="browse-products-btn">Jelajahi Produk</button>
        </div>
      </div>
    )
  }

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h2>Wishlist Saya</h2>
        <div className="drag-instruction">
          <GripVertical size={16} />
          <span>Seret untuk mengatur ulang</span>
        </div>
      </div>

      <div className="wishlist-items">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`wishlist-item ${draggedItem === index ? "dragging" : ""}`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="wishlist-item-drag-handle">
              <GripVertical size={20} />
            </div>

            <div
              className="wishlist-item-image"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <img src={item.image || "/placeholder.svg"} alt={item.name} />
              {hoveredItem === index && (
                <div className="quick-add-overlay">
                  <button className="quick-add-btn" onClick={() => addToCart(item)} disabled={!item.inStock}>
                    <ShoppingBag size={16} />
                    <span>Tambah ke Keranjang</span>
                  </button>
                </div>
              )}
            </div>

            <div className="wishlist-item-details">
              <h3>{item.name}</h3>
              <div className="wishlist-item-price">
                {item.originalPrice ? (
                  <>
                    <span className="original-price">{formatPrice(item.originalPrice)}</span>
                    <span className="discount-price">{formatPrice(item.discountPrice)}</span>
                  </>
                ) : (
                  <span className="discount-price">{formatPrice(item.price)}</span>
                )}
              </div>
              <div className="wishlist-item-meta">
                {item.inStock ? (
                  <span className="in-stock">Stok Tersedia</span>
                ) : (
                  <span className="out-of-stock">Stok Habis</span>
                )}
                <div className="sustainability-score">
                  <span className="score-label">Skor Keberlanjutan:</span>
                  <div className="score-value">
                    <div className="score-bar" style={{ width: `${item.sustainabilityScore}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="wishlist-item-actions">
              <button className="action-btn add-to-cart" onClick={() => addToCart(item)} disabled={!item.inStock}>
                <ShoppingCart size={18} />
              </button>
              <button className="action-btn remove" onClick={() => removeFromWishlist(index)}>
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist
