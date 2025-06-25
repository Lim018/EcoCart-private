"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import "../styles/AdminSidebar.css"

const AdminSidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation()
  const [expandedMenus, setExpandedMenus] = useState({})

  const menuItems = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: "fas fa-tachometer-alt",
      path: "/admin/dashboard",
      color: "#2196F3",
    },
    {
      id: "products",
      title: "Kelola Produk",
      icon: "fas fa-box",
      path: "/admin/products",
      color: "#4CAF50",
    },
    {
      id: "orders",
      title: "Kelola Pesanan",
      icon: "fas fa-shopping-cart",
      path: "/admin/transactions",
      color: "#FF9800",
    },
    {
      id: "users",
      title: "Kelola Pengguna",
      icon: "fas fa-users",
      path: "/admin/users",
      color: "#9C27B0",
    },
    {
      id: "articles",
      title: "Kelola Artikel",
      icon: "fas fa-newspaper",
      path: "/admin/articles",
      color: "#607D8B",
    },
    // {
    //   id: "analytics",
    //   title: "Analitik",
    //   icon: "fas fa-chart-line",
    //   submenu: [
    //     {
    //       title: "Laporan Penjualan",
    //       path: "/analytics/sales",
    //       icon: "fas fa-chart-bar",
    //     },
    //     {
    //       title: "Laporan Pengguna",
    //       path: "/analytics/users",
    //       icon: "fas fa-user-chart",
    //     },
    //     {
    //       title: "Laporan Produk",
    //       path: "/analytics/products",
    //       icon: "fas fa-box-open",
    //     },
    //   ],
    //   color: "#E91E63",
    // },
    // {
    //   id: "settings",
    //   title: "Pengaturan",
    //   icon: "fas fa-cog",
    //   submenu: [
    //     {
    //       title: "Pengaturan Umum",
    //       path: "/settings/general",
    //       icon: "fas fa-sliders-h",
    //     },
    //     {
    //       title: "Pengaturan Email",
    //       path: "/settings/email",
    //       icon: "fas fa-envelope-open",
    //     },
    //     {
    //       title: "Pengaturan Pembayaran",
    //       path: "/settings/payment",
    //       icon: "fas fa-credit-card",
    //     },
    //   ],
    //   color: "#795548",
    // },
  ]

  const toggleSubmenu = (menuId) => {
    if (isCollapsed) return
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }))
  }

  const isActiveRoute = (path) => {
    return location.pathname === path
  }

  const isActiveParent = (submenu) => {
    return submenu?.some((item) => location.pathname === item.path)
  }

  return (
    <motion.div
      className={`admin-sidebar ${isCollapsed ? "collapsed" : ""}`}
      initial={{ width: 280 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Header */}
      <div className="sidebar-header">
        <motion.div className="sidebar-logo" animate={{ opacity: isCollapsed ? 0 : 1 }} transition={{ duration: 0.2 }}>
          <span className="logo-text">
            Eco<span className="logo-highlight">Cart</span>
          </span>
          <span className="admin-badge">Admin</span>
        </motion.div>

        <button
          className="sidebar-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <i className={`fas fa-chevron-${isCollapsed ? "right" : "left"}`}></i>
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item">
              {item.submenu ? (
                <>
                  <button
                    className={`nav-link submenu-trigger ${isActiveParent(item.submenu) ? "active" : ""}`}
                    onClick={() => toggleSubmenu(item.id)}
                    style={{ "--accent-color": item.color }}
                  >
                    <div className="nav-icon">
                      <i className={item.icon}></i>
                    </div>
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          className="nav-text"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.title}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {!isCollapsed && (
                      <motion.i
                        className={`fas fa-chevron-down submenu-arrow`}
                        animate={{
                          rotate: expandedMenus[item.id] ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </button>

                  <AnimatePresence>
                    {expandedMenus[item.id] && !isCollapsed && (
                      <motion.ul
                        className="submenu"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.submenu.map((subItem, index) => (
                          <motion.li
                            key={subItem.path}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Link
                              to={subItem.path}
                              className={`submenu-link ${isActiveRoute(subItem.path) ? "active" : ""}`}
                            >
                              <i className={subItem.icon}></i>
                              <span>{subItem.title}</span>
                            </Link>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`nav-link ${isActiveRoute(item.path) ? "active" : ""}`}
                  style={{ "--accent-color": item.color }}
                >
                  <div className="nav-icon">
                    <i className={item.icon}></i>
                  </div>
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        className="nav-text"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.title}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* User Info */}
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">
            <img src="/thoughtful-gaze.png" alt="Admin" />
            <div className="status-indicator online"></div>
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                className="user-details"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="user-name">Admin EcoCart</div>
                <div className="user-role">Super Administrator</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="sidebar-actions">
          <button className="action-btn" title="Pengaturan">
            <i className="fas fa-cog"></i>
          </button>
          <Link to="/" className="action-btn" title="Kembali ke Website">
            <i className="fas fa-external-link-alt"></i>
          </Link>
          <button className="action-btn logout" title="Logout">
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default AdminSidebar
