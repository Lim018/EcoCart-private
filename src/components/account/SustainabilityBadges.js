"use client"

import { useState } from "react"
import { Award, Lock, X, Info } from "react-feather"
import "../../styles/SustainabilityBadges.css"

const SustainabilityBadges = ({ badges }) => {
  const [selectedBadge, setSelectedBadge] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  // Mengelompokkan badge berdasarkan kategori
  const groupedBadges =
    badges?.reduce((acc, badge) => {
      if (!acc[badge.category]) {
        acc[badge.category] = []
      }
      acc[badge.category].push(badge)
      return acc
    }, {}) || {}

  // Menampilkan detail badge
  const openBadgeDetails = (badge) => {
    setSelectedBadge(badge)
    setShowDetails(true)
  }

  // Menutup detail badge
  const closeBadgeDetails = () => {
    setShowDetails(false)
  }

  if (!badges || badges.length === 0) {
    return (
      <div className="sustainability-badges">
        <div className="badges-header">
          <h2>Badge Keberlanjutan</h2>
          <p>Kumpulkan badge dengan melakukan tindakan ramah lingkungan</p>
        </div>
        <div className="no-badges">
          <Award size={64} />
          <h3>Belum Ada Badge</h3>
          <p>Mulai belanja produk ramah lingkungan untuk mendapatkan badge keberlanjutan.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="sustainability-badges">
      <div className="badges-header">
        <h2>Badge Keberlanjutan</h2>
        <p>Kumpulkan badge dengan melakukan tindakan ramah lingkungan</p>
      </div>

      <div className="badges-container">
        {Object.entries(groupedBadges).map(([category, categoryBadges]) => (
          <div key={category} className="badge-category">
            <h3>{category}</h3>
            <div className="badge-grid">
              {categoryBadges.map((badge) => (
                <div
                  key={badge.id}
                  className={`badge-item ${!badge.unlocked ? "locked" : ""}`}
                  onClick={() => openBadgeDetails(badge)}
                >
                  <div className="badge-icon">
                    {badge.unlocked ? (
                      <img src={badge.icon || "/placeholder.svg"} alt={badge.name} />
                    ) : (
                      <div className="locked-icon">
                        <Lock size={32} />
                      </div>
                    )}
                  </div>
                  <div className="badge-info">
                    <h4>{badge.name}</h4>
                    {badge.unlocked ? (
                      <span className="badge-date">Diperoleh: {badge.dateUnlocked}</span>
                    ) : (
                      <div className="progress-container">
                        <div className="progress-bar">
                          <div
                            className="progress"
                            style={{ width: `${(badge.progress / badge.target) * 100}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">
                          {badge.progress} / {badge.target}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="badge-hover-hint">
                    <Info size={14} />
                    <span>Klik untuk detail</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showDetails && selectedBadge && (
        <div className="badge-details-overlay" onClick={closeBadgeDetails}>
          <div className="badge-details" onClick={(e) => e.stopPropagation()}>
            <div className="badge-details-header">
              <h3>{selectedBadge.name}</h3>
              <button className="close-details" onClick={closeBadgeDetails}>
                <X size={24} />
              </button>
            </div>
            <div className="badge-details-content">
              <div className="badge-details-icon">
                {selectedBadge.unlocked ? (
                  <img src={selectedBadge.icon || "/placeholder.svg"} alt={selectedBadge.name} />
                ) : (
                  <div className="locked-icon large">
                    <Lock size={48} />
                  </div>
                )}
              </div>
              <div className="badge-details-info">
                <p className="badge-description">{selectedBadge.description}</p>

                {selectedBadge.unlocked ? (
                  <div className="badge-achievement">
                    <p className="achievement-date">Diperoleh pada {selectedBadge.dateUnlocked}</p>
                    <p className="achievement-details">{selectedBadge.achievementDetails}</p>
                  </div>
                ) : (
                  <div className="badge-requirements">
                    <h4>Persyaratan</h4>
                    <p>{selectedBadge.requirement}</p>
                    <div className="detailed-progress">
                      <div className="progress-bar">
                        <div
                          className="progress"
                          style={{ width: `${(selectedBadge.progress / selectedBadge.target) * 100}%` }}
                        ></div>
                      </div>
                      <div className="progress-details">
                        <span className="progress-fraction">
                          {selectedBadge.progress} / {selectedBadge.target}
                        </span>
                        <span className="progress-percentage">
                          {Math.round((selectedBadge.progress / selectedBadge.target) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {selectedBadge.relatedBadges && selectedBadge.relatedBadges.length > 0 && (
              <div className="badge-details-footer">
                <div className="related-badges">
                  <h4>Badge Terkait</h4>
                  <div className="related-badges-list">
                    {selectedBadge.relatedBadges.map((relatedBadge) => (
                      <div key={relatedBadge.id} className="related-badge">
                        <img src={relatedBadge.icon || "/placeholder.svg"} alt={relatedBadge.name} />
                        <span>{relatedBadge.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SustainabilityBadges
