"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Package, Truck, Check, Clock, AlertTriangle, X, Download, Eye } from "react-feather"
import "../../styles/OrderHistory.css"

const OrderHistory = ({ orders = [] }) => {
  const [expandedOrderId, setExpandedOrderId] = useState(null)
  const [filterStatus, setFilterStatus] = useState("all")

  const toggleOrderExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "processing":
        return <Clock className="status-icon processing" />
      case "shipped":
        return <Truck className="status-icon shipped" />
      case "delivered":
        return <Check className="status-icon delivered" />
      case "cancelled":
        return <X className="status-icon cancelled" />
      case "returned":
        return <Package className="status-icon returned" />
      default:
        return <AlertTriangle className="status-icon" />
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "processing":
        return "Diproses"
      case "shipped":
        return "Dikirim"
      case "delivered":
        return "Terkirim"
      case "cancelled":
        return "Dibatalkan"
      case "returned":
        return "Dikembalikan"
      default:
        return "Tidak Diketahui"
    }
  }

  const filteredOrders = filterStatus === "all" ? orders : orders.filter((order) => order.status === filterStatus)

  return (
    <div className="order-history">
      <motion.div
        className="order-history-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Riwayat Pesanan</h2>
        <div className="order-filter">
          <label htmlFor="status-filter">Filter berdasarkan status:</label>
          <select
            id="status-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="status-filter-select"
          >
            <option value="all">Semua Pesanan</option>
            <option value="processing">Diproses</option>
            <option value="shipped">Dikirim</option>
            <option value="delivered">Terkirim</option>
            <option value="cancelled">Dibatalkan</option>
            <option value="returned">Dikembalikan</option>
          </select>
        </div>
      </motion.div>

      {filteredOrders.length === 0 ? (
        <motion.div
          className="no-orders"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Package size={48} />
          <p>Tidak ada pesanan {filterStatus !== "all" ? `dengan status "${getStatusLabel(filterStatus)}"` : ""}</p>
        </motion.div>
      ) : (
        <motion.div
          className="orders-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredOrders.map((order) => (
            <motion.div
              key={order.id}
              className="order-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              layout
            >
              <div className="order-header" onClick={() => toggleOrderExpand(order.id)}>
                <div className="order-basic-info">
                  <h3>Pesanan #{order.orderNumber}</h3>
                  <p className="order-date">{order.date}</p>
                </div>
                <div className="order-status-info">
                  <div className="status-badge">
                    {getStatusIcon(order.status)}
                    <span>{getStatusLabel(order.status)}</span>
                  </div>
                  <div className="order-amount">Rp {order.totalAmount.toLocaleString()}</div>
                  {expandedOrderId === order.id ? <ChevronUp /> : <ChevronDown />}
                </div>
              </div>

              <AnimatePresence>
                {expandedOrderId === order.id && (
                  <motion.div
                    className="order-details"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="order-tracking">
                      <h4>Status Pengiriman</h4>
                      <div className="tracking-timeline">
                        {order.trackingSteps.map((step, index) => (
                          <div key={index} className={`tracking-step ${step.completed ? "completed" : ""}`}>
                            <div className="step-indicator">{step.completed ? <Check size={16} /> : index + 1}</div>
                            <div className="step-content">
                              <p className="step-title">{step.title}</p>
                              <p className="step-date">{step.date || ""}</p>
                            </div>
                            {index < order.trackingSteps.length - 1 && <div className="step-connector"></div>}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="order-items">
                      <h4>Item Pesanan</h4>
                      <div className="items-list">
                        {order.items.map((item) => (
                          <div key={item.id} className="order-item">
                            <div className="item-image">
                              <img src={item.image || "/placeholder.svg"} alt={item.name} />
                            </div>
                            <div className="item-details">
                              <h5>{item.name}</h5>
                              <p className="item-variant">{item.variant && `Varian: ${item.variant}`}</p>
                              <div className="item-quantity-price">
                                <span className="item-quantity">Jumlah: {item.quantity}</span>
                                <span className="item-price">Rp {item.price.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="order-summary">
                      <h4>Ringkasan Pesanan</h4>
                      <div className="summary-details">
                        <div className="summary-row">
                          <span>Subtotal</span>
                          <span>Rp {order.subtotal.toLocaleString()}</span>
                        </div>
                        <div className="summary-row">
                          <span>Pengiriman</span>
                          <span>Rp {order.shippingCost.toLocaleString()}</span>
                        </div>
                        <div className="summary-row">
                          <span>Pajak</span>
                          <span>Rp {order.tax.toLocaleString()}</span>
                        </div>
                        <div className="summary-row total">
                          <span>Total</span>
                          <span>Rp {order.totalAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="order-actions">
                      <motion.button
                        className="action-button invoice"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Download size={16} />
                        <span>Unduh Invoice</span>
                      </motion.button>
                      <motion.button
                        className="action-button track"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye size={16} />
                        <span>Lacak Pengiriman</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default OrderHistory
