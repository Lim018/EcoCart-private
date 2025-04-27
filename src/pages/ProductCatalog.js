"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import ComparisonSlider from "../components/ComparisonSlider"
import QuickViewModal from "../components/QuickViewModal"
import "../styles/ProductCatalog.css"

const ProductCatalog = () => {
  const [activeCategory, setActiveCategory] = useState("all")
  const [activePriceRange, setActivePriceRange] = useState("all")
  const [activeSort, setActiveSort] = useState("popular")
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [wishlist, setWishlist] = useState([])
  const [animatingWishlistId, setAnimatingWishlistId] = useState(null)
  const filterRef = useRef(null)

  // Sample categories
  const categories = [
    { id: "all", name: "All Products" },
    { id: "home", name: "Home & Living" },
    { id: "fashion", name: "Eco Fashion" },
    { id: "beauty", name: "Natural Beauty" },
    { id: "food", name: "Organic Food" },
    { id: "gifts", name: "Sustainable Gifts" },
  ]

  // Sample price ranges
  const priceRanges = [
    { id: "all", name: "All Prices" },
    { id: "under25", name: "Under $25" },
    { id: "25to50", name: "$ 25 - $ 50" },
    { id: "50to100", name: "$ 50 - $ 100" },
    { id: "over100", name: "Over $ 100" },
  ]

  // Sample sort options
  const sortOptions = [
    { id: "popular", name: "Most Popular" },
    { id: "newest", name: "Newest Arrivals" },
    { id: "priceAsc", name: "Price: Low to High" },
    { id: "priceDesc", name: "Price: High to Low" },
    { id: "impact", name: "Environmental Impact" },
  ]

  // Sample products data
  const products = [
    {
      id: 1,
      name: "Bamboo Toothbrush Set",
      price: 12.99,
      image: "/eco-friendly-oral-care.png",
      comparisonImage: "/plastic-toothbrush-comparison.png",
      category: "home",
      rating: 4.8,
      reviewCount: 124,
      isNew: true,
      isBestseller: true,
      sustainabilityScore: 95,
      description: "Set of 4 biodegradable bamboo toothbrushes with plant-based bristles.",
      features: [
        "100% biodegradable bamboo handle",
        "BPA-free nylon bristles",
        "Plastic-free packaging",
        "Lasts as long as conventional toothbrushes",
      ],
      impact: {
        plasticSaved: "30g plastic saved per toothbrush",
        co2Reduced: "80% less carbon footprint than plastic alternatives",
        biodegradable: "Fully biodegradable handle",
      },
    },
    {
      id: 2,
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      image: "/folded-organic-tee.png",
      comparisonImage: "/conventional-cotton-comparison.png",
      category: "fashion",
      rating: 4.6,
      reviewCount: 89,
      isNew: false,
      isBestseller: true,
      sustainabilityScore: 90,
      description: "Soft, breathable t-shirt made from 100% GOTS certified organic cotton.",
      features: [
        "100% GOTS certified organic cotton",
        "No toxic dyes or chemicals",
        "Fair trade certified manufacturing",
        "Durable and long-lasting",
      ],
      impact: {
        waterSaved: "2,700 liters of water saved compared to conventional cotton",
        pesticideReduced: "No pesticides or harmful chemicals used",
        fairLabor: "Produced in fair labor certified facilities",
      },
    },
    {
      id: 3,
      name: "Reusable Produce Bags",
      price: 15.99,
      image: "/colorful-produce-bags.png",
      comparisonImage: "/plastic-produce-bags-comparison.png",
      category: "home",
      rating: 4.9,
      reviewCount: 203,
      isNew: false,
      isBestseller: true,
      sustainabilityScore: 98,
      description: "Set of 5 mesh produce bags made from organic cotton for grocery shopping.",
      features: [
        "Organic cotton mesh material",
        "Machine washable and durable",
        "Transparent enough for cashiers to see contents",
        "Drawstring closure",
      ],
      impact: {
        plasticSaved: "Eliminates need for 500+ plastic bags per year",
        reusable: "Lasts for years with proper care",
        biodegradable: "Fully biodegradable at end of life",
      },
    },
    {
      id: 4,
      name: "Solar Power Bank",
      price: 45.99,
      image: "/portable-solar-charging.png",
      comparisonImage: "/conventional-powerbank-comparison.png",
      category: "gifts",
      rating: 4.5,
      reviewCount: 67,
      isNew: true,
      isBestseller: false,
      sustainabilityScore: 85,
      description: "10,000mAh power bank with integrated solar panel for eco-friendly charging.",
      features: ["Integrated solar panel", "10,000mAh capacity", "Dual USB outputs", "Recycled plastic casing"],
      impact: {
        energySaved: "Harnesses renewable solar energy",
        recycledMaterials: "Casing made from 80% recycled plastics",
        carbonReduced: "Reduces carbon footprint from grid charging",
      },
    },
    {
      id: 5,
      name: "Beeswax Food Wraps",
      price: 18.99,
      image: "/beeswax-food-wraps.png",
      comparisonImage: "/plastic-wrap-comparison.png",
      category: "home",
      rating: 4.7,
      reviewCount: 156,
      isNew: false,
      isBestseller: true,
      sustainabilityScore: 95,
      description: "Set of 3 reusable beeswax food wraps to replace plastic wrap.",
      features: [
        "Made with organic cotton, beeswax, and tree resin",
        "Reusable for up to 1 year",
        "Washable with cold water",
        "Natural antibacterial properties",
      ],
      impact: {
        plasticSaved: "Replaces approximately 250 meters of plastic wrap annually",
        biodegradable: "Fully compostable at end of life",
        naturalMaterials: "Made from sustainable, natural ingredients",
      },
    },
    {
      id: 6,
      name: "Recycled Paper Notebook",
      price: 9.99,
      image: "/recycled-paper-notebook.png",
      comparisonImage: "/virgin-paper-notebook-comparison.png",
      category: "gifts",
      rating: 4.4,
      reviewCount: 42,
      isNew: false,
      isBestseller: false,
      sustainabilityScore: 88,
      description: "A5 notebook made from 100% post-consumer recycled paper.",
      features: ["100% recycled paper", "Soy-based ink printing", "Plastic-free binding", "80 sheets/160 pages"],
      impact: {
        treesSaved: "Saves trees by using recycled materials",
        waterSaved: "Uses 60% less water in production than virgin paper",
        energySaved: "Requires 40% less energy to produce",
      },
    },
    {
      id: 7,
      name: "Natural Deodorant",
      price: 14.99,
      image: "/natural-deodorant.png",
      comparisonImage: "/conventional-deodorant-comparison.png",
      category: "beauty",
      rating: 4.3,
      reviewCount: 78,
      isNew: true,
      isBestseller: false,
      sustainabilityScore: 92,
      description: "Aluminum-free natural deodorant in a compostable paper tube.",
      features: [
        "Aluminum and paraben-free",
        "Compostable paper packaging",
        "Vegan and cruelty-free",
        "Essential oil fragrance",
      ],
      impact: {
        chemicalReduced: "No harmful chemicals that can enter waterways",
        plasticSaved: "Zero plastic packaging waste",
        biodegradable: "Fully biodegradable container",
      },
    },
    {
      id: 8,
      name: "Organic Herb Garden Kit",
      price: 34.99,
      image: "/herb-garden-kit.png",
      comparisonImage: "/store-bought-herbs-comparison.png",
      category: "food",
      rating: 4.8,
      reviewCount: 91,
      isNew: false,
      isBestseller: true,
      sustainabilityScore: 97,
      description: "Grow your own organic herbs with this complete starter kit.",
      features: [
        "Includes 5 types of organic herb seeds",
        "Biodegradable growing pots",
        "Organic soil discs",
        "Bamboo plant markers",
      ],
      impact: {
        foodMiles: "Reduces food miles by growing at home",
        plasticSaved: "Eliminates plastic packaging from store-bought herbs",
        organicGrowing: "No pesticides or chemicals in your food",
      },
    },
  ]

  // Filter products based on selected filters
  useEffect(() => {
    let result = [...products]

    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter((product) => product.category === activeCategory)
    }

    // Filter by price range
    if (activePriceRange !== "all") {
      switch (activePriceRange) {
        case "under25":
          result = result.filter((product) => product.price < 25)
          break
        case "25to50":
          result = result.filter((product) => product.price >= 25 && product.price <= 50)
          break
        case "50to100":
          result = result.filter((product) => product.price > 50 && product.price <= 100)
          break
        case "over100":
          result = result.filter((product) => product.price > 100)
          break
        default:
          break
      }
    }

    // Sort products
    switch (activeSort) {
      case "priceAsc":
        result.sort((a, b) => a.price - b.price)
        break
      case "priceDesc":
        result.sort((a, b) => b.price - a.price)
        break
      case "newest":
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1))
        break
      case "impact":
        result.sort((a, b) => b.sustainabilityScore - a.sustainabilityScore)
        break
      default:
        // Popular - sort by bestseller and then by review count
        result.sort((a, b) => {
          if (a.isBestseller === b.isBestseller) {
            return b.reviewCount - a.reviewCount
          }
          return a.isBestseller ? -1 : 1
        })
    }

    // Add animation delay for staggered appearance
    result = result.map((product, index) => ({
      ...product,
      animationDelay: `${index * 0.1}s`,
    }))

    setFilteredProducts(result)
  }, [activeCategory, activePriceRange, activeSort])

  // Toggle wishlist
  const toggleWishlist = (productId) => {
    setAnimatingWishlistId(productId)
    setTimeout(() => setAnimatingWishlistId(null), 1000)

    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId))
    } else {
      setWishlist([...wishlist, productId])
    }
  }

  // Open quick view modal
  const openQuickView = (product) => {
    setQuickViewProduct(product)
  }

  // Close quick view modal
  const closeQuickView = () => {
    setQuickViewProduct(null)
  }

  // Toggle filter sidebar on mobile
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  return (
    <div className="product-catalog">
      <div className="catalog-header">
        <div className="container">
          <h1>Eco-Friendly Products</h1>
          <p>Discover sustainable alternatives for everyday items</p>
        </div>
      </div>

      <div className="container">
        <div className="catalog-layout">
          {/* Filter Sidebar */}
          <aside className={`filter-sidebar ${isFilterOpen ? "open" : ""}`} ref={filterRef}>
            <div className="filter-header">
              <h2>Filters</h2>
              <button className="close-filter" onClick={toggleFilter}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="filter-section">
              <h3>Categories</h3>
              <div className="filter-options">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`filter-option ${activeCategory === category.id ? "active" : ""}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                    {activeCategory === category.id && <i className="fas fa-check"></i>}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>Price Range</h3>
              <div className="filter-options">
                {priceRanges.map((range) => (
                  <button
                    key={range.id}
                    className={`filter-option ${activePriceRange === range.id ? "active" : ""}`}
                    onClick={() => setActivePriceRange(range.id)}
                  >
                    {range.name}
                    {activePriceRange === range.id && <i className="fas fa-check"></i>}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>Sustainability Features</h3>
              <div className="filter-checkboxes">
                <label className="filter-checkbox">
                  <input type="checkbox" name="plastic-free" />
                  <span className="checkbox-custom"></span>
                  Plastic-Free
                </label>
                <label className="filter-checkbox">
                  <input type="checkbox" name="biodegradable" />
                  <span className="checkbox-custom"></span>
                  Biodegradable
                </label>
                <label className="filter-checkbox">
                  <input type="checkbox" name="organic" />
                  <span className="checkbox-custom"></span>
                  Organic
                </label>
                <label className="filter-checkbox">
                  <input type="checkbox" name="recycled" />
                  <span className="checkbox-custom"></span>
                  Recycled Materials
                </label>
                <label className="filter-checkbox">
                  <input type="checkbox" name="fair-trade" />
                  <span className="checkbox-custom"></span>
                  Fair Trade
                </label>
              </div>
            </div>

            <div className="filter-section">
              <h3>Environmental Impact</h3>
              <div className="impact-slider">
                <input type="range" min="1" max="5" defaultValue="3" className="slider" />
                <div className="impact-labels">
                  <span>Lower</span>
                  <span>Higher</span>
                </div>
              </div>
            </div>

            <button className="btn btn-primary apply-filters">Apply Filters</button>
            <button className="btn btn-outline reset-filters">Reset All</button>
          </aside>

          {/* Main Content */}
          <div className="catalog-content">
            <div className="catalog-toolbar">
              <button className="filter-toggle" onClick={toggleFilter}>
                <i className="fas fa-filter"></i> Filters
              </button>

              <div className="catalog-sort">
                <label>Sort by:</label>
                <select value={activeSort} onChange={(e) => setActiveSort(e.target.value)} className="sort-select">
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="catalog-view">
                <button className="view-btn active">
                  <i className="fas fa-th"></i>
                </button>
                <button className="view-btn">
                  <i className="fas fa-list"></i>
                </button>
              </div>
            </div>

            <div className="catalog-results">
              <p>
                <span className="result-count">{filteredProducts.length}</span> products found
              </p>
            </div>

            {/* Featured Comparison */}
            <div className="featured-comparison">
              <h2>See the Difference</h2>
              <p>Compare eco-friendly products with conventional alternatives</p>

              <ComparisonSlider
                beforeImage="/eco-friendly-oral-care.png"
                afterImage="/plastic-toothbrush-comparison.png"
                beforeLabel="Eco-Friendly"
                afterLabel="Conventional"
              />

              <div className="comparison-info">
                <div className="comparison-stat">
                  <span className="stat-value">80%</span>
                  <span className="stat-label">Less Plastic</span>
                </div>
                <div className="comparison-stat">
                  <span className="stat-value">100%</span>
                  <span className="stat-label">Biodegradable</span>
                </div>
                <div className="comparison-stat">
                  <span className="stat-value">2x</span>
                  <span className="stat-label">Longer Lasting</span>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div className="product-card" key={product.id} style={{ animationDelay: product.animationDelay }}>
                  <div className="product-image">
                    <img src={product.image || "/placeholder.svg"} alt={product.name} />

                    {product.isNew && <div className="product-badge new">New</div>}
                    {product.isBestseller && <div className="product-badge bestseller">Bestseller</div>}

                    <div className="product-actions">
                      <button
                        className={`wishlist-btn ${wishlist.includes(product.id) ? "active" : ""} ${
                          animatingWishlistId === product.id ? "animate" : ""
                        }`}
                        onClick={() => toggleWishlist(product.id)}
                        aria-label="Add to wishlist"
                      >
                        <i className={`${wishlist.includes(product.id) ? "fas" : "far"} fa-heart`}></i>
                      </button>
                      <button className="quickview-btn" onClick={() => openQuickView(product)} aria-label="Quick view">
                        <i className="fas fa-eye"></i>
                      </button>
                    </div>
                  </div>

                  <div className="product-info">
                    <h3 className="product-name">
                      <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </h3>

                    <div className="product-price">${product.price.toFixed(2)}</div>

                    <div className="product-rating">
                      <div className="stars" style={{ "--rating": product.rating }}></div>
                      <span className="review-count">({product.reviewCount})</span>
                    </div>

                    <div className="sustainability-meter">
                      <div className="sustainability-fill" style={{ width: `${product.sustainabilityScore}%` }}></div>
                      <span className="sustainability-label">Eco Impact</span>
                    </div>

                    <button className="btn btn-primary add-to-cart">Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="load-more">
              <button className="btn btn-outline">Load More Products</button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && <QuickViewModal product={quickViewProduct} onClose={closeQuickView} />}
    </div>
  )
}

export default ProductCatalog
