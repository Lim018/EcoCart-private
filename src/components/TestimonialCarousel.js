"use client"

import { useState, useEffect } from "react"
import "../styles/TestimonialCarousel.css"

const TestimonialCarousel = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  // Navigate to specific testimonial
  const goToTestimonial = (index) => {
    setActiveIndex(index)
  }

  // Navigate to previous testimonial
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  // Navigate to next testimonial
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  return (
    <div className="testimonial-carousel">
      <div className="carousel-container">
        <div className="carousel-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="carousel-slide">
              <div className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">
                    <img src={testimonial.avatar || "/serene-gaze.png"} alt={testimonial.name} />
                  </div>
                  <div className="testimonial-info">
                    <h4 className="testimonial-name">{testimonial.name}</h4>
                    <div className="testimonial-location">{testimonial.location}</div>
                    <div className="testimonial-date">{new Date(testimonial.date).toLocaleDateString()}</div>
                  </div>
                  <div className="testimonial-rating">
                    <div className="stars" style={{ "--rating": testimonial.rating }}></div>
                    {testimonial.verified && <span className="verified-badge">Terverifikasi</span>}
                  </div>
                </div>
                <div className="testimonial-content">
                  <p>"{testimonial.comment}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-controls">
        <button className="carousel-control prev" onClick={prevTestimonial}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <div className="carousel-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === activeIndex ? "active" : ""}`}
              onClick={() => goToTestimonial(index)}
            ></button>
          ))}
        </div>
        <button className="carousel-control next" onClick={nextTestimonial}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  )
}

export default TestimonialCarousel
