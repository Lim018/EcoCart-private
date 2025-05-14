"use client"

import { useState, useEffect } from "react"
import { User, Camera, Check, X } from "react-feather"
import { validateEmail, validatePhone, validatePostalCode } from "../../utils/accountUtils"
import "../../styles/ProfileForm.css"

const ProfileForm = ({ userData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    province: "",
    country: "",
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [profileImage, setProfileImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [submitStatus, setSubmitStatus] = useState(null)

  // Inisialisasi form data dari userData
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || "",
        city: userData.city || "",
        postalCode: userData.postalCode || "",
        province: userData.province || "",
        country: userData.country || "",
      })

      if (userData.profileImage) {
        setPreviewImage(userData.profileImage)
      }
    }
  }, [userData])

  // Validasi form
  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nama harus diisi"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email harus diisi"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Format email tidak valid"
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Format nomor telepon tidak valid"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Alamat harus diisi"
    }

    if (!formData.city.trim()) {
      newErrors.city = "Kota harus diisi"
    }

    if (formData.postalCode && !validatePostalCode(formData.postalCode)) {
      newErrors.postalCode = "Format kode pos tidak valid"
    }

    if (!formData.province.trim()) {
      newErrors.province = "Provinsi harus diisi"
    }

    if (!formData.country.trim()) {
      newErrors.country = "Negara harus diisi"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Validasi saat input berubah jika sudah pernah disentuh
    if (touched[name]) {
      validateField(name, value)
    }
  }

  // Handle blur untuk validasi
  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched({
      ...touched,
      [name]: true,
    })
    validateField(name, value)
  }

  // Validasi field individual
  const validateField = (name, value) => {
    let error = ""

    switch (name) {
      case "name":
        if (!value.trim()) error = "Nama harus diisi"
        break
      case "email":
        if (!value.trim()) {
          error = "Email harus diisi"
        } else if (!validateEmail(value)) {
          error = "Format email tidak valid"
        }
        break
      case "phone":
        if (value && !validatePhone(value)) {
          error = "Format nomor telepon tidak valid"
        }
        break
      case "address":
        if (!value.trim()) error = "Alamat harus diisi"
        break
      case "city":
        if (!value.trim()) error = "Kota harus diisi"
        break
      case "postalCode":
        if (value && !validatePostalCode(value)) {
          error = "Format kode pos tidak valid"
        }
        break
      case "province":
        if (!value.trim()) error = "Provinsi harus diisi"
        break
      case "country":
        if (!value.trim()) error = "Negara harus diisi"
        break
      default:
        break
    }

    setErrors({
      ...errors,
      [name]: error,
    })

    return !error
  }

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validasi semua field
    const isValid = validateForm()

    if (isValid) {
      // Simulasi pengiriman data ke server
      setSubmitStatus("loading")

      setTimeout(() => {
        console.log("Form data submitted:", formData)
        console.log("Profile image:", profileImage)

        setSubmitStatus("success")

        // Reset status setelah beberapa detik
        setTimeout(() => {
          setSubmitStatus(null)
        }, 3000)
      }, 1500)
    }
  }

  return (
    <div className="profile-form-container">
      <div className="profile-header">
        <h2>Profil Saya</h2>
        <p>Kelola informasi profil Anda</p>
      </div>

      <div className="profile-content">
        <div className="profile-image-section">
          <div className="profile-image-container">
            {previewImage ? (
              <img src={previewImage || "/placeholder.svg"} alt="Profile" className="profile-image" />
            ) : (
              <div className="profile-image-placeholder">
                <User size={64} />
              </div>
            )}
            <div className="image-upload-overlay">
              <label htmlFor="profile-image-upload" className="image-upload-label">
                <Camera size={24} />
                <span>Ubah Foto</span>
              </label>
              <input
                type="file"
                id="profile-image-upload"
                className="image-upload-input"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <p className="image-upload-hint">
            Ukuran maksimum: 2MB
            <br />
            Format: JPG, PNG
          </p>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className={`form-label ${errors.name ? "error" : ""}`}>
                Nama Lengkap
                {errors.name && <span className="error-text">{errors.name}</span>}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-input ${errors.name ? "error" : ""} ${formData.name ? "filled" : ""}`}
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <div className="form-row two-columns">
            <div className="form-group">
              <label htmlFor="email" className={`form-label ${errors.email ? "error" : ""}`}>
                Email
                {errors.email && <span className="error-text">{errors.email}</span>}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input ${errors.email ? "error" : ""} ${formData.email ? "filled" : ""}`}
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone" className={`form-label ${errors.phone ? "error" : ""}`}>
                Nomor Telepon
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={`form-input ${errors.phone ? "error" : ""} ${formData.phone ? "filled" : ""}`}
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="address" className={`form-label ${errors.address ? "error" : ""}`}>
                Alamat
                {errors.address && <span className="error-text">{errors.address}</span>}
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className={`form-input ${errors.address ? "error" : ""} ${formData.address ? "filled" : ""}`}
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <div className="form-row two-columns">
            <div className="form-group">
              <label htmlFor="city" className={`form-label ${errors.city ? "error" : ""}`}>
                Kota
                {errors.city && <span className="error-text">{errors.city}</span>}
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className={`form-input ${errors.city ? "error" : ""} ${formData.city ? "filled" : ""}`}
                value={formData.city}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="form-group">
              <label htmlFor="postalCode" className={`form-label ${errors.postalCode ? "error" : ""}`}>
                Kode Pos
                {errors.postalCode && <span className="error-text">{errors.postalCode}</span>}
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                className={`form-input ${errors.postalCode ? "error" : ""} ${formData.postalCode ? "filled" : ""}`}
                value={formData.postalCode}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <div className="form-row two-columns">
            <div className="form-group">
              <label htmlFor="province" className={`form-label ${errors.province ? "error" : ""}`}>
                Provinsi
                {errors.province && <span className="error-text">{errors.province}</span>}
              </label>
              <input
                type="text"
                id="province"
                name="province"
                className={`form-input ${errors.province ? "error" : ""} ${formData.province ? "filled" : ""}`}
                value={formData.province}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="form-group">
              <label htmlFor="country" className={`form-label ${errors.country ? "error" : ""}`}>
                Negara
                {errors.country && <span className="error-text">{errors.country}</span>}
              </label>
              <input
                type="text"
                id="country"
                name="country"
                className={`form-input ${errors.country ? "error" : ""} ${formData.country ? "filled" : ""}`}
                value={formData.country}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-profile-btn" disabled={submitStatus === "loading"}>
              {submitStatus === "loading" ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>

      {submitStatus === "success" && (
        <div className="submit-status success">
          <Check size={20} />
          Profil berhasil diperbarui!
        </div>
      )}

      {submitStatus === "error" && (
        <div className="submit-status error">
          <X size={20} />
          Gagal memperbarui profil. Silakan coba lagi.
        </div>
      )}
    </div>
  )
}

export default ProfileForm
