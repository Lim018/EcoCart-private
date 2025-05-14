"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Package, Truck, Check, Clock } from "react-feather"
import { formatPrice, getOrderStatusText, getOrderStatusColor } from "../../utils/accountUtils"
import "../../styles/OrderHistory.css"

const OrderHistory = ({ orders }) => {
  const [expandedOrders, setExpandedOrders] = useState([])

  // Toggle expanded order
  const toggleOrderExpand = (orderId) => {
    if (expandedOrders.includes(orderId)) {
      setExpandedOrders(expandedOrders.filter((id) => id !== orderId))
    } else {
      setExpandedOrders([...expandedOrders, orderId])
    }
  }

  // Render status icon based on order status
  const renderStatusIcon = (status) => {
    switch (status) {
      case "processing":
        return <Clock size={16} />
      case "shipped":
        return <Truck size={16} />
      case "delivered":
        return <Check size={16} />
      default:
        return <Package size={16} />
    }
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="order-history">
        <div className="order-history-header">
          <h2>Riwayat Pesanan</h2>
        </div>
        <div className="empty-orders">
          <div className="empty-orders-icon">
            <Package size={48} />
          </div>
          <h3>Belum Ada Pesanan</h3>
          <p>Anda belum melakukan pembelian apa pun. Jelajahi produk kami dan mulai belanja!</p>
          <button className="browse-products-btn">Jelajahi Produk</button>
        </div>
      </div>
    )
  }

  return (
    <div className="order-history">
      <div className="order-history-header">
        <h2>Riwayat Pesanan</h2>
        <p>Lihat dan lacak pesanan Anda</p>
      </div>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className={`order-card ${expandedOrders.includes(order.id) ? "expanded" : ""}`}>
            <div className="order-summary" onClick={() => toggleOrderExpand(order.id)}>
              <div className="order-info">
                <div className="order-number">
                  <span className="label">Nomor Pesanan:</span>
                  <span className="value">{order.orderNumber}</span>
                </div>
                <div className="order-date">
                  <span className="label">Tanggal:</span>
                  <span className="value">{order.date}</span>
                </div>
              </div>

              <div className="order-status-price">
                <div className="order-status" style={{ backgroundColor: getOrderStatusColor(order.status) }}>
                  {renderStatusIcon(order.status)}
                  <span>{getOrderStatusText(order.status)}</span>
                </div>
                <div className="order-price">{formatPrice(order.totalAmount)}</div>
              </div>

              <div className="expand-icon">
                {expandedOrders.includes(order.id) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>

            {expandedOrders.includes(order.id) && (
              <div className="order-details">
                <div className="order-tracking">
                  <h4>Status Pengiriman</h4>
                  <div className="tracking-timeline">
                    {order.trackingSteps.map((step, index) => (
                      <div key={index} className={`tracking-step ${step.completed ? "completed" : ""}`}>
                        <div className="step-indicator">
                          {step.completed ? <Check size={16} /> : <Clock size={16} />}
                        </div>
                        <div className="step-content">
                          <div className="step-title">{step.title}</div>
                          <div className="step-date">{step.date || "-"}</div>
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
                          <p className="item-variant">{item.variant}</p>
                          <div className="item-price-qty">
                            <span className="item-price">{formatPrice(item.price)}</span>
                            <span className="item-quantity">x{item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="order-summary-details">
                  <h4>Ringkasan Pembayaran</h4>
                  <div className="summary-items">
                    <div className="summary-item">
                      <span className="label">Subtotal</span>
                      <span className="value">{formatPrice(order.subtotal)}</span>
                    </div>
                    <div className="summary-item">
                      <span className="label">Biaya Pengiriman</span>
                      <span className="value">{formatPrice(order.shippingCost)}</span>
                    </div>
                    <div className="summary-item">
                      <span className="label">Pajak</span>
                      <span className="value">{formatPrice(order.tax)}</span>
                    </div>
                    <div className="summary-item total">
                      <span className="label">Total</span>
                      <span className="value">{formatPrice(order.totalAmount)}</span>
                    </div>
                  </div>
                </div>

                <div className="order-actions">
                  <button className="action-btn track">Lacak Pengiriman</button>
                  <button className="action-btn invoice">Unduh Invoice</button>
                  <button className="action-btn return">Ajukan Pengembalian</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderHistory
