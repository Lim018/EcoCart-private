"use client"

import { useState, useRef, useEffect } from "react"
import "../styles/ProductViewer360.css"

const ProductViewer360 = ({ images }) => {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [loadedImages, setLoadedImages] = useState([])
  const [autoRotate, setAutoRotate] = useState(false)
  const viewerRef = useRef(null)
  const autoRotateTimerRef = useRef(null)

  // Preload all images
  useEffect(() => {
    const imagePromises = images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.src = src || "/rotating-product-display.png"
        img.onload = () => resolve(img)
        img.onerror = () => {
          // Fallback to placeholder on error
          const fallbackImg = new Image()
          fallbackImg.src = `/placeholder.svg?height=400&width=400&query=product%20360%20view%20${images.indexOf(src)}`
          fallbackImg.onload = () => resolve(fallbackImg)
          fallbackImg.onerror = reject
        }
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

  // Auto-rotate functionality
  useEffect(() => {
    if (autoRotate && !isDragging) {
      autoRotateTimerRef.current = setInterval(() => {
        setCurrentFrame((prevFrame) => (prevFrame + 1) % images.length)
      }, 100)
    } else if (autoRotateTimerRef.current) {
      clearInterval(autoRotateTimerRef.current)
    }

    return () => {
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current)
      }
    }
  }, [autoRotate, isDragging, images.length])

  const handleMouseDown = (e) => {
    e.preventDefault()
    setIsDragging(true)
    setStartX(e.clientX)
    setAutoRotate(false)
  }

  const handleTouchStart = (e) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setAutoRotate(false)
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
    const framesToMove = Math.floor(deltaX / 10) // Increased sensitivity

    if (framesToMove !== 0) {
      // Calculate new frame index with wrapping
      let newFrame = (currentFrame - framesToMove) % frameCount
      if (newFrame < 0) newFrame += frameCount

      setCurrentFrame(newFrame)
      setStartX(clientX)
    }
  }

  const toggleAutoRotate = () => {
    setAutoRotate(!autoRotate)
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
            src={images[currentFrame] || "/placeholder.svg?height=400&width=400&query=product%20360%20view"}
            alt={`Product view ${currentFrame + 1}`}
            className="viewer-image"
            draggable="false"
          />
          <div className="viewer-controls">
            <div className="frame-indicator">
              <div className="frame-progress" style={{ width: `${(currentFrame / (images.length - 1)) * 100}%` }}></div>
            </div>
          </div>
          <button className="auto-rotate-btn" onClick={toggleAutoRotate}>
            <i className={`fas ${autoRotate ? "fa-pause" : "fa-play"}`}></i>
            <span>{autoRotate ? "Pause" : "Auto-Rotate"}</span>
          </button>
          <div className="viewer-instruction">
            <i className="fas fa-sync-alt"></i> Drag to rotate
          </div>
        </>
      )}
    </div>
  )
}

export default ProductViewer360
