"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import "../styles/ArticleArchive.css"

const ArticleArchive = () => {
  const [articles, setArticles] = useState([])
  const [visibleArticles, setVisibleArticles] = useState([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const loaderRef = useRef(null)

  // Sample categories
  const categories = [
    { id: "all", name: "Semua Artikel" },
    { id: "sustainability", name: "Keberlanjutan" },
    { id: "eco-living", name: "Hidup Ramah Lingkungan" },
    { id: "zero-waste", name: "Zero Waste" },
    { id: "climate", name: "Aksi Iklim" },
    { id: "ethical-fashion", name: "Fashion Etis" },
  ]

  // Sample articles data
  const sampleArticles = [
    {
      id: 1,
      title: "10 Cara Sederhana Mengurangi Jejak Plastik Anda",
      excerpt:
        "Tips praktis untuk mengurangi limbah plastik dalam kehidupan sehari-hari dan membuat dampak positif pada lingkungan.",
      image: "/cascading-plastic-alternatives.png",
      category: "zero-waste",
      author: "Emma Green",
      date: "2023-04-15",
      readTime: "5 menit baca",
    },
    {
      id: 2,
      title: "Kebangkitan Fashion Berkelanjutan: Di Balik Tren",
      excerpt: "Bagaimana fashion berkelanjutan mengubah industri dan mengapa hal itu penting untuk masa depan planet kita.",
      image: "/circular-fashion-cycle.png",
      category: "ethical-fashion",
      author: "Michael Rivers",
      date: "2023-04-10",
      readTime: "7 menit baca",
    },
    {
      id: 3,
      title: "Memahami Jejak Karbon: Panduan untuk Pemula",
      excerpt: "Pelajari apa arti jejak karbon, cara menghitungnya, dan cara efektif untuk mengurangi dampak Anda.",
      image: "/global-carbon-cycle.png",
      category: "climate",
      author: "Dr. James Wilson",
      date: "2023-04-05",
      readTime: "8 menit baca",
    },
    {
      id: 4,
      title: "Kompos 101: Mengubah Limbah Dapur Menjadi Emas untuk Kebun",
      excerpt: "Panduan langkah demi langkah untuk memulai sistem kompos Anda sendiri dan mengurangi limbah makanan di rumah.",
      image: "/backyard-compost-system.png",
      category: "eco-living",
      author: "Sophia Martinez",
      date: "2023-03-28",
      readTime: "6 menit baca",
    },
    {
      id: 5,
      title: "Biaya Lingkungan Tersembunyi dari Fast Fashion",
      excerpt:
        "Mengeksplorasi dampak lingkungan sebenarnya dari industri fashion dan bagaimana konsumen dapat membuat pilihan yang lebih baik.",
      image: "/placeholder.svg?key=hb2b6",
      category: "ethical-fashion",
      author: "Olivia Chen",
      date: "2023-03-20",
      readTime: "9 menit baca",
    },
    {
      id: 6,
      title: "Renovasi Rumah Berkelanjutan: Material dan Praktik Ramah Lingkungan",
      excerpt:
        "Cara membuat pilihan sadar lingkungan saat merenovasi rumah Anda tanpa mengorbankan gaya atau kualitas.",
      image: "/placeholder.svg?key=thl24",
      category: "eco-living",
      author: "Daniel Brooks",
      date: "2023-03-15",
      readTime: "10 menit baca",
    },
    {
      id: 7,
      title: "Sains di Balik Perubahan Iklim: Dijelaskan dengan Sederhana",
      excerpt: "Menguraikan sains kompleks perubahan iklim menjadi konsep yang dapat dipahami oleh semua orang.",
      image: "/placeholder.svg?key=c7hgb",
      category: "climate",
      author: "Dr. Sarah Johnson",
      date: "2023-03-08",
      readTime: "12 menit baca",
    },
    {
      id: 8,
      title: "Belanja Bahan Makanan Zero Waste: Panduan Praktis",
      excerpt:
        "Tips dan trik untuk mengurangi limbah kemasan saat berbelanja bahan makanan, dari persiapan hingga pembayaran.",
      image: "/placeholder.svg?key=7kwv8",
      category: "zero-waste",
      author: "Alex Turner",
      date: "2023-03-01",
      readTime: "5 menit baca",
    },
  ]

  // Generate more articles for infinite scroll demonstration
  const generateMoreArticles = (page) => {
    return sampleArticles.map((article) => ({
      ...article,
      id: article.id + page * 8,
      title: `${article.title} - Bagian ${page}`,
    }))
  }

  // Load initial articles
  useEffect(() => {
    setArticles(sampleArticles)
    setVisibleArticles(sampleArticles.slice(0, 6))
  }, [])

  // Filter articles by category
  useEffect(() => {
    setLoading(true)
    setPage(1)

    setTimeout(() => {
      const filtered =
        activeCategory === "all"
          ? sampleArticles
          : sampleArticles.filter((article) => article.category === activeCategory)

      setArticles(filtered)
      setVisibleArticles(filtered.slice(0, 6))
      setHasMore(filtered.length > 6)
      setLoading(false)
    }, 500) // Simulate loading delay
  }, [activeCategory])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreArticles()
        }
      },
      { threshold: 1.0 },
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [hasMore, loading, articles])

  // Load more articles function
  const loadMoreArticles = () => {
    setLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const nextPage = page + 1
      const moreArticles = generateMoreArticles(nextPage)

      if (nextPage > 3) {
        // Limit to 3 pages for demo
        setHasMore(false)
      } else {
        setPage(nextPage)
        setVisibleArticles((prev) => [...prev, ...moreArticles.slice(0, 6)])
      }

      setLoading(false)
    }, 1000)
  }

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId)
  }

  return (
    <div className="article-archive">
      <div className="archive-header">
        <div className="container">
          <h1>Artikel Hidup Ramah Lingkungan</h1>
          <p>Temukan tips, panduan, dan wawasan untuk gaya hidup yang lebih berkelanjutan</p>
        </div>
      </div>

      <div className="container">
        <div className="category-filter">
          <div className="filter-scroll">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? "active" : ""}`}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="articles-container">
          {loading && visibleArticles.length === 0 ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Memuat artikel...</p>
            </div>
          ) : (
            <>
              <div className="articles-grid">
                {visibleArticles.map((article) => (
                  <div className="article-card" key={article.id}>
                    <div className="article-image">
                      <img src={article.image || "/placeholder.svg"} alt={article.title} />
                      <div className="article-category">
                        {categories.find((cat) => cat.id === article.category)?.name}
                      </div>
                    </div>
                    <div className="article-content">
                      <h3 className="article-title">
                        <Link to={`/articles/${article.id}`}>{article.title}</Link>
                      </h3>
                      <p className="article-excerpt">{article.excerpt}</p>
                      <div className="article-meta">
                        <span className="article-author">{article.author}</span>
                        <span className="article-date">
                          {new Date(article.date).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                        <span className="article-read-time">{article.readTime}</span>
                      </div>
                    </div>
                    <div className="article-preview">
                      <div className="preview-content">
                        <h4>{article.title}</h4>
                        <p>{article.excerpt}</p>
                        <Link to={`/articles/${article.id}`} className="btn btn-primary btn-sm">
                          Baca Artikel
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {hasMore && (
                <div className="loader" ref={loaderRef}>
                  {loading ? (
                    <div className="loading-container">
                      <div className="loading-spinner"></div>
                      <p className="eco-loading-message">Memuat lebih banyak konten menghemat kertas... 🌱</p>
                    </div>
                  ) : (
                    <p className="scroll-message">Gulir untuk lebih banyak artikel</p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArticleArchive
