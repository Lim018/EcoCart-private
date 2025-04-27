"use client"

import { useState, useEffect, useRef } from "react"
import "../styles/TestimonialCarousel.css"

const TestimonialCarousel = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState("next")
  const intervalRef = useRef(null)

  // Auto-rotate testimonials
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      goToNext()
    }, 5000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [activeIndex, testimonials.length])

  // Reset interval when user interacts
  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        goToNext()
      }, 5000)
    }
  }

  // Go to next testimonial
  const goToNext = () => {
    setSlideDirection("next")
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  // Go to previous testimonial
  const goToPrev = () => {
    setSlideDirection("prev")
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  // Go to specific testimonial
  const goToIndex = (index) => {
    setSlideDirection(index > activeIndex ? "next" : "prev")
    setActiveIndex(index)
    resetInterval()
  }

  return (
    <div className="testimonial-carousel">
      <div className={`carousel-container ${slideDirection}`}>
        {testimonials.map((testimonial, index) => (
          <div key={testimonial.id} className={`carousel-item ${index === activeIndex ? "active" : ""}`}>
            <div className="testimonial-content">
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`${i < testimonial.rating ? "fas" : "far"} fa-star`}></i>
                ))}
              </div>
              <p className="testimonial-text">{testimonial.comment}</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <div className="author-name">{testimonial.name}</div>
                  <div className="author-location">{testimonial.location}</div>
                </div>
                {testimonial.verified && (
                  <div className="verified-badge">
                    <i className="fas fa-check-circle"></i> Verified Purchase
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-controls">
        <button
          className="carousel-arrow prev"
          onClick={() => {
            goToPrev()
            resetInterval()
          }}
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        <div className="carousel-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === activeIndex ? "active" : ""}`}
              onClick={() => goToIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            ></button>
          ))}
        </div>

        <button
          className="carousel-arrow next"
          onClick={() => {
            goToNext()
            resetInterval()
          }}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  )
}

export default TestimonialCarousel
