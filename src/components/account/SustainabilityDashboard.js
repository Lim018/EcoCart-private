"use client"

import { useState, useEffect } from "react"
import { ShoppingBag, Award, MessageSquare, Droplet, Wind, Feather } from "react-feather"
import "../../styles/SustainabilityDashboard.css"

const SustainabilityDashboard = ({ userData }) => {
  const [animatedStats, setAnimatedStats] = useState({
    plasticSaved: 0,
    waterSaved: 0,
    co2Reduced: 0,
    energySaved: 0,
  })

  // Animasi statistik keberlanjutan
  useEffect(() => {
    if (!userData) return

    const { sustainabilityStats } = userData
    const duration = 2000 // Durasi animasi dalam milidetik
    const steps = 60 // Jumlah langkah animasi
    const interval = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setAnimatedStats({
        plasticSaved: Math.round(sustainabilityStats.plasticSaved * progress),
        waterSaved: Math.round(sustainabilityStats.waterSaved * progress),
        co2Reduced: Math.round(sustainabilityStats.co2Reduced * progress),
        energySaved: Math.round(sustainabilityStats.energySaved * progress),
      })

      if (currentStep >= steps) {
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [userData])

  if (!userData) {
    return <div className="sustainability-dashboard loading">Memuat data...</div>
  }

  return (
    <div className="sustainability-dashboard">
      <div className="dashboard-header">
        <h2>Dashboard Keberlanjutan</h2>
        <p>Lihat dampak positif Anda terhadap lingkungan</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon plastic">
            <ShoppingBag size={24} />
          </div>
          <div className="stat-content">
            <h3>Plastik Terhindarkan</h3>
            <div className="stat-value">
              {animatedStats.plasticSaved} <span>gram</span>
            </div>
            <div className="stat-progress">
              <div className="progress-bar">
                <div
                  className="progress plastic"
                  style={{ width: `${Math.min(100, (animatedStats.plasticSaved / 3000) * 100)}%` }}
                ></div>
              </div>
              <div className="progress-text">Target: 3000 gram</div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon water">
            <Droplet size={24} />
          </div>
          <div className="stat-content">
            <h3>Air Terhemat</h3>
            <div className="stat-value">
              {animatedStats.waterSaved} <span>liter</span>
            </div>
            <div className="stat-progress">
              <div className="progress-bar">
                <div
                  className="progress water"
                  style={{ width: `${Math.min(100, (animatedStats.waterSaved / 10000) * 100)}%` }}
                ></div>
              </div>
              <div className="progress-text">Target: 10000 liter</div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon carbon">
            <Feather size={24} />
          </div>
          <div className="stat-content">
            <h3>CO₂ Terkurangi</h3>
            <div className="stat-value">
              {animatedStats.co2Reduced} <span>kg</span>
            </div>
            <div className="stat-progress">
              <div className="progress-bar">
                <div
                  className="progress carbon"
                  style={{ width: `${Math.min(100, (animatedStats.co2Reduced / 500) * 100)}%` }}
                ></div>
              </div>
              <div className="progress-text">Target: 500 kg</div>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon energy">
            <Wind size={24} />
          </div>
          <div className="stat-content">
            <h3>Energi Terhemat</h3>
            <div className="stat-value">
              {animatedStats.energySaved} <span>kWh</span>
            </div>
            <div className="stat-progress">
              <div className="progress-bar">
                <div
                  className="progress energy"
                  style={{ width: `${Math.min(100, (animatedStats.energySaved / 1000) * 100)}%` }}
                ></div>
              </div>
              <div className="progress-text">Target: 1000 kWh</div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h3>Aktivitas Terbaru</h3>
          <div className="activity-list">
            {userData.recentActivity.map((activity, index) => (
              <div key={index} className={`activity-item ${activity.type}`}>
                <div className="activity-icon">
                  {activity.type === "purchase" && <ShoppingBag size={18} />}
                  {activity.type === "badge" && <Award size={18} />}
                  {activity.type === "review" && <MessageSquare size={18} />}
                </div>
                <div className="activity-content">
                  <p className="activity-description">{activity.description}</p>
                  <p className="activity-date">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h3>Tips Keberlanjutan</h3>
          <div className="sustainability-tips">
            <div className="tip-card">
              <h4>Kurangi Penggunaan Plastik Sekali Pakai</h4>
              <p>Bawa tas belanja sendiri dan hindari penggunaan sedotan plastik untuk mengurangi sampah plastik.</p>
            </div>
            <div className="tip-card">
              <h4>Hemat Air</h4>
              <p>Matikan keran saat menyikat gigi dan perbaiki keran yang bocor untuk menghemat air.</p>
            </div>
            <div className="tip-card">
              <h4>Kurangi Jejak Karbon</h4>
              <p>Gunakan transportasi umum atau sepeda untuk perjalanan pendek untuk mengurangi emisi karbon.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SustainabilityDashboard
