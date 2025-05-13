"use client"

import { useState, useEffect } from "react"
import "../styles/InteractiveMap.css"

const InteractiveMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  // Sample office locations
  const locations = [
    {
      id: 1,
      name: "Kantor Pusat Jakarta",
      address: "Jl. Sudirman No. 123, Jakarta Pusat",
      phone: "+62 21 5555 6666",
      email: "jakarta@ecocart.id",
      hours: "Senin - Jumat: 08.00 - 17.00",
      coordinates: { top: "30%", left: "50%" },
    },
    {
      id: 2,
      name: "Kantor Cabang Bandung",
      address: "Jl. Asia Afrika No. 45, Bandung",
      phone: "+62 22 4444 5555",
      email: "bandung@ecocart.id",
      hours: "Senin - Jumat: 08.30 - 16.30",
      coordinates: { top: "45%", left: "30%" },
    },
    {
      id: 3,
      name: "Kantor Cabang Surabaya",
      address: "Jl. Pemuda No. 78, Surabaya",
      phone: "+62 31 3333 4444",
      email: "surabaya@ecocart.id",
      hours: "Senin - Jumat: 08.00 - 17.00",
      coordinates: { top: "60%", left: "70%" },
    },
  ]

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleLocationClick = (location) => {
    setSelectedLocation((prev) => (prev?.id === location.id ? null : location))
  }

  const handleGetDirections = () => {
    if (!selectedLocation) return

    // In a real app, this would open Google Maps with directions
    alert(`Mendapatkan petunjuk arah ke ${selectedLocation.name}`)
  }

  const handleCallOffice = () => {
    if (!selectedLocation) return

    // In a real app, this would initiate a call
    alert(`Menelepon ${selectedLocation.name}: ${selectedLocation.phone}`)
  }

  return (
    <div className="map-container">
      {!mapLoaded ? (
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animation: "spin 2s linear infinite" }}
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a10 10 0 0 1 10 10"></path>
          </svg>
        </div>
      ) : (
        <div
          className="map-wrapper"
          style={{
            backgroundImage: "url(/placeholder.svg?height=400&width=800&query=map%20of%20Indonesia%20with%20cities)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {locations.map((location) => (
            <div
              key={location.id}
              className={`map-pin ${selectedLocation?.id === location.id ? "active" : ""}`}
              style={{
                top: location.coordinates.top,
                left: location.coordinates.left,
              }}
              onClick={() => handleLocationClick(location)}
            />
          ))}

          {selectedLocation && (
            <div className={`location-info ${selectedLocation ? "visible" : ""}`}>
              <h3>{selectedLocation.name}</h3>
              <p>{selectedLocation.address}</p>
              <p>{selectedLocation.phone}</p>
              <p>{selectedLocation.email}</p>
              <p>
                <small>{selectedLocation.hours}</small>
              </p>
              <div className="location-actions">
                <button onClick={handleGetDirections}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                  </svg>
                  Petunjuk Arah
                </button>
                <button onClick={handleCallOffice}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  Telepon
                </button>
              </div>
            </div>
          )}

          <div className="map-controls">
            <button className="map-control-btn" title="Zoom In">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </button>
            <button className="map-control-btn" title="Zoom Out">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default InteractiveMap
