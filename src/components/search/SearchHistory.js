"use client"

import { useState } from "react"
import "../../styles/SearchHistory.css"

const SearchHistory = ({ history, onItemClick }) => {
  const [previewItem, setPreviewItem] = useState(null)

  if (history.length === 0) return null

  // Render preview hasil untuk item riwayat
  const renderPreview = (query) => {
    // Data dummy untuk preview
    const previewResults = [
      { id: 1, name: "Bamboo Toothbrush Set", image: "/bamboo-toothbrush-set.png" },
      { id: 2, name: "Organic Cotton T-shirt", image: "/organic-cotton-tshirt.png" },
      { id: 3, name: "Reusable Produce Bags", image: "/reusable-produce-bags.png" },
    ]

    return (
      <div className="history-preview">
        <div className="preview-header">
          <h4>Hasil untuk "{query}"</h4>
        </div>
        <div className="preview-results">
          {previewResults.map((result, index) => (
            <div key={result.id} className="preview-result-item" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="preview-image">
                <img src={result.image || "/placeholder.svg"} alt={result.name} />
              </div>
              <div className="preview-name">{result.name}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="search-history">
      <div className="history-header">
        <h3>Pencarian Terakhir</h3>
      </div>

      <ul className="history-list">
        {history.slice(0, 5).map((query, index) => (
          <li
            key={index}
            className="history-item"
            onClick={() => onItemClick(query)}
            onMouseEnter={() => setPreviewItem(query)}
            onMouseLeave={() => setPreviewItem(null)}
          >
            <div className="history-item-icon">
              <i className="fas fa-history"></i>
            </div>
            <div className="history-item-query">{query}</div>

            {previewItem === query && renderPreview(query)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchHistory
