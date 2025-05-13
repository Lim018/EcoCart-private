"use client"

import { useState } from "react"
import "../styles/ConsultationScheduler.css"

const ConsultationScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [consultationType, setConsultationType] = useState("online")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
  })
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Generate dates for the next 14 days
  const generateDates = () => {
    const dates = []
    const today = new Date()

    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date)
      }
    }

    return dates
  }

  const availableDates = generateDates()

  // Available time slots
  const timeSlots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"]

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setSelectedTime(null) // Reset time when date changes
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTypeChange = (type) => {
    setConsultationType(type)
  }

  const handleNextStep = () => {
    if (step === 1 && selectedDate && selectedTime) {
      setStep(2)
    }
  }

  const handlePrevStep = () => {
    if (step === 2) {
      setStep(1)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedDate || !selectedTime) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSubmitSuccess(true)

      // Reset form after successful submission
      setTimeout(() => {
        setSelectedDate(null)
        setSelectedTime(null)
        setConsultationType("online")
        setFormData({
          name: "",
          email: "",
          phone: "",
          topic: "",
        })
        setStep(1)
        setSubmitSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (date) => {
    return date.toLocaleDateString("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short",
    })
  }

  return (
    <div className="scheduler-container">
      {submitSuccess ? (
        <div className="success-message">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#81C784"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <h3>Konsultasi Berhasil Dijadwalkan!</h3>
          <p>
            Kami telah menjadwalkan konsultasi Anda pada {selectedDate && formatDate(selectedDate)} pukul {selectedTime}
            . Detail konsultasi telah dikirim ke email Anda.
          </p>
        </div>
      ) : (
        <>
          <div className="scheduler-header">
            <h3>Jadwalkan Konsultasi</h3>
            <div className="scheduler-steps">
              <div className={`step ${step === 1 ? "active" : ""}`}>1. Pilih Waktu</div>
              <div className={`step ${step === 2 ? "active" : ""}`}>2. Detail Konsultasi</div>
            </div>
          </div>

          {step === 1 ? (
            <div className="scheduler-step-1">
              <div className="consultation-type-selector">
                <button
                  className={`type-btn ${consultationType === "online" ? "active" : ""}`}
                  onClick={() => handleTypeChange("online")}
                >
                  <svg
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
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                  Online
                </button>
                <button
                  className={`type-btn ${consultationType === "office" ? "active" : ""}`}
                  onClick={() => handleTypeChange("office")}
                >
                  <svg
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
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                  </svg>
                  Di Kantor
                </button>
              </div>

              <div className="date-selector">
                <h4>Pilih Tanggal</h4>
                <div className="dates-container">
                  {availableDates.map((date, index) => (
                    <div
                      key={index}
                      className={`date-item ${selectedDate && date.toDateString() === selectedDate.toDateString() ? "selected" : ""}`}
                      onClick={() => handleDateSelect(date)}
                    >
                      <div className="date-day">{date.toLocaleDateString("id-ID", { weekday: "short" })}</div>
                      <div className="date-number">{date.getDate()}</div>
                      <div className="date-month">{date.toLocaleDateString("id-ID", { month: "short" })}</div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedDate && (
                <div className="time-selector">
                  <h4>Pilih Waktu</h4>
                  <div className="time-slots">
                    {timeSlots.map((time, index) => (
                      <button
                        key={index}
                        className={`time-slot ${selectedTime === time ? "selected" : ""}`}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="scheduler-actions">
                <button className="next-btn" disabled={!selectedDate || !selectedTime} onClick={handleNextStep}>
                  Lanjutkan
                  <svg
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
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="scheduler-step-2">
              <div className="selected-datetime">
                <h4>Waktu Konsultasi</h4>
                <div className="datetime-display">
                  <div className="date-display">
                    <svg
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
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    {selectedDate && formatDate(selectedDate)}
                  </div>
                  <div className="time-display">
                    <svg
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
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    {selectedTime} WIB
                  </div>
                  <div className="type-display">
                    <svg
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
                      {consultationType === "online" ? (
                        <>
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                          <line x1="8" y1="21" x2="16" y2="21"></line>
                          <line x1="12" y1="17" x2="12" y2="21"></line>
                        </>
                      ) : (
                        <>
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="3" y1="9" x2="21" y2="9"></line>
                          <line x1="9" y1="21" x2="9" y2="9"></line>
                        </>
                      )}
                    </svg>
                    {consultationType === "online" ? "Online" : "Di Kantor"}
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nama Lengkap</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Nomor Telepon</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="topic">Topik Konsultasi</label>
                  <select id="topic" name="topic" value={formData.topic} onChange={handleInputChange} required>
                    <option value="">Pilih Topik</option>
                    <option value="product">Produk Ramah Lingkungan</option>
                    <option value="sustainability">Keberlanjutan Bisnis</option>
                    <option value="recycling">Daur Ulang & Pengolahan Limbah</option>
                    <option value="carbon">Pengurangan Jejak Karbon</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>

                <div className="scheduler-actions">
                  <button type="button" className="back-btn" onClick={handlePrevStep}>
                    <svg
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
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Kembali
                  </button>

                  <button type="submit" className="submit-btn" disabled={isSubmitting}>
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
                        Memproses...
                      </>
                    ) : (
                      "Jadwalkan Konsultasi"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ConsultationScheduler
