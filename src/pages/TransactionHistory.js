"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "../styles/TransactionHistory.css"

const TransactionHistory = () => {
  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState([])
  const [expandedId, setExpandedId] = useState(null)
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date-desc")
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  })
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Sample transaction data
  const sampleTransactions = [
    {
      id: "order-123456",
      orderNumber: "ECO-123456",
      date: "2023-04-15",
      total: 59.97,
      status: "delivered",
      paymentMethod: "Credit Card",
      shippingMethod: "Standard Shipping",
      items: [
        {
          id: "item1",
          name: "Bamboo Toothbrush Set",
          price: 12.99,
          quantity: 2,
          image: "/bamboo-toothbrush-set.png",
        },
        {
          id: "item2",
          name: "Reusable Produce Bags",
          price: 15.99,
          quantity: 1,
          image: "/reusable-produce-bags.png",
        },
        {
          id: "item3",
          name: "Beeswax Food Wraps",
          price: 18.99,
          quantity: 1,
          image: "/beeswax-food-wraps.png",
        },
      ],
      timeline: [
        {
          status: "ordered",
          date: "2023-04-15",
          time: "10:23 AM",
          description: "Order placed and confirmed",
        },
        {
          status: "processing",
          date: "2023-04-15",
          time: "02:45 PM",
          description: "Order processed and ready for shipping",
        },
        {
          status: "shipped",
          date: "2023-04-16",
          time: "09:30 AM",
          description: "Order shipped via Standard Shipping",
        },
        {
          status: "delivered",
          date: "2023-04-18",
          time: "02:15 PM",
          description: "Order delivered successfully",
        },
      ],
      shippingAddress: {
        name: "John Doe",
        address: "123 Eco Street",
        city: "Green City",
        state: "CA",
        zipCode: "12345",
        country: "United States",
      },
    },
    {
      id: "order-123457",
      orderNumber: "ECO-123457",
      date: "2023-03-28",
      total: 45.99,
      status: "delivered",
      paymentMethod: "PayPal",
      shippingMethod: "Express Shipping",
      items: [
        {
          id: "item4",
          name: "Solar Power Bank",
          price: 45.99,
          quantity: 1,
          image: "/solar-power-bank.png",
        },
      ],
      timeline: [
        {
          status: "ordered",
          date: "2023-03-28",
          time: "03:45 PM",
          description: "Order placed and confirmed",
        },
        {
          status: "processing",
          date: "2023-03-28",
          time: "05:12 PM",
          description: "Order processed and ready for shipping",
        },
        {
          status: "shipped",
          date: "2023-03-29",
          time: "10:30 AM",
          description: "Order shipped via Express Shipping",
        },
        {
          status: "delivered",
          date: "2023-03-30",
          time: "11:45 AM",
          description: "Order delivered successfully",
        },
      ],
      shippingAddress: {
        name: "John Doe",
        address: "123 Eco Street",
        city: "Green City",
        state: "CA",
        zipCode: "12345",
        country: "United States",
      },
    },
    {
      id: "order-123458",
      orderNumber: "ECO-123458",
      date: "2023-04-05",
      total: 28.98,
      status: "shipped",
      paymentMethod: "Credit Card",
      shippingMethod: "Standard Shipping",
      items: [
        {
          id: "item5",
          name: "Recycled Paper Notebook",
          price: 9.99,
          quantity: 2,
          image: "/recycled-paper-notebook.png",
        },
        {
          id: "item6",
          name: "Natural Deodorant",
          price: 14.99,
          quantity: 1,
          image: "/natural-deodorant.png",
        },
      ],
      timeline: [
        {
          status: "ordered",
          date: "2023-04-05",
          time: "11:23 AM",
          description: "Order placed and confirmed",
        },
        {
          status: "processing",
          date: "2023-04-05",
          time: "04:45 PM",
          description: "Order processed and ready for shipping",
        },
        {
          status: "shipped",
          date: "2023-04-06",
          time: "10:15 AM",
          description: "Order shipped via Standard Shipping",
        },
      ],
      shippingAddress: {
        name: "John Doe",
        address: "123 Eco Street",
        city: "Green City",
        state: "CA",
        zipCode: "12345",
        country: "United States",
      },
    },
    {
      id: "order-123459",
      orderNumber: "ECO-123459",
      date: "2023-04-20",
      total: 34.99,
      status: "processing",
      paymentMethod: "Apple Pay",
      shippingMethod: "Standard Shipping",
      items: [
        {
          id: "item7",
          name: "Organic Herb Garden Kit",
          price: 34.99,
          quantity: 1,
          image: "/herb-garden-kit.png",
        },
      ],
      timeline: [
        {
          status: "ordered",
          date: "2023-04-20",
          time: "09:15 AM",
          description: "Order placed and confirmed",
        },
        {
          status: "processing",
          date: "2023-04-20",
          time: "11:30 AM",
          description: "Order processed and ready for shipping",
        },
      ],
      shippingAddress: {
        name: "John Doe",
        address: "123 Eco Street",
        city: "Green City",
        state: "CA",
        zipCode: "12345",
        country: "United States",
      },
    },
    {
      id: "order-123460",
      orderNumber: "ECO-123460",
      date: "2023-04-22",
      total: 12.99,
      status: "ordered",
      paymentMethod: "Credit Card",
      shippingMethod: "Standard Shipping",
      items: [
        {
          id: "item1",
          name: "Bamboo Toothbrush Set",
          price: 12.99,
          quantity: 1,
          image: "/bamboo-toothbrush-set.png",
        },
      ],
      timeline: [
        {
          status: "ordered",
          date: "2023-04-22",
          time: "03:45 PM",
          description: "Order placed and confirmed",
        },
      ],
      shippingAddress: {
        name: "John Doe",
        address: "123 Eco Street",
        city: "Green City",
        state: "CA",
        zipCode: "12345",
        country: "United States",
      },
    },
  ]

  // Load transactions
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTransactions(sampleTransactions)
      setFilteredTransactions(sampleTransactions)
      setLoading(false)
    }, 800)
  }, [])

  // Filter transactions
  useEffect(() => {
    let filtered = [...transactions]

    // Filter by status
    if (activeFilter !== "all") {
      filtered = filtered.filter((transaction) => transaction.status === activeFilter)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (transaction) =>
          transaction.orderNumber.toLowerCase().includes(query) ||
          transaction.items.some((item) => item.name.toLowerCase().includes(query)),
      )
    }

    // Filter by date range
    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start)
      const endDate = new Date(dateRange.end)
      filtered = filtered.filter((transaction) => {
        const transactionDate = new Date(transaction.date)
        return transactionDate >= startDate && transactionDate <= endDate
      })
    }

    // Sort transactions
    switch (sortBy) {
      case "date-desc":
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case "date-asc":
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case "total-desc":
        filtered.sort((a, b) => b.total - a.total)
        break
      case "total-asc":
        filtered.sort((a, b) => a.total - b.total)
        break
      default:
        break
    }

    setFilteredTransactions(filtered)
  }, [transactions, activeFilter, searchQuery, dateRange, sortBy])

  // Toggle transaction details
  const toggleDetails = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "ordered":
        return <i className="fas fa-shopping-cart"></i>
      case "processing":
        return <i className="fas fa-cog"></i>
      case "shipped":
        return <i className="fas fa-shipping-fast"></i>
      case "delivered":
        return <i className="fas fa-check-circle"></i>
      case "cancelled":
        return <i className="fas fa-times-circle"></i>
      default:
        return <i className="fas fa-circle"></i>
    }
  }

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "ordered":
        return "status-ordered"
      case "processing":
        return "status-processing"
      case "shipped":
        return "status-shipped"
      case "delivered":
        return "status-delivered"
      case "cancelled":
        return "status-cancelled"
      default:
        return ""
    }
  }

  // Reset filters
  const resetFilters = () => {
    setActiveFilter("all")
    setSearchQuery("")
    setDateRange({ start: "", end: "" })
    setSortBy("date-desc")
  }

  // Toggle filter sidebar on mobile
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  if (loading) {
    return (
      <div className="transactions-loading">
        <div className="container">
          <div className="loading-spinner"></div>
          <p>Loading your order history...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="transaction-history">
      <div className="container">
        <div className="page-header">
          <h1>Order History</h1>
          <p>Track and manage your orders</p>
        </div>

        <div className="transaction-layout">
          {/* Filter Sidebar */}
          <aside className={`filter-sidebar ${isFilterOpen ? "open" : ""}`}>
            <div className="filter-header">
              <h2>Filters</h2>
              <button className="close-filter" onClick={toggleFilter}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="filter-section">
              <h3>Order Status</h3>
              <div className="filter-options">
                <button
                  className={`filter-option ${activeFilter === "all" ? "active" : ""}`}
                  onClick={() => setActiveFilter("all")}
                >
                  All Orders
                  {activeFilter === "all" && <i className="fas fa-check"></i>}
                </button>
                <button
                  className={`filter-option ${activeFilter === "ordered" ? "active" : ""}`}
                  onClick={() => setActiveFilter("ordered")}
                >
                  Ordered
                  {activeFilter === "ordered" && <i className="fas fa-check"></i>}
                </button>
                <button
                  className={`filter-option ${activeFilter === "processing" ? "active" : ""}`}
                  onClick={() => setActiveFilter("processing")}
                >
                  Processing
                  {activeFilter === "processing" && <i className="fas fa-check"></i>}
                </button>
                <button
                  className={`filter-option ${activeFilter === "shipped" ? "active" : ""}`}
                  onClick={() => setActiveFilter("shipped")}
                >
                  Shipped
                  {activeFilter === "shipped" && <i className="fas fa-check"></i>}
                </button>
                <button
                  className={`filter-option ${activeFilter === "delivered" ? "active" : ""}`}
                  onClick={() => setActiveFilter("delivered")}
                >
                  Delivered
                  {activeFilter === "delivered" && <i className="fas fa-check"></i>}
                </button>
                <button
                  className={`filter-option ${activeFilter === "cancelled" ? "active" : ""}`}
                  onClick={() => setActiveFilter("cancelled")}
                >
                  Cancelled
                  {activeFilter === "cancelled" && <i className="fas fa-check"></i>}
                </button>
              </div>
            </div>

            <div className="filter-section">
              <h3>Date Range</h3>
              <div className="date-range">
                <div className="date-field">
                  <label htmlFor="start-date">From</label>
                  <input
                    type="date"
                    id="start-date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  />
                </div>
                <div className="date-field">
                  <label htmlFor="end-date">To</label>
                  <input
                    type="date"
                    id="end-date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-outline reset-filters" onClick={resetFilters}>
              Reset Filters
            </button>
          </aside>

          {/* Main Content */}
          <div className="transactions-content">
            <div className="transactions-toolbar">
              <button className="filter-toggle" onClick={toggleFilter}>
                <i className="fas fa-filter"></i> Filters
              </button>

              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-btn">
                  <i className="fas fa-search"></i>
                </button>
              </div>

              <div className="sort-dropdown">
                <label htmlFor="sort-by">Sort by:</label>
                <select id="sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="total-desc">Highest Amount</option>
                  <option value="total-asc">Lowest Amount</option>
                </select>
              </div>
            </div>

            <div className="transactions-results">
              <p>
                <span className="result-count">{filteredTransactions.length}</span>{" "}
                {filteredTransactions.length === 1 ? "order" : "orders"} found
              </p>
            </div>

            {filteredTransactions.length === 0 ? (
              <div className="no-transactions">
                <div className="no-transactions-icon">
                  <i className="fas fa-shopping-bag"></i>
                </div>
                <h2>No orders found</h2>
                <p>Try adjusting your filters or search query.</p>
                <button className="btn btn-primary" onClick={resetFilters}>
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="transactions-list">
                {filteredTransactions.map((transaction) => (
                  <div className="transaction-card" key={transaction.id}>
                    <div className="transaction-header">
                      <div className="transaction-info">
                        <div className="order-number">
                          <h3>{transaction.orderNumber}</h3>
                          <span className={`status-badge ${getStatusColor(transaction.status)}`}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </div>
                        <div className="order-date">
                          <i className="far fa-calendar-alt"></i> {formatDate(transaction.date)}
                        </div>
                      </div>
                      <div className="transaction-actions">
                        <div className="order-total">${transaction.total.toFixed(2)}</div>
                        <button
                          className={`toggle-details ${expandedId === transaction.id ? "active" : ""}`}
                          onClick={() => toggleDetails(transaction.id)}
                        >
                          {expandedId === transaction.id ? (
                            <>
                              <span>Hide Details</span>
                              <i className="fas fa-chevron-up"></i>
                            </>
                          ) : (
                            <>
                              <span>View Details</span>
                              <i className="fas fa-chevron-down"></i>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedId === transaction.id && (
                        <motion.div
                          className="transaction-details"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="details-grid">
                            <div className="order-timeline">
                              <h4>Order Timeline</h4>
                              <div className="timeline">
                                {transaction.timeline.map((event, index) => (
                                  <div
                                    className={`timeline-item ${getStatusColor(event.status)} ${
                                      index === transaction.timeline.length - 1 ? "last" : ""
                                    }`}
                                    key={index}
                                  >
                                    <div className="timeline-icon">{getStatusIcon(event.status)}</div>
                                    <div className="timeline-content">
                                      <div className="timeline-title">
                                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                      </div>
                                      <div className="timeline-date">
                                        {formatDate(event.date)} at {event.time}
                                      </div>
                                      <div className="timeline-description">{event.description}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="order-items">
                              <h4>Order Items</h4>
                              <div className="items-list">
                                {transaction.items.map((item) => (
                                  <div className="order-item" key={item.id}>
                                    <div className="item-image">
                                      <img src={item.image || "/placeholder.svg"} alt={item.name} />
                                    </div>
                                    <div className="item-details">
                                      <h5>{item.name}</h5>
                                      <div className="item-meta">
                                        <span className="item-price">${item.price.toFixed(2)}</span>
                                        <span className="item-quantity">Qty: {item.quantity}</span>
                                      </div>
                                    </div>
                                    <div className="item-total">${(item.price * item.quantity).toFixed(2)}</div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="order-info">
                              <h4>Order Information</h4>
                              <div className="info-grid">
                                <div className="info-section">
                                  <h5>Shipping Address</h5>
                                  <p>
                                    {transaction.shippingAddress.name}
                                    <br />
                                    {transaction.shippingAddress.address}
                                    <br />
                                    {transaction.shippingAddress.city}, {transaction.shippingAddress.state}{" "}
                                    {transaction.shippingAddress.zipCode}
                                    <br />
                                    {transaction.shippingAddress.country}
                                  </p>
                                </div>
                                <div className="info-section">
                                  <h5>Payment Method</h5>
                                  <p>{transaction.paymentMethod}</p>
                                  <h5>Shipping Method</h5>
                                  <p>{transaction.shippingMethod}</p>
                                </div>
                              </div>
                            </div>

                            <div className="order-summary">
                              <h4>Order Summary</h4>
                              <div className="summary-table">
                                <div className="summary-row">
                                  <span>Subtotal</span>
                                  <span>${transaction.total.toFixed(2)}</span>
                                </div>
                                <div className="summary-row">
                                  <span>Shipping</span>
                                  <span>$0.00</span>
                                </div>
                                <div className="summary-row">
                                  <span>Tax</span>
                                  <span>$0.00</span>
                                </div>
                                <div className="summary-row total">
                                  <span>Total</span>
                                  <span>${transaction.total.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="details-actions">
                            <button className="btn btn-outline">
                              <i className="fas fa-file-invoice"></i> Download Invoice
                            </button>
                            <button className="btn btn-outline">
                              <i className="fas fa-redo-alt"></i> Reorder
                            </button>
                            <button className="btn btn-outline">
                              <i className="fas fa-question-circle"></i> Need Help?
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionHistory
