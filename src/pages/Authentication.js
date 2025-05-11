"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "../styles/Authentication.css"

// Komponen PasswordStrengthMeter
const PasswordStrengthMeter = ({ password }) => {
  const [strength, setStrength] = useState(0)
  const [feedback, setFeedback] = useState("")

  useEffect(() => {
    if (!password) {
      setStrength(0)
      setFeedback("")
      return
    }

    // Kriteria kekuatan password
    const hasLowerCase = /[a-z]/.test(password)
    const hasUpperCase = /[A-Z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password)
    const isLongEnough = password.length >= 8

    // Hitung skor kekuatan
    let score = 0
    if (hasLowerCase) score += 1
    if (hasUpperCase) score += 1
    if (hasNumber) score += 1
    if (hasSpecialChar) score += 1
    if (isLongEnough) score += 1

    setStrength(score)

    // Berikan feedback
    if (score === 0) {
      setFeedback("")
    } else if (score <= 2) {
      setFeedback("Lemah - Tambahkan huruf besar, angka, dan karakter khusus")
    } else if (score <= 3) {
      setFeedback("Sedang - Coba tambahkan lebih banyak variasi")
    } else if (score <= 4) {
      setFeedback("Kuat - Password sudah cukup aman")
    } else {
      setFeedback("Sangat Kuat - Password sangat aman")
    }
  }, [password])

  // Tentukan warna berdasarkan kekuatan
  const getColor = () => {
    if (strength === 0) return "#e0e0e0"
    if (strength <= 2) return "#f44336"
    if (strength <= 3) return "#ff9800"
    if (strength <= 4) return "#4caf50"
    return "#2e7d32"
  }

  return (
    <div className="password-strength-meter">
      <div className="strength-bars">
        {[1, 2, 3, 4, 5].map((index) => (
          <motion.div
            key={index}
            className="strength-bar"
            initial={{ height: 4 }}
            animate={{
              height: strength >= index ? 8 : 4,
              backgroundColor: strength >= index ? getColor() : "#e0e0e0",
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
      {feedback && (
        <motion.div
          className="strength-feedback"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ color: getColor() }}
        >
          {feedback}
        </motion.div>
      )}
    </div>
  )
}

// Komponen ProgressIndicator untuk multi-step registration
const ProgressIndicator = ({ steps, currentStep }) => {
  return (
    <div className="progress-indicator">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`progress-step ${index < currentStep ? "completed" : ""} ${index === currentStep ? "active" : ""}`}
        >
          <div className="step-number">
            {index < currentStep ? (
              <motion.i
                className="fas fa-check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            ) : (
              index + 1
            )}
          </div>
          <div className="step-label">{step}</div>
          {index < steps.length - 1 && <div className="step-connector" />}
        </div>
      ))}
    </div>
  )
}

// Komponen AnimatedInput dengan animasi focus
const AnimatedInput = ({ type, label, value, onChange, error, icon, ...props }) => {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef(null)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(value !== "")
  }

  useEffect(() => {
    if (value !== "") {
      setIsFocused(true)
    }
  }, [value])

  return (
    <div className={`animated-input-container ${isFocused ? "focused" : ""} ${error ? "error" : ""}`}>
      <div className="input-icon">{icon}</div>
      <div className="input-content">
        <motion.label
          animate={{
            y: isFocused ? -20 : 0,
            scale: isFocused ? 0.85 : 1,
            color: isFocused ? "var(--primary-blue)" : "var(--text-muted)",
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.div
            className="input-error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Komponen utama Authentication
const Authentication = () => {
  // State untuk mode (login/register)
  const [mode, setMode] = useState("login")

  // State untuk form login
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  // State untuk form registrasi
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })

  // State untuk multi-step registration
  const [registerStep, setRegisterStep] = useState(0)
  const registerSteps = ["Informasi Akun", "Data Pribadi", "Verifikasi"]

  // State untuk error
  const [errors, setErrors] = useState({})

  // State untuk animasi
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  // Handler untuk login form
  const handleLoginChange = (e) => {
    const { name, value, checked } = e.target
    setLoginForm({
      ...loginForm,
      [name]: name === "rememberMe" ? checked : value,
    })
  }

  // Handler untuk register form
  const handleRegisterChange = (e) => {
    const { name, value, checked } = e.target
    setRegisterForm({
      ...registerForm,
      [name]: name === "agreeTerms" ? checked : value,
    })
  }

  // Validasi login form
  const validateLoginForm = () => {
    const newErrors = {}

    if (!loginForm.email) {
      newErrors.loginEmail = "Email tidak boleh kosong"
    } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
      newErrors.loginEmail = "Format email tidak valid"
    }

    if (!loginForm.password) {
      newErrors.loginPassword = "Password tidak boleh kosong"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Validasi register form berdasarkan step
  const validateRegisterStep = () => {
    const newErrors = {}

    if (registerStep === 0) {
      if (!registerForm.email) {
        newErrors.registerEmail = "Email tidak boleh kosong"
      } else if (!/\S+@\S+\.\S+/.test(registerForm.email)) {
        newErrors.registerEmail = "Format email tidak valid"
      }

      if (!registerForm.password) {
        newErrors.registerPassword = "Password tidak boleh kosong"
      } else if (registerForm.password.length < 8) {
        newErrors.registerPassword = "Password minimal 8 karakter"
      }

      if (!registerForm.confirmPassword) {
        newErrors.registerConfirmPassword = "Konfirmasi password tidak boleh kosong"
      } else if (registerForm.password !== registerForm.confirmPassword) {
        newErrors.registerConfirmPassword = "Password tidak cocok"
      }
    } else if (registerStep === 1) {
      if (!registerForm.name) {
        newErrors.registerName = "Nama tidak boleh kosong"
      }
    } else if (registerStep === 2) {
      if (!registerForm.agreeTerms) {
        newErrors.registerAgreeTerms = "Anda harus menyetujui syarat dan ketentuan"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handler untuk login
  const handleLogin = (e) => {
    e.preventDefault()

    if (validateLoginForm()) {
      // Simulasi login berhasil
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    } else {
      // Tampilkan animasi error
      setErrorMessage("Gagal login. Silakan periksa kembali data Anda.")
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 3000)
    }
  }

  // Handler untuk next step pada registrasi
  const handleNextStep = () => {
    if (validateRegisterStep()) {
      if (registerStep < registerSteps.length - 1) {
        setRegisterStep(registerStep + 1)
      } else {
        // Registrasi selesai
        setShowSuccess(true)
        setTimeout(() => {
          setShowSuccess(false)
          setMode("login")
          setRegisterStep(0)
          setRegisterForm({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            agreeTerms: false,
          })
        }, 3000)
      }
    } else {
      // Tampilkan animasi error
      setErrorMessage("Silakan lengkapi semua field yang diperlukan.")
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 3000)
    }
  }

  // Handler untuk previous step pada registrasi
  const handlePrevStep = () => {
    if (registerStep > 0) {
      setRegisterStep(registerStep - 1)
    }
  }

  // Render form berdasarkan step
  const renderRegisterStep = () => {
    switch (registerStep) {
      case 0:
        return (
          <>
            <AnimatedInput
              type="email"
              label="Email"
              name="email"
              value={registerForm.email}
              onChange={handleRegisterChange}
              error={errors.registerEmail}
              icon={<i className="fas fa-envelope"></i>}
              autoComplete="email"
            />

            <AnimatedInput
              type="password"
              label="Password"
              name="password"
              value={registerForm.password}
              onChange={handleRegisterChange}
              error={errors.registerPassword}
              icon={<i className="fas fa-lock"></i>}
              autoComplete="new-password"
            />

            <PasswordStrengthMeter password={registerForm.password} />

            <AnimatedInput
              type="password"
              label="Konfirmasi Password"
              name="confirmPassword"
              value={registerForm.confirmPassword}
              onChange={handleRegisterChange}
              error={errors.registerConfirmPassword}
              icon={<i className="fas fa-lock"></i>}
              autoComplete="new-password"
            />
          </>
        )
      case 1:
        return (
          <>
            <AnimatedInput
              type="text"
              label="Nama Lengkap"
              name="name"
              value={registerForm.name}
              onChange={handleRegisterChange}
              error={errors.registerName}
              icon={<i className="fas fa-user"></i>}
              autoComplete="name"
            />

            <AnimatedInput
              type="tel"
              label="Nomor Telepon (Opsional)"
              name="phone"
              value={registerForm.phone || ""}
              onChange={handleRegisterChange}
              icon={<i className="fas fa-phone"></i>}
              autoComplete="tel"
            />

            <AnimatedInput
              type="text"
              label="Alamat (Opsional)"
              name="address"
              value={registerForm.address || ""}
              onChange={handleRegisterChange}
              icon={<i className="fas fa-home"></i>}
              autoComplete="street-address"
            />
          </>
        )
      case 2:
        return (
          <div className="verification-step">
            <div className="verification-info">
              <i className="fas fa-info-circle"></i>
              <p>
                Kami telah mengirimkan kode verifikasi ke email Anda. Silakan periksa kotak masuk atau folder spam Anda.
              </p>
            </div>

            <AnimatedInput
              type="text"
              label="Kode Verifikasi"
              name="verificationCode"
              value={registerForm.verificationCode || ""}
              onChange={handleRegisterChange}
              error={errors.verificationCode}
              icon={<i className="fas fa-shield-alt"></i>}
            />

            <div className="terms-checkbox">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={registerForm.agreeTerms}
                  onChange={handleRegisterChange}
                />
                <span className="checkmark"></span>
                <span className="checkbox-label">
                  Saya menyetujui <a href="#">Syarat dan Ketentuan</a> serta <a href="#">Kebijakan Privasi</a>
                </span>
              </label>
              {errors.registerAgreeTerms && <div className="checkbox-error">{errors.registerAgreeTerms}</div>}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="authentication-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <span className="logo-text">
              Eco<span className="logo-highlight">Cart</span>
            </span>
          </div>

          <div className="auth-tabs">
            <button className={`auth-tab ${mode === "login" ? "active" : ""}`} onClick={() => setMode("login")}>
              Masuk
            </button>
            <button
              className={`auth-tab ${mode === "register" ? "active" : ""}`}
              onClick={() => {
                setMode("register")
                setRegisterStep(0)
              }}
            >
              Daftar
            </button>
          </div>
        </div>

        <div className="auth-content">
          <AnimatePresence mode="wait">
            {mode === "login" ? (
              <motion.form
                key="login-form"
                className="login-form"
                onSubmit={handleLogin}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h2>Selamat Datang Kembali</h2>
                <p className="auth-subtitle">Masuk untuk melanjutkan ke EcoCart</p>

                <AnimatedInput
                  type="email"
                  label="Email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  error={errors.loginEmail}
                  icon={<i className="fas fa-envelope"></i>}
                  autoComplete="email"
                />

                <AnimatedInput
                  type="password"
                  label="Password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  error={errors.loginPassword}
                  icon={<i className="fas fa-lock"></i>}
                  autoComplete="current-password"
                />

                <div className="form-options">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={loginForm.rememberMe}
                      onChange={handleLoginChange}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-label">Ingat saya</span>
                  </label>

                  <a href="#" className="forgot-password">
                    Lupa password?
                  </a>
                </div>

                <button type="submit" className="auth-button">
                  Masuk
                </button>

                <div className="social-login">
                  <p>Atau masuk dengan</p>
                  <div className="social-buttons">
                    <button type="button" className="social-button google">
                      <i className="fab fa-google"></i>
                    </button>
                    <button type="button" className="social-button facebook">
                      <i className="fab fa-facebook-f"></i>
                    </button>
                    <button type="button" className="social-button twitter">
                      <i className="fab fa-twitter"></i>
                    </button>
                  </div>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="register-form"
                className="register-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2>Buat Akun Baru</h2>
                <p className="auth-subtitle">Bergabunglah dengan komunitas EcoCart</p>

                <ProgressIndicator steps={registerSteps} currentStep={registerStep} />

                <div className="register-step-content">{renderRegisterStep()}</div>

                <div className="register-buttons">
                  {registerStep > 0 && (
                    <button type="button" className="auth-button secondary" onClick={handlePrevStep}>
                      Kembali
                    </button>
                  )}

                  <button type="button" className="auth-button" onClick={handleNextStep}>
                    {registerStep === registerSteps.length - 1 ? "Selesai" : "Lanjut"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="auth-info">
        <div className="info-content">
          <h1>Bergabunglah dengan Revolusi Eco-Friendly</h1>
          <p>
            EcoCart adalah platform belanja yang berfokus pada produk ramah lingkungan dan berkelanjutan. Dengan
            bergabung, Anda ikut berkontribusi dalam menjaga kelestarian bumi untuk generasi mendatang.
          </p>

          <div className="info-features">
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <div className="feature-text">
                <h3>Produk Berkelanjutan</h3>
                <p>Semua produk kami dipilih dengan ketat untuk memastikan dampak minimal terhadap lingkungan.</p>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-recycle"></i>
              </div>
              <div className="feature-text">
                <h3>Kemasan Ramah Lingkungan</h3>
                <p>
                  Kami berkomitmen untuk mengurangi limbah plastik dengan menggunakan kemasan yang dapat didaur ulang.
                </p>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-hand-holding-heart"></i>
              </div>
              <div className="feature-text">
                <h3>Dampak Positif</h3>
                <p>Setiap pembelian Anda berkontribusi pada program pelestarian lingkungan yang kami dukung.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animasi sukses */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="success-animation"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <div className="success-icon">
              <i className="fas fa-check"></i>
            </div>
            <p>{mode === "login" ? "Login berhasil!" : "Registrasi berhasil!"}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animasi error */}
      <AnimatePresence>
        {showError && (
          <motion.div
            className="error-animation"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <div className="error-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <p>{errorMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Authentication
