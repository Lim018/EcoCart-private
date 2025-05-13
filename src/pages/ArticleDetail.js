"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import "../styles/ArticleDetail.css"

// Mock data for the article
const mockArticleData = {
  id: "1",
  title: "Bagaimana Produk Ramah Lingkungan Membantu Mengurangi Jejak Karbon Anda",
  author: "Dr. Eka Pratiwi",
  date: "12 Mei 2023",
  readingTime: "8 menit",
  heroImage: "/emerald-canopy.png",
  category: "Sustainability",
  tags: ["eco-friendly", "carbon footprint", "sustainable living"],
  content: `
    <h2 id="section-introduction">Pendahuluan</h2>
    <p>Perubahan iklim menjadi salah satu tantangan terbesar yang dihadapi planet kita. Setiap produk yang kita beli dan gunakan memiliki dampak lingkungan, atau yang sering disebut sebagai "jejak karbon". Artikel ini akan membahas bagaimana beralih ke produk ramah lingkungan dapat secara signifikan mengurangi jejak karbon personal Anda.</p>
    
    <p>Jejak karbon adalah ukuran total emisi gas rumah kaca yang disebabkan secara langsung dan tidak langsung oleh individu, organisasi, acara, atau produk. Ini mencakup aktivitas seperti penggunaan listrik, transportasi, konsumsi makanan, dan pembelian barang-barang konsumen.</p>
    
    <figure class="article-image">
      <img src="/global-carbon-cycle.png" alt="Siklus Karbon Global" data-zoomable="true" />
      <figcaption>Siklus karbon global dan bagaimana aktivitas manusia memengaruhinya</figcaption>
    </figure>
    
    <h2 id="section-impact">Dampak Produk Sehari-hari Terhadap Lingkungan</h2>
    <p>Produk sehari-hari yang kita gunakan memiliki dampak lingkungan yang signifikan. Dari sikat gigi plastik hingga kemasan makanan sekali pakai, barang-barang ini berkontribusi pada masalah limbah global dan emisi karbon.</p>
    
    <div class="info-table">
      <h3>Perbandingan Dampak Lingkungan</h3>
      <table>
        <thead>
          <tr>
            <th>Produk Konvensional</th>
            <th>Alternatif Ramah Lingkungan</th>
            <th>Pengurangan Emisi CO2 (kg/tahun)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sikat gigi plastik</td>
            <td>Sikat gigi bambu</td>
            <td>0.5</td>
          </tr>
          <tr>
            <td>Botol air plastik sekali pakai</td>
            <td>Botol air isi ulang</td>
            <td>83</td>
          </tr>
          <tr>
            <td>Kantong plastik</td>
            <td>Tas belanja kain</td>
            <td>33</td>
          </tr>
          <tr>
            <td>Pembungkus plastik</td>
            <td>Beeswax wrap</td>
            <td>9.8</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <h2 id="section-alternatives">Alternatif Ramah Lingkungan</h2>
    <p>Beralih ke produk ramah lingkungan adalah salah satu cara termudah untuk mengurangi jejak karbon Anda. Berikut adalah beberapa alternatif populer untuk produk sehari-hari:</p>
    
    <h3 id="section-bathroom">Produk Kamar Mandi</h3>
    <p>Kamar mandi adalah tempat di mana kita sering menggunakan produk sekali pakai dan berbahan plastik. Beralih ke alternatif ramah lingkungan di area ini dapat memberikan dampak besar.</p>
    
    <figure class="article-image">
      <img src="/eco-friendly-oral-care.png" alt="Produk Perawatan Mulut Ramah Lingkungan" data-zoomable="true" />
      <figcaption>Produk perawatan mulut ramah lingkungan seperti sikat gigi bambu dan pasta gigi tablet</figcaption>
    </figure>
    
    <h3 id="section-kitchen">Produk Dapur</h3>
    <p>Dapur adalah area lain di rumah yang dapat menghasilkan banyak limbah. Dari pembungkus makanan hingga peralatan memasak, ada banyak cara untuk mengurangi dampak lingkungan Anda.</p>
    
    <div class="interactive-infographic" id="infographic-kitchen">
      <h4>Dampak Lingkungan dari Produk Dapur</h4>
      <div class="infographic-content">
        <!-- Interactive infographic content will be populated by JavaScript -->
      </div>
    </div>
    
    <h3 id="section-fashion">Fashion Berkelanjutan</h3>
    <p>Industri fashion adalah salah satu penyumbang polusi terbesar di dunia. Beralih ke pakaian berkelanjutan dapat membantu mengurangi dampak lingkungan Anda secara signifikan.</p>
    
    <figure class="article-image">
      <img src="/circular-fashion-cycle.png" alt="Siklus Fashion Sirkular" data-zoomable="true" />
      <figcaption>Siklus fashion sirkular: bagaimana pakaian dapat didaur ulang dan digunakan kembali</figcaption>
    </figure>
    
    <h2 id="section-benefits">Manfaat Beralih ke Produk Ramah Lingkungan</h2>
    <p>Selain mengurangi jejak karbon Anda, beralih ke produk ramah lingkungan memiliki banyak manfaat lain:</p>
    
    <ul>
      <li>Mengurangi limbah yang berakhir di tempat pembuangan sampah dan lautan</li>
      <li>Mendukung praktik bisnis yang berkelanjutan</li>
      <li>Sering kali lebih sehat karena mengandung lebih sedikit bahan kimia berbahaya</li>
      <li>Dapat menghemat uang dalam jangka panjang (misalnya, produk yang dapat digunakan kembali)</li>
      <li>Mendorong inovasi dalam desain produk berkelanjutan</li>
    </ul>
    
    <h2 id="section-challenges">Tantangan dan Solusi</h2>
    <p>Meskipun beralih ke produk ramah lingkungan memiliki banyak manfaat, ada beberapa tantangan yang mungkin Anda hadapi:</p>
    
    <h3>Biaya</h3>
    <p>Produk ramah lingkungan terkadang lebih mahal di awal. Namun, banyak dari produk ini dirancang untuk bertahan lebih lama atau dapat digunakan kembali, sehingga lebih ekonomis dalam jangka panjang.</p>
    
    <h3>Ketersediaan</h3>
    <p>Tidak semua produk ramah lingkungan tersedia secara luas. Namun, dengan meningkatnya permintaan, lebih banyak toko yang mulai menawarkan alternatif berkelanjutan.</p>
    
    <h3>Kebiasaan</h3>
    <p>Mengubah kebiasaan bisa jadi sulit. Mulailah dengan perubahan kecil dan bertahap tingkatkan seiring waktu.</p>
    
    <div class="quote-block">
      <blockquote>
        "Kita tidak membutuhkan segelintir orang yang melakukan keberlanjutan dengan sempurna. Kita membutuhkan jutaan orang yang melakukannya dengan tidak sempurna."
      </blockquote>
      <cite>— Anne-Marie Bonneau</cite>
    </div>
    
    <h2 id="section-conclusion">Kesimpulan</h2>
    <p>Beralih ke produk ramah lingkungan adalah salah satu cara paling efektif untuk mengurangi jejak karbon Anda dan berkontribusi pada planet yang lebih sehat. Setiap pilihan kecil memiliki dampak, dan dengan membuat perubahan bertahap dalam kebiasaan konsumsi Anda, Anda dapat membuat perbedaan nyata.</p>
    
    <p>Ingat, perjalanan menuju gaya hidup yang lebih berkelanjutan adalah maraton, bukan sprint. Mulailah dengan perubahan kecil dan bangun dari sana. Planet kita akan berterima kasih kepada Anda.</p>
  `,
  relatedArticles: [
    {
      id: "2",
      title: "10 Cara Mudah Mengurangi Limbah Plastik di Rumah Anda",
      excerpt: "Panduan praktis untuk mengurangi penggunaan plastik sekali pakai dalam kehidupan sehari-hari Anda.",
      image: "/cascading-plastic-alternatives.png",
      readingTime: "6 menit",
    },
    {
      id: "3",
      title: "Panduan Pemula untuk Berkebun Organik",
      excerpt: "Pelajari cara memulai kebun organik kecil Anda sendiri, bahkan di ruang terbatas.",
      image: "/backyard-compost-system.png",
      readingTime: "10 menit",
    },
    {
      id: "4",
      title: "Bagaimana Memahami Label Produk Berkelanjutan",
      excerpt: "Panduan untuk memahami berbagai sertifikasi dan klaim keberlanjutan pada produk.",
      image: "/interconnected-eco-production.png",
      readingTime: "7 menit",
    },
    {
      id: "5",
      title: "Dampak Lingkungan dari Diet Anda",
      excerpt: "Bagaimana pilihan makanan Anda memengaruhi planet dan cara membuat pilihan yang lebih berkelanjutan.",
      image: "/thoughtful-gaze.png",
      readingTime: "9 menit",
    },
  ],
  comments: [
    {
      id: "c1",
      user: "Budi Santoso",
      avatar: "/serene-gaze.png",
      date: "14 Mei 2023",
      content:
        "Artikel yang sangat informatif! Saya baru saja mulai beralih ke produk ramah lingkungan dan artikel ini memberikan banyak ide baru.",
    },
    {
      id: "c2",
      user: "Siti Rahayu",
      avatar: "/thoughtful-gaze.png",
      date: "15 Mei 2023",
      content:
        "Saya sudah menggunakan sikat gigi bambu selama setahun terakhir dan sangat puas. Bisakah Anda merekomendasikan alternatif ramah lingkungan untuk produk perawatan rambut?",
    },
  ],
}

