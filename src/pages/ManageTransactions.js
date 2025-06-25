"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Search,
  Filter,
  MoreVertical,
  Check,
  X,
  Edit,
  Trash2,
  Download,
  RefreshCw,
} from "react-feather"
import "../styles/ManageTransactions.css"
import AdminLayout from "../components/AdminLayout"

// Sample transaction data
const transactionsData = [
  {
    id: "TX-1234",
    customer: "John Doe",
    email: "john.doe@example.com",
    amount: 129.99,
    items: 3,
    date: "2023-07-01T14:30:00",
    status: "completed",
    paymentMethod: "Credit Card",
    products: [
      { id: "P-001", name: "Bamboo Toothbrush Set", quantity: 2, price: 24.99 },
      { id: "P-002", name: "Organic Cotton T-shirt", quantity: 1, price: 79.99 },
    ],
    shippingAddress: "123 Green St, Eco City, EC 12345",
    notes: "Customer requested gift wrapping",
  },
  {
    id: "TX-1235",
    customer: "Jane Smith",
    email: "jane.smith@example.com",
    amount: 89.5,
    items: 2,
    date: "2023-07-01T10:15:00",
    status: "processing",
    paymentMethod: "PayPal",
    products: [
      { id: "P-003", name: "Reusable Produce Bags", quantity: 1, price: 14.5 },
      { id: "P-004", name: "Solar Power Bank", quantity: 1, price: 75.0 },
    ],
    shippingAddress: "456 Sustainable Ave, Green Town, GT 67890",
    notes: "",
  },
  {
    id: "TX-1236",
    customer: "Bob Johnson",
    email: "bob.johnson@example.com",
    amount: 45.75,
    items: 1,
    date: "2023-06-30T16:45:00",
    status: "completed",
    paymentMethod: "Credit Card",
    products: [{ id: "P-005", name: "Beeswax Food Wraps", quantity: 1, price: 45.75 }],
    shippingAddress: "789 Eco Lane, Sustainable City, SC 54321",
    notes: "",
  },
  {
    id: "TX-1237",
    customer: "Alice Brown",
    email: "alice.brown@example.com",
    amount: 199.99,
    items: 4,
    date: "2023-06-30T09:20:00",
    status: "failed",
    paymentMethod: "Credit Card",
    products: [
      { id: "P-006", name: "Recycled Paper Notebook", quantity: 2, price: 24.99 },
      { id: "P-007", name: "Natural Deodorant", quantity: 1, price: 15.99 },
      { id: "P-008", name: "Herb Garden Kit", quantity: 1, price: 134.02 },
    ],
    shippingAddress: "101 Green Blvd, Eco Park, EP 13579",
    notes: "Customer requested expedited shipping",
  },
  {
    id: "TX-1238",
    customer: "Charlie Wilson",
    email: "charlie.wilson@example.com",
    amount: 67.25,
    items: 2,
    date: "2023-06-29T13:10:00",
    status: "processing",
    paymentMethod: "PayPal",
    products: [
      { id: "P-009", name: "Bamboo Toothbrush Set", quantity: 1, price: 24.99 },
      { id: "P-010", name: "Beeswax Food Wraps", quantity: 1, price: 42.26 },
    ],
    shippingAddress: "202 Sustainable St, Green Valley, GV 24680",
    notes: "",
  },
  {
    id: "TX-1239",
    customer: "Diana Miller",
    email: "diana.miller@example.com",
    amount: 149.97,
    items: 3,
    date: "2023-06-29T11:05:00",
    status: "completed",
    paymentMethod: "Credit Card",
    products: [
      { id: "P-011", name: "Organic Cotton T-shirt", quantity: 1, price: 79.99 },
      { id: "P-012", name: "Reusable Produce Bags", quantity: 2, price: 34.99 },
    ],
    shippingAddress: "303 Eco Drive, Sustainable Heights, SH 97531",
    notes: "",
  },
  {
    id: "TX-1240",
    customer: "Edward Jones",
    email: "edward.jones@example.com",
    amount: 89.99,
    items: 1,
    date: "2023-06-28T15:30:00",
    status: "pending",
    paymentMethod: "Bank Transfer",
    products: [{ id: "P-013", name: "Solar Power Bank", quantity: 1, price: 89.99 }],
    shippingAddress: "404 Green Way, Eco Town, ET 86420",
    notes: "Waiting for payment confirmation",
  },
  {
    id: "TX-1241",
    customer: "Fiona Garcia",
    email: "fiona.garcia@example.com",
    amount: 35.98,
    items: 2,
    date: "2023-06-28T09:45:00",
    status: "completed",
    paymentMethod: "Credit Card",
    products: [{ id: "P-014", name: "Recycled Paper Notebook", quantity: 2, price: 17.99 }],
    shippingAddress: "505 Sustainable Road, Green City, GC 75319",
    notes: "",
  },
  {
    id: "TX-1242",
    customer: "George Thompson",
    email: "george.thompson@example.com",
    amount: 129.99,
    items: 1,
    date: "2023-06-27T14:20:00",
    status: "refunded",
    paymentMethod: "PayPal",
    products: [{ id: "P-015", name: "Herb Garden Kit", quantity: 1, price: 129.99 }],
    shippingAddress: "606 Eco Circle, Sustainable Park, SP 24680",
    notes: "Customer requested refund due to damaged package",
  },
  {
    id: "TX-1243",
    customer: "Hannah Lee",
    email: "hannah.lee@example.com",
    amount: 54.97,
    items: 3,
    date: "2023-06-27T10:10:00",
    status: "completed",
    paymentMethod: "Credit Card",
    products: [{ id: "P-016", name: "Natural Deodorant", quantity: 3, price: 18.32 }],
    shippingAddress: "707 Green Avenue, Eco Heights, EH 97531",
    notes: "",
  },
]

