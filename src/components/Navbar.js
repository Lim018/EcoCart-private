"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import "../styles/Navbar.css"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  // Don't render Navbar on specific pages or dynamic routes
  const hiddenPaths = ["/auth", "/login", "/register", "/about"] // Added /about
  const dynamicPathBases = ["/articles"] // Base paths for dynamic routes
  const isDynamicPath = dynamicPathBases.some(
    (base) =>
      location.pathname.startsWith(base) &&
      location.pathname !== base && // Exclude exact match
      location.pathname.split("/").filter(Boolean).length > base.split("/").filter(Boolean).length
  )

  if (hiddenPaths.includes(location.pathname) || isDynamicPath) {
    return null
  }

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">
            Eco<span className="logo-highlight">Cart</span>
          </span>
        </Link>

        <div className="navbar-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`navbar-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <li className="navbar-item">
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/products" className={location.pathname.includes("/products") ? "active" : ""}>
              Shop
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/articles" className={location.pathname.includes("/articles") ? "active" : ""}>
              Articles
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>
              About Us
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>
              Contact
            </Link>
          </li>
        </ul>

        <div className="navbar-actions">
          <Link to="/search" className="navbar-icon">
            <i className="fas fa-search"></i>
          </Link>
          <Link to="/account" className="navbar-icon">
            <i className="fas fa-user"></i>
          </Link>
          <Link to="/cart" className="navbar-icon cart-icon">
            <i className="fas fa-shopping-cart"></i>
            <span className="cart-count">0</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar