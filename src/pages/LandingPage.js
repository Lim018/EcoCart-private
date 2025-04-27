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

  // Sample featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "Bamboo Toothbrush Set",
      price: 12.99,
      image: "/eco-friendly-oral-care.png",
      category: "Personal Care",
      sustainability: {
        materials: "Biodegradable bamboo handle, plant-based bristles",
        packaging: "Plastic-free, compostable packaging",
        impact: "Reduces plastic waste by 30g per toothbrush",
      },
    },
    {
      id: 2,
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      image: "/folded-organic-tee.png",
      category: "Fashion",
      sustainability: {
        materials: "100% GOTS certified organic cotton",
        packaging: "Recycled paper packaging",
        impact: "Saves 2,700 liters of water compared to conventional cotton",
      },
    },
    {
      id: 3,
      name: "Reusable Produce Bags",
      price: 15.99,
      image: "/colorful-produce-bags.png",
      category: "Kitchen",
      sustainability: {
        materials: "Organic cotton mesh",
        packaging: "Zero-waste packaging",
        impact: "Eliminates need for 500+ plastic bags per year",
      },
    },
    {
      id: 4,
      name: "Solar Power Bank",
      price: 45.99,
      image: "/portable-solar-charging.png",
      category: "Electronics",
      sustainability: {
        materials: "Recycled plastic casing, solar panel",
        packaging: "Minimal recycled cardboard",
        impact: "Reduces carbon footprint by using renewable energy",
      },
    },
  ]

  // Sample impact data
  const impactData = [
    {
      icon: "fas fa-tree",
      count: "10,000+",
      label: "Trees Planted",
      description: "Through our partnership with reforestation projects, we plant trees for every purchase.",
    },
    {
      icon: "fas fa-water",
      count: "5M+",
      label: "Gallons of Water Saved",
      description: "Our sustainable production methods save millions of gallons of water annually.",
    },
    {
      icon: "fas fa-trash-alt",
      count: "50,000+",
      label: "Kg of Plastic Prevented",
      description: "Our plastic-free packaging prevents thousands of kilograms of plastic waste.",
    },
    {
      icon: "fas fa-bolt",
      count: "75%",
      label: "Carbon Footprint Reduction",
      description: "Our products have a 75% lower carbon footprint than conventional alternatives.",
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
          <h1 className="hero-title animate-slideUp">Sustainable Shopping for a Better Planet</h1>
          <p className="hero-subtitle animate-slideUp">Discover eco-friendly products that make a difference</p>
          <div className="hero-buttons animate-slideUp">
            <Link to="/products" className="btn btn-primary">
              Shop Now
            </Link>
            <Link to="/about" className="btn btn-outline">
              Learn More
            </Link>
          </div>
          <div className="hero-scroll-indicator">
            <span>Scroll to explore</span>
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products section" ref={featuredProductsRef}>
        <div className="container">
          <div className="section-header">
            <h2>Featured Eco-Friendly Products</h2>
            <p>Handpicked sustainable products that help reduce your environmental footprint</p>
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
                  <div className="product-price">${product.price}</div>
                  <div className="product-sustainability-preview">
                    <i className="fas fa-leaf"></i> Eco-friendly
                  </div>
                </div>
                <div className="product-sustainability-details">
                  <h4>Sustainability Details</h4>
                  <ul>
                    <li>
                      <strong>Materials:</strong> {product.sustainability.materials}
                    </li>
                    <li>
                      <strong>Packaging:</strong> {product.sustainability.packaging}
                    </li>
                    <li>
                      <strong>Impact:</strong> {product.sustainability.impact}
                    </li>
                  </ul>
                  <Link to={`/products/${product.id}`} className="btn btn-primary btn-sm">
                    View Product
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="view-all-container">
            <Link to="/products" className="btn btn-outline">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Our Mission Section - Interactive Storytelling */}
      <section className="mission-section section" ref={missionRef}>
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <div className="mission-story">
                <div className="story-step">
                  <div className="story-number">01</div>
                  <h3>Sustainable Sourcing</h3>
                  <p>
                    We carefully select products made from sustainable, renewable, or recycled materials that minimize
                    environmental impact.
                  </p>
                </div>
                <div className="story-step">
                  <div className="story-number">02</div>
                  <h3>Ethical Production</h3>
                  <p>
                    We partner with manufacturers who prioritize fair labor practices, safe working conditions, and
                    environmentally responsible production methods.
                  </p>
                </div>
                <div className="story-step">
                  <div className="story-number">03</div>
                  <h3>Minimal Packaging</h3>
                  <p>
                    We're committed to reducing waste through plastic-free, biodegradable, or recyclable packaging for
                    all our products.
                  </p>
                </div>
                <div className="story-step">
                  <div className="story-number">04</div>
                  <h3>Positive Impact</h3>
                  <p>
                    With every purchase, we contribute to environmental initiatives like tree planting, ocean cleanup,
                    and renewable energy projects.
                  </p>
                </div>
              </div>
            </div>
            <div className="mission-image">
              <div className="image-container">
                <img src="/interconnected-eco-production.png" alt="Our sustainable mission" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Impact Section */}
      <section className="impact-section section" ref={impactRef}>
        <div className="container">
          <div className="section-header">
            <h2>Our Environmental Impact</h2>
            <p>Together with our customers, we're making a measurable difference</p>
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
            <h2>What Our Customers Say</h2>
            <p>Join thousands of eco-conscious shoppers making a difference</p>
          </div>

          <div className="testimonials-slider">
            <div className="testimonial">
              <div className="testimonial-content">
                <p>
                  "EcoCart has transformed how I shop. The products are high-quality and genuinely sustainable, and I
                  love knowing my purchases are making a positive impact."
                </p>
              </div>
              <div className="testimonial-author">
                <img src="/serene-gaze.png" alt="Sarah J." className="author-image" />
                <div className="author-info">
                  <div className="author-name">Sarah J.</div>
                  <div className="author-location">Portland, OR</div>
                </div>
              </div>
            </div>

            <div className="testimonial">
              <div className="testimonial-content">
                <p>
                  "I've been searching for a one-stop shop for eco-friendly products, and EcoCart exceeds all my
                  expectations. The transparency about each product's environmental impact is refreshing."
                </p>
              </div>
              <div className="testimonial-author">
                <img src="/thoughtful-gaze.png" alt="Michael T." className="author-image" />
                <div className="author-info">
                  <div className="author-name">Michael T.</div>
                  <div className="author-location">Austin, TX</div>
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
            <h2>Join the Sustainable Shopping Movement</h2>
            <p>Start making eco-friendly choices today and be part of the solution</p>
            <Link to="/products" className="btn btn-primary btn-lg">
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
