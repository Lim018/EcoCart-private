"use client"

import { useState } from "react"
import "../../styles/FilterPanel.css"

const FilterPanel = ({ activeFilters, onChange }) => {
  // State untuk accordion yang terbuka
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    rating: false,
    ecoScore: false,
    tags: false,
  })

  // Data filter
  const filterData = {
    categories: [
      { id: "personal-care", label: "Personal Care", value: "category:Personal Care" },
      { id: "kitchen", label: "Kitchen", value: "category:Kitchen" },
      { id: "clothing", label: "Clothing", value: "category:Clothing" },
      { id: "electronics", label: "Electronics", value: "category:Electronics" },
      { id: "stationery", label: "Stationery", value: "category:Stationery" },
      { id: "garden", label: "Garden", value: "category:Garden" },
    ],
    price: [
      { id: "price-0-10", label: "Under Rp 150.000", value: "price:0-10" },
      { id: "price-10-25", label: "Rp 150.000 - Rp 350.000", value: "price:10-25" },
      { id: "price-25-50", label: "Rp 350.000 - Rp 750.000", value: "price:25-50" },
      { id: "price-50-plus", label: "Over Rp 750.000", value: "price:50-1000" },
    ],
    rating: [
      { id: "rating-4.5", label: "4.5 & Up", value: "rating:4.5" },
      { id: "rating-4", label: "4.0 & Up", value: "rating:4" },
      { id: "rating-3.5", label: "3.5 & Up", value: "rating:3.5" },
      { id: "rating-3", label: "3.0 & Up", value: "rating:3" },
    ],
    ecoScore: [
      { id: "eco-9", label: "Excellent (9+)", value: "eco_score:9" },
      { id: "eco-8", label: "Very Good (8+)", value: "eco_score:8" },
      { id: "eco-7", label: "Good (7+)", value: "eco_score:7" },
      { id: "eco-6", label: "Fair (6+)", value: "eco_score:6" },
    ],
    tags: [
      { id: "tag-plastic-free", label: "Plastic Free", value: "tag:plastic-free" },
      { id: "tag-organic", label: "Organic", value: "tag:organic" },
      { id: "tag-zero-waste", label: "Zero Waste", value: "tag:zero-waste" },
      { id: "tag-recycled", label: "Recycled", value: "tag:recycled" },
      { id: "tag-sustainable", label: "Sustainable", value: "tag:sustainable-living" },
      { id: "tag-natural", label: "Natural", value: "tag:natural" },
    ],
  }

  // Handler untuk toggle accordion section
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Handler untuk perubahan filter
  const handleFilterChange = (filter) => {
    const isActive = activeFilters.includes(filter)
    onChange(filter, !isActive)
  }

  // Render accordion section
  const renderAccordionSection = (title, section, items) => {
    const isOpen = openSections[section]

    return (
      <div className={`filter-section ${isOpen ? "open" : ""}`}>
        <div className="filter-section-header" onClick={() => toggleSection(section)}>
          <h3>{title}</h3>
          <span className="accordion-icon">{isOpen ? "−" : "+"}</span>
        </div>

        <div className={`filter-section-content ${isOpen ? "visible" : ""}`}>
          <ul className="filter-list">
            {items.map((item) => (
              <li key={item.id} className="filter-item">
                <label className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={activeFilters.includes(item.value)}
                    onChange={() => handleFilterChange(item.value)}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="filter-label">{item.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="filter-panel">
      <div className="filter-panel-header">
        <h2>Filter</h2>
        {activeFilters.length > 0 && (
          <button
            className="clear-all-button"
            onClick={() => activeFilters.forEach((filter) => onChange(filter, false))}
          >
            Reset
          </button>
        )}
      </div>

      {renderAccordionSection("Kategori", "categories", filterData.categories)}
      {renderAccordionSection("Harga", "price", filterData.price)}
      {renderAccordionSection("Rating", "rating", filterData.rating)}
      {renderAccordionSection("Eco Score", "ecoScore", filterData.ecoScore)}
      {renderAccordionSection("Tag", "tags", filterData.tags)}
    </div>
  )
}

export default FilterPanel
