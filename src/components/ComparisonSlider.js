"use client"

import { useState, useRef, useEffect } from "react"
import "../styles/ComparisonSlider.css"

const ComparisonSlider = ({ beforeImage, afterImage, beforeLabel, afterLabel }) => {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef(null)

  const handleMouseDown = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return

    const slider = sliderRef.current
    const rect = slider.getBoundingClientRect()
    const x = e.clientX - rect.left
    const position = (x / rect.width) * 100

    if (position >= 0 && position <= 100) {
      setSliderPosition(position)
    }
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return

    const slider = sliderRef.current
    const rect = slider.getBoundingClientRect()
    const touch = e.touches[0]
    const x = touch.clientX - rect.left
    const position = (x / rect.width) * 100

    if (position >= 0 && position <= 100) {
      setSliderPosition(position)
    }
  }

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("touchend", handleMouseUp)
    document.addEventListener("touchmove", handleTouchMove)

    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("touchend", handleMouseUp)
      document.removeEventListener("touchmove", handleTouchMove)
    }
  }, [isDragging])

  return (
    <div className="comparison-slider" ref={sliderRef}>
      <div className="comparison-before" style={{ width: `${sliderPosition}%` }}>
        <img src={beforeImage || "/placeholder.svg"} alt="Before" />
        <span className="comparison-label before-label">{beforeLabel}</span>
      </div>
      <div className="comparison-after">
        <img src={afterImage || "/placeholder.svg"} alt="After" />
        <span className="comparison-label after-label">{afterLabel}</span>
      </div>
      <div
        className="comparison-handle"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="handle-line"></div>
        <div className="handle-circle">
          <i className="fas fa-chevron-left"></i>
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>
    </div>
  )
}

export default ComparisonSlider
