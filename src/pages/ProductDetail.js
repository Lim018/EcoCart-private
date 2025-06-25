"use client"

import { useEffect, useRef, useState } from "react"
import { useParams, Link } from "react-router-dom"
import TestimonialCarousel from "../components/TestimonialCarousel"
import "../styles/ProductDetail.css"

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("description")
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [isZooming, setIsZooming] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [relatedProducts, setRelatedProducts] = useState([])
  const imageRef = useRef(null)

  // Format price in IDR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
  }

  // Sample product data (in a real app, this would come from an API)
  const productData = {
    id: 1,
    name: "Set Sikat Gigi Bambu",
    price: 194850,
    discount: 0,
    images: [
      "/bamboo-toothbrush-set.png",
      "/bamboo-toothbrush-angle.png",
      "/bamboo-toothbrush-packaging.png",
      "/bamboo-toothbrush-detail.png",
    ],
    category: "home",
    rating: 4.8,
    reviewCount: 124,
    stock: 50,
    isNew: true,
    isBestseller: true,
    sustainabilityScore: 95,
    description:
      "Set sikat gigi bambu kami dirancang untuk mengurangi limbah plastik tanpa mengorbankan kualitas. Setiap set mencakup 4 sikat gigi bambu biodegradable dengan bulu sikat berbahan nabati yang membersihkan sama efektifnya dengan sikat gigi plastik konvensional.",
    features: [
      "Gagang bambu 100% biodegradable",
      "Bulu sikat nilon bebas BPA",
      "Kemasan bebas plastik",
      "Tahan lama seperti sikat gigi konvensional",
      "Desain ergonomis untuk menyikat yang nyaman",
      "Kekerasan bulu sikat sedang cocok untuk sebagian besar pengguna",
    ],
    specifications: {
      Material: "Gagang bambu Moso, bulu sikat nilon bebas BPA",
      Dimensi: "Panjang 19cm, ukuran kepala standar",
      Berat: "15g per sikat gigi",
      Isi: "Set 4 sikat gigi",
      Kemasan: "Kotak karton daur ulang",
      Asal: "Diproduksi secara etis di Tiongkok",
      Sertifikasi: "Bambu bersertifikat FSC, Ramah vegan",
    },
    impact: {
      plasticSaved: "30g plastik dihemat per sikat gigi",
      co2Reduced: "80% lebih sedikit jejak karbon dibanding alternatif plastik",
      biodegradable: "Gagang sepenuhnya biodegradable",
      waterSaved: "Membutuhkan 65% lebih sedikit air untuk diproduksi dibanding plastik",
      recyclable: "Bulu sikat dapat didaur ulang melalui program khusus",
    },
    usage:
      "Ganti sikat gigi Anda setiap 3 bulan, atau lebih cepat jika bulu sikat sudah rusak. Setelah digunakan, bilas secara menyeluruh dan simpan dalam posisi tegak untuk memungkinkan gagang mengering. Jangan rendam dalam air untuk waktu yang lama.",
    endOfLife:
      "Ketika saatnya mengganti sikat gigi Anda, lepaskan bulu sikat (yang dapat didaur ulang melalui program khusus) dan komposkan gagang bambu. Gagang akan terurai dalam waktu 6 bulan dalam kondisi pengomposan komersial.",
    testimonials: [
      {
        id: 1,
        name: "Sarah J.",
        location: "Jakarta",
        rating: 5,
        comment:
          "Saya telah menggunakan sikat gigi bambu ini selama lebih dari setahun dan saya tidak akan kembali ke plastik! Mereka membersihkan sama baiknya, dan saya senang mengetahui saya mengurangi limbah plastik saya.",
        date: "2023-03-15",
        verified: true,
      },
      {
        id: 2,
        name: "Michael T.",
        location: "Surabaya",
        rating: 4,
        comment:
          "Sikat gigi yang bagus yang bekerja dengan baik. Satu-satunya alasan saya memberikan 4 bintang bukan 5 adalah karena bulu sikatnya sedikit lebih keras dari yang saya sukai, tetapi mereka melunakkan dengan penggunaan.",
        date: "2023-02-28",
        verified: true,
      },
      {
        id: 3,
        name: "Emma L.",
        location: "Bandung",
        rating: 5,
        comment:
          "Sikat gigi ini fantastis! Gagang bambu terasa nyaman dipegang, dan saya menghargai kemasan yang minimal. Pasti akan membeli lagi.",
        date: "2023-02-10",
        verified: true,
      },
    ],
  }

  // Sample related products
  const sampleRelatedProducts = [
    {
      id: 3,
      name: "Kantong Belanja Reusable",
      price: 239850,
      image: "/colorful-produce-bags.png",
      rating: 4.9,
      reviewCount: 203,
      sustainabilityScore: 98,
    },
    {
      id: 5,
      name: "Pembungkus Makanan Beeswax",
      price: 284850,
      image: "/beeswax-food-wraps.png",
      rating: 4.4,
      reviewCount: 156,
      sustainabilityScore: 95,
    },
    {
      id: 7,
      name: "Deodoran Alami",
      price: 224850,
      image: "/natural-deodorant.png",
      rating: 4.3,
      reviewCount: 78,
      sustainabilityScore: 92,
    },
  ]

  // Fetch product data
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setProduct(productData)
      setRelatedProducts(sampleRelatedProducts)
      setLoading(false)
    }, 500)
  }, [id])

  // Handle image zoom
  const handleMouseMove = (e) => {
    if (!imageRef.current) return

    const { left, top, width, height } = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setZoomPosition({ x, y })
  }

  // Increment quantity
  const incrementQuantity = () => {
    if (quantity < product?.stock) {
      setQuantity(quantity + 1)
    }
  }

  // Decrement quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  if (loading) {
    return (
      <div className="product-detail-loading">
        <div className="container">
          <div className="loading-spinner"></div>
          <p>Memuat detail produk...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <div className="container">
          <h2>Produk Tidak Ditemukan</h2>
          <p>Maaf, produk yang Anda cari tidak ada.</p>
          <Link to="/products" className="btn btn-primary">
            Kembali ke Produk
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="product-detail">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <Link to="/">Beranda</Link>
          <span className="separator">/</span>
          <Link to="/products">Produk</Link>
          <span className="separator">/</span>
          <span className="current">{product.name}</span>
        </div>

        {/* Product Overview */}
        <div className="product-overview">
          <div className="product-gallery">
            <div className="gallery-main">
              <div
                className={`zoom-container ${isZooming ? "zooming" : ""}`}
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  ref={imageRef}
                  src={product.images[activeImageIndex] || "/placeholder.svg"}
                  alt={product.name}
                  className="main-image"
                />
                {isZooming && (
                  <div
                    className="zoomed-image"
                    style={{
                      backgroundImage: `url(${product.images[activeImageIndex]})`,
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    }}
                  ></div>
                )}
              </div>
            </div>

            <div className="gallery-thumbnails">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail-btn ${activeImageIndex === index ? "active" : ""}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={image || "/placeholder.svg"} alt={`${product.name} - Tampilan ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="product-info">
            {product.isNew && <div className="product-badge new">Baru</div>}
            {product.isBestseller && <div className="product-badge bestseller">Terlaris</div>}

            <h1 className="product-name">{product.name}</h1>

            <div className="product-meta">
              <div className="product-rating">
                <div className="stars" style={{ "--rating": product.rating }}></div>
                <Link to="#reviews" className="review-count">
                  {product.reviewCount} ulasan
                </Link>
              </div>

              <div className="product-sku">SKU: ECO-BTB-001</div>
            </div>

            <div className="product-pricing">
              {product.discount > 0 ? (
                <>
                  <div className="original-price">{formatPrice(product.price + product.discount)}</div>
                  <div className="current-price">{formatPrice(product.price)}</div>
                  <div className="discount-badge">Hemat {formatPrice(product.discount)}</div>
                </>
              ) : (
                <div className="current-price">{formatPrice(product.price)}</div>
              )}
            </div>

            <div className="short-description">{product.description}</div>

            <div className="sustainability-impact">
              <h3>Dampak Lingkungan</h3>
              <div className="impact-meter">
                <div className="impact-bar">
                  <div className="impact-fill" style={{ width: `${product.sustainabilityScore}%` }}></div>
                </div>
                <div className="impact-score">
                  <span className="score-value">{product.sustainabilityScore}</span>
                  <span className="score-label">Skor Eco</span>
                </div>
              </div>

              <div className="impact-highlights">
                {Object.entries(product.impact)
                  .slice(0, 3)
                  .map(([key, value]) => (
                    <div className="impact-item" key={key}>
                      <i className="fas fa-leaf"></i>
                      <span>{value}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="product-actions">
              <div className="stock-status">
                <span className={`status-indicator ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}></span>
                {product.stock > 0 ? (
                  <span className="status-text">Stok Tersedia</span>
                ) : (
                  <span className="status-text">Stok Habis</span>
                )}
              </div>

              <div className="quantity-selector">
                <button className="quantity-btn" onClick={decrementQuantity} disabled={quantity <= 1}>
                  <i className="fas fa-minus"></i>
                </button>
                <input type="number" value={quantity} min="1" max={product.stock} readOnly />
                <button className="quantity-btn" onClick={incrementQuantity} disabled={quantity >= product.stock}>
                  <i className="fas fa-plus"></i>
                </button>
              </div>

              <button className="btn btn-primary add-to-cart-btn">
                <i className="fas fa-shopping-cart"></i> Tambahkan ke Keranjang
              </button>

              <button className="btn btn-outline wishlist-btn">
                <i className="far fa-heart"></i> Tambahkan ke Wishlist
              </button>
            </div>

            <div className="product-meta-info">
              <div className="meta-item">
                <span className="meta-label">Kategori:</span>
                <Link to={`/products/category/${product.category}`} className="meta-value">
                  {product.category === "home" ? "Rumah & Hidup" : 
                   product.category === "fashion" ? "Fashion Ramah Lingkungan" : 
                   product.category === "beauty" ? "Kecantikan Alami" : 
                   product.category === "food" ? "Makanan Organik" : 
                   product.category === "gifts" ? "Hadiah Berkelanjutan" : 
                   product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </Link>
              </div>

              <div className="meta-item">
                <span className="meta-label">Tag:</span>
                <span className="meta-value">
                  <Link to="/products/tag/eco-friendly">Ramah lingkungan</Link>,
                  <Link to="/products/tag/plastic-free">Bebas plastik</Link>,
                  <Link to="/products/tag/biodegradable">Biodegradable</Link>
                </span>
              </div>

              <div className="meta-item">
                <span className="meta-label">Bagikan:</span>
                <div className="social-share">
                  <a href="#" className="social-icon">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-pinterest-p"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="product-details">
          <div className="tabs-navigation">
            <button
              className={`tab-btn ${activeTab === "description" ? "active" : ""}`}
              onClick={() => setActiveTab("description")}
            >
              Deskripsi
            </button>
            <button
              className={`tab-btn ${activeTab === "specifications" ? "active" : ""}`}
              onClick={() => setActiveTab("specifications")}
            >
              Spesifikasi
            </button>
            <button
              className={`tab-btn ${activeTab === "sustainability" ? "active" : ""}`}
              onClick={() => setActiveTab("sustainability")}
            >
              Keberlanjutan
            </button>
            <button
              className={`tab-btn ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              Ulasan ({product.reviewCount})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "description" && (
              <div className="description-tab">
                <div className="product-description">
                  <p>{product.description}</p>

                  <h3>Fitur</h3>
                  <ul className="features-list">
                    {product.features.map((feature, index) => (
                      <li key={index}>
                        <i className="fas fa-check"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <h3>Cara Penggunaan</h3>
                  <p>{product.usage}</p>

                  <h3>Akhir Masa Pakai</h3>
                  <p>{product.endOfLife}</p>
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="specifications-tab">
                <table className="specifications-table">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key}>
                        <th>{key}</th>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "sustainability" && (
              <div className="sustainability-tab">
                <div className="sustainability-score">
                  <div className="score-circle">
                    <svg viewBox="0 0 36 36">
                      <path
                        className="score-circle-bg"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="score-circle-fill"
                        strokeDasharray={`${product.sustainabilityScore}, 100`}
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <text x="18" y="20.35" className="score-text">
                        {product.sustainabilityScore}
                      </text>
                    </svg>
                    <span className="score-label">Skor Eco</span>
                  </div>

                  <div className="score-explanation">
                    <h3>Arti Skor Ini</h3>
                    <p>
                      Skor Eco kami menilai produk pada skala 0-100 berdasarkan dampak lingkungan, bahan, metode produksi, kemasan, dan pertimbangan akhir masa pakai. Skor di atas 90 menunjukkan produk ramah lingkungan yang luar biasa.
                    </p>
                  </div>
                </div>

                <div className="impact-details">
                  <h3>Dampak Lingkungan</h3>
                  <div className="impact-grid">
                    {Object.entries(product.impact).map(([key, value]) => (
                      <div className="impact-card" key={key}>
                        <div className="impact-icon">
                          <i className="fas fa-leaf"></i>
                        </div>
                        <div className="impact-text">{value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="certifications">
                    <h3>Sertifikasi</h3>
                    <div className="certification-logos">
                      <div className="certification">
                        <img src="/fsc-certified.png" alt="FSC Certified" />
                        <span>Bersertifikat FSC</span>
                      </div>
                      <div className="certification">
                        <img src="/vegan-friendly.png" alt="Vegan Friendly" />
                        <span>Ramah Vegan</span>
                      </div>
                      <div className="certification">
                        <img src="/plastic-free.png" alt="Plastic Free" />
                        <span>Bebas Plastik</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="reviews-tab" id="reviews">
                <div className="reviews-summary">
                  <div className="average-rating">
                    <div className="rating-number">{product.rating.toFixed(1)}</div>
                    <div className="rating-stars">
                      <div className="stars" style={{ "--rating": product.rating }}></div>
                      <span className="review-count">{product.reviewCount} ulasan</span>
                    </div>
                  </div>

                  <div className="rating-breakdown">
                    <div className="rating-bar">
                      <span className="rating-label">5 bintang</span>
                      <div className="bar-container">
                        <div className="bar-fill" style={{ width: "70%" }}></div>
                      </div>
                      <span className="rating-percent">70%</span>
                    </div>
                    <div className="rating-bar">
                      <span className="rating-label">4 bintang</span>
                      <div className="bar-container">
                        <div className="bar-fill" style={{ width: "20%" }}></div>
                      </div>
                      <span className="rating-percent">20%</span>
                    </div>
                    <div className="rating-bar">
                      <span className="rating-label">3 bintang</span>
                      <div className="bar-container">
                        <div className="bar-fill" style={{ width: "7%" }}></div>
                      </div>
                      <span className="rating-percent">7%</span>
                    </div>
                    <div className="rating-bar">
                      <span className="rating-label">2 bintang</span>
                      <div className="bar-container">
                        <div className="bar-fill" style={{ width: "2%" }}></div>
                      </div>
                      <span className="rating-percent">2%</span>
                    </div>
                    <div className="rating-bar">
                      <span className="rating-label">1 bintang</span>
                      <div className="bar-container">
                        <div className="bar-fill" style={{ width: "1%" }}></div>
                      </div>
                      <span className="rating-percent">1%</span>
                    </div>
                  </div>
                </div>

                <div className="testimonial-section">
                  <h3>Testimoni Pelanggan</h3>
                  <TestimonialCarousel testimonials={product.testimonials} />
                </div>

                <div className="write-review">
                  <button className="btn btn-outline">Tulis Ulasan</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="related-products">
          <h2>Produk Terkait</h2>
          <div className="related-products-grid">
            {relatedProducts.map((relatedProduct) => (
              <div className="product-card" key={relatedProduct.id}>
                <div className="product-image">
                  <img src={relatedProduct.image || "/placeholder.svg"} alt={relatedProduct.name} />
                  <div className="product-actions">
                    <button className="wishlist-btn" aria-label="Tambahkan ke wishlist">
                      <i className="far fa-heart"></i>
                    </button>
                    <button className="quickview-btn" aria-label="Lihat cepat">
                      <i className="fas fa-eye"></i>
                    </button>
                  </div>
                </div>

                <div className="product-info">
                  <h3 className="product-name">
                    <Link to={`/products/${relatedProduct.id}`}>{relatedProduct.name}</Link>
                  </h3>

                  <div className="product-price">{formatPrice(relatedProduct.price)}</div>

                  <div className="product-rating">
                    <div className="stars" style={{ "--rating": relatedProduct.rating }}></div>
                    <span className="review-count">({relatedProduct.reviewCount})</span>
                  </div>

                  <button className="btn btn-primary add-to-cart">Tambahkan ke Keranjang</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail