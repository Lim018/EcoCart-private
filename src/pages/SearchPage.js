"use client"

import { useState, useEffect, useRef } from "react"
import SearchBar from "../components/search/SearchBar"
import FilterPanel from "../components/search/FilterPanel"
import SearchResults from "../components/search/SearchResults"
import SortOptions from "../components/search/SortOptions"
import SearchHistory from "../components/search/SearchHistory"
import SavedSearches from "../components/search/SavedSearches"
import RelatedQueries from "../components/search/RelatedQueries"
import FilterTags from "../components/search/FilterTags"
import { debounce } from "../utils/searchUtils"
import "../styles/SearchPage.css"

const SearchPage = () => {
  // State untuk query pencarian
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")

  // State untuk hasil pencarian
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // State untuk filter dan pengurutan
  const [activeFilters, setActiveFilters] = useState([])
  const [sortOption, setSortOption] = useState("relevance")
  const [viewMode, setViewMode] = useState("grid")

  // State untuk riwayat dan pencarian tersimpan
  const [searchHistory, setSearchHistory] = useState([])
  const [savedSearches, setSavedSearches] = useState([])

  // State untuk kueri terkait
  const [relatedQueries, setRelatedQueries] = useState([])

  // Ref untuk container hasil pencarian (untuk animasi transisi)
  const resultsContainerRef = useRef(null)

  // Debounce search query untuk mengurangi API calls
  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedQuery(searchQuery)
    }, 300)

    handler()
    return () => {
      handler.cancel()
    }
  }, [searchQuery])

  // Efek untuk memuat hasil pencarian
  useEffect(() => {
    if (debouncedQuery) {
      fetchSearchResults()
    } else {
      setResults([])
    }
  }, [debouncedQuery, activeFilters, sortOption])

  // Fungsi untuk memuat hasil pencarian
  const fetchSearchResults = async () => {
    setIsLoading(true)

    try {
      // Simulasi API call dengan timeout
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Data dummy untuk hasil pencarian
      const mockResults = generateMockResults(debouncedQuery, activeFilters, sortOption)

      // Animasi transisi untuk hasil
      if (resultsContainerRef.current) {
        resultsContainerRef.current.classList.add("fade-transition")
        setTimeout(() => {
          setResults(mockResults)
          if (resultsContainerRef.current) {
            resultsContainerRef.current.classList.remove("fade-transition")
          }
        }, 300)
      } else {
        setResults(mockResults)
      }

      // Update riwayat pencarian jika query baru
      if (debouncedQuery && !searchHistory.includes(debouncedQuery)) {
        setSearchHistory((prev) => [debouncedQuery, ...prev].slice(0, 10))
      }

      // Generate kueri terkait
      setRelatedQueries(generateRelatedQueries(debouncedQuery))
    } catch (error) {
      console.error("Error fetching search results:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Fungsi untuk menghasilkan data dummy hasil pencarian
  const generateMockResults = (query, filters, sort) => {
    // Produk dummy
    const products = [
      {
        id: 1,
        name: "Bamboo Toothbrush Set",
        category: "Personal Care",
        price: 12.99,
        rating: 4.8,
        eco_score: 9.5,
        image: "/bamboo-toothbrush-set.png",
        tags: ["bathroom", "eco-friendly", "plastic-free"],
      },
      {
        id: 2,
        name: "Organic Cotton T-shirt",
        category: "Clothing",
        price: 24.99,
        rating: 4.6,
        eco_score: 8.9,
        image: "/organic-cotton-tshirt.png",
        tags: ["clothing", "organic", "sustainable-fashion"],
      },
      {
        id: 3,
        name: "Reusable Produce Bags",
        category: "Kitchen",
        price: 15.99,
        rating: 4.7,
        eco_score: 9.2,
        image: "/reusable-produce-bags.png",
        tags: ["kitchen", "zero-waste", "shopping"],
      },
      {
        id: 4,
        name: "Solar Power Bank",
        category: "Electronics",
        price: 39.99,
        rating: 4.5,
        eco_score: 8.7,
        image: "/solar-power-bank.png",
        tags: ["electronics", "renewable-energy", "travel"],
      },
      {
        id: 5,
        name: "Beeswax Food Wraps",
        category: "Kitchen",
        price: 18.99,
        rating: 4.9,
        eco_score: 9.7,
        image: "/beeswax-food-wraps.png",
        tags: ["kitchen", "food-storage", "plastic-free"],
      },
      {
        id: 6,
        name: "Recycled Paper Notebook",
        category: "Stationery",
        price: 8.99,
        rating: 4.4,
        eco_score: 8.5,
        image: "/recycled-paper-notebook.png",
        tags: ["office", "recycled", "stationery"],
      },
      {
        id: 7,
        name: "Natural Deodorant",
        category: "Personal Care",
        price: 9.99,
        rating: 4.3,
        eco_score: 9.0,
        image: "/natural-deodorant.png",
        tags: ["bathroom", "natural", "aluminum-free"],
      },
      {
        id: 8,
        name: "Herb Garden Kit",
        category: "Garden",
        price: 29.99,
        rating: 4.7,
        eco_score: 9.4,
        image: "/herb-garden-kit.png",
        tags: ["garden", "food", "sustainable-living"],
      },
    ]

    // Filter produk berdasarkan query dan filter aktif
    let filteredProducts = products

    if (query) {
      const lowerQuery = query.toLowerCase()
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerQuery) ||
          product.category.toLowerCase().includes(lowerQuery) ||
          product.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
      )
    }

    if (filters.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.every((filter) => {
          const [type, value] = filter.split(":")

          switch (type) {
            case "category":
              return product.category === value
            case "price":
              const [min, max] = value.split("-").map(Number)
              return product.price >= min && product.price <= max
            case "rating":
              return product.rating >= Number(value)
            case "eco_score":
              return product.eco_score >= Number(value)
            case "tag":
              return product.tags.includes(value)
            default:
              return true
          }
        }),
      )
    }

    // Urutkan produk
    switch (sort) {
      case "price_low":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price_high":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      case "eco_score":
        filteredProducts.sort((a, b) => b.eco_score - a.eco_score)
        break
      default: // relevance - no additional sorting
        break
    }

    return filteredProducts
  }

  // Fungsi untuk menghasilkan kueri terkait
  const generateRelatedQueries = (query) => {
    if (!query) return []

    // Contoh kueri terkait berdasarkan query
    const relatedTerms = {
      bamboo: ["bamboo products", "bamboo toothbrush", "bamboo utensils", "sustainable bamboo"],
      organic: ["organic clothing", "organic cotton", "organic products", "organic materials"],
      reusable: ["reusable bags", "reusable containers", "reusable products", "zero waste reusable"],
      solar: ["solar charger", "solar powered", "solar energy products", "renewable energy"],
      eco: ["eco friendly", "eco products", "eco living", "eco sustainable"],
    }

    // Cari kata kunci yang cocok
    const lowerQuery = query.toLowerCase()
    let related = []

    Object.keys(relatedTerms).forEach((key) => {
      if (lowerQuery.includes(key)) {
        related = [...related, ...relatedTerms[key]]
      }
    })

    // Jika tidak ada yang cocok, berikan beberapa saran umum
    if (related.length === 0) {
      related = ["eco friendly products", "sustainable living", "zero waste items", "green alternatives"]
    }

    // Batasi jumlah kueri terkait
    return related.slice(0, 5)
  }

  // Handler untuk mengubah query pencarian
  const handleSearchChange = (value) => {
    setSearchQuery(value)
  }

  // Handler untuk menambah/menghapus filter
  const handleFilterChange = (filter, isActive) => {
    if (isActive) {
      setActiveFilters((prev) => [...prev, filter])
    } else {
      setActiveFilters((prev) => prev.filter((f) => f !== filter))
    }
  }

  // Handler untuk menghapus filter tag
  const handleRemoveFilter = (filter) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filter))
  }

  // Handler untuk mengubah opsi pengurutan
  const handleSortChange = (option) => {
    setSortOption(option)
  }

  // Handler untuk mengubah mode tampilan
  const handleViewModeChange = (mode) => {
    setViewMode(mode)
  }

  // Handler untuk memilih item dari riwayat pencarian
  const handleHistoryItemClick = (query) => {
    setSearchQuery(query)
  }

  // Handler untuk menyimpan/menghapus pencarian
  const handleToggleSaveSearch = (query) => {
    if (savedSearches.includes(query)) {
      setSavedSearches((prev) => prev.filter((q) => q !== query))
    } else {
      setSavedSearches((prev) => [...prev, query])
    }
  }

  // Handler untuk memilih kueri terkait
  const handleRelatedQueryClick = (query) => {
    setSearchQuery(query)
  }

  return (
    <div className="search-page">
      <div className="search-page-header">
        <h1>Cari Produk Eco-Friendly</h1>
        <p>Temukan produk ramah lingkungan untuk gaya hidup berkelanjutan</p>
      </div>

      <div className="search-container">
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          suggestions={relatedQueries}
          onSuggestionClick={handleRelatedQueryClick}
        />

        <div className="search-history-container">
          <SearchHistory history={searchHistory} onItemClick={handleHistoryItemClick} />

          <SavedSearches
            savedSearches={savedSearches}
            onItemClick={handleHistoryItemClick}
            onToggleSave={handleToggleSaveSearch}
          />
        </div>

        {activeFilters.length > 0 && <FilterTags filters={activeFilters} onRemove={handleRemoveFilter} />}
      </div>

      <div className="search-content">
        <aside className="search-sidebar">
          <FilterPanel activeFilters={activeFilters} onChange={handleFilterChange} />

          {debouncedQuery && (
            <RelatedQueries
              queries={relatedQueries}
              currentQuery={debouncedQuery}
              onQueryClick={handleRelatedQueryClick}
            />
          )}
        </aside>

        <main className="search-results-container" ref={resultsContainerRef}>
          <div className="search-results-header">
            <div className="search-results-count">{isLoading ? "Mencari..." : `${results.length} hasil ditemukan`}</div>

            <div className="search-controls">
              <SortOptions value={sortOption} onChange={handleSortChange} />

              <div className="view-mode-toggle">
                <button
                  className={`view-mode-button ${viewMode === "grid" ? "active" : ""}`}
                  onClick={() => handleViewModeChange("grid")}
                  aria-label="Grid view"
                >
                  <i className="fas fa-th"></i>
                </button>
                <button
                  className={`view-mode-button ${viewMode === "list" ? "active" : ""}`}
                  onClick={() => handleViewModeChange("list")}
                  aria-label="List view"
                >
                  <i className="fas fa-list"></i>
                </button>
              </div>
            </div>
          </div>

          <SearchResults results={results} isLoading={isLoading} viewMode={viewMode} searchQuery={debouncedQuery} />
        </main>
      </div>
    </div>
  )
}

export default SearchPage
