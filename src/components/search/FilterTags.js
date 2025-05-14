"use client"

import { useState } from "react"
import "../../styles/FilterTags.css"

const FilterTags = ({ filters, onRemove }) => {
  const [removingTag, setRemovingTag] = useState(null)

  // Fungsi untuk mendapatkan label yang lebih user-friendly dari filter
  const getFilterLabel = (filter) => {
    const [type, value] = filter.split(":")

    switch (type) {
      case "category":
        return `Kategori: ${value}`
      case "price":
        const [min, max] = value.split("-").map(Number)
        if (min === 0) {
          return `Harga: < Rp ${max * 15000}`
        } else if (max === 1000) {
          return `Harga: > Rp ${min * 15000}`
        } else {
          return `Harga: Rp ${min * 15000} - Rp ${max * 15000}`
        }
      case "rating":
        return `Rating: ${value}+`
      case "eco_score":
        return `Eco Score: ${value}+`
      case "tag":
        return `Tag: ${value}`
      default:
        return filter
    }
  }

  // Handler untuk menghapus filter
  const handleRemove = (filter) => {
    setRemovingTag(filter)

    // Tunggu animasi selesai sebelum menghapus
    setTimeout(() => {
      onRemove(filter)
      setRemovingTag(null)
    }, 300)
  }

  // Mendapatkan ikon untuk filter
  const getFilterIcon = (filter) => {
    const type = filter.split(":")[0]

    switch (type) {
      case "category":
        return "fas fa-tag"
      case "price":
        return "fas fa-dollar-sign"
      case "rating":
        return "fas fa-star"
      case "eco_score":
        return "fas fa-leaf"
      case "tag":
        return "fas fa-hashtag"
      default:
        return "fas fa-filter"
    }
  }

  return (
    <div className="filter-tags">
      <div className="filter-tags-header">
        <span>Filter Aktif:</span>
      </div>

      <div className="filter-tags-list">
        {filters.map((filter, index) => (
          <div key={index} className={`filter-tag ${removingTag === filter ? "removing" : ""}`}>
            <i className={getFilterIcon(filter)}></i>
            <span>{getFilterLabel(filter)}</span>
            <button className="remove-tag-button" onClick={() => handleRemove(filter)} aria-label="Remove filter">
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FilterTags
