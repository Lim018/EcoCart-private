"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import "../styles/Checkout.css"

const Checkout = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(true)
  const [cartItems, setCartItems] = useState([])
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shipping: 0,
    tax: 0,
    discount: 0,
    total: 0,
  })
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Indonesia",

    // Shipping Method
    shippingMethod: "standard",

    // Payment Information
    paymentMethod: "credit",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    savePaymentInfo: false,

    // Additional Information
    orderNotes: "",
    createAccount: false,
    password: "",
    agreeToTerms: false,
  })

  const [formErrors, setFormErrors] = useState({})
  const [orderComplete, setOrderComplete] = useState(false)
  const [processingOrder, setProcessingOrder] = useState(false)

  // Format price in IDR
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(price)
  }

  // Sample cart items data with converted prices to IDR
  const sampleCartItems = [
    {
      id: "item1",
      name: "Set Sikat Gigi Bambu",
      price: 194850, // 12.99 USD * 15000
      quantity: 2,
      image: "/bamboo-toothbrush-set.png",
    },
    {
      id: "item2",
      name: "Kantong Belanja Reusable",
      price: 239850, // 15.99 USD * 15000
      quantity: 1,
      image: "/reusable-produce-bags.png",
    },
    {
      id: "item3",
      name: "Pembungkus Makanan Beeswax",
      price: 284850, // 18.99 USD * 15000
      quantity: 1,
      image: "/beeswax-food-wraps.png",
    },
  ]

  // Load cart items and calculate order summary
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCartItems(sampleCartItems)

      const subtotal = sampleCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const shipping = subtotal > 750000 ? 0 : 89850 // Free shipping over Rp 750.000
      const tax = subtotal * 0.11 // 11% tax (PPN Indonesia)
      const discount = 0
      const total = subtotal + shipping + tax - discount

      setOrderSummary({
        subtotal,
        shipping,
        tax,
        discount,
        total,
      })

      setLoading(false)
    }, 800)
  }, [])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    const inputValue = type === "checkbox" ? checked : value

    setFormData({
      ...formData,
      [name]: inputValue,
    })

    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      })
    }
  }

  // Validate form data for current step
  const validateStep = (step) => {
    const errors = {}

    if (step === 1) {
      // Validate shipping information
      if (!formData.firstName.trim()) errors.firstName = "Nama depan wajib diisi"
      if (!formData.lastName.trim()) errors.lastName = "Nama belakang wajib diisi"
      if (!formData.email.trim()) errors.email = "Email wajib diisi"
      else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Format email tidak valid"
      if (!formData.phone.trim()) errors.phone = "Nomor telepon wajib diisi"
      if (!formData.address.trim()) errors.address = "Alamat wajib diisi"
      if (!formData.city.trim()) errors.city = "Kota wajib diisi"
      if (!formData.state.trim()) errors.state = "Provinsi wajib diisi"
      if (!formData.zipCode.trim()) errors.zipCode = "Kode pos wajib diisi"
    } else if (step === 3) {
      // Validate payment information
      if (formData.paymentMethod === "credit") {
        if (!formData.cardNumber.trim()) errors.cardNumber = "Nomor kartu wajib diisi"
        else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, "")))
          errors.cardNumber = "Nomor kartu harus 16 digit"

        if (!formData.cardName.trim()) errors.cardName = "Nama pada kartu wajib diisi"
        if (!formData.expiryDate.trim()) errors.expiryDate = "Tanggal kadaluarsa wajib diisi"
        else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate))
          errors.expiryDate = "Tanggal kadaluarsa harus dalam format MM/YY"

        if (!formData.cvv.trim()) errors.cvv = "CVV wajib diisi"
        else if (!/^\d{3,4}$/.test(formData.cvv)) errors.cvv = "CVV harus 3 atau 4 digit"
      }
    } else if (step === 4) {
      // Validate final step
      if (!formData.agreeToTerms) errors.agreeToTerms = "Anda harus menyetujui syarat dan ketentuan"
      if (formData.createAccount && !formData.password.trim()) errors.password = "Password wajib diisi"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle next step
  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  // Handle previous step
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1)
    window.scrollTo(0, 0)
  }

  // Handle order submission
  const handleSubmitOrder = () => {
    if (validateStep(currentStep)) {
      setProcessingOrder(true)

      // Simulate order processing
      setTimeout(() => {
        setProcessingOrder(false)
        setOrderComplete(true)

        // Redirect to order confirmation after a delay
        setTimeout(() => {
          navigate("/transactions")
        }, 5000)
      }, 2000)
    }
  }

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Handle card number formatting
  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value)
    setFormData({
      ...formData,
      cardNumber: formattedValue,
    })

    if (formErrors.cardNumber) {
      setFormErrors({
        ...formErrors,
        cardNumber: "",
      })
    }
  }

  if (loading) {
    return (
      <div className="checkout-loading">
        <div className="container">
          <div className="loading-spinner"></div>
          <p>Mempersiapkan checkout...</p>
        </div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="checkout-complete">
        <div className="container">
          <motion.div
            className="complete-animation"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <div className="check-icon">
              <i className="fas fa-check"></i>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Pesanan Berhasil Dibuat!
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}>
            Terima kasih atas pembelian Anda. Pesanan Anda telah diterima dan sedang diproses.
          </motion.p>

          <motion.div
            className="order-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="order-number">
              <span>Nomor Pesanan:</span>
              <strong>ECO-{Math.floor(100000 + Math.random() * 900000)}</strong>
            </div>
            <div className="order-email">
              <span>Konfirmasi dikirim ke:</span>
              <strong>{formData.email}</strong>
            </div>
          </motion.div>

          <motion.div
            className="redirect-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <p>Anda akan dialihkan ke riwayat pesanan dalam beberapa detik...</p>
            <div className="redirect-progress">
              <div className="progress-bar"></div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="page-header">
          <h1>Checkout</h1>
          <p>Selesaikan pembelian Anda</p>
        </div>

        <div className="checkout-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
          </div>

          <div className="progress-steps">
            <div className={`progress-step ${currentStep >= 1 ? "active" : ""} ${currentStep > 1 ? "completed" : ""}`}>
              <div className="step-number">{currentStep > 1 ? <i className="fas fa-check"></i> : 1}</div>
              <div className="step-label">Pengiriman</div>
            </div>

            <div className={`progress-step ${currentStep >= 2 ? "active" : ""} ${currentStep > 2 ? "completed" : ""}`}>
              <div className="step-number">{currentStep > 2 ? <i className="fas fa-check"></i> : 2}</div>
              <div className="step-label">Pengantaran</div>
            </div>

            <div className={`progress-step ${currentStep >= 3 ? "active" : ""} ${currentStep > 3 ? "completed" : ""}`}>
              <div className="step-number">{currentStep > 3 ? <i className="fas fa-check"></i> : 3}</div>
              <div className="step-label">Pembayaran</div>
            </div>

            <div className={`progress-step ${currentStep >= 4 ? "active" : ""} ${currentStep > 4 ? "completed" : ""}`}>
              <div className="step-number">4</div>
              <div className="step-label">Tinjauan</div>
            </div>
          </div>
        </div>

        <div className="checkout-layout">
          <div className="checkout-main">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="shipping"
                  className="checkout-step shipping-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2>Informasi Pengiriman</h2>

                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="firstName">Nama Depan *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={formErrors.firstName ? "error" : ""}
                      />
                      {formErrors.firstName && <div className="error-message">{formErrors.firstName}</div>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName">Nama Belakang *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={formErrors.lastName ? "error" : ""}
                      />
                      {formErrors.lastName && <div className="error-message">{formErrors.lastName}</div>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Alamat Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={formErrors.email ? "error" : ""}
                      />
                      {formErrors.email && <div className="error-message">{formErrors.email}</div>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Nomor Telepon *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={formErrors.phone ? "error" : ""}
                      />
                      {formErrors.phone && <div className="error-message">{formErrors.phone}</div>}
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="address">Alamat Jalan *</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={formErrors.address ? "error" : ""}
                      />
                      {formErrors.address && <div className="error-message">{formErrors.address}</div>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="city">Kota *</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={formErrors.city ? "error" : ""}
                      />
                      {formErrors.city && <div className="error-message">{formErrors.city}</div>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="state">Provinsi *</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={formErrors.state ? "error" : ""}
                      />
                      {formErrors.state && <div className="error-message">{formErrors.state}</div>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="zipCode">Kode Pos *</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={formErrors.zipCode ? "error" : ""}
                      />
                      {formErrors.zipCode && <div className="error-message">{formErrors.zipCode}</div>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="country">Negara *</label>
                      <select id="country" name="country" value={formData.country} onChange={handleInputChange}>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Singapura">Singapura</option>
                        <option value="Thailand">Thailand</option>
                        <option value="Vietnam">Vietnam</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-actions">
                    <Link to="/cart" className="btn btn-outline">
                      Kembali ke Keranjang
                    </Link>
                    <button className="btn btn-primary" onClick={handleNextStep}>
                      Lanjut ke Pengantaran
                    </button>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="delivery"
                  className="checkout-step delivery-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2>Metode Pengantaran</h2>

                  <div className="shipping-options">
                    <div
                      className={`shipping-option ${formData.shippingMethod === "standard" ? "selected" : ""}`}
                      onClick={() => handleInputChange({ target: { name: "shippingMethod", value: "standard" } })}
                    >
                      <div className="option-radio">
                        <div className="radio-inner"></div>
                      </div>
                      <div className="option-content">
                        <div className="option-title">Pengiriman Standar</div>
                        <div className="option-description">Pengantaran dalam 5-7 hari kerja</div>
                      </div>
                      <div className="option-price">
                        {orderSummary.subtotal >= 750000 ? "Gratis" : formatPrice(89850)}
                      </div>
                    </div>

                    <div
                      className={`shipping-option ${formData.shippingMethod === "express" ? "selected" : ""}`}
                      onClick={() => handleInputChange({ target: { name: "shippingMethod", value: "express" } })}
                    >
                      <div className="option-radio">
                        <div className="radio-inner"></div>
                      </div>
                      <div className="option-content">
                        <div className="option-title">Pengiriman Ekspres</div>
                        <div className="option-description">Pengantaran dalam 2-3 hari kerja</div>
                      </div>
                      <div className="option-price">{formatPrice(194850)}</div>
                    </div>

                    <div
                      className={`shipping-option ${formData.shippingMethod === "overnight" ? "selected" : ""}`}
                      onClick={() => handleInputChange({ target: { name: "shippingMethod", value: "overnight" } })}
                    >
                      <div className="option-radio">
                        <div className="radio-inner"></div>
                      </div>
                      <div className="option-content">
                        <div className="option-title">Pengiriman Satu Hari</div>
                        <div className="option-description">Pengantaran hari kerja berikutnya</div>
                      </div>
                      <div className="option-price">{formatPrice(374850)}</div>
                    </div>
                  </div>

                  <div className="delivery-note">
                    <h3>Catatan Pengiriman (Opsional)</h3>
                    <textarea
                      name="orderNotes"
                      value={formData.orderNotes}
                      onChange={handleInputChange}
                      placeholder="Tambahkan instruksi khusus untuk pengiriman..."
                      rows="4"
                    ></textarea>
                  </div>

                  <div className="form-actions">
                    <button className="btn btn-outline" onClick={handlePrevStep}>
                      Kembali ke Pengiriman
                    </button>
                    <button className="btn btn-primary" onClick={handleNextStep}>
                      Lanjut ke Pembayaran
                    </button>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="payment"
                  className="checkout-step payment-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2>Metode Pembayaran</h2>

                  <div className="payment-options">
                    <div
                      className={`payment-option ${formData.paymentMethod === "credit" ? "selected" : ""}`}
                      onClick={() => handleInputChange({ target: { name: "paymentMethod", value: "credit" } })}
                    >
                      <div className="option-radio">
                        <div className="radio-inner"></div>
                      </div>
                      <div className="option-content">
                        <div className="option-title">Kartu Kredit / Debit</div>
                      </div>
                      <div className="option-icons">
                        <i className="fab fa-cc-visa"></i>
                        <i className="fab fa-cc-mastercard"></i>
                        <i className="fab fa-cc-amex"></i>
                      </div>
                    </div>

                    <div
                      className={`payment-option ${formData.paymentMethod === "paypal" ? "selected" : ""}`}
                      onClick={() => handleInputChange({ target: { name: "paymentMethod", value: "paypal" } })}
                    >
                      <div className="option-radio">
                        <div className="radio-inner"></div>
                      </div>
                      <div className="option-content">
                        <div className="option-title">PayPal</div>
                      </div>
                      <div className="option-icons">
                        <i className="fab fa-paypal"></i>
                      </div>
                    </div>

                    <div
                      className={`payment-option ${formData.paymentMethod === "bank" ? "selected" : ""}`}
                      onClick={() => handleInputChange({ target: { name: "paymentMethod", value: "bank" } })}
                    >
                      <div className="option-radio">
                        <div className="radio-inner"></div>
                      </div>
                      <div className="option-content">
                        <div className="option-title">Transfer Bank</div>
                      </div>
                      <div className="option-icons">
                        <i className="fas fa-university"></i>
                      </div>
                    </div>
                  </div>

                  {formData.paymentMethod === "credit" && (
                    <div className="credit-card-form">
                      <div className="form-group full-width">
                        <label htmlFor="cardNumber">Nomor Kartu *</label>
                        <div className="card-number-input">
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                            className={formErrors.cardNumber ? "error" : ""}
                          />
                          <div className="card-icons">
                            <i className="fab fa-cc-visa"></i>
                            <i className="fab fa-cc-mastercard"></i>
                            <i className="fab fa-cc-amex"></i>
                          </div>
                        </div>
                        {formErrors.cardNumber && <div className="error-message">{formErrors.cardNumber}</div>}
                      </div>

                      <div className="form-group full-width">
                        <label htmlFor="cardName">Nama pada Kartu *</label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className={formErrors.cardName ? "error" : ""}
                        />
                        {formErrors.cardName && <div className="error-message">{formErrors.cardName}</div>}
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="expiryDate">Tanggal Kadaluarsa (MM/YY) *</label>
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            maxLength="5"
                            className={formErrors.expiryDate ? "error" : ""}
                          />
                          {formErrors.expiryDate && <div className="error-message">{formErrors.expiryDate}</div>}
                        </div>

                        <div className="form-group">
                          <label htmlFor="cvv">CVV *</label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            maxLength="4"
                            className={formErrors.cvv ? "error" : ""}
                          />
                          {formErrors.cvv && <div className="error-message">{formErrors.cvv}</div>}
                        </div>
                      </div>

                      <div className="form-group checkbox-group">
                        <input
                          type="checkbox"
                          id="savePaymentInfo"
                          name="savePaymentInfo"
                          checked={formData.savePaymentInfo}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="savePaymentInfo">Simpan kartu ini untuk pembelian berikutnya</label>
                      </div>
                    </div>
                  )}

                  <div className="form-actions">
                    <button className="btn btn-outline" onClick={handlePrevStep}>
                      Kembali ke Pengantaran
                    </button>
                    <button className="btn btn-primary" onClick={handleNextStep}>
                      Tinjau Pesanan
                    </button>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="review"
                  className="checkout-step review-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2>Tinjau Pesanan Anda</h2>

                  <div className="review-sections">
                    <div className="review-section">
                      <div className="review-header">
                        <h3>Informasi Pengiriman</h3>
                        <button className="edit-btn" onClick={() => setCurrentStep(1)}>
                          <i className="fas fa-pencil-alt"></i> Edit
                        </button>
                      </div>
                      <div className="review-content">
                        <p>
                          <strong>
                            {formData.firstName} {formData.lastName}
                          </strong>
                          <br />
                          {formData.address}
                          <br />
                          {formData.city}, {formData.state} {formData.zipCode}
                          <br />
                          {formData.country}
                          <br />
                          {formData.email}
                          <br />
                          {formData.phone}
                        </p>
                      </div>
                    </div>

                    <div className="review-section">
                      <div className="review-header">
                        <h3>Metode Pengantaran</h3>
                        <button className="edit-btn" onClick={() => setCurrentStep(2)}>
                          <i className="fas fa-pencil-alt"></i> Edit
                        </button>
                      </div>
                      <div className="review-content">
                        <p>
                          {formData.shippingMethod === "standard" && "Pengiriman Standar (5-7 hari kerja)"}
                          {formData.shippingMethod === "express" && "Pengiriman Ekspres (2-3 hari kerja)"}
                          {formData.shippingMethod === "overnight" && "Pengiriman Satu Hari (Hari kerja berikutnya)"}
                        </p>
                        {formData.orderNotes && (
                          <div className="notes-section">
                            <strong>Catatan Pengiriman:</strong>
                            <p>{formData.orderNotes}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="review-section">
                      <div className="review-header">
                        <h3>Metode Pembayaran</h3>
                        <button className="edit-btn" onClick={() => setCurrentStep(3)}>
                          <i className="fas fa-pencil-alt"></i> Edit
                        </button>
                      </div>
                      <div className="review-content">
                        {formData.paymentMethod === "credit" && (
                          <p>
                            <i className="fab fa-cc-visa"></i> Kartu Kredit berakhiran {formData.cardNumber.slice(-4)}
                          </p>
                        )}
                        {formData.paymentMethod === "paypal" && (
                          <p>
                            <i className="fab fa-paypal"></i> PayPal
                          </p>
                        )}
                        {formData.paymentMethod === "bank" && (
                          <p>
                            <i className="fas fa-university"></i> Transfer Bank
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="review-section">
                      <div className="review-header">
                        <h3>Item Pesanan</h3>
                        <Link to="/cart" className="edit-btn">
                          <i className="fas fa-pencil-alt"></i> Edit
                        </Link>
                      </div>
                      <div className="review-content">
                        <div className="review-items">
                          {cartItems.map((item) => (
                            <div className="review-item" key={item.id}>
                              <img src={item.image || "/placeholder.svg"} alt={item.name} />
                              <div className="item-details">
                                <h4>{item.name}</h4>
                                <div className="item-price">
                                  <span className="quantity">Jumlah: {item.quantity}</span>
                                  <span className="price">{formatPrice(item.price * item.quantity)}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="final-checkout-options">
                    <div className="form-group checkbox-group">
                      <input
                        type="checkbox"
                        id="createAccount"
                        name="createAccount"
                        checked={formData.createAccount}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="createAccount">Buat akun untuk checkout lebih cepat lain kali</label>
                    </div>

                    {formData.createAccount && (
                      <div className="password-field">
                        <label htmlFor="password">Buat Password *</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={formErrors.password ? "error" : ""}
                        />
                        {formErrors.password && <div className="error-message">{formErrors.password}</div>}
                      </div>
                    )}

                    <div className="form-group checkbox-group terms-checkbox">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className={formErrors.agreeToTerms ? "error" : ""}
                      />
                      <label htmlFor="agreeToTerms">
                        Saya menyetujui <Link to="/terms">Syarat dan Ketentuan</Link> dan{" "}
                        <Link to="/privacy">Kebijakan Privasi</Link>
                      </label>
                      {formErrors.agreeToTerms && <div className="error-message">{formErrors.agreeToTerms}</div>}
                    </div>
                  </div>

                  <div className="form-actions">
                    <button className="btn btn-outline" onClick={handlePrevStep}>
                      Kembali ke Pembayaran
                    </button>
                    <button
                      className="btn btn-primary place-order-btn"
                      onClick={handleSubmitOrder}
                      disabled={processingOrder}
                    >
                      {processingOrder ? (
                        <>
                          <div className="btn-spinner"></div>
                          Memproses...
                        </>
                      ) : (
                        <>Buat Pesanan</>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="checkout-sidebar">
            <div className="order-summary">
              <h2>Ringkasan Pesanan</h2>

              <div className="summary-items">
                {cartItems.map((item) => (
                  <div className="summary-item" key={item.id}>
                    <div className="item-image">
                      <img src={item.image || "/placeholder.svg"} alt={item.name} />
                      <span className="item-quantity">{item.quantity}</span>
                    </div>
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <div className="item-price">{formatPrice(item.price * item.quantity)}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(orderSummary.subtotal)}</span>
              </div>

              <div className="summary-row">
                <span>Pengiriman</span>
                <span>{orderSummary.shipping === 0 ? "Gratis" : formatPrice(orderSummary.shipping)}</span>
              </div>

              <div className="summary-row">
                <span>Pajak</span>
                <span>{formatPrice(orderSummary.tax)}</span>
              </div>

              {orderSummary.discount > 0 && (
                <div className="summary-row discount">
                  <span>Diskon</span>
                  <span>-{formatPrice(orderSummary.discount)}</span>
                </div>
              )}

              <div className="summary-divider"></div>

              <div className="summary-row total">
                <span>Total</span>
                <span>{formatPrice(orderSummary.total)}</span>
              </div>

              <div className="secure-checkout">
                <i className="fas fa-lock"></i> Checkout Aman
              </div>

              <div className="payment-icons">
                <i className="fab fa-cc-visa"></i>
                <i className="fab fa-cc-mastercard"></i>
                <i className="fab fa-cc-amex"></i>
                <i className="fab fa-cc-discover"></i>
                <i className="fab fa-paypal"></i>
                <i className="fab fa-apple-pay"></i>
              </div>
            </div>

            <div className="need-help">
              <h3>Butuh Bantuan?</h3>
              <p>Tim layanan pelanggan kami siap membantu Anda dengan pertanyaan apa pun.</p>
              <div className="help-contact">
                <div className="help-item">
                  <i className="fas fa-phone"></i>
                  <span>(021) 123-4567</span>
                </div>
                <div className="help-item">
                  <i className="fas fa-envelope"></i>
                  <span>bantuan@ecocart.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
