"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, ShoppingCart, Heart } from "react-feather"
import { formatPrice } from "../../utils/accountUtils"
import "../../styles/PersonalizedRecommendations.css"

const PersonalizedRecommendations = ({ recommendations }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselTrackRef = useRef(null)
  const itemsPerView = useRef(3)

  // Menentukan jumlah item yang ditampilkan berdasarkan lebar layar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        itemsPerView.current = 1
      } else if (window.innerWidth < 992) {
        itemsPerView.current = 2
      } else {
        itemsPerView.current = 3
      }
      updateCarouselPosition()
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Update posisi carousel saat index berubah
  useEffect(() => {
    updateCarouselPosition()
  }, [currentIndex])

  // Fungsi untuk mengupdate posisi carousel
  const updateCarouselPosition = () => {
    if (carouselTrackRef.current) {
      const itemWidth = carouselTrackRef.current.children[0].offsetWidth
      const gap = 20 // Sesuaikan dengan gap di CSS
      const translateX = -(currentIndex * (itemWidth + gap))

      setIsAnimating(true)
      carouselTrackRef.current.style.transform = `translateX(${translateX}px)`

      // Reset animating state setelah transisi selesai
      setTimeout(() => {
        setIsAnimating(false)
      }, 300)
    }
  }

  // Navigasi ke slide sebelumnya
  const goToPrevSlide = () => {
    if (currentIndex > 0 && !isAnimating) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  // Navigasi ke slide berikutnya
  const goToNextSlide = () => {
    if (recommendations && currentIndex < recommendations.length - itemsPerView.current && !isAnimating) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  // Tambahkan ke keranjang
  const addToCart = (product) => {
    console.log("Added to cart:", product)
    // Implementasi penambahan ke keranjang akan ditambahkan nanti
  }

  // Tambahkan ke wishlist
  const addToWishlist = (product) => {
    console.log("Added to wishlist:", product)
    // Implementasi penambahan ke wishlist akan ditambahkan nanti
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="personalized-recommendations">
        <div className="recommendations-header">
          <h2>Rekomendasi untuk Anda</h2>
          <p>Produk yang mungkin Anda sukai berdasarkan riwayat belanja Anda</p>
        </div>
        <div className="no-recommendations">
          Belum ada rekomendasi untuk Anda. Mulai belanja untuk mendapatkan rekomendasi yang dipersonalisasi.
        </div>
      </div>
    )
  }

  return (
    <div className="personalized-recommendations">
      <div className="recommendations-header">
        <h2>Rekomendasi untuk Anda</h2>
        <p>Produk yang mungkin Anda sukai berdasarkan riwayat belanja Anda</p>
      </div>

      <div className="recommendations-carousel-container">
        <button
          className={`carousel-control prev ${currentIndex === 0 ? "disabled" : ""}`}
          onClick={goToPrevSlide}
          disabled={currentIndex === 0 || isAnimating}
        >
          <ChevronLeft size={20} />
        </button>

        <div className="recommendations-carousel">
          <div className="carousel-track" ref={carouselTrackRef}>
            {recommendations.map((product) => (
              <div key={product.id} className="recommendation-card">
                <div className="recommendation-image">
                  <img src={product.image || "/placeholder.svg"} alt={product.name} />
                  <div className="recommendation-badges">
                    {product.isNew && <span className="badge new">Baru</span>}
                    {product.discount && <span className="badge discount">{product.discount}% Off</span>}
                    {product.sustainabilityScore >= 90 && <span className="badge eco">Eco</span>}
                  </div>
                </div>
                <div className="recommendation-details">
                  <h3>{product.name}</h3>
                  <div className="recommendation-price">
                    {product.originalPrice ? (
                      <>
                        <span className="original-price">{formatPrice(product.originalPrice)}</span>
                        <span className="discount-price">{formatPrice(product.discountPrice)}</span>
                      </>
                    ) : (
                      <span className="discount-price">{formatPrice(product.price)}</span>
                    )}
                  </div>
                  <p className="recommendation-reason">{product.recommendationReason}</p>
                  <div className="recommendation-actions">
                    <button className="action-btn add-to-cart" onClick={() => addToCart(product)}>
                      <ShoppingCart size={16} />
                      <span>Tambah ke Keranjang</span>
                    </button>
                    <button className="action-btn add-to-wishlist" onClick={() => addToWishlist(product)}>
                      <Heart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className={`carousel-control next ${currentIndex >= recommendations.length - itemsPerView.current ? "disabled" : ""}`}
          onClick={goToNextSlide}
          disabled={currentIndex >= recommendations.length - itemsPerView.current || isAnimating}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}

export default PersonalizedRecommendations
