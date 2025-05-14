"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { ShoppingCart, Trash2, Move } from "react-feather"
import "../../styles/Wishlist.css"

const Wishlist = ({ items = [] }) => {
  const [wishlistItems, setWishlistItems] = useState(items)
  const [hoveredItem, setHoveredItem] = useState(null)

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const newItems = Array.from(wishlistItems)
    const [reorderedItem] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, reorderedItem)

    setWishlistItems(newItems)
  }

  const removeFromWishlist = (itemId) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== itemId))
  }

  const addToCart = (itemId) => {
    // Implement add to cart functionality
    console.log(`Added item ${itemId} to cart`)
    // Show success notification
    alert(`Produk telah ditambahkan ke keranjang!`)
  }

  return (
    <div className="wishlist-container">
      <motion.div
        className="wishlist-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Wishlist Saya</h2>
        <p className="drag-instruction">
          <Move size={16} />
          <span>Seret item untuk mengatur ulang wishlist Anda</span>
        </p>
      </motion.div>

      {wishlistItems.length === 0 ? (
        <motion.div
          className="empty-wishlist"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="empty-wishlist-icon">❤️</div>
          <h3>Wishlist Anda Kosong</h3>
          <p>Tambahkan produk ke wishlist Anda untuk menyimpannya di sini.</p>
          <motion.button
            className="browse-products-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location.href = "/products")}
          >
            Jelajahi Produk
          </motion.button>
        </motion.div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="wishlist">
            {(provided) => (
              <motion.div
                className="wishlist-items"
                {...provided.droppableProps}
                ref={provided.innerRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {wishlistItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                    {(provided, snapshot) => (
                      <motion.div
                        className={`wishlist-item ${snapshot.isDragging ? "dragging" : ""}`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        onMouseEnter={() => setHoveredItem(item.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                        }}
                      >
                        <div className="wishlist-item-drag-handle" {...provided.dragHandleProps}>
                          <Move size={20} />
                        </div>

                        <div className="wishlist-item-image">
                          <img src={item.image || "/placeholder.svg"} alt={item.name} />
                          {hoveredItem === item.id && (
                            <motion.div
                              className="quick-add-overlay"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <motion.button
                                className="quick-add-btn"
                                onClick={() => addToCart(item.id)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <ShoppingCart size={16} />
                                <span>Tambah ke Keranjang</span>
                              </motion.button>
                            </motion.div>
                          )}
                        </div>

                        <div className="wishlist-item-details">
                          <h3>{item.name}</h3>
                          <div className="wishlist-item-price">
                            {item.discountPrice ? (
                              <>
                                <span className="original-price">Rp {item.originalPrice.toLocaleString()}</span>
                                <span className="discount-price">Rp {item.discountPrice.toLocaleString()}</span>
                              </>
                            ) : (
                              <span>Rp {item.price.toLocaleString()}</span>
                            )}
                          </div>
                          <div className="wishlist-item-meta">
                            {item.inStock ? (
                              <span className="in-stock">Tersedia</span>
                            ) : (
                              <span className="out-of-stock">Stok Habis</span>
                            )}
                            {item.sustainabilityScore && (
                              <div className="sustainability-score">
                                <span className="score-label">Skor Sustainability:</span>
                                <div className="score-value">
                                  <div className="score-bar" style={{ width: `${item.sustainabilityScore}%` }}></div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="wishlist-item-actions">
                          <motion.button
                            className="action-btn add-to-cart"
                            onClick={() => addToCart(item.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            disabled={!item.inStock}
                          >
                            <ShoppingCart size={16} />
                          </motion.button>
                          <motion.button
                            className="action-btn remove"
                            onClick={() => removeFromWishlist(item.id)}
                            whileHover={{ scale: 1.1, color: "#f44336" }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </motion.div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  )
}

export default Wishlist
