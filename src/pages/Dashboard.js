"use client"

import { useState, useEffect } from "react"
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from "@dnd-kit/core"
import { SortableContext, useSortable, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
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

const SortableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="widget-wrapper">
      {children}
    </div>
  )
}

// Format harga dalam Rupiah
const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price * 15000) // Konversi USD ke IDR
}

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
  { name: "Perawatan Pribadi", value: 400 },
  { name: "Perlengkapan Rumah", value: 300 },
  { name: "Pakaian", value: 300 },
  { name: "Makanan & Minuman", value: 200 },
  { name: "Aksesoris", value: 100 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

const recentTransactions = [
  { id: "TX-1234", customer: "John Doe", amount: 129.99, date: "2023-07-01", status: "completed" },
  { id: "TX-1235", customer: "Jane Smith", amount: 89.5, date: "2023-07-01", status: "processing" },
  { id: "TX-1236", customer: "Bob Johnson", amount: 45.75, date: "2023-06-30", status: "completed" },
  { id: "TX-1237", customer: "Alice Brown", amount: 199.99, date: "2023-06-30", status: "failed" },
  { id: "TX-1238", customer: "Charlie Wilson", amount: 67.25, date: "2023-06-29", status: "processing" },
]

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

const Dashboard = () => {
  const [widgets, setWidgets] = useState([
    { id: "kpi", title: "Indikator Kinerja Utama", type: "kpi" },
    { id: "sales", title: "Ikhtisar Penjualan", type: "sales" },
    { id: "customers", title: "Pertumbuhan Pelanggan", type: "customers" },
    { id: "categories", title: "Penjualan berdasarkan Kategori", type: "categories" },
    { id: "transactions", title: "Transaksi Terbaru", type: "transactions" },
  ])

  const [maximizedWidget, setMaximizedWidget] = useState(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const sensors = useSensors(useSensor(PointerSensor))

  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true)
      setTimeout(() => setIsUpdating(false), 500)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
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
    console.log("Menyegarkan data...")
  }

  const renderWidgetContent = (widget) => {
    switch (widget.type) {
      case "kpi":
        return (
          <div className="kpi-grid">
            <KPICard
              title="Total Pendapatan"
              value={formatPrice(24567)}
              change={12.5}
              icon={<DollarSign color="#4CAF50" />}
              color="#4CAF50"
            />
            <KPICard
              title="Total Pesanan"
              value="1.234"
              change={8.2}
              icon={<ShoppingBag color="#2196F3" />}
              color="#2196F3"
            />
            <KPICard
              title="Pelanggan Baru"
              value="356"
              change={-2.4}
              icon={<Users color="#FF9800" />}
              color="#FF9800"
            />
            <KPICard
              title="Waktu Pesanan Rata-rata"
              value="42 menit"
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
                <Bar
                  dataKey="eco"
                  name="Produk Ramah Lingkungan"
                  fill="#4CAF50"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                />
                <Bar
                  dataKey="conventional"
                  name="Konvensional"
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
                  name="Pelanggan Baru"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                  animationDuration={1000}
                />
                <Area
                  type="monotone"
                  dataKey="returning"
                  name="Pelanggan Kembali"
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
                  <th>Pelanggan</th>
                  <th>Jumlah</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className={isUpdating && tx.id === "TX-1235" ? "updating" : ""}>
                    <td>{tx.id}</td>
                    <td>{tx.customer}</td>
                    <td>{formatPrice(tx.amount)}</td>
                    <td>{tx.date}</td>
                    <td>
                      <span className={`status-badge ${tx.status}`}>
                        {tx.status === "completed"
                          ? "Selesai"
                          : tx.status === "processing"
                          ? "Diproses"
                          : tx.status === "failed"
                          ? "Gagal"
                          : tx.status}
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
        <h1>Dashboard Admin</h1>
        <div className="dashboard-actions">
          <button className="action-button primary">Tambah Widget</button>
          <button className="action-button">Ekspor Data</button>
        </div>
      </header>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={widgets.map((widget) => widget.id)} strategy={rectSortingStrategy}>
          <div className="widgets-grid">
            {widgets.map((widget) => (
              <SortableItem key={widget.id} id={widget.id}>
                <DashboardWidget
                  id={widget.id}
                  title={widget.title}
                  onRemove={removeWidget}
                  onMaximize={maximizeWidget}
                  refreshData={refreshData}
                >
                  {renderWidgetContent(widget)}
                </DashboardWidget>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>

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
