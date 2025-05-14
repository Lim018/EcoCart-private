"use client"
import { motion } from "framer-motion"
import { User, ShoppingBag, Heart, Gift, Award, CreditCard, Settings, BarChart2 } from "react-feather"
import "../../styles/TabNavigation.css"

const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: <BarChart2 /> },
    { id: "orders", label: "Pesanan Saya", icon: <ShoppingBag /> },
    { id: "wishlist", label: "Wishlist", icon: <Heart /> },
    { id: "recommendations", label: "Rekomendasi", icon: <Gift /> },
    { id: "profile", label: "Profil", icon: <User /> },
    { id: "badges", label: "Badge Sustainability", icon: <Award /> },
    { id: "payment", label: "Metode Pembayaran", icon: <CreditCard /> },
    { id: "settings", label: "Pengaturan", icon: <Settings /> },
  ]

  return (
    <div className="tab-navigation">
      {tabs.map((tab) => (
        <motion.div
          key={tab.id}
          className={`tab-item ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => onTabChange(tab.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="tab-icon">{tab.icon}</div>
          <span className="tab-label">{tab.label}</span>
          {activeTab === tab.id && (
            <motion.div
              className="active-indicator"
              layoutId="activeIndicator"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default TabNavigation
