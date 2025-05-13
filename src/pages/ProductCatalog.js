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
    { id: "all", name: "Semua Kategori" },
    { id: "home", name: "Rumah & Hidup" },
    { id: "fashion", name: "Fashion Ramah Lingkungan" },
    { id: "beauty", name: "Kecantikan Alami" },
    { id: "food", name: "Makanan Organik" },
    { id: "gifts", name: "Hadiah Berkelanjutan" },
  ]

  // Sample price ranges
  const priceRanges = [
    { id: "all", name: "Semua Harga" },
    { id: "under25", name: "Di bawah Rp375.000" },
    { id: "25to50", name: "Rp375.000 - Rp750.000" },
    { id: "50to100", name: "Rp750.000 - Rp1.500.000" },
    { id: "over100", name: "Di atas Rp1.500.000" },
  ]

  // Sample sort options
  const sortOptions = [
    { id: "popular", name: "Paling Populer" },
    { id: "newest", name: "Terbaru" },
    { id: "priceAsc", name: "Harga: Rendah ke Tinggi" },
    { id: "priceDesc", name: "Harga: Tinggi ke Rendah" },
    { id: "impact", name: "Dampak Lingkungan" },
  ]

  // Sample products data with converted prices to IDR
  const products = [
    {
      id: 1,
      name: "Set Sikat Gigi Bambu",
      price: 194850, // 12.99 USD * 15000
      image: "/bamboo-toothbrush-set.png",
      comparisonImage: "/plastic-toothbrush-comparison.png",
      category: "home",
      rating: 4.8,
      reviewCount: 124,
      isNew: true,
      isBestseller: true,
      sustainabilityScore: 95,
      description: "Set 4 sikat gigi bambu biodegradable dengan bulu sikat berbahan nabati.",
      features: [
        "Gagang bambu 100% biodegradable",
        "Bulu sikat nilon bebas BPA",
        "Kemasan bebas plastik",
        "Tahan lama seperti sikat gigi konvensional",
      ],
      impact: {
        plasticSaved: "30g plastik dihemat per sikat gigi",
        co2Reduced: "80% lebih sedikit jejak karbon dibanding alternatif plastik",
        biodegradable: "Gagang sepenuhnya biodegradable",
      },
    },
    {
      id: 2,
      name: "Kaos Katun Organik",
      price: 449850, // 29.99 USD * 15000
      image: "/organic-cotton-tshirt.png",
      comparisonImage: "/conventional-cotton-comparison.png",
      category: "fashion",
      rating: 4.6,
      reviewCount: 89,
      isNew: false,
      isBestseller: true,
      sustainabilityScore: 90,
      description: "Kaos lembut dan nyaman terbuat dari 100% katun organik bersertifikat GOTS.",
      features: [
        "100% katun organik bersertifikat GOTS",
        "Tanpa pewarna beracun atau bahan kimia",
        "Produksi bersertifikat fair trade",
        "Tahan lama dan awet",
      ],
      impact: {
        waterSaved: "2.700 liter air dihemat dibanding katun konvensional",
        pesticideReduced: "Tanpa pestisida atau bahan kimia berbahaya",
        fairLabor: "Diproduksi di fasilitas bersertifikat fair labor",
      },
    },
    {
      id: 3,
      name: "Kantong Belanja Reusable",
      price: 239850, // 15.99 USD * 15000
      image: "/reusable-produce-bags.png",
      comparisonImage: "/plastic-produce-bags-comparison.png",
      category: "home",
      rating: 4.9,
      reviewCount: 203,
      isNew: false,
      isBestseller: true,
      sustainabilityScore: 98,
      description: "Set 5 kantong jaring terbuat dari katun organik untuk belanja bahan makanan.",
      features: [
        "Bahan jaring katun organik",
        "Dapat dicuci dengan mesin dan tahan lama",
        "Cukup transparan untuk kasir melihat isinya",
        "Penutup tali serut",
      ],
      impact: {
        plasticSaved: "Menghilangkan kebutuhan lebih dari 500 kantong plastik per tahun",
        reusable: "Bertahan selama bertahun-tahun dengan perawatan yang tepat",
        biodegradable: "Sepenuhnya biodegradable di akhir masa pakai",
      },
    },
    {
      id: 4,
      name: "Power Bank Tenaga Surya",
      price: 689850, // 45.99 USD * 15000
      image: "/solar-power-bank.png",
      comparisonImage: "/conventional-powerbank-comparison.png",
      category: "gifts",
      rating: 4.5,
      reviewCount: 67,
      isNew: true,
      isBestseller: false,
      sustainabilityScore: 85,
      description: "Power bank 10.000mAh dengan panel surya terintegrasi untuk pengisian ramah lingkungan.",
      features: ["Panel surya terintegrasi", "Kapasitas 10.000mAh", "Dual output USB", "Casing plastik daur ulang"],
      impact: {
        energySaved: "Memanfaatkan energi surya terbarukan",
        recycledMaterials: "Casing terbuat dari 80% plastik daur ulang",
        carbonReduced: "Mengurangi jejak karbon dari pengisian listrik",
      },
    },
    {
      id: 5,
      name: "Pembungkus Makanan Beeswax",
      price: 284850, // 18.99 USD * 15000
      image: "/beeswax-food-wraps.png",
      comparisonImage: "/plastic-wrap-comparison.png",
      category: "home",
      rating: 4.7,
      reviewCount: 156,
      isNew: false,
      isBestseller: true,
      sustainabilityScore: 95,
      description: "Set 3 pembungkus makanan beeswax reusable untuk menggantikan plastik pembungkus.",
      features: [
        "Terbuat dari katun organik, lilin lebah, dan resin pohon",
        "Dapat digunakan kembali hingga 1 tahun",
        "Dapat dicuci dengan air dingin",
        "Memiliki sifat antibakteri alami",
      ],
      impact: {
        plasticSaved: "Menggantikan sekitar 250 meter plastik pembungkus setiap tahun",
        biodegradable: "Sepenuhnya dapat dikompos di akhir masa pakai",
        naturalMaterials: "Terbuat dari bahan alami dan berkelanjutan",
      },
    },
    {
      id: 6,
      name: "Buku Catatan Kertas Daur Ulang",
      price: 149850, // 9.99 USD * 15000
      image: "/recycled-paper-notebook.png",
      comparisonImage: "/virgin-paper-notebook-comparison.png",
      category: "gifts",
      rating: 4.4,
      reviewCount: 42,
      isNew: false,
      isBestseller: false,
      sustainabilityScore: 88,
      description: "Buku catatan A5 terbuat dari 100% kertas daur ulang pasca-konsumen.",
      features: ["100% kertas daur ulang", "Pencetakan dengan tinta berbasis kedelai", "Penjilidan bebas plastik", "80 lembar/160 halaman"],
      impact: {
        treesSaved: "Menyelamatkan pohon dengan menggunakan bahan daur ulang",
        waterSaved: "Menggunakan 60% lebih sedikit air dalam produksi dibanding kertas virgin",
        energySaved: "Membutuhkan 40% lebih sedikit energi untuk diproduksi",
      },
    },
    {
      id: 7,
      name: "Deodoran Alami",
      price: 224850, // 14.99 USD * 15000
      image: "/natural-deodorant.png",
      comparisonImage: "/conventional-deodorant-comparison.png",
      category: "beauty",
      rating: 4.3,
      reviewCount: 78,
      isNew: true,
      isBestseller: false,
      sustainabilityScore: 92,
      description: "Deodoran alami bebas aluminium dalam tabung kertas yang dapat dikompos.",
      features: [
        "Bebas aluminium dan paraben",
        "Kemasan kertas yang dapat dikompos",
        "Vegan dan bebas uji hewan",
        "Wewangian minyak esensial",
      ],
      impact: {
        chemicalReduced: "Tanpa bahan kimia berbahaya yang dapat masuk ke saluran air",
        plasticSaved: "Nol limbah kemasan plastik",
        biodegradable: "Wadah sepenuhnya biodegradable",
      },
    },
    {
      id: 8,
      name: "Kit Kebun Herbal Organik",
      price: 524850, // 34.99 USD * 15000
      image: "/herb-garden-kit.png",
      comparisonImage: "/store-bought-herbs-comparison.png",
      category: "food",
      rating: 4.8,
      reviewCount: 91,
      isNew: false,
      isBestseller: true,
      sustainabilityScore: 97,
      description: "Tumbuhkan herbal organik Anda sendiri dengan kit pemula lengkap ini.",
      features: [
        "Termasuk 5 jenis benih herbal organik",
        "Pot tanam biodegradable",
        "Cakram tanah organik",
        "Penanda tanaman bambu",
      ],
      impact: {
        foodMiles: "Mengurangi jarak tempuh makanan dengan menanam di rumah",
        plasticSaved: "Menghilangkan kemasan plastik dari herbal yang dibeli di toko",
        organicGrowing: "Tanpa pestisida atau bahan kimia dalam makanan Anda",
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
          result = result.filter((product) => product.price < 375000)
          break
        case "25to50":
          result = result.filter((product) => product.price >= 375000 && product.price <= 750000)
          break
        case "50to100":
          result = result.filter((product) => product.price > 750000 && product.price <= 1500000)
          break
        case "over100":
          result = result.filter((product) => product.price > 1500000)
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

  // Format price in IDR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
  }

  return (
    <div className="product-catalog">
      <div className="catalog-header">
        <div className="container">
          <h1>Produk Ramah Lingkungan</h1>
          <p>Temukan alternatif berkelanjutan untuk barang sehari-hari</p>
        </div>
      </div>

      <div className="container">
        <div className="catalog-layout">
          {/* Filter Sidebar */}
          <aside className={`filter-sidebar ${isFilterOpen ? "open" : ""}`} ref={filterRef}>
            <div className="filter-header">
              <h2>Filter</h2>
              <button className="close-filter" onClick={toggleFilter}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="filter-section">
              <h3>Kategori</h3>
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
              <h3>Rentang Harga</h3>
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
              <h3>Fitur Keberlanjutan</h3>
              <div className="filter-checkboxes">
                <label className="filter-checkbox">
                  <input type="checkbox" name="plastic-free" />
                  <span className="checkbox-custom"></span>
                  Bebas Plastik
                </label>
                <label className="filter-checkbox">
                  <input type="checkbox" name="biodegradable" />
                  <span className="checkbox-custom"></span>
                  Biodegradable
                </label>
                <label className="filter-checkbox">
                  <input type="checkbox" name="organic" />
                  <span className="checkbox-custom"></span>
                  Organik
                </label>
                <label className="filter-checkbox">
                  <input type="checkbox" name="recycled" />
                  <span className="checkbox-custom"></span>
                  Bahan Daur Ulang
                </label>
                <label className="filter-checkbox">
                  <input type="checkbox" name="fair-trade" />
                  <span className="checkbox-custom"></span>
                  Fair Trade
                </label>
              </div>
            </div>

            <div className="filter-section">
              <h3>Dampak Lingkungan</h3>
              <div className="impact-slider">
                <input type="range" min="1" max="5" defaultValue="3" className="slider" />
                <div className="impact-labels">
                  <span>Rendah</span>
                  <span>Tinggi</span>
                </div>
              </div>
            </div>

            <button className="btn btn-primary apply-filters">Terapkan Filter</button>
            <button className="btn btn-outline reset-filters">Reset Semua</button>
          </aside>

          {/* Main Content */}
          <div className="catalog-content">
            <div className="catalog-toolbar">
              <button className="filter-toggle" onClick={toggleFilter}>
                <i className="fas fa-filter"></i> Filter
              </button>

              <div className="catalog-sort">
                <label>Urutkan:</label>
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
                <span className="result-count">{filteredProducts.length}</span> produk ditemukan
              </p>
            </div>

            {/* Featured Comparison */}
            <div className="featured-comparison">
              <h2>Lihat Perbedaannya</h2>
              <p>Bandingkan produk ramah lingkungan dengan alternatif konvensional</p>

              <ComparisonSlider
                beforeImage="/eco-friendly-oral-care.png"
                afterImage="/plastic-toothbrush-comparison.png"
                beforeLabel="Ramah Lingkungan"
                afterLabel="Konvensional"
              />

              <div className="comparison-info">
                <div className="comparison-stat">
                  <span className="stat-value">80%</span>
                  <span className="stat-label">Lebih Sedikit Plastik</span>
                </div>
                <div className="comparison-stat">
                  <span className="stat-value">100%</span>
                  <span className="stat-label">Biodegradable</span>
                </div>
                <div className="comparison-stat">
                  <span className="stat-value">2x</span>
                  <span className="stat-label">Lebih Tahan Lama</span>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div className="product-card" key={product.id} style={{ animationDelay: product.animationDelay }}>
                  <div className="product-image">
                    <img src={product.image || "/placeholder.svg"} alt={product.name} />

                    {product.isNew && <div className="product-badge new">Baru</div>}
                    {product.isBestseller && <div className="product-badge bestseller">Terlaris</div>}

                    <div className="product-actions">
                      <button
                        className={`wishlist-btn ${wishlist.includes(product.id) ? "active" : ""} ${
                          animatingWishlistId === product.id ? "animate" : ""
                        }`}
                        onClick={() => toggleWishlist(product.id)}
                        aria-label="Tambahkan ke wishlist"
                      >
                        <i className={`${wishlist.includes(product.id) ? "fas" : "far"} fa-heart`}></i>
                      </button>
                      <button className="quickview-btn" onClick={() => openQuickView(product)} aria-label="Lihat cepat">
                        <i className="fas fa-eye"></i>
                      </button>
                    </div>
                  </div>

                  <div className="product-info">
                    <h3 className="product-name">
                      <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </h3>

                    <div className="product-price">{formatPrice(product.price)}</div>

                    <div className="product-rating">
                      <div className="stars" style={{ "--rating": product.rating }}></div>
                      <span className="review-count">({product.reviewCount})</span>
                    </div>

                    <div className="sustainability-meter">
                      <div className="sustainability-fill" style={{ width: `${product.sustainabilityScore}%` }}></div>
                      <span className="sustainability-label">Dampak Lingkungan</span>
                    </div>

                    <button className="btn btn-primary add-to-cart">Tambahkan ke Keranjang</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="load-more">
              <button className="btn btn-outline">Muat Lebih Banyak Produk</button>
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
