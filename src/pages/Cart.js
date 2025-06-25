"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from "@dnd-kit/core"
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { motion, AnimatePresence } from "framer-motion"
import "../styles/Cart.css"

const SortableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <motion.div ref={setNodeRef} style={style} {...attributes} className="cart-item">
      {children(listeners)}
    </motion.div>
  )
}

const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [subtotal, setSubtotal] = useState(0)
  const [shipping, setShipping] = useState(0)
  const [tax, setTax] = useState(0)
  const [total, setTotal] = useState(0)
  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [couponError, setCouponError] = useState("")
  const [couponSuccess, setCouponSuccess] = useState("")
  const [removingItemId, setRemovingItemId] = useState(null)

  const sensors = useSensors(useSensor(PointerSensor))

  // Format harga dalam Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price * 15000)
  }

  // Data contoh item keranjang dengan harga yang dikonversi ke IDR
  const sampleCartItems = [
    {
      id: "item1",
      productId: 1,
      name: "Set Sikat Gigi Bambu",
      price: 12.99,
      quantity: 2,
      image: "/bamboo-toothbrush-set.png",
      maxQuantity: 10,
      sustainabilityScore: 95,
    },
    {
      id: "item2",
      productId: 3,
      name: "Kantong Belanja Reusable",
      price: 15.99,
      quantity: 1,
      image: "/reusable-produce-bags.png",
      maxQuantity: 5,
      sustainabilityScore: 98,
    },
    {
      id: "item3",
      productId: 5,
      name: "Pembungkus Makanan Beeswax",
      price: 18.99,
      quantity: 1,
      image: "/beeswax-food-wraps.png",
      maxQuantity: 8,
      sustainabilityScore: 95,
    },
  ]

  // Muat item keranjang
  useEffect(() => {
    setTimeout(() => {
      setCartItems(sampleCartItems)
      setLoading(false)
    }, 800)
  }, [])

  // Hitung total setiap kali item keranjang berubah
  useEffect(() => {
    if (cartItems.length > 0) {
      const itemsSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const shippingCost = itemsSubtotal > 50 ? 0 : 5.99
      const taxAmount = itemsSubtotal * 0.11 // PPN Indonesia 11%

      setSubtotal(itemsSubtotal)
      setShipping(shippingCost)
      setTax(taxAmount)
      setTotal(itemsSubtotal + shippingCost + taxAmount - discount)
    } else {
      setSubtotal(0)
      setShipping(0)
      setTax(0)
      setTotal(0)
    }
  }, [cartItems, discount])

  // Tangani perubahan jumlah
  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: newQuantity }
        }
        return item
      }),
    )
  }

  // Tangani penghapusan item dengan animasi
  const handleRemoveItem = (itemId) => {
    setRemovingItemId(itemId)
    setTimeout(() => {
      setCartItems(cartItems.filter((item) => item.id !== itemId))
      setRemovingItemId(null)
    }, 500)
  }

  // Tangani drag and drop untuk mengatur ulang item
  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over.id) {
      setCartItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  // Terapkan kode kupon
  const applyCoupon = () => {
    setCouponError("")
    setCouponSuccess("")
    if (couponCode.toLowerCase() === "eco20") {
      const discountAmount = subtotal * 0.2
      setDiscount(discountAmount)
      setCouponSuccess("Diskon 20% berhasil diterapkan!")
    } else if (couponCode.toLowerCase() === "freeship") {
      setShipping(0)
      setCouponSuccess("Gratis ongkir berhasil diterapkan!")
    } else {
      setCouponError("Kode kupon tidak valid")
    }
  }

  // Hitung dampak lingkungan
  const calculateImpact = () => {
    const plasticSaved = cartItems.reduce((sum, item) => {
      return sum + (item.sustainabilityScore / 10) * item.quantity
    }, 0)
    return {
      plasticSaved: Math.round(plasticSaved),
      co2Reduced: Math.round(plasticSaved * 0.5),
    }
  }

  const impact = calculateImpact()

  if (loading) {
    return (
      <div className="cart-loading">
        <div className="container">
          <div className="loading-spinner"></div>
          <p>Memuat keranjang belanja Anda...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="page-header">
          <h1>Keranjang Belanja Anda</h1>
          <p>
            {cartItems.length} {cartItems.length === 1 ? "item" : "item"} dalam keranjang Anda
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <h2>Keranjang Anda kosong</h2>
            <p>Sepertinya Anda belum menambahkan produk apa pun ke keranjang Anda.</p>
            <Link to="/products" className="btn btn-primary">
              Lanjutkan Belanja
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items-container">
              <div className="cart-header">
                <div>Produk</div>
                <div>Harga</div>
                <div>Jumlah</div>
                <div>Total</div>
                <div></div>
              </div>

              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={cartItems.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                  <div className="cart-items">
                    <AnimatePresence>
                      {cartItems.map((item) => (
                        <SortableItem key={item.id} id={item.id}>
                          {(listeners) => (
                            <motion.div
                              className={`cart-item ${removingItemId === item.id ? "removing" : ""}`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="cart-item-main">
                                <div className="drag-handle" {...listeners}>
                                  <i className="fas fa-grip-vertical"></i>
                                </div>

                                <div className="cart-item-product">
                                  {/* <img src={item.image || "/placeholder.svg"} alt={item.name} /> */}
                                  <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <div className="sustainability-badge">
                                      <i className="fas fa-leaf"></i>
                                      <span>Skor Eco: {item.sustainabilityScore}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="cart-item-controls">
                                  <div className="cart-item-price">{formatPrice(item.price)}</div>

                                  <div className="quantity-selector">
                                    <button
                                      className="quantity-btn"
                                      onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                                      disabled={item.quantity <= 1}
                                    >
                                      <i className="fas fa-minus"></i>
                                    </button>
                                    <input
                                      type="number"
                                      value={item.quantity}
                                      min="1"
                                      max={item.maxQuantity}
                                      onChange={(e) =>
                                        handleQuantityChange(
                                          item.id,
                                          Math.min(item.maxQuantity, Math.max(1, Number.parseInt(e.target.value) || 1)),
                                        )
                                      }
                                    />
                                    <button
                                      className="quantity-btn"
                                      onClick={() =>
                                        handleQuantityChange(item.id, Math.min(item.maxQuantity, item.quantity + 1))
                                      }
                                      disabled={item.quantity >= item.maxQuantity}
                                    >
                                      <i className="fas fa-plus"></i>
                                    </button>
                                  </div>

                                  <motion.div
                                    className="cart-item-total"
                                    key={`${item.id}-${item.quantity}`}
                                    initial={{ scale: 1 }}
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    {formatPrice(item.price * item.quantity)}
                                  </motion.div>

                                  <div className="cart-item-actions">
                                    <button
                                      className="remove-item"
                                      onClick={() => handleRemoveItem(item.id)}
                                      aria-label="Hapus item"
                                    >
                                      <i className="fas fa-trash-alt"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </SortableItem>
                      ))}
                    </AnimatePresence>
                  </div>
                </SortableContext>
              </DndContext>

              <div className="cart-instructions">
                <p>
                  <i className="fas fa-info-circle"></i> Geser item untuk mengubah urutan dalam keranjang Anda
                </p>
              </div>
            </div>

            <div className="cart-sidebar">
              <div className="cart-summary">
                <h2>Ringkasan Pesanan</h2>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <motion.span
                    key={subtotal}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {formatPrice(subtotal)}
                  </motion.span>
                </div>

                <div className="summary-row">
                  <span>Pengiriman</span>
                  <motion.span
                    key={shipping}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {shipping === 0 ? "Gratis" : formatPrice(shipping)}
                  </motion.span>
                </div>

                <div className="summary-row">
                  <span>Pajak (PPN 11%)</span>
                  <motion.span
                    key={tax}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {formatPrice(tax)}
                  </motion.span>
                </div>

                {discount > 0 && (
                  <div className="summary-row discount">
                    <span>Diskon</span>
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      -{formatPrice(discount)}
                    </motion.span>
                  </div>
                )}

                <div className="summary-divider"></div>

                <div className="summary-row total">
                  <span>Total</span>
                  <motion.span
                    key={total}
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    {formatPrice(total)}
                  </motion.span>
                </div>

                <div className="coupon-section">
                  <div className="coupon-input">
                    <input
                      type="text"
                      placeholder="Kode kupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button className="btn btn-outline" onClick={applyCoupon} disabled={!couponCode}>
                      Terapkan
                    </button>
                  </div>

                  {couponError && (
                    <div className="coupon-error">
                      <i className="fas fa-exclamation-circle"></i> {couponError}
                    </div>
                  )}

                  {couponSuccess && (
                    <div className="coupon-success">
                      <i className="fas fa-check-circle"></i> {couponSuccess}
                    </div>
                  )}
                </div>

                <Link to="/checkout" className="btn btn-primary checkout-btn">
                  Lanjut ke Pembayaran
                </Link>

                <div className="continue-shopping">
                  <Link to="/products">
                    <i className="fas fa-arrow-left"></i> Lanjutkan Belanja
                  </Link>
                </div>
              </div>

              <div className="environmental-impact">
                <h3>Dampak Lingkungan Anda</h3>
                <div className="impact-stats">
                  <div className="impact-stat">
                    <div className="impact-icon">
                      <i className="fas fa-trash-alt"></i>
                    </div>
                    <div className="impact-value">{impact.plasticSaved}g</div>
                    <div className="impact-label">Plastik Dihemat</div>
                  </div>
                  <div className="impact-stat">
                    <div className="impact-icon">
                      <i className="fas fa-cloud"></i>
                    </div>
                    <div className="impact-value">{impact.co2Reduced}g</div>
                    <div className="impact-label">CO₂ Dikurangi</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
