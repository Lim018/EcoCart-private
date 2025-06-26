"use client"

import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import "../styles/LandingPage.css"

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0)
  const parallaxRef = useRef(null)
  const featuredProductsRef = useRef(null)
  const missionRef = useRef(null)
  const impactRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Format harga dalam Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price * 15000); // Konversi USD ke IDR
  };

  // Sample featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "Set Sikat Gigi Bambu",
      price: 12.99,
      image: "/eco-friendly-oral-care.png",
      category: "Perawatan Pribadi",
      sustainability: {
        materials: "Gagang bambu biodegradable, bulu sikat berbahan nabati",
        packaging: "Kemasan bebas plastik, dapat dikompos",
        impact: "Mengurangi limbah plastik sebanyak 30g per sikat gigi",
      },
    },
    {
      id: 2,
      name: "Kaos Katun Organik",
      price: 29.99,
      image: "/folded-organic-tee.png",
      category: "Fashion",
      sustainability: {
        materials: "100% katun organik bersertifikat GOTS",
        packaging: "Kemasan kertas daur ulang",
        impact: "Menghemat 2.700 liter air dibandingkan dengan katun konvensional",
      },
    },
    {
      id: 3,
      name: "Kantong Belanja Reusable",
      price: 15.99,
      image: "/colorful-produce-bags.png",
      category: "Dapur",
      sustainability: {
        materials: "Jaring katun organik",
        packaging: "Kemasan zero-waste",
        impact: "Menghilangkan kebutuhan lebih dari 500 kantong plastik per tahun",
      },
    },
    {
      id: 4,
      name: "Power Bank Tenaga Surya",
      price: 45.99,
      image: "/portable-solar-charging.png",
      category: "Elektronik",
      sustainability: {
        materials: "Casing plastik daur ulang, panel surya",
        packaging: "Kardus daur ulang minimal",
        impact: "Mengurangi jejak karbon dengan menggunakan energi terbarukan",
      },
    },
  ]

  // Sample impact data
  const impactData = [
    {
      icon: "fas fa-tree",
      count: "10.000+",
      label: "Pohon Ditanam",
      description: "Melalui kemitraan dengan proyek reboisasi, kami menanam pohon untuk setiap pembelian.",
    },
    {
      icon: "fas fa-water",
      count: "5 Juta+",
      label: "Liter Air Terhemat",
      description: "Metode produksi berkelanjutan kami menghemat jutaan liter air setiap tahun.",
    },
    {
      icon: "fas fa-trash-alt",
      count: "50.000+",
      label: "Kg Plastik Tercegah",
      description: "Kemasan bebas plastik kami mencegah ribuan kilogram limbah plastik.",
    },
    {
      icon: "fas fa-bolt",
      count: "75%",
      label: "Pengurangan Jejak Karbon",
      description: "Produk kami memiliki jejak karbon 75% lebih rendah dibandingkan alternatif konvensional.",
    },
  ]

  return (
    <div className="landing-page">
      {/* Hero Section with Parallax */}
      <section className="hero-section parallax-container" ref={parallaxRef}>
        <div
          className="parallax-bg"
          style={{
            backgroundImage: `url('/emerald-canopy.png')`,
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        ></div>
        <div className="hero-content">
          <h1 className="hero-title animate-slideUp">Belanja Berkelanjutan untuk Planet yang Lebih Baik</h1>
          <p className="hero-subtitle animate-slideUp">Temukan produk ramah lingkungan yang membuat perbedaan</p>
          <div className="hero-buttons animate-slideUp">
            <Link to="/products" className="btn btn-primary">
              Belanja Sekarang
            </Link>
            <Link to="/about" className="btn btn-outline">
              Pelajari Lebih Lanjut
            </Link>
          </div>
          <div className="hero-scroll-indicator">
            <span>Gulir untuk menjelajah</span>
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products section" ref={featuredProductsRef}>
        <div className="container">
          <div className="section-header">
            <h2>Produk Ramah Lingkungan Unggulan</h2>
            <p>Produk berkelanjutan pilihan yang membantu mengurangi jejak lingkungan Anda</p>
          </div>

          <div className="products-grid">
            {featuredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image || "/placeholder.svg"} alt={product.name} />
                  <div className="product-category">{product.category}</div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">{formatPrice(product.price)}</div>
                  <div className="product-sustainability-preview">
                    <i className="fas fa-leaf"></i> Ramah lingkungan
                  </div>
                </div>
                <div className="product-sustainability-details">
                  <h4>Detail Keberlanjutan</h4>
                  <ul>
                    <li>
                      <strong>Material:</strong> {product.sustainability.materials}
                    </li>
                    <li>
                      <strong>Kemasan:</strong> {product.sustainability.packaging}
                    </li>
                    <li>
                      <strong>Dampak:</strong> {product.sustainability.impact}
                    </li>
                  </ul>
                  <Link to={`/products`} className="btn btn-primary btn-sm">
                    Lihat Produk
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="view-all-container">
            <Link to="/products" className="btn btn-outline">
              Lihat Semua Produk
            </Link>
          </div>
        </div>
      </section>

      {/* Our Mission Section - Interactive Storytelling */}
      <section className="mission-section section" ref={missionRef}>
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Misi Kami</h2>
              <div className="mission-story">
                <div className="story-step">
                  <div className="story-number">01</div>
                  <h3>Sumber Berkelanjutan</h3>
                  <p>
                    Kami dengan hati-hati memilih produk yang terbuat dari bahan berkelanjutan, terbarukan, atau daur ulang
                    yang meminimalkan dampak lingkungan.
                  </p>
                </div>
                <div className="story-step">
                  <div className="story-number">02</div>
                  <h3>Produksi Etis</h3>
                  <p>
                    Kami bermitra dengan produsen yang memprioritaskan praktik kerja yang adil, kondisi kerja yang aman,
                    dan metode produksi yang bertanggung jawab terhadap lingkungan.
                  </p>
                </div>
                <div className="story-step">
                  <div className="story-number">03</div>
                  <h3>Kemasan Minimal</h3>
                  <p>
                    Kami berkomitmen untuk mengurangi limbah melalui kemasan bebas plastik, biodegradable, atau dapat
                    didaur ulang untuk semua produk kami.
                  </p>
                </div>
                <div className="story-step">
                  <div className="story-number">04</div>
                  <h3>Dampak Positif</h3>
                  <p>
                    Dengan setiap pembelian, kami berkontribusi pada inisiatif lingkungan seperti penanaman pohon,
                    pembersihan laut, dan proyek energi terbarukan.
                  </p>
                </div>
              </div>
            </div>
            <div className="mission-image">
              <div className="image-container">
                <img src="/interconnected-eco-production.png" alt="Misi berkelanjutan kami" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Impact Section */}
      <section className="impact-section section" ref={impactRef}>
        <div className="container">
          <div className="section-header">
            <h2>Dampak Lingkungan Kami</h2>
            <p>Bersama dengan pelanggan kami, kami membuat perbedaan yang terukur</p>
          </div>

          <div className="impact-grid">
            {impactData.map((item, index) => (
              <div className="impact-card" key={index}>
                <div className="impact-icon">
                  <i className={item.icon}></i>
                </div>
                <div className="impact-count">{item.count}</div>
                <div className="impact-label">{item.label}</div>
                <p className="impact-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section section">
        <div className="container">
          <div className="section-header">
            <h2>Apa Kata Pelanggan Kami</h2>
            <p>Bergabunglah dengan ribuan pembeli sadar lingkungan yang membuat perbedaan</p>
          </div>

          <div className="testimonials-slider">
            <div className="testimonial">
              <div className="testimonial-content">
                <p>
                  "EcoCart telah mengubah cara saya berbelanja. Produknya berkualitas tinggi dan benar-benar berkelanjutan,
                  dan saya senang mengetahui pembelian saya berdampak positif."
                </p>
              </div>
              <div className="testimonial-author">
                <img src="/serene-gaze.png" alt="Sarah J." className="author-image" />
                <div className="author-info">
                  <div className="author-name">Sarah J.</div>
                  <div className="author-location">Jakarta, Indonesia</div>
                </div>
              </div>
            </div>

            <div className="testimonial">
              <div className="testimonial-content">
                <p>
                  "Saya telah mencari toko serba ada untuk produk ramah lingkungan, dan EcoCart melebihi semua harapan saya.
                  Transparansi tentang dampak lingkungan setiap produk sangat menyegarkan."
                </p>
              </div>
              <div className="testimonial-author">
                <img src="/thoughtful-gaze.png" alt="Michael T." className="author-image" />
                <div className="author-info">
                  <div className="author-name">Michael T.</div>
                  <div className="author-location">Surabaya, Indonesia</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Bergabunglah dengan Gerakan Belanja Berkelanjutan</h2>
            <p>Mulai membuat pilihan ramah lingkungan hari ini dan jadilah bagian dari solusi</p>
            <Link to="/products" className="btn btn-primary btn-lg">
              Belanja Sekarang
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
