"use client"

import { useState, useEffect } from "react"
import ContactForm from "../components/ContactForm"
import InteractiveMap from "../components/InteractiveMap"
import LiveChat from "../components/LiveChat"
import FAQAccordion from "../components/FAQAccordion"
import ConsultationScheduler from "../components/ConsultationScheduler"
import SocialMediaLinks from "../components/SocialMediaLinks"
import ContactOptionsCard from "../components/ContactOptionsCard"
import "../styles/ContactPage.css"

const ContactPage = () => {
  const [activeTab, setActiveTab] = useState("form")
  const [showChat, setShowChat] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const toggleChat = () => {
    setShowChat(!showChat)
  }

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="hero-content">
          <h1>Hubungi EcoCart</h1>
          <p>
            Kami siap membantu Anda dengan pertanyaan, saran, atau kebutuhan apa pun terkait produk ramah lingkungan
            kami. Pilih cara yang paling nyaman untuk menghubungi kami.
          </p>
        </div>
      </div>

      <div className="contact-main">
        <div className="contact-tabs">
          <button className={`tab-btn ${activeTab === "form" ? "active" : ""}`} onClick={() => handleTabChange("form")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Formulir Kontak
          </button>
          <button
            className={`tab-btn ${activeTab === "schedule" ? "active" : ""}`}
            onClick={() => handleTabChange("schedule")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Jadwalkan Konsultasi
          </button>
          <button className={`tab-btn ${activeTab === "faq" ? "active" : ""}`} onClick={() => handleTabChange("faq")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            FAQ
          </button>
        </div>

        <div className="contact-content">
          <div className={`tab-content ${activeTab === "form" ? "active" : ""}`}>
            <div className="contact-grid">
              <div className="contact-form-section">
                <h2>Kirim Pesan</h2>
                <p>Isi formulir di bawah ini dan tim kami akan menghubungi Anda dalam waktu 24 jam pada hari kerja.</p>
                <ContactForm />
              </div>
              <div className="contact-map-section">
                <h2>Lokasi Kami</h2>
                <p>Kunjungi kantor kami atau temukan lokasi terdekat dengan Anda.</p>
                <InteractiveMap />
              </div>
            </div>
          </div>

          <div className={`tab-content ${activeTab === "schedule" ? "active" : ""}`}>
            <h2>Jadwalkan Konsultasi</h2>
            <p>
              Jadwalkan konsultasi dengan tim ahli kami untuk mendapatkan saran tentang produk ramah lingkungan yang
              sesuai dengan kebutuhan Anda.
            </p>
            <ConsultationScheduler />
          </div>

          <div className={`tab-content ${activeTab === "faq" ? "active" : ""}`}>
            <h2>Pertanyaan yang Sering Diajukan</h2>
            <p>Temukan jawaban untuk pertanyaan umum tentang produk dan layanan kami.</p>
            <FAQAccordion />
          </div>
        </div>
      </div>

      <div className="contact-options-section">
        <ContactOptionsCard />
      </div>

      <div className="social-media-section">
        <SocialMediaLinks />
      </div>

      <div className={`chat-widget ${showChat ? "open" : ""}`}>
        {showChat ? (
          <LiveChat />
        ) : (
          <button className="chat-toggle" onClick={toggleChat}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            Chat dengan Kami
          </button>
        )}
      </div>

      {showChat && (
        <div className="chat-overlay" onClick={toggleChat}>
          <div className="chat-close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>
      )}

      <button
        className={`scroll-to-top ${scrollPosition > 300 ? "visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    </div>
  )
}

export default ContactPage
