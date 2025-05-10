"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ShoppingBag,
  Users,
  Clock,
  MoreVertical,
  Maximize2,
  X,
  RefreshCw,
} from "react-feather"
import "../styles/Dashboard.css"

// Sample data for charts
const salesData = [
  { name: "Jan", eco: 4000, conventional: 2400 },
  { name: "Feb", eco: 3000, conventional: 1398 },
  { name: "Mar", eco: 2000, conventional: 9800 },
  { name: "Apr", eco: 2780, conventional: 3908 },
  { name: "May", eco: 1890, conventional: 4800 },
  { name: "Jun", eco: 2390, conventional: 3800 },
  { name: "Jul", eco: 3490, conventional: 4300 },
]

const customerData = [
  { name: "Jan", new: 400, returning: 240 },
  { name: "Feb", new: 300, returning: 139 },
  { name: "Mar", new: 200, returning: 980 },
  { name: "Apr", new: 278, returning: 390 },
  { name: "May", new: 189, returning: 480 },
  { name: "Jun", new: 239, returning: 380 },
  { name: "Jul", new: 349, returning: 430 },
]

const productCategoryData = [
  { name: "Personal Care", value: 400 },
  { name: "Home Goods", value: 300 },
  { name: "Apparel", value: 300 },
  { name: "Food & Drink", value: 200 },
  { name: "Accessories", value: 100 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

const recentTransactions = [
  { id: "TX-1234", customer: "John Doe", amount: 129.99, date: "2023-07-01", status: "completed" },
  { id: "TX-1235", customer: "Jane Smith", amount: 89.5, date: "2023-07-01", status: "processing" },
  { id: "TX-1236", customer: "Bob Johnson", amount: 45.75, date: "2023-06-30", status: "completed" },
  { id: "TX-1237", customer: "Alice Brown", amount: 199.99, date: "2023-06-30", status: "failed" },
  { id: "TX-1238", customer: "Charlie Wilson", amount: 67.25, date: "2023-06-29", status: "processing" },
]

// Widget components
const DashboardWidget = ({ id, title, children, onRemove, onMaximize, refreshData }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = () => {
    setIsLoading(true)
    refreshData()
    setTimeout(() => setIsLoading(false), 800)
  }

  return (
    <div className="dashboard-widget">
      <div className="widget-header">
        <h3>{title}</h3>
        <div className="widget-actions">
          <button className={`widget-action refresh ${isLoading ? "loading" : ""}`} onClick={handleRefresh}>
            <RefreshCw size={16} />
          </button>
          <button className="widget-action" onClick={() => onMaximize(id)}>
            <Maximize2 size={16} />
          </button>
          <button className="widget-action" onClick={() => onRemove(id)}>
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="widget-content">{children}</div>
    </div>
  )
}

// KPI Card Component
const KPICard = ({ title, value, change, icon, color }) => {
  const isPositive = change > 0

  return (
    <div className="kpi-card">
      <div className="kpi-icon" style={{ backgroundColor: `${color}20` }}>
        {icon}
      </div>
      <div className="kpi-content">
        <h4>{title}</h4>
        <div className="kpi-value">{value}</div>
        <div className={`kpi-change ${isPositive ? "positive" : "negative"}`}>
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(change)}%
        </div>
      </div>
    </div>
  )
}

// Dashboard Component
const Dashboard = () => {
  const [widgets, setWidgets] = useState([
    { id: "kpi", title: "Key Performance Indicators", type: "kpi" },
    { id: "sales", title: "Sales Overview", type: "sales" },
    { id: "customers", title: "Customer Growth", type: "customers" },
    { id: "categories", title: "Sales by Category", type: "categories" },
    { id: "transactions", title: "Recent Transactions", type: "transactions" },
  ])

  const [maximizedWidget, setMaximizedWidget] = useState(null)
  const [isUpdating, setIsUpdating] = useState(false)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true)
      setTimeout(() => setIsUpdating(false), 500)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(widgets)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setWidgets(items)
  }

  const removeWidget = (id) => {
    setWidgets(widgets.filter((widget) => widget.id !== id))
  }

  const maximizeWidget = (id) => {
    setMaximizedWidget(widgets.find((widget) => widget.id === id))
  }

  const closeMaximizedWidget = () => {
    setMaximizedWidget(null)
  }

  const refreshData = () => {
    // In a real app, this would fetch fresh data
    console.log("Refreshing data...")
  }

  const renderWidgetContent = (widget) => {
    switch (widget.type) {
      case "kpi":
        return (
          <div className="kpi-grid">
            <KPICard
              title="Total Revenue"
              value="$24,567"
              change={12.5}
              icon={<DollarSign color="#4CAF50" />}
              color="#4CAF50"
            />
            <KPICard
              title="Total Orders"
              value="1,234"
              change={8.2}
              icon={<ShoppingBag color="#2196F3" />}
              color="#2196F3"
            />
            <KPICard title="New Customers" value="356" change={-2.4} icon={<Users color="#FF9800" />} color="#FF9800" />
            <KPICard
              title="Avg. Order Time"
              value="42 min"
              change={-5.1}
              icon={<Clock color="#9C27B0" />}
              color="#9C27B0"
            />
          </div>
        )
      case "sales":
        return (
          <div className={`chart-container ${isUpdating ? "updating" : ""}`}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "none",
                  }}
                />
                <Legend />
                <Bar dataKey="eco" name="Eco Products" fill="#4CAF50" radius={[4, 4, 0, 0]} animationDuration={1000} />
                <Bar
                  dataKey="conventional"
                  name="Conventional"
                  fill="#2196F3"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )
      case "customers":
        return (
          <div className={`chart-container ${isUpdating ? "updating" : ""}`}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={customerData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "none",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="new"
                  name="New Customers"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                  animationDuration={1000}
                />
                <Area
                  type="monotone"
                  dataKey="returning"
                  name="Returning Customers"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )
      case "categories":
        return (
          <div className={`chart-container ${isUpdating ? "updating" : ""}`}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={1000}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {productCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "none",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )
      case "transactions":
        return (
          <div className="recent-transactions">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className={isUpdating && tx.id === "TX-1235" ? "updating" : ""}>
                    <td>{tx.id}</td>
                    <td>{tx.customer}</td>
                    <td>${tx.amount.toFixed(2)}</td>
                    <td>{tx.date}</td>
                    <td>
                      <span className={`status-badge ${tx.status}`}>
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <button className="action-button">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="dashboard-actions">
          <button className="action-button primary">Add Widget</button>
          <button className="action-button">Export Data</button>
        </div>
      </header>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="widgets">
          {(provided) => (
            <div className="widgets-grid" {...provided.droppableProps} ref={provided.innerRef}>
              {widgets.map((widget, index) => (
                <Draggable key={widget.id} draggableId={widget.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="widget-wrapper"
                    >
                      <DashboardWidget
                        id={widget.id}
                        title={widget.title}
                        onRemove={removeWidget}
                        onMaximize={maximizeWidget}
                        refreshData={refreshData}
                      >
                        {renderWidgetContent(widget)}
                      </DashboardWidget>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {maximizedWidget && (
        <div className="maximized-widget-overlay">
          <div className="maximized-widget">
            <div className="widget-header">
              <h3>{maximizedWidget.title}</h3>
              <button className="widget-action" onClick={closeMaximizedWidget}>
                <X size={16} />
              </button>
            </div>
            <div className="widget-content">{renderWidgetContent(maximizedWidget)}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
