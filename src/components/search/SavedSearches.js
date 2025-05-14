"use client"

import { useState } from "react"
import "../../styles/SavedSearches.css"

const SavedSearches = ({ savedSearches, onItemClick, onToggleSave }) => {
  const [animatingItem, setAnimatingItem] = useState(null)

  // Handler untuk toggle bookmark
  const handleToggleSave = (e, query) => {
    e.stopPropagation()

    // Set animasi
    setAnimatingItem(query)

    // Hapus animasi setelah selesai
    setTimeout(() => {
      setAnimatingItem(null)
      onToggleSave(query)
    }, 500)
  }

  if (savedSearches.length === 0) return null

  return (
    <div className="saved-searches">
      <div className="saved-header">
        <h3>Pencarian Tersimpan</h3>
      </div>

      <ul className="saved-list">
        {savedSearches.map((query, index) => (
          <li
            key={index}
            className={`saved-item ${animatingItem === query ? "animating" : ""}`}
            onClick={() => onItemClick(query)}
          >
            <div className="saved-item-icon">
              <i className="fas fa-bookmark"></i>
            </div>
            <div className="saved-item-query">{query}</div>
            <button
              className="remove-saved-button"
              onClick={(e) => handleToggleSave(e, query)}
              aria-label="Remove saved search"
            >
              <i className="fas fa-times"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SavedSearches
