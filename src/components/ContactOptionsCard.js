"use client"

import { useState } from "react"
import "../styles/ContactOptionsCard.css"

const ContactOptionsCard = () => {
  const [flippedCard, setFlippedCard] = useState(null)

  const contactOptions = [
    {
      id: "email",
      title: "Email",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
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
      ),
      frontDescription: "Kirim email untuk pertanyaan umum",
      backTitle: "Email Kami",
      backContent: [
        {
          label: "Layanan Pelanggan",
          value: "cs@ecocart.id",
          action: "mailto:cs@ecocart.id",
        },
        {
          label: "Informasi Produk",
          value: "info@ecocart.id",
          action: "mailto:info@ecocart.id",
        },
        {
          label: "Kerjasama Bisnis",
          value: "partnership@ecocart.id",
          action: "mailto:partnership@ecocart.id",
        },
      ],
    },
    {
      id: "phone",
      title: "Telepon",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      ),
      frontDescription: "Hubungi kami via telepon",
      backTitle: "Hubungi Kami",
      backContent: [
        {
          label: "Layanan Pelanggan",
          value: "+62 21 5555 6666",
          action: "tel:+622155556666",
        },
        {
          label: "Bantuan Teknis",
          value: "+62 21 5555 7777",
          action: "tel:+622155557777",
        },
        {
          label: "Jam Operasional",
          value: "Senin - Jumat: 08.00 - 17.00",
        },
      ],
    },
    {
      id: "whatsapp",
      title: "WhatsApp",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      ),
      frontDescription: "Chat dengan kami via WhatsApp",
      backTitle: "WhatsApp Kami",
      backContent: [
        {
          label: "Layanan Pelanggan",
          value: "+62 812 3456 7890",
          action: "https://wa.me/6281234567890",
        },
        {
          label: "Bantuan Pesanan",
          value: "+62 812 3456 7891",
          action: "https://wa.me/6281234567891",
        },
        {
          label: "Respon Cepat",
          value: "Dalam 30 menit (jam kerja)",
        },
      ],
    },
  ]

  const handleCardFlip = (id) => {
    if (flippedCard === id) {
      setFlippedCard(null)
    } else {
      setFlippedCard(id)
    }
  }

  return (
    <div className="contact-options-container">
      <h3>Pilih Cara Menghubungi Kami</h3>
      <div className="contact-cards">
        {contactOptions.map((option) => (
          <div
            key={option.id}
            className={`contact-card ${flippedCard === option.id ? "flipped" : ""}`}
            onClick={() => handleCardFlip(option.id)}
          >
            <div className="card-inner">
              <div className="card-front">
                <div className="card-icon">{option.icon}</div>
                <h4>{option.title}</h4>
                <p>{option.frontDescription}</p>
                <button className="flip-btn">
                  Lihat Detail
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
              <div className="card-back">
                <h4>{option.backTitle}</h4>
                <ul className="contact-details">
                  {option.backContent.map((item, index) => (
                    <li key={index}>
                      <span className="contact-label">{item.label}:</span>
                      {item.action ? (
                        <a href={item.action} target="_blank" rel="noopener noreferrer">
                          {item.value}
                        </a>
                      ) : (
                        <span>{item.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
                <button className="flip-btn back">
                  Kembali
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContactOptionsCard
