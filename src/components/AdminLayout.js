"use client"

import { useState } from "react"
import AdminSidebar from "./AdminSidebar"
import "../styles/AdminLayout.css"

const AdminLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="admin-layout">
      <AdminSidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />
      <div className={`admin-content ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>{children}</div>
    </div>
  )
}

export default AdminLayout
