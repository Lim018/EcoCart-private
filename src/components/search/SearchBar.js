"use client"

import { useState, useEffect, useRef } from "react"
import "../../styles/SearchBar.css"

const SearchBar = ({ value, onChange, suggestions, onSuggestionClick }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [typingAnimation, setTypingAnimation] = useState(false)
  const [animatedSuggestion, setAnimatedSuggestion] = useState("")
  const [cursorPosition, setCursorPosition] = useState(0)

  const inputRef = useRef(null)
  const suggestionsRef = useRef(null)

  // Efek untuk menangani klik di luar komponen
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Efek untuk animasi typing suggestion
  useEffect(() => {
    if (isFocused && suggestions.length > 0 && !value) {
      startTypingAnimation()
    } else {
      setTypingAnimation(false)
    }
  }, [isFocused, suggestions, value])

  // Fungsi untuk memulai animasi typing
  const startTypingAnimation = () => {
    if (suggestions.length === 0) return

    // Pilih suggestion secara acak
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)]
    setAnimatedSuggestion(randomSuggestion)
    setTypingAnimation(true)
    setCursorPosition(0)

    // Animasi typing karakter demi karakter
    let position = 0
    const typingInterval = setInterval(() => {
      position += 1
      setCursorPosition(position)

      if (position >= randomSuggestion.length) {
        clearInterval(typingInterval)

        // Jeda sebelum memulai animasi baru
        setTimeout(() => {
          // Animasi menghapus
          const deletingInterval = setInterval(() => {
            position -= 1
            setCursorPosition(position)

            if (position <= 0) {
              clearInterval(deletingInterval)

              // Jeda sebelum memulai animasi baru
              setTimeout(() => {
                startTypingAnimation()
              }, 1000)
            }
          }, 50)
        }, 2000)
      }
    }, 100)

    return () => {
      clearInterval(typingInterval)
    }
  }

  // Handler untuk focus pada input
  const handleFocus = () => {
    setIsFocused(true)
    setShowSuggestions(true)
  }

  // Handler untuk blur pada input
  const handleBlur = () => {
    setIsFocused(false)
    // Jangan sembunyikan suggestions di sini, biarkan handleClickOutside yang menangani
  }

  // Handler untuk perubahan input
  const handleChange = (e) => {
    onChange(e.target.value)
    setShowSuggestions(true)
    setTypingAnimation(false)
  }

  // Handler untuk klik pada suggestion
  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion)
    setShowSuggestions(false)
    onSuggestionClick(suggestion)
    inputRef.current.focus()
  }

  // Handler untuk tombol clear
  const handleClear = () => {
    onChange("")
    inputRef.current.focus()
  }

  // Render placeholder dengan animasi typing
  const renderAnimatedPlaceholder = () => {
    if (!typingAnimation) return null

    return (
      <div className="animated-placeholder">
        <span className="animated-text">{animatedSuggestion.substring(0, cursorPosition)}</span>
        <span className="cursor"></span>
      </div>
    )
  }

  // Filter suggestions berdasarkan input
  const filteredSuggestions = value
    ? suggestions.filter((suggestion) => suggestion.toLowerCase().includes(value.toLowerCase()))
    : suggestions

  return (
    <div className="search-bar-container">
      <div className={`search-bar ${isFocused ? "focused" : ""}`}>
        <div className="search-icon">
          <i className="fas fa-search"></i>
        </div>

        <div className="input-wrapper">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Cari produk eco-friendly..."
            className="search-input"
          />

          {!value && renderAnimatedPlaceholder()}
        </div>

        {value && (
          <button className="clear-button" onClick={handleClear} aria-label="Clear search">
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="search-suggestions" ref={suggestionsRef}>
          <ul>
            {filteredSuggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)} className="suggestion-item">
                <div className="suggestion-icon">
                  <i className="fas fa-search"></i>
                </div>
                <div className="suggestion-text">{highlightMatch(suggestion, value)}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// Fungsi untuk menyorot bagian yang cocok dengan query
const highlightMatch = (text, query) => {
  if (!query) return text

  const parts = text.split(new RegExp(`(${query})`, "gi"))

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={index} className="highlight">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}

export default SearchBar
