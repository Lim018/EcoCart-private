"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import ProductViewer360 from "../components/ProductViewer360"
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

  // Sample product data (in a real app, this would come from an API)
  const productData = {
    id: 1,
    name: "Bamboo Toothbrush Set",
    price: 12.99,
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
      "Our bamboo toothbrush set is designed to reduce plastic waste without compromising on quality. Each set includes 4 biodegradable bamboo toothbrushes with plant-based bristles that clean just as effectively as conventional plastic toothbrushes.",
    features: [
      "100% biodegradable bamboo handle",
      "BPA-free nylon bristles",
      "Plastic-free packaging",
      "Lasts as long as conventional toothbrushes",
      "Ergonomic design for comfortable brushing",
      "Medium bristle firmness suitable for most users",
    ],
    specifications: {
      Material: "Moso bamboo handle, BPA-free nylon bristles",
      Dimensions: "19cm length, standard head size",
      Weight: "15g per toothbrush",
      Contents: "Set of 4 toothbrushes",
      Packaging: "Recycled cardboard box",
      Origin: "Ethically manufactured in China",
      Certifications: "FSC-certified bamboo, Vegan-friendly",
    },
    impact: {
      plasticSaved: "30g plastic saved per toothbrush",
      co2Reduced: "80% less carbon footprint than plastic alternatives",
      biodegradable: "Fully biodegradable handle",
      waterSaved: "Requires 65% less water to produce than plastic",
      recyclable: "Bristles can be recycled through specialized programs",
    },
    usage:
      "Replace your toothbrush every 3 months, or sooner if bristles are frayed. After use, rinse thoroughly and store in an upright position to allow the handle to dry. Do not soak in water for extended periods.",
    endOfLife:
      "When it's time to replace your toothbrush, remove the bristles (which can be recycled through specialized programs) and compost the bamboo handle. The handle will biodegrade within 6 months in commercial composting conditions.",
    testimonials: [
      {
        id: 1,
        name: "Sarah J.",
        location: "Portland, OR",
        rating: 5,
        comment:
          "I've been using these bamboo toothbrushes for over a year now and I'm never going back to plastic! They clean just as well, and I love knowing I'm reducing my plastic waste.",
        date: "2023-03-15",
        verified: true,
      },
      {
        id: 2,
        name: "Michael T.",
        location: "Austin, TX",
        rating: 4,
        comment:
          "Great toothbrushes that do the job well. The only reason I'm giving 4 stars instead of 5 is that the bristles are a bit firmer than I prefer, but they've softened with use.",
        date: "2023-02-28",
        verified: true,
      },
      {
        id: 3,
        name: "Emma L.",
        location: "Seattle, WA",
        rating: 5,
        comment:
          "These toothbrushes are fantastic! The bamboo handle feels nice to hold, and I appreciate the minimal packaging. Will definitely purchase again.",
        date: "2023-02-10",
        verified: true,
      },
    ],
  }

  // Sample related products
  const sampleRelatedProducts = [
    {
      id: 3,
      name: "Reusable Produce Bags",
      price: 15.99,
      image: "/colorful-produce-bags.png",
      rating: 4.9,
      reviewCount: 203,
      sustainabilityScore: 98,
    },
    {
      id: 5,
      name: "Beeswax Food Wraps",
      price: 18.99,
      image: "/beeswax-food-wraps.png",
      rating: 4.7,
      reviewCount: 156,
      sustainabilityScore: 95,
    },
    {
      id: 7,
      name: "Natural Deodorant",
      price: 14.99,
      image: "/natural-deodorant.png",
      rating: 4.3,
      reviewCount: 78,
      sustainabilityScore: 92,
    },
  ]

  // Fetch product data
  useEffect(() => {
    // Simulate API call
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
          <p>Loading product details...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <div className="container">
          <h2>Product Not Found</h2>
          <p>Sorry, the product you are looking for does not exist.</p>
          <Link to="/products" className="btn btn-primary">
            Back to Products
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
          <Link to="/">Home</Link>
          <span className="separator">/</span>
          <Link to="/products">Products</Link>
          <span className="separator">/</span>
          <span className="current">{product.name}</span>
        </div>

        {/* Product Overview */}
        <div className="product-overview">
          <div className="product-gallery">
            <div className="gallery-main">
              {activeImageIndex === 0 ? (
                <ProductViewer360
                  images={[
                    "/bamboo-toothbrush-360-1.png",
                    "/bamboo-toothbrush-360-2.png",
                    "/bamboo-toothbrush-360-3.png",
                    "/bamboo-toothbrush-360-4.png",
                    "/bamboo-toothbrush-360-5.png",
                    "/bamboo-toothbrush-360-6.png",
                    "/bamboo-toothbrush-360-7.png",
                    "/bamboo-toothbrush-360-8.png",
                    "/bamboo-toothbrush-360-9.png",
                    "/bamboo-toothbrush-360-10.png",
                    "/bamboo-toothbrush-360-11.png",
                    "/bamboo-toothbrush-360-12.png",
                  ]}
                />
              ) : (
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
              )}

              {activeImageIndex === 0 && (
                <div className="viewer-instruction">
                  <i className="fas fa-sync-alt"></i> Drag to rotate
                </div>
              )}
            </div>

            <div className="gallery-thumbnails">
              <button
                className={`thumbnail-btn ${activeImageIndex === 0 ? "active" : ""}`}
                onClick={() => setActiveImageIndex(0)}
              >
                <i className="fas fa-cube"></i>
                <span>360° View</span>
              </button>

              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail-btn ${activeImageIndex === index ? "active" : ""}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={image || "/placeholder.svg"} alt={`${product.name} - View ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="product-info">
            {product.isNew && <div className="product-badge new">New</div>}
            {product.isBestseller && <div className="product-badge bestseller">Bestseller</div>}

            <h1 className="product-name">{product.name}</h1>

            <div className="product-meta">
              <div className="product-rating">
                <div className="stars" style={{ "--rating": product.rating }}></div>
                <Link to="#reviews" className="review-count">
                  {product.reviewCount} reviews
                </Link>
              </div>

              <div className="product-sku">SKU: ECO-BTB-001</div>
            </div>

            <div className="product-pricing">
              {product.discount > 0 ? (
                <>
                  <div className="original-price">${(product.price + product.discount).toFixed(2)}</div>
                  <div className="current-price">${product.price.toFixed(2)}</div>
                  <div className="discount-badge">Save ${product.discount.toFixed(2)}</div>
                </>
              ) : (
                <div className="current-price">${product.price.toFixed(2)}</div>
              )}
            </div>

            <div className="short-description">{product.description}</div>

            <div className="sustainability-impact">
              <h3>Environmental Impact</h3>
              <div className="impact-meter">
                <div className="impact-bar">
                  <div className="impact-fill" style={{ width: `${product.sustainabilityScore}%` }}></div>
                </div>
                <div className="impact-score">
                  <span className="score-value">{product.sustainabilityScore}</span>
                  <span className="score-label">Eco Score</span>
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
                  <span className="status-text">In Stock</span>
                ) : (
                  <span className="status-text">Out of Stock</span>
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
                <i className="fas fa-shopping-cart"></i> Add to Cart
              </button>

              <button className="btn btn-outline wishlist-btn">
                <i className="far fa-heart"></i> Add to Wishlist
              </button>
            </div>

            <div className="product-meta-info">
              <div className="meta-item">
                <span className="meta-label">Category:</span>
                <Link to={`/products/category/${product.category}`} className="meta-value">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </Link>
              </div>

              <div className="meta-item">
                <span className="meta-label">Tags:</span>
                <span className="meta-value">
                  <Link to="/products/tag/eco-friendly">Eco-friendly</Link>,
                  <Link to="/products/tag/plastic-free">Plastic-free</Link>,
                  <Link to="/products/tag/biodegradable">Biodegradable</Link>
                </span>
              </div>

              <div className="meta-item">
                <span className="meta-label">Share:</span>
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
              Description
            </button>
            <button
              className={`tab-btn ${activeTab === "specifications" ? "active" : ""}`}
              onClick={() => setActiveTab("specifications")}
            >
              Specifications
            </button>
            <button
              className={`tab-btn ${activeTab === "sustainability" ? "active" : ""}`}
              onClick={() => setActiveTab("sustainability")}
            >
              Sustainability
            </button>
            <button
              className={`tab-btn ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews ({product.reviewCount})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "description" && (
              <div className="description-tab">
                <div className="product-description">
                  <p>{product.description}</p>

                  <h3>Features</h3>
                  <ul className="features-list">
                    {product.features.map((feature, index) => (
                      <li key={index}>
                        <i className="fas fa-check"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <h3>How to Use</h3>
                  <p>{product.usage}</p>

                  <h3>End of Life</h3>
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
                    <span className="score-label">Eco Score</span>
                  </div>

                  <div className="score-explanation">
                    <h3>What This Score Means</h3>
                    <p>
                      Our Eco Score rates products on a scale from 0-100 based on environmental impact, materials,
                      production methods, packaging, and end-of-life considerations. A score above 90 indicates an
                      exceptional eco-friendly product.
                    </p>
                  </div>
                </div>

                <div className="impact-details">
                  <h3>Environmental Impact</h3>
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
                </div>

                <div className="certifications">
                  <h3>Certifications</h3>
                  <div className="certification-logos">
                    <div className="certification">
                      <img src="/fsc-certified.png" alt="FSC Certified" />
                      <span>FSC Certified</span>
                    </div>
                    <div className="certification">
                      <img src="/vegan-friendly.png" alt="Vegan Friendly" />
                      <span>Vegan Friendly</span>
                    </div>
                    <div className="certification">
                      <img src="/plastic-free.png" alt="Plastic Free" />
                      <span>Plastic Free</span>
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
                      <span className="review-count">{product.reviewCount} reviews</span>
                    </div>
                  </div>

                  <div className="rating-breakdown">
                    <div className="rating-bar">
                      <span className="rating-label">5 stars</span>
                      <div className="bar-container">
                        <div className="bar-fill" style={{ width: "70%" }}></div>
                      </div>
                      <span className="rating-percent">70%</span>
                    </div>
                    <div className="rating-bar">
                      <span className="rating-label">4 stars</span>
                      <div className="bar-container">
                        <div className="bar-fill" style={{ width: "20%" }}></div>
                      </div>
                      <span className="rating-percent">20%</span>
                    </div>
                    <div className="rating-bar">
                      <span className="rating-label">3 stars</span>
                      <div className="bar-container">
                        <div className="bar-fill" style={{ width: "7%" }}></div>
                      </div>
                      <span className="rating-percent">7%</span>
                    </div>
                    <div className="rating-bar">
                      <span className="rating-label">2 stars</span>
                      <div className="bar-container">
                        <div className="bar-fill" style={{ width: "2%" }}></div>
                      </div>
                      <span className="rating-percent">2%</span>
                    </div>
                    <div className="rating-bar">
                      <span className="rating-label">1 star</span>
                      <div className="bar-container">
                        <div className="bar-fill" style={{ width: "1%" }}></div>
                      </div>
                      <span className="rating-percent">1%</span>
                    </div>
                  </div>
                </div>

                <div className="testimonial-section">
                  <h3>Customer Testimonials</h3>
                  <TestimonialCarousel testimonials={product.testimonials} />
                </div>

                <div className="write-review">
                  <button className="btn btn-outline">Write a Review</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="related-products">
          <h2>You May Also Like</h2>
          <div className="related-products-grid">
            {relatedProducts.map((relatedProduct) => (
              <div className="product-card" key={relatedProduct.id}>
                <div className="product-image">
                  <img src={relatedProduct.image || "/placeholder.svg"} alt={relatedProduct.name} />
                  <div className="product-actions">
                    <button className="wishlist-btn" aria-label="Add to wishlist">
                      <i className="far fa-heart"></i>
                    </button>
                    <button className="quickview-btn" aria-label="Quick view">
                      <i className="fas fa-eye"></i>
                    </button>
                  </div>
                </div>

                <div className="product-info">
                  <h3 className="product-name">
                    <Link to={`/products/${relatedProduct.id}`}>{relatedProduct.name}</Link>
                  </h3>

                  <div className="product-price">${relatedProduct.price.toFixed(2)}</div>

                  <div className="product-rating">
                    <div className="stars" style={{ "--rating": relatedProduct.rating }}></div>
                    <span className="review-count">({relatedProduct.reviewCount})</span>
                  </div>

                  <button className="btn btn-primary add-to-cart">Add to Cart</button>
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
