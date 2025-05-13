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
            <p className="footer-tagline">Belanja berkelanjutan untuk masa depan yang lebih baik</p>
          </div>

          <div className="footer-newsletter">
            <h4>Bergabung dengan Newsletter Kami</h4>
            <p>Dapatkan informasi terbaru tentang produk ramah lingkungan dan tips keberlanjutan.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Alamat email Anda" required />
              <button type="submit" className="btn btn-primary">
                Berlangganan
              </button>
            </form>
          </div>
        </div>

        <div className="footer-middle">
          <div className="footer-col">
            <h5>Belanja</h5>
            <ul>
              <li>
                <Link to="/products/category/home">Rumah & Kehidupan</Link>
              </li>
              <li>
                <Link to="/products/category/fashion">Fashion Ramah Lingkungan</Link>
              </li>
              <li>
                <Link to="/products/category/beauty">Kecantikan Alami</Link>
              </li>
              <li>
                <Link to="/products/category/food">Makanan Organik</Link>
              </li>
              <li>
                <Link to="/products/category/gifts">Hadiah Berkelanjutan</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Tentang Kami</h5>
            <ul>
              <li>
                <Link to="/about">Cerita Kami</Link>
              </li>
              <li>
                <Link to="/mission">Misi Kami</Link>
              </li>
              <li>
                <Link to="/sustainability">Keberlanjutan</Link>
              </li>
              <li>
                <Link to="/partners">Mitra</Link>
              </li>
              <li>
                <Link to="/careers">Karir</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Bantuan</h5>
            <ul>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/shipping">Pengiriman & Pengembalian</Link>
              </li>
              <li>
                <Link to="/track-order">Lacak Pesanan</Link>
              </li>
              <li>
                <Link to="/contact">Hubungi Kami</Link>
              </li>
              <li>
                <Link to="/privacy">Kebijakan Privasi</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Terhubung</h5>
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
              <img src="/images/certification-1.png" alt="Sertifikasi Eco" />
              <img src="/images/certification-2.png" alt="Sertifikasi Organik" />
              <img src="/images/certification-3.png" alt="Sertifikasi Fair Trade" />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} EcoCart. Hak Cipta Dilindungi.</p>
          <div className="footer-bottom-links">
            <Link to="/terms">Syarat Layanan</Link>
            <Link to="/privacy">Kebijakan Privasi</Link>
            <Link to="/cookies">Kebijakan Cookie</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
