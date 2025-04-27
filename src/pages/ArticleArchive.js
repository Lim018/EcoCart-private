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
    { id: "all", name: "All Articles" },
    { id: "sustainability", name: "Sustainability" },
    { id: "eco-living", name: "Eco Living" },
    { id: "zero-waste", name: "Zero Waste" },
    { id: "climate", name: "Climate Action" },
    { id: "ethical-fashion", name: "Ethical Fashion" },
  ]

  // Sample articles data
  const sampleArticles = [
    {
      id: 1,
      title: "10 Simple Ways to Reduce Your Plastic Footprint",
      excerpt:
        "Practical tips for reducing plastic waste in your daily life and making a positive impact on the environment.",
      image: "/cascading-plastic-alternatives.png",
      category: "zero-waste",
      author: "Emma Green",
      date: "2023-04-15",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "The Rise of Sustainable Fashion: Beyond the Trends",
      excerpt: "How sustainable fashion is transforming the industry and why it matters for our planet's future.",
      image: "/circular-fashion-cycle.png",
      category: "ethical-fashion",
      author: "Michael Rivers",
      date: "2023-04-10",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "Understanding Carbon Footprint: A Beginner's Guide",
      excerpt: "Learn what carbon footprint means, how to calculate yours, and effective ways to reduce your impact.",
      image: "/global-carbon-cycle.png",
      category: "climate",
      author: "Dr. James Wilson",
      date: "2023-04-05",
      readTime: "8 min read",
    },
    {
      id: 4,
      title: "Composting 101: Turn Kitchen Waste into Garden Gold",
      excerpt: "A step-by-step guide to starting your own compost system and reducing food waste at home.",
      image: "/backyard-compost-system.png",
      category: "eco-living",
      author: "Sophia Martinez",
      date: "2023-03-28",
      readTime: "6 min read",
    },
    {
      id: 5,
      title: "The Hidden Environmental Cost of Fast Fashion",
      excerpt:
        "Exploring the true environmental impact of the fashion industry and how consumers can make better choices.",
      image: "/placeholder.svg?height=400&width=600&query=fast fashion environmental impact",
      category: "ethical-fashion",
      author: "Olivia Chen",
      date: "2023-03-20",
      readTime: "9 min read",
    },
    {
      id: 6,
      title: "Sustainable Home Renovation: Eco-Friendly Materials and Practices",
      excerpt:
        "How to make environmentally conscious choices when renovating your home without compromising on style or quality.",
      image: "/placeholder.svg?height=400&width=600&query=sustainable home renovation",
      category: "eco-living",
      author: "Daniel Brooks",
      date: "2023-03-15",
      readTime: "10 min read",
    },
    {
      id: 7,
      title: "The Science Behind Climate Change: Explained Simply",
      excerpt: "Breaking down the complex science of climate change into understandable concepts for everyone.",
      image: "/placeholder.svg?height=400&width=600&query=climate change science",
      category: "climate",
      author: "Dr. Sarah Johnson",
      date: "2023-03-08",
      readTime: "12 min read",
    },
    {
      id: 8,
      title: "Zero Waste Grocery Shopping: A Practical Guide",
      excerpt:
        "Tips and tricks for reducing packaging waste when shopping for groceries, from preparation to checkout.",
      image: "/placeholder.svg?height=400&width=600&query=zero waste grocery shopping",
      category: "zero-waste",
      author: "Alex Turner",
      date: "2023-03-01",
      readTime: "5 min read",
    },
  ]

  // Generate more articles for infinite scroll demonstration
  const generateMoreArticles = (page) => {
    return sampleArticles.map((article) => ({
      ...article,
      id: article.id + page * 8,
      title: `${article.title} - Part ${page}`,
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
          <h1>Eco-Friendly Living Articles</h1>
          <p>Discover tips, guides, and insights for a more sustainable lifestyle</p>
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
              <p>Loading articles...</p>
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
                          {new Date(article.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
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
                          Read Article
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
                      <p className="eco-loading-message">Loading more content saves paper... 🌱</p>
                    </div>
                  ) : (
                    <p className="scroll-message">Scroll for more articles</p>
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
