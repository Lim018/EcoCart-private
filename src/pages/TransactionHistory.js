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

  // Format price in IDR
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price)
  }

  // Sample transaction data with converted prices to IDR
  const sampleTransactions = [
    {
      id: "order-123456",
      orderNumber: "ECO-123456",
      date: "2023-04-15",
      total: 899550, // 59.97 USD * 15000
      status: "delivered",
      paymentMethod: "Kartu Kredit",
      shippingMethod: "Pengiriman Standar",
      items: [
        {
          id: "item1",
          name: "Set Sikat Gigi Bambu",
          price: 194850, // 12.99 USD * 15000
          quantity: 2,
          image: "/bamboo-toothbrush-set.png",
        },
        {
          id: "item2",
          name: "Kantong Belanja Reusable",
          price: 239850, // 15.99 USD * 15000
          quantity: 1,
          image: "/reusable-produce-bags.png",
        },
        {
          id: "item3",
          name: "Pembungkus Makanan Beeswax",
          price: 284850, // 18.99 USD * 15000
          quantity: 1,
          image: "/beeswax-food-wraps.png",
        },
      ],
      timeline: [
        {
          status: "ordered",
          date: "2023-04-15",
          time: "10:23",
          description: "Pesanan dibuat dan dikonfirmasi",
        },
        {
          status: "processing",
          date: "2023-04-15",
          time: "14:45",
          description: "Pesanan diproses dan siap untuk pengiriman",
        },
        {
          status: "shipped",
          date: "2023-04-16",
          time: "09:30",
          description: "Pesanan dikirim melalui Pengiriman Standar",
        },
        {
          status: "delivered",
          date: "2023-04-18",
          time: "14:15",
          description: "Pesanan berhasil diantar",
        },
      ],
      shippingAddress: {
        name: "Budi Santoso",
        address: "Jl. Eco No. 123",
        city: "Jakarta",
        state: "DKI Jakarta",
        zipCode: "12345",
        country: "Indonesia",
      },
    },
    {
      id: "order-123457",
      orderNumber: "ECO-123457",
      date: "2023-03-28",
      total: 689850, // 45.99 USD * 15000
      status: "delivered",
      paymentMethod: "PayPal",
      shippingMethod: "Pengiriman Ekspres",
      items: [
        {
          id: "item4",
          name: "Power Bank Tenaga Surya",
          price: 689850, // 45.99 USD * 15000
          quantity: 1,
          image: "/solar-power-bank.png",
        },
      ],
      timeline: [
        {
          status: "ordered",
          date: "2023-03-28",
          time: "15:45",
          description: "Pesanan dibuat dan dikonfirmasi",
        },
        {
          status: "processing",
          date: "2023-03-28",
          time: "17:12",
          description: "Pesanan diproses dan siap untuk pengiriman",
        },
        {
          status: "shipped",
          date: "2023-03-29",
          time: "10:30",
          description: "Pesanan dikirim melalui Pengiriman Ekspres",
        },
        {
          status: "delivered",
          date: "2023-03-30",
          time: "11:45",
          description: "Pesanan berhasil diantar",
        },
      ],
      shippingAddress: {
        name: "Budi Santoso",
        address: "Jl. Eco No. 123",
        city: "Jakarta",
        state: "DKI Jakarta",
        zipCode: "12345",
        country: "Indonesia",
      },
    },
    {
      id: "order-123458",
      orderNumber: "ECO-123458",
      date: "2023-04-05",
      total: 434700, // 28.98 USD * 15000
      status: "shipped",
      paymentMethod: "Kartu Kredit",
      shippingMethod: "Pengiriman Standar",
      items: [
        {
          id: "item5",
          name: "Buku Catatan Kertas Daur Ulang",
          price: 149850, // 9.99 USD * 15000
          quantity: 2,
          image: "/recycled-paper-notebook.png",
        },
        {
          id: "item6",
          name: "Deodoran Alami",
          price: 224850, // 14.99 USD * 15000
          quantity: 1,
          image: "/natural-deodorant.png",
        },
      ],
      timeline: [
        {
          status: "ordered",
          date: "2023-04-05",
          time: "11:23",
          description: "Pesanan dibuat dan dikonfirmasi",
        },
        {
          status: "processing",
          date: "2023-04-05",
          time: "16:45",
          description: "Pesanan diproses dan siap untuk pengiriman",
        },
        {
          status: "shipped",
          date: "2023-04-06",
          time: "10:15",
          description: "Pesanan dikirim melalui Pengiriman Standar",
        },
      ],
      shippingAddress: {
        name: "Budi Santoso",
        address: "Jl. Eco No. 123",
        city: "Jakarta",
        state: "DKI Jakarta",
        zipCode: "12345",
        country: "Indonesia",
      },
    },
    {
      id: "order-123459",
      orderNumber: "ECO-123459",
      date: "2023-04-20",
      total: 524850, // 34.99 USD * 15000
      status: "processing",
      paymentMethod: "Apple Pay",
      shippingMethod: "Pengiriman Standar",
      items: [
        {
          id: "item7",
          name: "Kit Kebun Herbal Organik",
          price: 524850, // 34.99 USD * 15000
          quantity: 1,
          image: "/herb-garden-kit.png",
        },
      ],
      timeline: [
        {
          status: "ordered",
          date: "2023-04-20",
          time: "09:15",
          description: "Pesanan dibuat dan dikonfirmasi",
        },
        {
          status: "processing",
          date: "2023-04-20",
          time: "11:30",
          description: "Pesanan diproses dan siap untuk pengiriman",
        },
      ],
      shippingAddress: {
        name: "Budi Santoso",
        address: "Jl. Eco No. 123",
        city: "Jakarta",
        state: "DKI Jakarta",
        zipCode: "12345",
        country: "Indonesia",
      },
    },
    {
      id: "order-123460",
      orderNumber: "ECO-123460",
      date: "2023-04-22",
      total: 194850, // 12.99 USD * 15000
      status: "ordered",
      paymentMethod: "Kartu Kredit",
      shippingMethod: "Pengiriman Standar",
      items: [
        {
          id: "item1",
          name: "Set Sikat Gigi Bambu",
          price: 194850, // 12.99 USD * 15000
          quantity: 1,
          image: "/bamboo-toothbrush-set.png",
        },
      ],
      timeline: [
        {
          status: "ordered",
          date: "2023-04-22",
          time: "15:45",
          description: "Pesanan dibuat dan dikonfirmasi",
        },
      ],
      shippingAddress: {
        name: "Budi Santoso",
        address: "Jl. Eco No. 123",
        city: "Jakarta",
        state: "DKI Jakarta",
        zipCode: "12345",
        country: "Indonesia",
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
    return new Date(dateString).toLocaleDateString("id-ID", options)
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

  // Get status text in Indonesian
  const getStatusText = (status) => {
    switch (status) {
      case "ordered":
        return "Dipesan"
      case "processing":
        return "Diproses"
      case "shipped":
        return "Dikirim"
      case "delivered":
        return "Diterima"
      case "cancelled":
        return "Dibatalkan"
      default:
        return status
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
          <p>Memuat riwayat pesanan Anda...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="transaction-history">
      <div className="container">
        <div className="page-header">
          <h1>Riwayat Pesanan</h1>
          <p>Lacak dan kelola pesanan Anda</p>
        </div>

        <div className="transaction-layout">
          {/* Filter Sidebar */}
          <aside className={`filter-sidebar ${isFilterOpen ? "open" : ""}`}>
            <div className="filter-header">
              <h2>Filter</h2>
              <button className="close-filter" onClick={toggleFilter}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="filter-section">
              <h3>Status Pesanan</h3>
              <div className="filter-options">
                <button
                  className={`filter-option ${activeFilter === "all" ? "active" : ""}`}
                  onClick={() => setActiveFilter("all")}
                >
                  Semua Pesanan
                  {activeFilter === "all" && <i className="fas fa-check"></i>}
                </button>
                <button
                  className={`filter-option ${activeFilter === "ordered" ? "active" : ""}`}
                  onClick={() => setActiveFilter("ordered")}
                >
                  Dipesan
                  {activeFilter === "ordered" && <i className="fas fa-check"></i>}
                </button>
                <button
                  className={`filter-option ${activeFilter === "processing" ? "active" : ""}`}
                  onClick={() => setActiveFilter("processing")}
                >
                  Diproses
                  {activeFilter === "processing" && <i className="fas fa-check"></i>}
                </button>
                <button
                  className={`filter-option ${activeFilter === "shipped" ? "active" : ""}`}
                  onClick={() => setActiveFilter("shipped")}
                >
                  Dikirim
                  {activeFilter === "shipped" && <i className="fas fa-check"></i>}
                </button>
                <button
                  className={`filter-option ${activeFilter === "delivered" ? "active" : ""}`}
                  onClick={() => setActiveFilter("delivered")}
                >
                  Diterima
                  {activeFilter === "delivered" && <i className="fas fa-check"></i>}
                </button>
                <button
                  className={`filter-option ${activeFilter === "cancelled" ? "active" : ""}`}
                  onClick={() => setActiveFilter("cancelled")}
                >
                  Dibatalkan
                  {activeFilter === "cancelled" && <i className="fas fa-check"></i>}
                </button>
              </div>
            </div>

            <div className="filter-section">
              <h3>Rentang Tanggal</h3>
              <div className="date-range">
                <div className="date-field">
                  <label htmlFor="start-date">Dari</label>
                  <input
                    type="date"
                    id="start-date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  />
                </div>
                <div className="date-field">
                  <label htmlFor="end-date">Sampai</label>
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
              Reset Filter
            </button>
          </aside>

          {/* Main Content */}
          <div className="transactions-content">
            <div className="transactions-toolbar">
              <button className="filter-toggle" onClick={toggleFilter}>
                <i className="fas fa-filter"></i> Filter
              </button>

              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Cari pesanan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-btn">
                  <i className="fas fa-search"></i>
                </button>
              </div>

              <div className="sort-dropdown">
                <label htmlFor="sort-by">Urutkan:</label>
                <select id="sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="date-desc">Terbaru</option>
                  <option value="date-asc">Terlama</option>
                  <option value="total-desc">Jumlah Tertinggi</option>
                  <option value="total-asc">Jumlah Terendah</option>
                </select>
              </div>
            </div>

            <div className="transactions-results">
              <p>
                <span className="result-count">{filteredTransactions.length}</span>{" "}
                {filteredTransactions.length === 1 ? "pesanan" : "pesanan"} ditemukan
              </p>
            </div>

            {filteredTransactions.length === 0 ? (
              <div className="no-transactions">
                <div className="no-transactions-icon">
                  <i className="fas fa-shopping-bag"></i>
                </div>
                <h2>Tidak ada pesanan ditemukan</h2>
                <p>Coba sesuaikan filter atau kata kunci pencarian Anda.</p>
                <button className="btn btn-primary" onClick={resetFilters}>
                  Reset Filter
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
                            {getStatusText(transaction.status)}
                          </span>
                        </div>
                        <div className="order-date">
                          <i className="far fa-calendar-alt"></i> {formatDate(transaction.date)}
                        </div>
                      </div>
                      <div className="transaction-actions">
                        <div className="order-total">{formatPrice(transaction.total)}</div>
                        <button
                          className={`toggle-details ${expandedId === transaction.id ? "active" : ""}`}
                          onClick={() => toggleDetails(transaction.id)}
                        >
                          {expandedId === transaction.id ? (
                            <>
                              <span>Sembunyikan Detail</span>
                              <i className="fas fa-chevron-up"></i>
                            </>
                          ) : (
                            <>
                              <span>Lihat Detail</span>
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
                              <h4>Timeline Pesanan</h4>
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
                                      <div className="timeline-title">{getStatusText(event.status)}</div>
                                      <div className="timeline-date">
                                        {formatDate(event.date)} pukul {event.time}
                                      </div>
                                      <div className="timeline-description">{event.description}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="order-items">
                              <h4>Item Pesanan</h4>
                              <div className="items-list">
                                {transaction.items.map((item) => (
                                  <div className="order-item" key={item.id}>
                                    <div className="item-image">
                                      <img src={item.image || "/placeholder.svg"} alt={item.name} />
                                    </div>
                                    <div className="item-details">
                                      <h5>{item.name}</h5>
                                      <div className="item-meta">
                                        <span className="item-price">{formatPrice(item.price)}</span>
                                        <span className="item-quantity">Jumlah: {item.quantity}</span>
                                      </div>
                                    </div>
                                    <div className="item-total">{formatPrice(item.price * item.quantity)}</div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="order-info">
                              <h4>Informasi Pesanan</h4>
                              <div className="info-grid">
                                <div className="info-section">
                                  <h5>Alamat Pengiriman</h5>
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
                                  <h5>Metode Pembayaran</h5>
                                  <p>{transaction.paymentMethod}</p>
                                  <h5>Metode Pengiriman</h5>
                                  <p>{transaction.shippingMethod}</p>
                                </div>
                              </div>
                            </div>

                            <div className="order-summary">
                              <h4>Ringkasan Pesanan</h4>
                              <div className="summary-table">
                                <div className="summary-row">
                                  <span>Subtotal</span>
                                  <span>{formatPrice(transaction.total)}</span>
                                </div>
                                <div className="summary-row">
                                  <span>Pengiriman</span>
                                  <span>Rp0</span>
                                </div>
                                <div className="summary-row">
                                  <span>Pajak</span>
                                  <span>Rp0</span>
                                </div>
                                <div className="summary-row total">
                                  <span>Total</span>
                                  <span>{formatPrice(transaction.total)}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="details-actions">
                            <button className="btn btn-outline">
                              <i className="fas fa-file-invoice"></i> Unduh Faktur
                            </button>
                            <button className="btn btn-outline">
                              <i className="fas fa-redo-alt"></i> Pesan Ulang
                            </button>
                            <button className="btn btn-outline">
                              <i className="fas fa-question-circle"></i> Butuh Bantuan?
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
