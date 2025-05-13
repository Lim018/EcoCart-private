"use client"

import { useState } from "react"
import "../styles/ContactForm.css"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [characterCount, setCharacterCount] = useState(0)
  const maxMessageLength = 500

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nama wajib diisi"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid"
    }

    if (formData.phone && !/^[0-9+\-\s]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Format nomor telepon tidak valid"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subjek wajib diisi"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Pesan wajib diisi"
    } else if (formData.message.length > maxMessageLength) {
      newErrors.message = `Pesan tidak boleh lebih dari ${maxMessageLength} karakter`
    }

    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "message") {
      setCharacterCount(value.length)
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)

      // Add shake animation to fields with errors
      const formElements = document.querySelectorAll(".form-control")
      formElements.forEach((element) => {
        if (formErrors[element.name]) {
          element.classList.add("shake")
          setTimeout(() => {
            element.classList.remove("shake")
          }, 500)
        }
      })

      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSubmitSuccess(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
      setCharacterCount(0)

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setErrors({ submit: "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-form-container">
      {submitSuccess && (
        <div className="form-success-message">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span>Pesan Anda telah berhasil dikirim! Kami akan segera menghubungi Anda.</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            placeholder=" "
          />
          <label htmlFor="name" className="form-label required-field">
            Nama
          </label>
          {errors.name && (
            <div className="form-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {errors.name}
            </div>
          )}
        </div>

        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            placeholder=" "
          />
          <label htmlFor="email" className="form-label required-field">
            Email
          </label>
          {errors.email && (
            <div className="form-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {errors.email}
            </div>
          )}
        </div>

        <div className="form-group">
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            placeholder=" "
          />
          <label htmlFor="phone" className="form-label">
            Nomor Telepon
          </label>
          {errors.phone && (
            <div className="form-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {errors.phone}
            </div>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            id="subject"
            name="subject"
            className="form-control"
            value={formData.subject}
            onChange={handleChange}
            placeholder=" "
          />
          <label htmlFor="subject" className="form-label required-field">
            Subjek
          </label>
          {errors.subject && (
            <div className="form-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {errors.subject}
            </div>
          )}
        </div>

        <div className="form-group">
          <textarea
            id="message"
            name="message"
            className="form-control"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            placeholder=" "
          ></textarea>
          <label htmlFor="message" className="form-label required-field">
            Pesan
          </label>
          <div
            className={`character-count ${
              characterCount > maxMessageLength * 0.8
                ? characterCount > maxMessageLength
                  ? "limit-reached"
                  : "limit-close"
                : ""
            }`}
          >
            {characterCount}/{maxMessageLength}
          </div>
          {errors.message && (
            <div className="form-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {errors.message}
            </div>
          )}
        </div>

        {errors.submit && (
          <div className="form-error" style={{ marginBottom: "1rem" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {errors.submit}
          </div>
        )}

        <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <svg
                className="spinner"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a10 10 0 0 1 10 10"></path>
              </svg>
              Mengirim...
            </>
          ) : (
            "Kirim Pesan"
          )}
        </button>
      </form>
    </div>
  )
}

export default ContactForm