// Table of contents generator
const generateTableOfContents = (content) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(content, "text/html")
  const headings = Array.from(doc.querySelectorAll("h2, h3")).filter((heading) => heading.id)

  return headings.map((heading) => ({
    id: heading.id,
    text: heading.textContent,
    level: heading.tagName === "H2" ? 2 : 3,
  }))
}

// Reading time calculator
const calculateReadingTime = (content) => {
  const text = content.replace(/<[^>]*>/g, "")
  const wordCount = text.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 200) // Assuming 200 words per minute
  return readingTime
}

const ArticleDetail = () => {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tableOfContents, setTableOfContents] = useState([])
  const [readingProgress, setReadingProgress] = useState(0)
  const [darkMode, setDarkMode] = useState(false)
  const [selectedText, setSelectedText] = useState(null)
  const [isTyping, setIsTyping] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [readingTimeEstimate, setReadingTimeEstimate] = useState(0)
  const [userScrollPace, setUserScrollPace] = useState(1)

  const articleRef = useRef(null)
  const contentRef = useRef(null)
  const carouselRef = useRef(null)
  const lastScrollTime = useRef(Date.now())
  const scrollPositions = useRef([])

  // Fetch article data
  useEffect(() => {
    // Simulate API call with setTimeout
    setTimeout(() => {
      setArticle(mockArticleData)
      setComments(mockArticleData.comments)
      setTableOfContents(generateTableOfContents(mockArticleData.content))
      setReadingTimeEstimate(calculateReadingTime(mockArticleData.content))
      setLoading(false)
    }, 500)
  }, [id])

  // Handle scroll for reading progress
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return

      const currentTime = Date.now()
      const timeDiff = currentTime - lastScrollTime.current

      // Track scroll positions for pace calculation
      if (timeDiff > 100) {
        // Only track every 100ms to avoid too many entries
        scrollPositions.current.push({
          position: window.scrollY,
          time: currentTime,
        })

        // Keep only the last 10 positions
        if (scrollPositions.current.length > 10) {
          scrollPositions.current.shift()
        }

        // Calculate user's scroll pace
        if (scrollPositions.current.length >= 2) {
          const oldestRecord = scrollPositions.current[0]
          const newestRecord = scrollPositions.current[scrollPositions.current.length - 1]
          const pixelsScrolled = newestRecord.position - oldestRecord.position
          const timeScrolled = newestRecord.time - oldestRecord.time

          // Positive value means scrolling down, negative means scrolling up
          if (pixelsScrolled > 0 && timeScrolled > 0) {
            // Calculate pixels per second
            const pixelsPerSecond = (pixelsScrolled / timeScrolled) * 1000
            // Map this to a pace factor between 0.5 and 1.5
            const newPace = Math.max(0.5, Math.min(1.5, pixelsPerSecond / 500))
            setUserScrollPace(newPace)
          }
        }

        lastScrollTime.current = currentTime
      }

      const totalHeight = contentRef.current.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setReadingProgress(Math.min(100, Math.max(0, progress)))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Update reading time based on user's scroll pace
  useEffect(() => {
    if (readingTimeEstimate > 0) {
      const adjustedTime = Math.round(readingTimeEstimate / userScrollPace)
      // Only update if the difference is significant
      if (Math.abs(adjustedTime - readingTimeEstimate) >= 1) {
        setReadingTimeEstimate(adjustedTime)
      }
    }
  }, [userScrollPace, readingTimeEstimate])

  // Handle text selection
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection()
      if (selection.toString().length > 0) {
        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()

        setSelectedText({
          text: selection.toString(),
          position: {
            top: rect.top + window.scrollY,
            left: rect.left + rect.width / 2,
          },
        })
      } else {
        setSelectedText(null)
      }
    }

    document.addEventListener("mouseup", handleSelection)
    return () => document.removeEventListener("mouseup", handleSelection)
  }, [])

  // Initialize interactive infographics
  useEffect(() => {
    if (!loading && article) {
      // Initialize kitchen infographic
      const kitchenInfographic = document.getElementById("infographic-kitchen")
      if (kitchenInfographic) {
        const infographicContent = kitchenInfographic.querySelector(".infographic-content")
        if (infographicContent) {
          infographicContent.innerHTML = `
            <div class="infographic-item" data-value="30">
              <div class="infographic-bar">
                <div class="infographic-fill" style="width: 0%"></div>
              </div>
              <div class="infographic-label">Plastik Sekali Pakai</div>
            </div>
            <div class="infographic-item" data-value="20">
              <div class="infographic-bar">
                <div class="infographic-fill" style="width: 0%"></div>
              </div>
              <div class="infographic-label">Kemasan Makanan</div>
            </div>
            <div class="infographic-item" data-value="15">
              <div class="infographic-bar">
                <div class="infographic-fill" style="width: 0%"></div>
              </div>
              <div class="infographic-label">Peralatan Memasak</div>
            </div>
            <div class="infographic-item" data-value="25">
              <div class="infographic-bar">
                <div class="infographic-fill" style="width: 0%"></div>
              </div>
              <div class="infographic-label">Alat Makan</div>
            </div>
            <div class="infographic-item" data-value="10">
              <div class="infographic-bar">
                <div class="infographic-fill" style="width: 0%"></div>
              </div>
              <div class="infographic-label">Lainnya</div>
            </div>
          `

          // Animate the bars when they come into view
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  const items = entry.target.querySelectorAll(".infographic-item")
                  items.forEach((item, index) => {
                    setTimeout(() => {
                      const value = item.getAttribute("data-value")
                      const fill = item.querySelector(".infographic-fill")
                      fill.style.width = `${value}%`
                    }, index * 200)
                  })
                  observer.unobserve(entry.target)
                }
              })
            },
            { threshold: 0.5 },
          )

          observer.observe(kitchenInfographic)
        }
      }

      // Initialize image zoom functionality
      const zoomableImages = document.querySelectorAll('img[data-zoomable="true"]')
      zoomableImages.forEach((img) => {
        img.addEventListener("click", function () {
          this.classList.toggle("zoomed")
        })
      })
    }
  }, [loading, article])

  // Carousel auto-scroll
  useEffect(() => {
    if (!article) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % article.relatedArticles.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [article])

  // Scroll to section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: "smooth",
      })
    }
  }

  // Share highlighted text
  const shareHighlightedText = (platform) => {
    if (!selectedText) return

    const shareText = encodeURIComponent(`"${selectedText.text}" - From article: ${article.title}`)
    let shareUrl

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(window.location.href)}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${shareText}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
        break
      case "copy":
        navigator.clipboard.writeText(`"${selectedText.text}" - From article: ${article.title} ${window.location.href}`)
        alert("Text copied to clipboard!")
        setSelectedText(null)
        return
      default:
        return
    }

    window.open(shareUrl, "_blank", "width=600,height=400")
    setSelectedText(null)
  }

  // Handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const newCommentObj = {
      id: `c${comments.length + 1}`,
      user: "You",
      avatar: "/serene-gaze.png",
      date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      content: newComment,
    }

    setComments([...comments, newCommentObj])
    setNewComment("")
    setIsTyping(false)
  }

  // Simulate typing indicator
  const handleCommentChange = (e) => {
    setNewComment(e.target.value)
    setIsTyping(true)

    // Simulate typing indicator behavior
    if (e.target.value === "") {
      setIsTyping(false)
    }
  }

  if (loading) {
    return (
      <div className="article-loading">
        <div className="loading-spinner"></div>
        <p>Loading article...</p>
      </div>
    )
  }

  if (!article) {
    return <div className="article-error">Article not found</div>
  }

  return (
    <div className={`article-detail ${darkMode ? "dark-mode" : ""}`} ref={articleRef}>
      {/* Reading Progress Bar */}
      <div className="reading-progress-container">
        <div className="reading-progress-bar" style={{ width: `${readingProgress}%` }}></div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="dark-mode-toggle">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
        </button>
      </div>

      {/* Article Header */}
      <header className="article-header">
        <div className="container">
          <div className="article-meta">
            <span className="article-category">{article.category}</span>
            <span className="article-date">{article.date}</span>
            <span className="article-reading-time">
              <i className="far fa-clock"></i>
              {readingTimeEstimate} menit membaca
            </span>
          </div>

          <h1 className="article-title">{article.title}</h1>

          <div className="article-author">
            <img src="/serene-gaze.png" alt={article.author} className="author-avatar" />
            <span>Oleh {article.author}</span>
          </div>

          <div className="article-tags">
            {article.tags.map((tag, index) => (
              <span key={index} className="article-tag">
                #{tag}
              </span>
            ))}
          </div>

          <div className="article-social-share">
            <span>Bagikan:</span>
            <button className="social-button facebook">
              <i className="fab fa-facebook-f"></i>
            </button>
            <button className="social-button twitter">
              <i className="fab fa-twitter"></i>
            </button>
            <button className="social-button linkedin">
              <i className="fab fa-linkedin-in"></i>
            </button>
            <button className="social-button whatsapp">
              <i className="fab fa-whatsapp"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="article-hero">
        <img src={article.heroImage || "/placeholder.svg"} alt={article.title} />
      </div>

      <div className="article-container container">
        <div className="article-sidebar">
          {/* Table of Contents */}
          <div className="table-of-contents">
            <h3>Daftar Isi</h3>
            <ul>
              {tableOfContents.map((item, index) => (
                <li key={index} className={`toc-item level-${item.level}`} onClick={() => scrollToSection(item.id)}>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="article-content" ref={contentRef}>
          {/* Article Content */}
          <div dangerouslySetInnerHTML={{ __html: article.content }}></div>

          {/* Article Tags */}
          <div className="article-footer-tags">
            <h3>Tags:</h3>
            <div className="tags-container">
              {article.tags.map((tag, index) => (
                <Link key={index} to={`/articles/tag/${tag}`} className="tag-link">
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Author Bio */}
          <div className="author-bio">
            <img src="/serene-gaze.png" alt={article.author} className="author-avatar" />
            <div className="author-info">
              <h3>{article.author}</h3>
              <p>
                Dr. Eka Pratiwi adalah seorang peneliti lingkungan dan konsultan keberlanjutan dengan pengalaman lebih
                dari 10 tahun di bidang ekologi dan konservasi. Dia memiliki gelar PhD dalam Ilmu Lingkungan dari
                Universitas Indonesia.
              </p>
              <div className="author-social">
                <a href="#" className="author-social-link">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="author-social-link">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="author-social-link">
                  <i className="fas fa-globe"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="related-articles">
            <h2>Artikel Terkait</h2>
            <div className="carousel-container" ref={carouselRef}>
              <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {article.relatedArticles.map((relatedArticle, index) => (
                  <div key={index} className="carousel-item">
                    <Link to={`/articles/${relatedArticle.id}`} className="related-article-card">
                      <div className="related-article-image">
                        <img src={relatedArticle.image || "/placeholder.svg"} alt={relatedArticle.title} />
                      </div>
                      <div className="related-article-content">
                        <h3>{relatedArticle.title}</h3>
                        <p>{relatedArticle.excerpt}</p>
                        <span className="reading-time">
                          <i className="far fa-clock"></i> {relatedArticle.readingTime} membaca
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              <div className="carousel-controls">
                <button
                  className="carousel-control prev"
                  onClick={() =>
                    setCurrentSlide(
                      (prev) => (prev - 1 + article.relatedArticles.length) % article.relatedArticles.length,
                    )
                  }
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <div className="carousel-indicators">
                  {article.relatedArticles.map((_, index) => (
                    <button
                      key={index}
                      className={`carousel-indicator ${index === currentSlide ? "active" : ""}`}
                      onClick={() => setCurrentSlide(index)}
                    ></button>
                  ))}
                </div>
                <button
                  className="carousel-control next"
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % article.relatedArticles.length)}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="comments-section">
            <h2>Komentar ({comments.length})</h2>

            {/* Comment Form */}
            <form className="comment-form" onSubmit={handleCommentSubmit}>
              <div className="comment-input-container">
                <textarea
                  placeholder="Tulis komentar Anda..."
                  value={newComment}
                  onChange={handleCommentChange}
                  required
                ></textarea>
                {isTyping && (
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                )}
              </div>
              <button type="submit" className="btn-submit-comment">
                Kirim Komentar
              </button>
            </form>

            {/* Comments List */}
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <div className="comment-avatar">
                    <img src={comment.avatar || "/placeholder.svg"} alt={comment.user} />
                  </div>
                  <div className="comment-content">
                    <div className="comment-header">
                      <h4>{comment.user}</h4>
                      <span>{comment.date}</span>
                    </div>
                    <p>{comment.content}</p>
                    <div className="comment-actions">
                      <button>
                        <i className="far fa-thumbs-up"></i> Suka
                      </button>
                      <button>
                        <i className="far fa-comment"></i> Balas
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Text Selection Popup */}
      <AnimatePresence>
        {selectedText && (
          <motion.div
            className="text-selection-popup"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              top: `${selectedText.position.top - 50}px`,
              left: `${selectedText.position.left}px`,
            }}
          >
            <button onClick={() => shareHighlightedText("twitter")}>
              <i className="fab fa-twitter"></i>
            </button>
            <button onClick={() => shareHighlightedText("facebook")}>
              <i className="fab fa-facebook-f"></i>
            </button>
            <button onClick={() => shareHighlightedText("linkedin")}>
              <i className="fab fa-linkedin-in"></i>
            </button>
            <button onClick={() => shareHighlightedText("copy")}>
              <i className="far fa-copy"></i>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ArticleDetail