const ManageTransactions = () => {
  const [transactions, setTransactions] = useState(transactionsData)
  const [expandedRows, setExpandedRows] = useState({})
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" })
  const [selectedRows, setSelectedRows] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    status: "all",
    dateRange: "all",
    paymentMethod: "all",
  })
  const [showFilters, setShowFilters] = useState(false)
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState(null)
  const [statusUpdating, setStatusUpdating] = useState(null)

  const tableRef = useRef(null)

  // Handle sorting
  const requestSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })

    // Add sorting animation
    if (tableRef.current) {
      tableRef.current.classList.add("sorting")
      setTimeout(() => {
        tableRef.current.classList.remove("sorting")
      }, 500)
    }
  }

  // Get sorted transactions
  const getSortedTransactions = () => {
    const filteredTransactions = transactions.filter((tx) => {
      // Apply search
      const matchesSearch =
        tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.email.toLowerCase().includes(searchTerm.toLowerCase())

      // Apply filters
      const matchesStatus = filters.status === "all" || tx.status === filters.status
      const matchesPayment = filters.paymentMethod === "all" || tx.paymentMethod === filters.paymentMethod

      // Date range filter
      let matchesDate = true
      const txDate = new Date(tx.date)
      const now = new Date()

      if (filters.dateRange === "today") {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        matchesDate = txDate >= today
      } else if (filters.dateRange === "yesterday") {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        yesterday.setHours(0, 0, 0, 0)

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        matchesDate = txDate >= yesterday && txDate < today
      } else if (filters.dateRange === "week") {
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        matchesDate = txDate >= weekAgo
      } else if (filters.dateRange === "month") {
        const monthAgo = new Date()
        monthAgo.setMonth(monthAgo.getMonth() - 1)
        matchesDate = txDate >= monthAgo
      }

      return matchesSearch && matchesStatus && matchesPayment && matchesDate
    })

    return [...filteredTransactions].sort((a, b) => {
      if (sortConfig.key === "date") {
        return sortConfig.direction === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date)
      }

      if (sortConfig.key === "amount") {
        return sortConfig.direction === "asc" ? a.amount - b.amount : b.amount - a.amount
      }

      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1
      }
      return 0
    })
  }

  // Toggle row expansion
  const toggleRowExpand = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Handle row selection
  const toggleRowSelect = (id) => {
    setSelectedRows((prev) => {
      if (prev.includes(id)) {
        return prev.filter((rowId) => rowId !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  // Handle select all
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([])
    } else {
      setSelectedRows(getSortedTransactions().map((tx) => tx.id))
    }
    setSelectAll(!selectAll)
  }

  // Update transaction status
  const updateStatus = (id, newStatus) => {
    setStatusUpdating(id)

    // Simulate API call
    setTimeout(() => {
      setTransactions((prev) => prev.map((tx) => (tx.id === id ? { ...tx, status: newStatus } : tx)))

      setStatusUpdating(null)

      // Show notification
      setNotification({
        message: `Transaction ${id} status updated to ${newStatus}`,
        type: "success",
      })

      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }, 800)
  }

  // Handle bulk actions
  const handleBulkAction = (action) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (action === "delete") {
        setTransactions((prev) => prev.filter((tx) => !selectedRows.includes(tx.id)))
        setNotification({
          message: `${selectedRows.length} transactions deleted`,
          type: "success",
        })
      } else if (action === "export") {
        setNotification({
          message: `${selectedRows.length} transactions exported`,
          type: "success",
        })
      } else if (action.startsWith("status:")) {
        const newStatus = action.split(":")[1]
        setTransactions((prev) => prev.map((tx) => (selectedRows.includes(tx.id) ? { ...tx, status: newStatus } : tx)))
        setNotification({
          message: `${selectedRows.length} transactions updated to ${newStatus}`,
          type: "success",
        })
      }

      setSelectedRows([])
      setSelectAll(false)
      setIsLoading(false)
      setShowBulkActions(false)

      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }, 1000)
  }

  // Reset filters
  const resetFilters = () => {
    setFilters({
      status: "all",
      dateRange: "all",
      paymentMethod: "all",
    })
    setSearchTerm("")
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Update selected rows when transactions change
  useEffect(() => {
    if (selectAll) {
      setSelectedRows(getSortedTransactions().map((tx) => tx.id))
    }
  }, [transactions, filters, searchTerm, selectAll])

  // Get sorted and filtered transactions
  const sortedTransactions = getSortedTransactions()

  return (
    <AdminLayout>
      <div className="manage-transactions-container">
        <header className="transactions-header">
          <h1>Manage Transactions</h1>
          <div className="header-actions">
            <div className="search-container">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="clear-search" onClick={() => setSearchTerm("")}>
                  <X size={16} />
                </button>
              )}
            </div>

            <button
              className={`filter-button ${showFilters ? "active" : ""}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              <span>Filter</span>
            </button>

            <button
              className="refresh-button"
              onClick={() => {
                setIsLoading(true)
                setTimeout(() => setIsLoading(false), 800)
              }}
            >
              <RefreshCw size={18} className={isLoading ? "loading" : ""} />
            </button>
          </div>
        </header>

        {showFilters && (
          <div className="filters-panel">
            <div className="filter-group">
              <label>Status</label>
              <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Date Range</label>
              <select value={filters.dateRange} onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}>
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Payment Method</label>
              <select
                value={filters.paymentMethod}
                onChange={(e) => setFilters({ ...filters, paymentMethod: e.target.value })}
              >
                <option value="all">All Methods</option>
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>

            <button className="reset-filters" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        )}

        {selectedRows.length > 0 && (
          <div className="bulk-actions-bar">
            <div className="selected-count">
              {selectedRows.length} {selectedRows.length === 1 ? "transaction" : "transactions"} selected
            </div>

            <div className="bulk-actions">
              <button className="bulk-action-button" onClick={() => setShowBulkActions(!showBulkActions)}>
                Actions <ChevronDown size={16} />
              </button>

              {showBulkActions && (
                <div className="bulk-actions-dropdown">
                  <button onClick={() => handleBulkAction("status:completed")}>Mark as Completed</button>
                  <button onClick={() => handleBulkAction("status:processing")}>Mark as Processing</button>
                  <button onClick={() => handleBulkAction("export")}>
                    <Download size={14} /> Export Selected
                  </button>
                  <button className="danger" onClick={() => handleBulkAction("delete")}>
                    <Trash2 size={14} /> Delete Selected
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className={`transactions-table-container ${isLoading ? "loading" : ""}`}>
          <table className="transactions-table" ref={tableRef}>
            <thead>
              <tr>
                <th className="checkbox-cell">
                  <input type="checkbox" checked={selectAll} onChange={toggleSelectAll} />
                </th>
                <th
                  className={sortConfig.key === "id" ? `sorted-${sortConfig.direction}` : ""}
                  onClick={() => requestSort("id")}
                >
                  Transaction ID
                  {sortConfig.key === "id" &&
                    (sortConfig.direction === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </th>
                <th
                  className={sortConfig.key === "customer" ? `sorted-${sortConfig.direction}` : ""}
                  onClick={() => requestSort("customer")}
                >
                  Customer
                  {sortConfig.key === "customer" &&
                    (sortConfig.direction === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </th>
                <th
                  className={sortConfig.key === "amount" ? `sorted-${sortConfig.direction}` : ""}
                  onClick={() => requestSort("amount")}
                >
                  Amount
                  {sortConfig.key === "amount" &&
                    (sortConfig.direction === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </th>
                <th
                  className={sortConfig.key === "items" ? `sorted-${sortConfig.direction}` : ""}
                  onClick={() => requestSort("items")}
                >
                  Items
                  {sortConfig.key === "items" &&
                    (sortConfig.direction === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </th>
                <th
                  className={sortConfig.key === "date" ? `sorted-${sortConfig.direction}` : ""}
                  onClick={() => requestSort("date")}
                >
                  Date
                  {sortConfig.key === "date" &&
                    (sortConfig.direction === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </th>
                <th
                  className={sortConfig.key === "status" ? `sorted-${sortConfig.direction}` : ""}
                  onClick={() => requestSort("status")}
                >
                  Status
                  {sortConfig.key === "status" &&
                    (sortConfig.direction === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.length === 0 ? (
                <tr>
                  <td colSpan="8" className="no-results">
                    No transactions found
                  </td>
                </tr>
              ) : (
                sortedTransactions.map((tx) => (
                  <React.Fragment key={tx.id}>
                    <tr className={selectedRows.includes(tx.id) ? "selected" : ""}>
                      <td className="checkbox-cell">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(tx.id)}
                          onChange={() => toggleRowSelect(tx.id)}
                        />
                      </td>
                      <td>{tx.id}</td>
                      <td>
                        <div className="customer-info">
                          <div>{tx.customer}</div>
                          <div className="customer-email">{tx.email}</div>
                        </div>
                      </td>
                      <td>${tx.amount.toFixed(2)}</td>
                      <td>{tx.items}</td>
                      <td>{formatDate(tx.date)}</td>
                      <td>
                        {statusUpdating === tx.id ? (
                          <div className="status-updating">
                            <div className="spinner"></div>
                            Updating...
                          </div>
                        ) : (
                          <span className={`status-badge ${tx.status}`}>
                            {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                          </span>
                        )}
                      </td>
                      <td>
                        <div className="row-actions">
                          <button
                            className="expand-row"
                            onClick={() => toggleRowExpand(tx.id)}
                            aria-label={expandedRows[tx.id] ? "Collapse row" : "Expand row"}
                          >
                            <ChevronRight size={18} className={expandedRows[tx.id] ? "expanded" : ""} />
                          </button>
                          <div className="action-dropdown">
                            <button className="action-dropdown-trigger">
                              <MoreVertical size={18} />
                            </button>
                            <div className="action-dropdown-menu">
                              <button>
                                <Edit size={14} /> Edit
                              </button>
                              <button onClick={() => updateStatus(tx.id, "completed")}>
                                <Check size={14} /> Mark Completed
                              </button>
                              <button onClick={() => updateStatus(tx.id, "processing")}>
                                <RefreshCw size={14} /> Mark Processing
                              </button>
                              <button className="danger">
                                <Trash2 size={14} /> Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    {expandedRows[tx.id] && (
                      <tr className="expanded-row">
                        <td colSpan="8">
                          <div className="expanded-content">
                            <div className="expanded-section">
                              <h4>Products</h4>
                              <table className="products-table">
                                <thead>
                                  <tr>
                                    <th>Product ID</th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {tx.products.map((product) => (
                                    <tr key={product.id}>
                                      <td>{product.id}</td>
                                      <td>{product.name}</td>
                                      <td>{product.quantity}</td>
                                      <td>${product.price.toFixed(2)}</td>
                                      <td>${(product.price * product.quantity).toFixed(2)}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            <div className="expanded-details">
                              <div className="detail-group">
                                <h4>Payment Details</h4>
                                <div className="detail-item">
                                  <span className="detail-label">Method:</span>
                                  <span className="detail-value">{tx.paymentMethod}</span>
                                </div>
                                <div className="detail-item">
                                  <span className="detail-label">Subtotal:</span>
                                  <span className="detail-value">${(tx.amount * 0.9).toFixed(2)}</span>
                                </div>
                                <div className="detail-item">
                                  <span className="detail-label">Tax:</span>
                                  <span className="detail-value">${(tx.amount * 0.1).toFixed(2)}</span>
                                </div>
                                <div className="detail-item total">
                                  <span className="detail-label">Total:</span>
                                  <span className="detail-value">${tx.amount.toFixed(2)}</span>
                                </div>
                              </div>

                              <div className="detail-group">
                                <h4>Shipping Information</h4>
                                <div className="detail-item">
                                  <span className="detail-label">Address:</span>
                                  <span className="detail-value">{tx.shippingAddress}</span>
                                </div>
                              </div>

                              {tx.notes && (
                                <div className="detail-group">
                                  <h4>Notes</h4>
                                  <div className="detail-item">
                                    <span className="detail-value notes">{tx.notes}</span>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="expanded-actions">
                              <button className="action-button">
                                <Download size={14} /> Export
                              </button>
                              <button className="action-button">
                                <Edit size={14} /> Edit
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>

        {notification && <div className={`notification ${notification.type}`}>{notification.message}</div>}
      </div>
    </AdminLayout>
  )
}

export default ManageTransactions
