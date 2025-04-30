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
    country: "United States",

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

  // Sample cart items data
  const sampleCartItems = [
    {
      id: "item1",
      name: "Bamboo Toothbrush Set",
      price: 12.99,
      quantity: 2,
      image: "/bamboo-toothbrush-set.png",
    },
    {
      id: "item2",
      name: "Reusable Produce Bags",
      price: 15.99,
      quantity: 1,
      image: "/reusable-produce-bags.png",
    },
    {
      id: "item3",
      name: "Beeswax Food Wraps",
      price: 18.99,
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
      const shipping = subtotal > 50 ? 0 : 5.99
      const tax = subtotal * 0.08 // 8% tax
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
      if (!formData.firstName.trim()) errors.firstName = "First name is required"
      if (!formData.lastName.trim()) errors.lastName = "Last name is required"
      if (!formData.email.trim()) errors.email = "Email is required"
      else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid"
      if (!formData.phone.trim()) errors.phone = "Phone number is required"
      if (!formData.address.trim()) errors.address = "Address is required"
      if (!formData.city.trim()) errors.city = "City is required"
      if (!formData.state.trim()) errors.state = "State is required"
      if (!formData.zipCode.trim()) errors.zipCode = "ZIP code is required"
    } else if (step === 3) {
      // Validate payment information
      if (formData.paymentMethod === "credit") {
        if (!formData.cardNumber.trim()) errors.cardNumber = "Card number is required"
        else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, "")))
          errors.cardNumber = "Card number must be 16 digits"

        if (!formData.cardName.trim()) errors.cardName = "Name on card is required"
        if (!formData.expiryDate.trim()) errors.expiryDate = "Expiry date is required"
        else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate))
          errors.expiryDate = "Expiry date must be in MM/YY format"

        if (!formData.cvv.trim()) errors.cvv = "CVV is required"
        else if (!/^\d{3,4}$/.test(formData.cvv)) errors.cvv = "CVV must be 3 or 4 digits"
      }
    } else if (step === 4) {
      // Validate final step
      if (!formData.agreeToTerms) errors.agreeToTerms = "You must agree to the terms and conditions"
      if (formData.createAccount && !formData.password.trim()) errors.password = "Password is required"
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
          <p>Preparing checkout...</p>
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
            Order Placed Successfully!
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}>
            Thank you for your purchase. Your order has been received and is being processed.
          </motion.p>

          <motion.div
            className="order-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="order-number">
              <span>Order Number:</span>
              <strong>ECO-{Math.floor(100000 + Math.random() * 900000)}</strong>
            </div>
            <div className="order-email">
              <span>Confirmation sent to:</span>
              <strong>{formData.email}</strong>
            </div>
          </motion.div>

          <motion.div
            className="redirect-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <p>You will be redirected to your order history in a few seconds...</p>
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
          <p>Complete your purchase</p>
        </div>

        <div className="checkout-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
          </div>

          <div className="progress-steps">
            <div className={`progress-step ${currentStep >= 1 ? "active" : ""} ${currentStep > 1 ? "completed" : ""}`}>
              <div className="step-number">{currentStep > 1 ? <i className="fas fa-check"></i> : 1}</div>
              <div className="step-label">Shipping</div>
            </div>

            <div className={`progress-step ${currentStep >= 2 ? "active" : ""} ${currentStep > 2 ? "completed" : ""}`}>
              <div className="step-number">{currentStep > 2 ? <i className="fas fa-check"></i> : 2}</div>
              <div className="step-label">Delivery</div>
            </div>

            <div className={`progress-step ${currentStep >= 3 ? "active" : ""} ${currentStep > 3 ? "completed" : ""}`}>
              <div className="step-number">{currentStep > 3 ? <i className="fas fa-check"></i> : 3}</div>
              <div className="step-label">Payment</div>
            </div>

            <div className={`progress-step ${currentStep >= 4 ? "active" : ""} ${currentStep > 4 ? "completed" : ""}`}>
              <div className="step-number">4</div>
              <div className="step-label">Review</div>
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
                  <h2>Shipping Information</h2>

                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name *</label>
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
                      <label htmlFor="lastName">Last Name *</label>
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
                      <label htmlFor="email">Email Address *</label>
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
                      <label htmlFor="phone">Phone Number *</label>
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
                      <label htmlFor="address">Street Address *</label>
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
                      <label htmlFor="city">City *</label>
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
                      <label htmlFor="state">State/Province *</label>
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
                      <label htmlFor="zipCode">ZIP/Postal Code *</label>
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
                      <label htmlFor="country">Country *</label>
                      <select id="country" name="country" value={formData.country} onChange={handleInputChange}>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-actions">
                    <Link to="/cart" className="btn btn-outline">
                      Back to Cart
                    </Link>
                    <button className="btn btn-primary" onClick={handleNextStep}>
                      Continue to Delivery
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
                  <h2>Delivery Method</h2>

                  <div className="shipping-options">
                    <div
                      className={`shipping-option ${formData.shippingMethod === "standard" ? "selected" : ""}`}
                      onClick={() => handleInputChange({ target: { name: "shippingMethod", value: "standard" } })}
                    >
                      <div className="option-radio">
                        <div className="radio-inner"></div>
                      </div>
                      <div className="option-content">
                        <div className="option-title">Standard Shipping</div>
                        <div className="option-description">Delivery in 5-7 business days</div>
                      </div>
                      <div className="option-price">{orderSummary.subtotal >= 50 ? "Free" : "$5.99"}</div>
                    </div>

                    <div
                      className={`shipping-option ${formData.shippingMethod === "express" ? "selected" : ""}`}
                      onClick={() => handleInputChange({ target: { name: "shippingMethod", value: "express" } })}
                    >
                      <div className="option-radio">
                        <div className="radio-inner"></div>
                      </div>
                      <div className="option-content">
                        <div className="option-title">Express Shipping</div>
                        <div className="option-description">Delivery in 2-3 business days</div>
                      </div>
                      <div className="option-price">$12.99</div>
                    </div>

                    <div
                      className={`shipping-option ${formData.shippingMethod === "overnight" ? "selected" : ""}`}
                      onClick={() => handleInputChange({ target: { name: "shippingMethod", value: "overnight" } })}
                    >
                      <div className="option-radio">
                        <div className="radio-inner"></div>
                      </div>
                      <div className="option-content">
                        <div className="option-title">Overnight Shipping</div>
                        <div className="option-description">Next business day delivery</div>
                      </div>
                      <div className="option-price">$24.99</div>
                    </div>
                  </div>

                  <div className="delivery-note">
                    <h3>Delivery Notes (Optional)</h3>
                    <textarea
                      name="orderNotes"
                      value={formData.orderNotes}
                      onChange={handleInputChange}
                      placeholder="Add any special instructions for delivery..."
                      rows="4"
                    ></textarea>
                  </div>

                  <div className="form-actions">
                    <button className="btn btn-outline" onClick={handlePrevStep}>
                      Back to Shipping
                    </button>
                    <button className="btn btn-primary" onClick={handleNextStep}>
                      Continue to Payment
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
                  <h2>Payment Method</h2>

                  <div className="payment-options">
                    <div
                      className={`payment-option ${formData.paymentMethod === "credit" ? "selected" : ""}`}
                      onClick={() => handleInputChange({ target: { name: "paymentMethod", value: "credit" } })}
                    >
                      <div className="option-radio">
                        <div className="radio-inner"></div>
                      </div>
                      <div className="option-content">
                        <div className="option-title">Credit / Debit Card</div>
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
                      className={`payment-option ${formData.paymentMethod === "applepay" ? "selected" : ""}`}
                      onClick={() => handleInputChange({ target: { name: "paymentMethod", value: "applepay" } })}
                    >
                      <div className="option-radio">
                        <div className="radio-inner"></div>
                      </div>
                      <div className="option-content">
                        <div className="option-title">Apple Pay</div>
                      </div>
                      <div className="option-icons">
                        <i className="fab fa-apple-pay"></i>
                      </div>
                    </div>
                  </div>

                  {formData.paymentMethod === "credit" && (
                    <div className="credit-card-form">
                      <div className="form-group full-width">
                        <label htmlFor="cardNumber">Card Number *</label>
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
                        <label htmlFor="cardName">Name on Card *</label>
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
                          <label htmlFor="expiryDate">Expiry Date (MM/YY) *</label>
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
                        <label htmlFor="savePaymentInfo">Save this card for future purchases</label>
                      </div>
                    </div>
                  )}

                  <div className="form-actions">
                    <button className="btn btn-outline" onClick={handlePrevStep}>
                      Back to Delivery
                    </button>
                    <button className="btn btn-primary" onClick={handleNextStep}>
                      Review Order
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
                  <h2>Review Your Order</h2>

                  <div className="review-sections">
                    <div className="review-section">
                      <div className="review-header">
                        <h3>Shipping Information</h3>
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
                        <h3>Delivery Method</h3>
                        <button className="edit-btn" onClick={() => setCurrentStep(2)}>
                          <i className="fas fa-pencil-alt"></i> Edit
                        </button>
                      </div>
                      <div className="review-content">
                        <p>
                          {formData.shippingMethod === "standard" && "Standard Shipping (5-7 business days)"}
                          {formData.shippingMethod === "express" && "Express Shipping (2-3 business days)"}
                          {formData.shippingMethod === "overnight" && "Overnight Shipping (Next business day)"}
                        </p>
                        {formData.orderNotes && (
                          <div className="notes-section">
                            <strong>Delivery Notes:</strong>
                            <p>{formData.orderNotes}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="review-section">
                      <div className="review-header">
                        <h3>Payment Method</h3>
                        <button className="edit-btn" onClick={() => setCurrentStep(3)}>
                          <i className="fas fa-pencil-alt"></i> Edit
                        </button>
                      </div>
                      <div className="review-content">
                        {formData.paymentMethod === "credit" && (
                          <p>
                            <i className="fab fa-cc-visa"></i> Credit Card ending in {formData.cardNumber.slice(-4)}
                          </p>
                        )}
                        {formData.paymentMethod === "paypal" && (
                          <p>
                            <i className="fab fa-paypal"></i> PayPal
                          </p>
                        )}
                        {formData.paymentMethod === "applepay" && (
                          <p>
                            <i className="fab fa-apple-pay"></i> Apple Pay
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="review-section">
                      <div className="review-header">
                        <h3>Order Items</h3>
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
                                  <span className="quantity">Qty: {item.quantity}</span>
                                  <span className="price">${(item.price * item.quantity).toFixed(2)}</span>
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
                      <label htmlFor="createAccount">Create an account for faster checkout next time</label>
                    </div>

                    {formData.createAccount && (
                      <div className="password-field">
                        <label htmlFor="password">Create Password *</label>
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
                        I agree to the <Link to="/terms">Terms and Conditions</Link> and{" "}
                        <Link to="/privacy">Privacy Policy</Link>
                      </label>
                      {formErrors.agreeToTerms && <div className="error-message">{formErrors.agreeToTerms}</div>}
                    </div>
                  </div>

                  <div className="form-actions">
                    <button className="btn btn-outline" onClick={handlePrevStep}>
                      Back to Payment
                    </button>
                    <button
                      className="btn btn-primary place-order-btn"
                      onClick={handleSubmitOrder}
                      disabled={processingOrder}
                    >
                      {processingOrder ? (
                        <>
                          <div className="btn-spinner"></div>
                          Processing...
                        </>
                      ) : (
                        <>Place Order</>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="checkout-sidebar">
            <div className="order-summary">
              <h2>Order Summary</h2>

              <div className="summary-items">
                {cartItems.map((item) => (
                  <div className="summary-item" key={item.id}>
                    <div className="item-image">
                      <img src={item.image || "/placeholder.svg"} alt={item.name} />
                      <span className="item-quantity">{item.quantity}</span>
                    </div>
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <div className="item-price">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>${orderSummary.subtotal.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span>{orderSummary.shipping === 0 ? "Free" : `$${orderSummary.shipping.toFixed(2)}`}</span>
              </div>

              <div className="summary-row">
                <span>Tax</span>
                <span>${orderSummary.tax.toFixed(2)}</span>
              </div>

              {orderSummary.discount > 0 && (
                <div className="summary-row discount">
                  <span>Discount</span>
                  <span>-${orderSummary.discount.toFixed(2)}</span>
                </div>
              )}

              <div className="summary-divider"></div>

              <div className="summary-row total">
                <span>Total</span>
                <span>${orderSummary.total.toFixed(2)}</span>
              </div>

              <div className="secure-checkout">
                <i className="fas fa-lock"></i> Secure Checkout
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
              <h3>Need Help?</h3>
              <p>Our customer service team is here to help you with any questions.</p>
              <div className="help-contact">
                <div className="help-item">
                  <i className="fas fa-phone"></i>
                  <span>(800) 123-4567</span>
                </div>
                <div className="help-item">
                  <i className="fas fa-envelope"></i>
                  <span>support@ecocart.com</span>
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
