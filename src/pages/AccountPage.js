"use client"

import { useState, useEffect } from "react"
import { Zap, Droplet, Wind, ShoppingBag, User, Heart, Award, CreditCard, Settings } from "react-feather"
import "../styles/AccountPage.css"

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simulasi data pengguna
  useEffect(() => {
    // Simulasi fetch data dari API
    setTimeout(() => {
      setUserData({
        name: "Andi Wijaya",
        email: "andi.wijaya@example.com",
        sustainabilityStats: {
          plasticSaved: 2450,
          waterSaved: 5680,
          co2Reduced: 320,
          energySaved: 780,
        },
        orders: [
          { id: "ORD-001", date: "2023-05-10", status: "Selesai", total: 450000 },
          { id: "ORD-002", date: "2023-06-15", status: "Dikirim", total: 275000 },
        ],
        wishlist: [
          { id: 1, name: "Bamboo Toothbrush Set", price: 85000, image: "/bamboo-toothbrush-set.png" },
          { id: 2, name: "Organic Cotton Tote Bag", price: 120000, image: "/organic-cotton-tote-bag.png" },
        ],
        badges: [
          {
            id: 1,
            name: "Eco Warrior",
            description: "Menyelesaikan 5 pembelian produk ramah lingkungan",
            achieved: true,
          },
          { id: 2, name: "Water Saver", description: "Menghemat 5000+ liter air", achieved: true },
        ],
        paymentMethods: [
          { id: 1, type: "credit", last4: "4242", expiry: "05/25" },
          { id: 2, type: "bank", accountName: "Andi Wijaya", bankName: "Bank Mandiri" },
        ],
        settings: {
          notifications: true,
          newsletter: false,
          darkMode: false,
          language: "id",
        },
      })
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Memuat data...</p>
        </div>
      )
    }

    switch (activeTab) {
      case "dashboard":
        return <SustainabilityDashboard userData={userData} />
      case "profile":
        return <ProfileSection userData={userData} />
      case "orders":
        return <OrdersSection orders={userData.orders} />
      case "wishlist":
        return <WishlistSection wishlist={userData.wishlist} />
      case "badges":
        return <BadgesSection badges={userData.badges} />
      case "payment":
        return <PaymentSection paymentMethods={userData.paymentMethods} />
      case "settings":
        return <SettingsSection settings={userData.settings} />
      default:
        return <SustainabilityDashboard userData={userData} />
    }
  }

  return (
    <div className="account-page">
      <div className="account-header">
        <h1>Akun Saya</h1>
        <p>Selamat datang kembali, {userData?.name || "Pengguna"}!</p>
      </div>

      <div className="account-container">
        <div className="tab-navigation">
          <button
            className={`tab-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => handleTabChange("dashboard")}
          >
            <Zap size={20} />
            <span>Dashboard</span>
          </button>
          <button
            className={`tab-item ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => handleTabChange("profile")}
          >
            <User size={20} />
            <span>Profil</span>
          </button>
          <button
            className={`tab-item ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => handleTabChange("orders")}
          >
            <ShoppingBag size={20} />
            <span>Pesanan</span>
          </button>
          <button
            className={`tab-item ${activeTab === "wishlist" ? "active" : ""}`}
            onClick={() => handleTabChange("wishlist")}
          >
            <Heart size={20} />
            <span>Wishlist</span>
          </button>
          <button
            className={`tab-item ${activeTab === "badges" ? "active" : ""}`}
            onClick={() => handleTabChange("badges")}
          >
            <Award size={20} />
            <span>Badge</span>
          </button>
          <button
            className={`tab-item ${activeTab === "payment" ? "active" : ""}`}
            onClick={() => handleTabChange("payment")}
          >
            <CreditCard size={20} />
            <span>Pembayaran</span>
          </button>
          <button
            className={`tab-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => handleTabChange("settings")}
          >
            <Settings size={20} />
            <span>Pengaturan</span>
          </button>
        </div>

        <div className="account-content">{renderTabContent()}</div>
      </div>
    </div>
  )
}

// Komponen Dashboard Keberlanjutan
const SustainabilityDashboard = ({ userData }) => {
  if (!userData) return null

  const { sustainabilityStats } = userData

  return (
    <div className="sustainability-dashboard">
      <h2 className="dashboard-title">Dashboard Keberlanjutan</h2>
      <p className="dashboard-subtitle">Lihat dampak positif Anda terhadap lingkungan</p>

      <div className="stats-container">
        <div className="stat-item">
          <div className="stat-icon plastic">
            <ShoppingBag size={24} />
          </div>
          <div className="stat-info">
            <h3>Plastik Terhindarkan</h3>
            <div className="stat-value">{sustainabilityStats.plasticSaved} gram</div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${Math.min(100, (sustainabilityStats.plasticSaved / 3000) * 100)}%` }}
              ></div>
            </div>
            <div className="progress-target">Target: 3000 gram</div>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon water">
            <Droplet size={24} />
          </div>
          <div className="stat-info">
            <h3>Air Terhemat</h3>
            <div className="stat-value">{sustainabilityStats.waterSaved} liter</div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${Math.min(100, (sustainabilityStats.waterSaved / 10000) * 100)}%` }}
              ></div>
            </div>
            <div className="progress-target">Target: 10000 liter</div>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon carbon">
            <Wind size={24} />
          </div>
          <div className="stat-info">
            <h3>
              CO<sub>2</sub> Terkurangi
            </h3>
            <div className="stat-value">{sustainabilityStats.co2Reduced} kg</div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${Math.min(100, (sustainabilityStats.co2Reduced / 500) * 100)}%` }}
              ></div>
            </div>
            <div className="progress-target">Target: 500 kg</div>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon energy">
            <Zap size={24} />
          </div>
          <div className="stat-info">
            <h3>Energi Terhemat</h3>
            <div className="stat-value">{sustainabilityStats.energySaved} kWh</div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${Math.min(100, (sustainabilityStats.energySaved / 1000) * 100)}%` }}
              ></div>
            </div>
            <div className="progress-target">Target: 1000 kWh</div>
          </div>
        </div>
      </div>

      <div className="dashboard-tips">
        <h3>Tips Keberlanjutan</h3>
        <div className="tips-container">
          <div className="tip-card">
            <h4>Kurangi Penggunaan Plastik</h4>
            <p>
              Gunakan tas belanja yang dapat digunakan kembali dan hindari produk dengan kemasan plastik sekali pakai.
            </p>
          </div>
          <div className="tip-card">
            <h4>Hemat Air</h4>
            <p>Matikan keran saat menyikat gigi dan ambil shower yang lebih singkat untuk menghemat air.</p>
          </div>
          <div className="tip-card">
            <h4>Kurangi Jejak Karbon</h4>
            <p>
              Pertimbangkan untuk berjalan kaki, bersepeda, atau menggunakan transportasi umum untuk perjalanan pendek.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Placeholder untuk komponen lainnya
const ProfileSection = ({ userData }) => (
  <div className="profile-section">
    <h2>Profil Saya</h2>
    <p>Informasi profil akan ditampilkan di sini.</p>
  </div>
)

const OrdersSection = ({ orders }) => (
  <div className="orders-section">
    <h2>Pesanan Saya</h2>
    <p>Riwayat pesanan akan ditampilkan di sini.</p>
  </div>
)

const WishlistSection = ({ wishlist }) => (
  <div className="wishlist-section">
    <h2>Wishlist Saya</h2>
    <p>Item wishlist akan ditampilkan di sini.</p>
  </div>
)

const BadgesSection = ({ badges }) => (
  <div className="badges-section">
    <h2>Badge Sustainability</h2>
    <p>Badge yang telah diperoleh akan ditampilkan di sini.</p>
  </div>
)

const PaymentSection = ({ paymentMethods }) => (
  <div className="payment-section">
    <h2>Metode Pembayaran</h2>
    <p>Metode pembayaran tersimpan akan ditampilkan di sini.</p>
  </div>
)

const SettingsSection = ({ settings }) => (
  <div className="settings-section">
    <h2>Pengaturan</h2>
    <p>Pengaturan akun akan ditampilkan di sini.</p>
  </div>
)

export default AccountPage
