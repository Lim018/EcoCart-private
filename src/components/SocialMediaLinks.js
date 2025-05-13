"use client"

import { useState } from "react"
import "../styles/SocialMediaLinks.css"

const SocialMediaLinks = () => {
  const [hoveredLink, setHoveredLink] = useState(null)

  const socialLinks = [
    {
      id: "instagram",
      name: "Instagram",
      url: "https://instagram.com/ecocart",
      icon: (
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
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
      color: "#E1306C",
      followers: "25.8K",
      description: "Lihat produk ramah lingkungan kami dan tips keberlanjutan",
    },
    {
      id: "facebook",
      name: "Facebook",
      url: "https://facebook.com/ecocart",
      icon: (
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
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      ),
      color: "#1877F2",
      followers: "18.3K",
      description: "Bergabunglah dengan komunitas peduli lingkungan kami",
    },
    {
      id: "twitter",
      name: "Twitter",
      url: "https://twitter.com/ecocart",
      icon: (
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
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
      ),
      color: "#1DA1F2",
      followers: "12.5K",
      description: "Dapatkan update terbaru tentang produk dan kampanye kami",
    },
    {
      id: "youtube",
      name: "YouTube",
      url: "https://youtube.com/ecocart",
      icon: (
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
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        </svg>
      ),
      color: "#FF0000",
      followers: "8.7K",
      description: "Tonton video tutorial dan ulasan produk kami",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      url: "https://linkedin.com/company/ecocart",
      icon: (
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
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      ),
      color: "#0A66C2",
      followers: "5.2K",
      description: "Ikuti perkembangan bisnis dan karir di EcoCart",
    },
  ]

  return (
    <div className="social-links-container">
      <h3>Ikuti Kami di Media Sosial</h3>
      <div className="social-links">
        {socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            style={{
              "--hover-color": link.color,
            }}
            onMouseEnter={() => setHoveredLink(link.id)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <div className="social-icon" style={{ color: hoveredLink === link.id ? "#fff" : link.color }}>
              {link.icon}
            </div>
            <div className="social-info">
              <div className="social-name">{link.name}</div>
              <div className="social-followers">{link.followers} pengikut</div>
              <div className="social-description">{link.description}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default SocialMediaLinks
