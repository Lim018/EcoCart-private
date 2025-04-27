"use client"

import { useState, useRef, useEffect } from "react"
import "../styles/ProductViewer360.css"

const ProductViewer360 = ({ images }) => {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [loadedImages, setLoadedImages] = useState([])
  const viewerRef = useRef(null)

  // Preload all images
  useEffect(() => {
    const imagePromises = images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = () => resolve(img)
        img.onerror = reject
      })
    })

    Promise.all(imagePromises)
      .then((loadedImgs) => {
        setLoadedImages(loadedImgs)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error loading 360 view images:", error)
        setIsLoading(false)
      })
  }, [images])

  const handleMouseDown = (e) => {
    e.preventDefault()
    setIsDragging(true)
    setStartX(e.clientX)
  }

  const handleTouchStart = (e) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    handleDrag(e.clientX)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    handleDrag(e.touches[0].clientX)
  }

  const handleDrag = (clientX) => {
    const deltaX = clientX - startX
    const frameCount = images.length

    // Calculate how many frames to move based on drag distance
    const framesToMove = Math.floor(deltaX / 20) // Adjust sensitivity here

    if (framesToMove !== 0) {
      // Calculate new frame index with wrapping
      let newFrame = (currentFrame - framesToMove) % frameCount
      if (newFrame < 0) newFrame += frameCount

      setCurrentFrame(newFrame)
      setStartX(clientX)
    }
  }

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("touchend", handleTouchEnd)
    document.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("touchend", handleTouchEnd)
      document.removeEventListener("touchmove", handleTouchMove)
    }
  }, [isDragging, startX, currentFrame])

  return (
    <div className="product-viewer-360" ref={viewerRef} onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}>
      {isLoading ? (
        <div className="viewer-loading">
          <div className="loading-spinner"></div>
          <p>Loading 360° view...</p>
        </div>
      ) : (
        <>
          <img
            src={images[currentFrame] || "/placeholder.svg"}
            alt={`Product view ${currentFrame + 1}`}
            className="viewer-image"
            draggable="false"
          />
          <div className="viewer-controls">
            <div className="frame-indicator">
              <div className="frame-progress" style={{ width: `${(currentFrame / (images.length - 1)) * 100}%` }}></div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ProductViewer360
