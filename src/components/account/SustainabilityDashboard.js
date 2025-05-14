"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Leaf, Droplet, Wind, Sun, ShoppingBag, Award, MessageSquare } from "react-feather"
import "../../styles/SustainabilityDashboard.css"

const SustainabilityDashboard = ({ userData }) => {
  const { sustainabilityStats, recentActivity } = userData || {
    sustainabilityStats: {
      plasticSaved: 0,
      waterSaved: 0,
      co2Reduced: 0,
      energySaved: 0,
    },
    recentActivity: [],
  }

  // Animation variants for the stats
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  // Function to animate the counter
  const animateValue = (id, start, end, duration) => {
    const obj = document.getElementById(id)
    if (!obj) return

    let startTimestamp = null
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const value = Math.floor(progress * (end - start) + start)
      obj.innerHTML = value.toLocaleString()
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }

  useEffect(() => {
    // Animate the stats when component mounts
    if (sustainabilityStats) {
      animateValue("plasticSaved", 0, sustainabilityStats.plasticSaved, 2000)
      animateValue("waterSaved", 0, sustainabilityStats.waterSaved, 2000)
      animateValue("co2Reduced", 0, sustainabilityStats.co2Reduced, 2000)
      animateValue("energySaved", 0, sustainabilityStats.energySaved, 2000)
    }
  }, [sustainabilityStats])

  return (
    <div className="sustainability-dashboard">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="dashboard-title"
      >
        Dampak Sustainability Anda
      </motion.h2>

      <motion.div className="stats-container" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div className="stat-card" variants={itemVariants}>
          <div className="stat-icon plastic">
            <Leaf size={32} />
          </div>
          <div className="stat-content">
            <h3>Plastik Terhindarkan</h3>
            <p>
              <span id="plasticSaved">0</span> gram
            </p>
            <div className="progress-bar">
              <motion.div
                className="progress"
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1, delay: 0.5 }}
              ></motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div className="stat-card" variants={itemVariants}>
          <div className="stat-icon water">
            <Droplet size={32} />
          </div>
          <div className="stat-content">
            <h3>Air Terhemat</h3>
            <p>
              <span id="waterSaved">0</span> liter
            </p>
            <div className="progress-bar">
              <motion.div
                className="progress"
                initial={{ width: 0 }}
                animate={{ width: "60%" }}
                transition={{ duration: 1, delay: 0.7 }}
              ></motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div className="stat-card" variants={itemVariants}>
          <div className="stat-icon co2">
            <Wind size={32} />
          </div>
          <div className="stat-content">
            <h3>CO2 Berkurang</h3>
            <p>
              <span id="co2Reduced">0</span> kg
            </p>
            <div className="progress-bar">
              <motion.div
                className="progress"
                initial={{ width: 0 }}
                animate={{ width: "45%" }}
                transition={{ duration: 1, delay: 0.9 }}
              ></motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div className="stat-card" variants={itemVariants}>
          <div className="stat-icon energy">
            <Sun size={32} />
          </div>
          <div className="stat-content">
            <h3>Energi Terhemat</h3>
            <p>
              <span id="energySaved">0</span> kWh
            </p>
            <div className="progress-bar">
              <motion.div
                className="progress"
                initial={{ width: 0 }}
                animate={{ width: "80%" }}
                transition={{ duration: 1, delay: 1.1 }}
              ></motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="recent-activity"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.3 }}
      >
        <h3>Aktivitas Terbaru</h3>
        <div className="activity-timeline">
          {recentActivity && recentActivity.length > 0 ? (
            recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                className="activity-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 1.5 + index * 0.1 }}
              >
                <div className="activity-icon">
                  {activity.type === "purchase" && <ShoppingBag size={16} />}
                  {activity.type === "badge" && <Award size={16} />}
                  {activity.type === "review" && <MessageSquare size={16} />}
                </div>
                <div className="activity-content">
                  <p>{activity.description}</p>
                  <span className="activity-date">{activity.date}</span>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="no-activity">Belum ada aktivitas terbaru.</p>
          )}
        </div>
      </motion.div>

      <motion.div
        className="sustainability-tips"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <h3>Tips Sustainability</h3>
        <div className="tips-container">
          <motion.div className="tip-card" whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}>
            <h4>Kurangi Penggunaan Plastik</h4>
            <p>
              Gunakan tas belanja yang dapat digunakan kembali dan hindari produk dengan kemasan plastik sekali pakai.
            </p>
          </motion.div>
          <motion.div className="tip-card" whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}>
            <h4>Hemat Air</h4>
            <p>Matikan keran saat menyikat gigi dan ambil shower yang lebih singkat untuk menghemat air.</p>
          </motion.div>
          <motion.div className="tip-card" whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}>
            <h4>Kurangi Jejak Karbon</h4>
            <p>
              Pertimbangkan untuk berjalan kaki, bersepeda, atau menggunakan transportasi umum untuk perjalanan pendek.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default SustainabilityDashboard
