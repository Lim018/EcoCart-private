import { Link } from "react-router-dom"
import "../styles/Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-logo">
            <Link to="/">
              <span className="logo-text">
                Eco<span className="logo-highlight">Cart</span>
              </span>
            </Link>
            <p className="footer-tagline">Sustainable shopping for a better tomorrow</p>
          </div>

          <div className="footer-newsletter">
            <h4>Join Our Newsletter</h4>
            <p>Stay updated with our latest eco-friendly products and sustainability tips.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" required />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="footer-middle">
          <div className="footer-col">
            <h5>Shop</h5>
            <ul>
              <li>
                <Link to="/products/category/home">Home & Living</Link>
              </li>
              <li>
                <Link to="/products/category/fashion">Eco Fashion</Link>
              </li>
              <li>
                <Link to="/products/category/beauty">Natural Beauty</Link>
              </li>
              <li>
                <Link to="/products/category/food">Organic Food</Link>
              </li>
              <li>
                <Link to="/products/category/gifts">Sustainable Gifts</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>About</h5>
            <ul>
              <li>
                <Link to="/about">Our Story</Link>
              </li>
              <li>
                <Link to="/mission">Our Mission</Link>
              </li>
              <li>
                <Link to="/sustainability">Sustainability</Link>
              </li>
              <li>
                <Link to="/partners">Partners</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Help</h5>
            <ul>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/shipping">Shipping & Returns</Link>
              </li>
              <li>
                <Link to="/track-order">Track Order</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Connect</h5>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-pinterest-p"></i>
              </a>
            </div>
            <div className="footer-certifications">
              <img src="/images/certification-1.png" alt="Eco Certification" />
              <img src="/images/certification-2.png" alt="Organic Certification" />
              <img src="/images/certification-3.png" alt="Fair Trade Certification" />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} EcoCart. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
