"use client"

import { useState, useEffect } from "react"
import { User, ShoppingBag, Heart, Award, CreditCard, Settings, Zap } from "react-feather"
import { getUserData } from "../utils/accountUtils"
import TabNavigation from "../components/account/TabNavigation"
import SustainabilityDashboard from "../components/account/SustainabilityDashboard"
import OrderHistory from "../components/account/OrderHistory"
import Wishlist from "../components/account/Wishlist"
import PersonalizedRecommendations from "../components/account/PersonalizedRecommendations"
import SettingsPanel from "../components/account/SettingsPanel"
import ProfileForm from "../components/account/ProfileForm"
import SustainabilityBadges from "../components/account/SustainabilityBadges"
import PaymentMethods from "../components/account/PaymentMethods"
import "../styles/AccountPage.css"

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Definisi tab
  const tabs = [
    { label: "Dashboard", icon: <Zap size={18} /> },
    { label: "Profil", icon: <User size={18} /> },
    { label: "Pesanan", icon: <ShoppingBag size={18} /> },
    { label: "Wishlist", icon: <Heart size={18} /> },
    { label: "Badge", icon: <Award size={18} /> },
    { label: "Pembayaran", icon: <CreditCard size={18} /> },
    { label: "Pengaturan", icon: <Settings size={18} /> },
  ]

  // Fetch data pengguna
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        const data = await getUserData()
        setUserData(data)
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  // Render konten berdasarkan tab aktif
  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Memuat data...</p>
        </div>
      )
    }

    switch (activeTab) {
      case 0:
        return <SustainabilityDashboard userData={userData} />
      case 1:
        return <ProfileForm userData={userData} />
      case 2:
        return <OrderHistory orders={userData?.orders} />
      case 3:
        return <Wishlist wishlistItems={userData?.wishlist} />
      case 4:
        return <SustainabilityBadges badges={userData?.badges} />
      case 5:
        return <PaymentMethods paymentMethods={userData?.paymentMethods} />
      case 6:
        return <SettingsPanel userSettings={userData?.settings} />
      default:
        return <SustainabilityDashboard userData={userData} />
    }
  }

  return (
    <div className="account-page">
      <div className="account-header">
        <div className="account-header-content">
          <h1>Akun Saya</h1>
          <p>Selamat datang kembali, {userData?.name || "Pengguna"}!</p>
        </div>
      </div>

      <div className="account-container">
        <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="account-content">{renderTabContent()}</div>

        {activeTab !== 3 && activeTab !== 0 && userData?.recommendations && (
          <div className="account-recommendations">
            <PersonalizedRecommendations recommendations={userData.recommendations} />
          </div>
        )}
      </div>
    </div>
  )
}

export default AccountPage
