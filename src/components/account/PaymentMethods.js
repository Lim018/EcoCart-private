"use client"

import { useState } from "react"
import { CreditCard, Plus, Trash2, Edit, Star } from "react-feather"
import {
  validateCreditCard,
  validateExpiryDate,
  validateCVV,
  formatExpiryDate,
  getCreditCardType,
} from "../../utils/accountUtils"
import "../../styles/PaymentMethods.css"

const PaymentMethods = ({ paymentMethods }) => {
  const [methods, setMethods] = useState(paymentMethods || [])
  const [showAddForm, setShowAddForm] = useState(false)
  const [flippedCards, setFlippedCards] = useState([])
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    isDefault: false,
  })
  const [formErrors, setFormErrors] = useState({})
  const [editingId, setEditingId] = useState(null)

  // Toggle card flip
  const toggleCardFlip = (id) => {
    if (flippedCards.includes(id)) {
      setFlippedCards(flippedCards.filter((cardId) => cardId !== id))
    } else {
      setFlippedCards([...flippedCards, id])
    }
  }

  // Set card as default
  const setDefaultCard = (id) => {
    const updatedMethods = methods.map((method) => ({
      ...method,
      isDefault: method.id === id,
    }))
    setMethods(updatedMethods)
  }

  // Delete payment method
  const deletePaymentMethod = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus metode pembayaran ini?")) {
      const updatedMethods = methods.filter((method) => method.id !== id)

      // Jika kartu default dihapus, atur kartu pertama sebagai default
      if (updatedMethods.length > 0 && methods.find((m) => m.id === id)?.isDefault) {
        updatedMethods[0].isDefault = true
      }

      setMethods(updatedMethods)
    }
  }

  // Edit payment method
  const editPaymentMethod = (method) => {
    setFormData({
      cardNumber: method.cardNumber.replace(/[*\s]/g, ""),
      cardHolder: method.cardHolder,
      expiryDate: method.expiryDate,
      cvv: method.cvv.replace(/[*]/g, ""),
      isDefault: method.isDefault,
    })
    setEditingId(method.id)
    setShowAddForm(true)
  }

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    let formattedValue = value

    // Format input values
    if (name === "cardNumber") {
      formattedValue = value.replace(/\D/g, "").substring(0, 16)
    } else if (name === "expiryDate") {
      formattedValue = formatExpiryDate(value)
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").substring(0, 4)
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : formattedValue,
    })

    // Validate field on change
    validateField(name, type === "checkbox" ? checked : formattedValue)
  }

  // Validate individual field
  const validateField = (name, value) => {
    let error = ""

    switch (name) {
      case "cardNumber":
        if (!value) {
          error = "Nomor kartu harus diisi"
        } else if (!validateCreditCard(value)) {
          error = "Nomor kartu tidak valid"
        }
        break
      case "cardHolder":
        if (!value.trim()) {
          error = "Nama pemegang kartu harus diisi"
        }
        break
      case "expiryDate":
        if (!value) {
          error = "Tanggal kedaluwarsa harus diisi"
        } else if (!validateExpiryDate(value)) {
          error = "Tanggal kedaluwarsa tidak valid"
        }
        break
      case "cvv":
        if (!value) {
          error = "CVV harus diisi"
        } else if (!validateCVV(value)) {
          error = "CVV tidak valid"
        }
        break
      default:
        break
    }

    setFormErrors({
      ...formErrors,
      [name]: error,
    })

    return !error
  }

  // Validate entire form
  const validateForm = () => {
    const { cardNumber, cardHolder, expiryDate, cvv } = formData
    const errors = {}

    if (!cardNumber) {
      errors.cardNumber = "Nomor kartu harus diisi"
    } else if (!validateCreditCard(cardNumber)) {
      errors.cardNumber = "Nomor kartu tidak valid"
    }

    if (!cardHolder.trim()) {
      errors.cardHolder = "Nama pemegang kartu harus diisi"
    }

    if (!expiryDate) {
      errors.expiryDate = "Tanggal kedaluwarsa harus diisi"
    } else if (!validateExpiryDate(expiryDate)) {
      errors.expiryDate = "Tanggal kedaluwarsa tidak valid"
    }

    if (!cvv) {
      errors.cvv = "CVV harus diisi"
    } else if (!validateCVV(cvv)) {
      errors.cvv = "CVV tidak valid"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      const cardType = getCreditCardType(formData.cardNumber)
      const maskedCardNumber = `**** **** **** ${formData.cardNumber.slice(-4)}`
      const maskedCVV = "***"

      if (editingId) {
        // Update existing payment method
        const updatedMethods = methods.map((method) => {
          if (method.id === editingId) {
            return {
              ...method,
              type: cardType,
              cardNumber: maskedCardNumber,
              cardHolder: formData.cardHolder,
              expiryDate: formData.expiryDate,
              cvv: maskedCVV,
              isDefault: formData.isDefault,
            }
          }

          // If current card is set as default, update other cards
          if (formData.isDefault) {
            return {
              ...method,
              isDefault: false,
            }
          }

          return method
        })

        setMethods(updatedMethods)
      } else {
        // Add new payment method
        const newMethod = {
          id: `pm${Date.now()}`,
          type: cardType,
          cardNumber: maskedCardNumber,
          cardHolder: formData.cardHolder,
          expiryDate: formData.expiryDate,
          cvv: maskedCVV,
          isDefault: formData.isDefault || methods.length === 0, // First card is default
        }

        // If new card is default, update other cards
        if (newMethod.isDefault) {
          const updatedMethods = methods.map((method) => ({
            ...method,
            isDefault: false,
          }))

          setMethods([...updatedMethods, newMethod])
        } else {
          setMethods([...methods, newMethod])
        }
      }

      // Reset form
      resetForm()
    }
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
      isDefault: false,
    })
    setFormErrors({})
    setEditingId(null)
    setShowAddForm(false)
  }

  return (
    <div className="payment-methods">
      <div className="payment-methods-header">
        <h2>Metode Pembayaran</h2>
        <p>Kelola kartu kredit dan debit Anda</p>
      </div>

      <div className="payment-methods-content">
        <div className="saved-payment-methods">
          <h3>Kartu Tersimpan</h3>

          {methods.length === 0 ? (
            <div className="no-payment-methods">
              <CreditCard size={48} />
              <p>Anda belum menambahkan metode pembayaran.</p>
            </div>
          ) : (
            <div className="payment-methods-list">
              {methods.map((method) => (
                <div key={method.id} className={`payment-method-card ${method.isDefault ? "default" : ""}`}>
                  <div
                    className={`card-container ${flippedCards.includes(method.id) ? "flipped" : ""}`}
                    onClick={() => toggleCardFlip(method.id)}
                  >
                    <div className="card-front">
                      <div className="card-header">
                        <div className={`card-type ${method.type}`}>{method.type.toUpperCase()}</div>
                        {method.isDefault && (
                          <div className="default-badge">
                            <Star size={12} />
                            <span>Default</span>
                          </div>
                        )}
                      </div>
                      <div className="card-number">{method.cardNumber}</div>
                      <div className="card-details">
                        <div className="card-holder">
                          <span className="label">Pemegang Kartu</span>
                          <span className="value">{method.cardHolder}</span>
                        </div>
                        <div className="card-expiry">
                          <span className="label">Berlaku Hingga</span>
                          <span className="value">{method.expiryDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="card-stripe"></div>
                      <div className="card-cvv">
                        <span className="label">CVV</span>
                        <span className="value">{method.cvv}</span>
                      </div>
                      <div className="card-info">Klik untuk membalik kartu</div>
                    </div>
                  </div>

                  <div className="card-actions">
                    {!method.isDefault && (
                      <button className="action-btn set-default" onClick={() => setDefaultCard(method.id)}>
                        <Star size={16} />
                        <span>Jadikan Default</span>
                      </button>
                    )}
                    <button
                      className="action-btn edit"
                      onClick={(e) => {
                        e.stopPropagation()
                        editPaymentMethod(method)
                      }}
                    >
                      <Edit size={16} />
                      <span>Edit</span>
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={(e) => {
                        e.stopPropagation()
                        deletePaymentMethod(method.id)
                      }}
                    >
                      <Trash2 size={16} />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!showAddForm && (
            <button className="add-payment-method-btn" onClick={() => setShowAddForm(true)}>
              <Plus size={20} />
              Tambah Metode Pembayaran Baru
            </button>
          )}
        </div>

        {showAddForm && (
          <div className="payment-method-form-container">
            <h3>{editingId ? "Edit Metode Pembayaran" : "Tambah Metode Pembayaran Baru"}</h3>
            <form className="payment-method-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="cardNumber">
                  Nomor Kartu
                  {formErrors.cardNumber && <span className="error-text">{formErrors.cardNumber}</span>}
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className={formErrors.cardNumber ? "error" : ""}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cardHolder">
                  Nama Pemegang Kartu
                  {formErrors.cardHolder && <span className="error-text">{formErrors.cardHolder}</span>}
                </label>
                <input
                  type="text"
                  id="cardHolder"
                  name="cardHolder"
                  placeholder="Nama Lengkap"
                  value={formData.cardHolder}
                  onChange={handleInputChange}
                  className={formErrors.cardHolder ? "error" : ""}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiryDate">
                    Tanggal Kedaluwarsa
                    {formErrors.expiryDate && <span className="error-text">{formErrors.expiryDate}</span>}
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className={formErrors.expiryDate ? "error" : ""}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cvv">
                    CVV
                    {formErrors.cvv && <span className="error-text">{formErrors.cvv}</span>}
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className={formErrors.cvv ? "error" : ""}
                  />
                </div>
              </div>

              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="isDefault"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleInputChange}
                />
                <label htmlFor="isDefault">Jadikan sebagai metode pembayaran default</label>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={resetForm}>
                  Batal
                </button>
                <button type="submit" className="save-btn">
                  {editingId ? "Perbarui" : "Simpan"} Metode Pembayaran
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentMethods
