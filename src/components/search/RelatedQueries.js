"use client"

import { useEffect, useRef } from "react"
import "../../styles/RelatedQueries.css"

const RelatedQueries = ({ queries, currentQuery, onQueryClick }) => {
  const canvasRef = useRef(null)

  // Efek untuk menggambar koneksi visual
  useEffect(() => {
    if (!canvasRef.current || queries.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const container = canvas.parentElement

    // Set ukuran canvas
    canvas.width = container.offsetWidth
    canvas.height = container.offsetHeight

    // Bersihkan canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Dapatkan posisi elemen
    const centerElement = document.getElementById("current-query")
    const relatedElements = Array.from(document.querySelectorAll(".related-query-item"))

    if (!centerElement || relatedElements.length === 0) return

    // Posisi tengah
    const centerRect = centerElement.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    const centerX = centerRect.left + centerRect.width / 2 - containerRect.left
    const centerY = centerRect.top + centerRect.height / 2 - containerRect.top

    // Gambar koneksi
    ctx.lineWidth = 2
    ctx.strokeStyle = "rgba(67, 160, 71, 0.5)"

    relatedElements.forEach((element) => {
      const rect = element.getBoundingClientRect()
      const x = rect.left + rect.width / 2 - containerRect.left
      const y = rect.top + rect.height / 2 - containerRect.top

      // Gambar garis
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)

      // Kurva Bezier untuk efek yang lebih menarik
      const controlX = (centerX + x) / 2
      const controlY = (centerY + y) / 2 - 20

      ctx.quadraticCurveTo(controlX, controlY, x, y)
      ctx.stroke()

      // Gambar titik di ujung
      ctx.beginPath()
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fillStyle = "#43A047"
      ctx.fill()
    })

    // Gambar titik di tengah
    ctx.beginPath()
    ctx.arc(centerX, centerY, 5, 0, Math.PI * 2)
    ctx.fillStyle = "#43A047"
    ctx.fill()
  }, [queries, currentQuery])

  if (queries.length === 0) return null

  return (
    <div className="related-queries">
      <div className="related-header">
        <h3>Pencarian Terkait</h3>
      </div>

      <div className="related-queries-container">
        <canvas ref={canvasRef} className="connections-canvas"></canvas>

        <div id="current-query" className="current-query">
          <span>{currentQuery}</span>
        </div>

        <ul className="related-queries-list">
          {queries.map((query, index) => (
            <li
              key={index}
              className="related-query-item"
              onClick={() => onQueryClick(query)}
              style={{
                animationDelay: `${index * 0.1}s`,
                top: `${20 + index * 15}%`,
                left: index % 2 === 0 ? "20%" : "70%",
              }}
            >
              <span>{query}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default RelatedQueries
