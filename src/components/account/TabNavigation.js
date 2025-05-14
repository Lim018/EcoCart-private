"use client"

import React, { useState, useEffect } from "react"
import "../../styles/TabNavigation.css"

const TabNavigation = ({ tabs, activeTab, setActiveTab }) => {
  const [indicatorStyle, setIndicatorStyle] = useState({})
  const [tabRefs, setTabRefs] = useState([])

  // Inisialisasi refs untuk setiap tab
  useEffect(() => {
    setTabRefs(tabs.map(() => React.createRef()))
  }, [tabs])

  // Update posisi indikator saat tab aktif berubah
  useEffect(() => {
    if (tabRefs.length > 0 && tabRefs[activeTab] && tabRefs[activeTab].current) {
      const activeTabElement = tabRefs[activeTab].current
      setIndicatorStyle({
        width: `${activeTabElement.offsetWidth}px`,
        left: `${activeTabElement.offsetLeft}px`,
      })
    }
  }, [activeTab, tabRefs])

  // Handler untuk perubahan tab
  const handleTabChange = (index) => {
    setActiveTab(index)
  }

  return (
    <div className="tab-navigation">
      <div className="tabs">
        {tabs.map((tab, index) => (
          <button
            key={index}
            ref={tabRefs[index]}
            className={`tab ${activeTab === index ? "active" : ""}`}
            onClick={() => handleTabChange(index)}
            aria-selected={activeTab === index}
            role="tab"
          >
            {tab.icon && <span className="tab-icon">{tab.icon}</span>}
            <span className="tab-text">{tab.label}</span>
          </button>
        ))}
        <div className="tab-indicator" style={indicatorStyle} />
      </div>
    </div>
  )
}

export default TabNavigation
