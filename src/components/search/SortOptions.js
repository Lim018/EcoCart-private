"use client"

import { useState, useRef } from "react"
import "../../styles/SortOptions.css"

const SortOptions = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [previewOption, setPreviewOption] = useState(null)
  const dropdownRef = useRef(null)

  // Data opsi pengurutan
  const sortOptions = [
    { id: "relevance", label: "Relevansi", icon: "fas fa-sort" },
    { id: "price_low", label: "Harga: Rendah ke Tinggi", icon: "fas fa-sort-amount-down" },
    { id: "price_high", label: "Harga: Tinggi ke Rendah", icon: "fas fa-sort-amount-up" },
    { id: "rating", label: "Rating Tertinggi", icon: "fas fa-star" },
    { id: "eco_score", label: "Eco Score Tertinggi", icon: "fas fa-leaf" },
  ]

  // Mendapatkan label opsi yang aktif
  const getActiveOptionLabel = () => {
    const option = sortOptions.find((opt) => opt.id === value)
    return option ? option.label : "Urutkan"
  }

  // Mendapatkan ikon opsi yang aktif
  const getActiveOptionIcon = () => {
    const option = sortOptions.find((opt) => opt.id === value)
    return option ? option.icon : "fas fa-sort"
  }

  // Handler untuk toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  // Handler untuk memilih opsi
  const handleSelect = (optionId) => {
    onChange(optionId)
    setIsOpen(false)
  }

  // Handler untuk mouse enter pada opsi
  const handleMouseEnter = (optionId) => {
    setPreviewOption(optionId)
  }

  // Handler untuk mouse leave pada opsi
  const handleMouseLeave = () => {
    setPreviewOption(null)
  }

  // Render preview animasi untuk opsi pengurutan
  const renderSortPreview = (optionId) => {
    // Contoh data untuk preview
    const previewItems = [
      { id: 1, name: "Item A", price: 10, rating: 4.5, eco: 9.2 },
      { id: 2, name: "Item B", price: 25, rating: 4.0, eco: 8.5 },
      { id: 3, name: "Item C", price: 15, rating: 4.8, eco: 7.8 },
      { id: 4, name: "Item D", price: 30, rating: 3.9, eco: 9.5 },
    ]

    // Urutkan item berdasarkan opsi
    const sortedItems = [...previewItems]

    switch (optionId) {
      case "price_low":
        sortedItems.sort((a, b) => a.price - b.price)
        break
      case "price_high":
        sortedItems.sort((a, b) => b.price - a.price)
        break
      case "rating":
        sortedItems.sort((a, b) => b.rating - a.rating)
        break
      case "eco_score":
        sortedItems.sort((a, b) => b.eco - a.eco)
        break
      default:
        // relevance - no sorting
        break
    }

    // Render preview items
    return (
      <div className="sort-preview">
        {sortedItems.map((item, index) => (
          <div
            key={item.id}
            className="preview-item"
            style={{
              animationDelay: `${index * 0.1}s`,
              opacity: 0,
              animation: "fadeInUp 0.3s forwards",
            }}
          >
            <div className="preview-item-name">{item.name}</div>
            <div className="preview-item-value">
              {optionId.includes("price")
                ? `Rp ${item.price}k`
                : optionId === "rating"
                  ? `★ ${item.rating}`
                  : optionId === "eco_score"
                    ? `🍃 ${item.eco}`
                    : ""}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="sort-options" ref={dropdownRef}>
      <button
        className={`sort-button ${isOpen ? "active" : ""}`}
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <i className={getActiveOptionIcon()}></i>
        <span>{getActiveOptionLabel()}</span>
        <i className={`fas ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
      </button>

      {isOpen && (
        <div className="sort-dropdown">
          <ul role="listbox">
            {sortOptions.map((option) => (
              <li
                key={option.id}
                role="option"
                aria-selected={value === option.id}
                className={`sort-option ${value === option.id ? "selected" : ""}`}
                onClick={() => handleSelect(option.id)}
                onMouseEnter={() => handleMouseEnter(option.id)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="option-content">
                  <i className={option.icon}></i>
                  <span>{option.label}</span>
                </div>

                {previewOption === option.id && renderSortPreview(option.id)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SortOptions
