"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "../styles/ManageUsers.css"

// Mock data untuk pengguna
const initialUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "admin",
    status: "active",
    avatar: "/thoughtful-gaze.png",
    lastLogin: "2023-07-15T14:30:00Z",
    registeredDate: "2022-03-10T09:15:00Z",
    permissions: {
      manageProducts: true,
      manageOrders: true,
      manageUsers: true,
      manageContent: true,
      viewReports: true,
    },
    activity: [
      { id: 1, action: "Login", timestamp: "2023-07-15T14:30:00Z", details: "Login dari Jakarta, Indonesia" },
      {
        id: 2,
        action: "Edit Product",
        timestamp: "2023-07-15T14:45:00Z",
        details: "Mengedit produk 'Bamboo Toothbrush Set'",
      },
      {
        id: 3,
        action: "Add Article",
        timestamp: "2023-07-15T15:20:00Z",
        details: "Menambahkan artikel baru 'Zero Waste Living'",
      },
      { id: 4, action: "Logout", timestamp: "2023-07-15T16:30:00Z", details: "Logout dari sistem" },
      { id: 5, action: "Login", timestamp: "2023-07-14T09:10:00Z", details: "Login dari Jakarta, Indonesia" },
      { id: 6, action: "Update Order", timestamp: "2023-07-14T10:25:00Z", details: "Memperbarui status pesanan #1234" },
      { id: 7, action: "Logout", timestamp: "2023-07-14T17:15:00Z", details: "Logout dari sistem" },
    ],
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    role: "manager",
    status: "active",
    avatar: "/serene-gaze.png",
    lastLogin: "2023-07-14T10:15:00Z",
    registeredDate: "2022-05-22T11:30:00Z",
    permissions: {
      manageProducts: true,
      manageOrders: true,
      manageUsers: false,
      manageContent: true,
      viewReports: true,
    },
    activity: [
      { id: 1, action: "Login", timestamp: "2023-07-14T10:15:00Z", details: "Login dari Surabaya, Indonesia" },
      {
        id: 2,
        action: "Add Product",
        timestamp: "2023-07-14T11:05:00Z",
        details: "Menambahkan produk baru 'Reusable Coffee Cup'",
      },
      {
        id: 3,
        action: "Edit Article",
        timestamp: "2023-07-14T13:40:00Z",
        details: "Mengedit artikel 'Sustainable Living Tips'",
      },
      { id: 4, action: "Logout", timestamp: "2023-07-14T18:20:00Z", details: "Logout dari sistem" },
    ],
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    email: "emma.rodriguez@example.com",
    role: "editor",
    status: "inactive",
    avatar: null,
    lastLogin: "2023-07-10T16:45:00Z",
    registeredDate: "2022-08-15T14:20:00Z",
    permissions: {
      manageProducts: false,
      manageOrders: false,
      manageUsers: false,
      manageContent: true,
      viewReports: true,
    },
    activity: [
      { id: 1, action: "Login", timestamp: "2023-07-10T16:45:00Z", details: "Login dari Bandung, Indonesia" },
      {
        id: 2,
        action: "Add Article",
        timestamp: "2023-07-10T17:30:00Z",
        details: "Menambahkan artikel baru 'Eco-Friendly Packaging'",
      },
      {
        id: 3,
        action: "Edit Article",
        timestamp: "2023-07-10T18:15:00Z",
        details: "Mengedit artikel 'Plastic Alternatives'",
      },
      { id: 4, action: "Logout", timestamp: "2023-07-10T19:50:00Z", details: "Logout dari sistem" },
    ],
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@example.com",
    role: "customer",
    status: "active",
    avatar: null,
    lastLogin: "2023-07-12T20:30:00Z",
    registeredDate: "2023-01-05T08:45:00Z",
    permissions: {
      manageProducts: false,
      manageOrders: false,
      manageUsers: false,
      manageContent: false,
      viewReports: false,
    },
    activity: [
      { id: 1, action: "Login", timestamp: "2023-07-12T20:30:00Z", details: "Login dari Medan, Indonesia" },
      { id: 2, action: "Place Order", timestamp: "2023-07-12T20:45:00Z", details: "Membuat pesanan #2345" },
      { id: 3, action: "Update Profile", timestamp: "2023-07-12T21:10:00Z", details: "Memperbarui informasi profil" },
      { id: 4, action: "Logout", timestamp: "2023-07-12T21:30:00Z", details: "Logout dari sistem" },
    ],
  },
  {
    id: 5,
    name: "Olivia Taylor",
    email: "olivia.taylor@example.com",
    role: "support",
    status: "active",
    avatar: null,
    lastLogin: "2023-07-15T09:20:00Z",
    registeredDate: "2022-11-18T13:10:00Z",
    permissions: {
      manageProducts: false,
      manageOrders: true,
      manageUsers: false,
      manageContent: false,
      viewReports: true,
    },
    activity: [
      { id: 1, action: "Login", timestamp: "2023-07-15T09:20:00Z", details: "Login dari Yogyakarta, Indonesia" },
      { id: 2, action: "Update Order", timestamp: "2023-07-15T10:05:00Z", details: "Memperbarui status pesanan #2201" },
      {
        id: 3,
        action: "Customer Support",
        timestamp: "2023-07-15T11:30:00Z",
        details: "Menyelesaikan tiket dukungan #567",
      },
      { id: 4, action: "Update Order", timestamp: "2023-07-15T14:15:00Z", details: "Memperbarui status pesanan #2210" },
      { id: 5, action: "Logout", timestamp: "2023-07-15T17:45:00Z", details: "Logout dari sistem" },
    ],
  },
]

// Roles yang tersedia
const availableRoles = [
  { id: "admin", name: "Administrator", description: "Akses penuh ke semua fitur sistem" },
  { id: "manager", name: "Manager", description: "Mengelola produk, pesanan, dan konten" },
  { id: "editor", name: "Editor", description: "Mengelola konten dan artikel" },
  { id: "support", name: "Support", description: "Mengelola pesanan dan laporan" },
  { id: "customer", name: "Customer", description: "Akses terbatas untuk pelanggan" },
]

// Komponen Toggle Switch untuk permissions
const ToggleSwitch = ({ isOn, onToggle, label, disabled = false }) => {
  return (
    <div className="toggle-container">
      <span className="toggle-label">{label}</span>
      <button
        className={`toggle-switch ${isOn ? "on" : "off"} ${disabled ? "disabled" : ""}`}
        onClick={() => !disabled && onToggle()}
        disabled={disabled}
        aria-checked={isOn}
        role="switch"
      >
        <motion.div
          className="toggle-handle"
          animate={{ x: isOn ? 22 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  )
}

// Komponen EditableField untuk in-line editing
const EditableField = ({ value, onSave, validator, type = "text", options = [] }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const [error, setError] = useState("")
  const inputRef = useRef(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleEdit = () => {
    setEditValue(value)
    setIsEditing(true)
    setError("")
  }

  const handleChange = (e) => {
    const newValue = e.target.value
    setEditValue(newValue)

    if (validator) {
      const validationResult = validator(newValue)
      setError(validationResult || "")
    }
  }

  const handleSave = () => {
    if (!error) {
      onSave(editValue)
      setIsEditing(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !error) {
      handleSave()
    } else if (e.key === "Escape") {
      setIsEditing(false)
      setEditValue(value)
      setError("")
    }
  }

  const handleBlur = () => {
    if (!error) {
      handleSave()
    }
  }

  return (
    <div className="editable-field">
      {isEditing ? (
        <div className="edit-container">
          {type === "select" ? (
            <select
              ref={inputRef}
              value={editValue}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className={error ? "has-error" : ""}
            >
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              ref={inputRef}
              type={type}
              value={editValue}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className={error ? "has-error" : ""}
            />
          )}
          {error && <div className="error-message">{error}</div>}
        </div>
      ) : (
        <div className="display-container" onClick={handleEdit}>
          {type === "select" ? (
            <span>{options.find((option) => option.id === value)?.name || value}</span>
          ) : (
            <span>{value}</span>
          )}
          <button className="edit-button" onClick={handleEdit} aria-label="Edit">
            <i className="fas fa-pencil-alt"></i>
          </button>
        </div>
      )}
    </div>
  )
}

// Komponen RangeSlider untuk filter range
const RangeSlider = ({ min, max, value, onChange, label }) => {
  const [localValue, setLocalValue] = useState(value)
  const trackRef = useRef(null)

  const handleDrag = (e, info) => {
    if (trackRef.current) {
      const track = trackRef.current.getBoundingClientRect()
      const position = (info.point.x - track.left) / track.width
      const newValue = Math.round(min + position * (max - min))
      const clampedValue = Math.max(min, Math.min(max, newValue))
      setLocalValue(clampedValue)
    }
  }

  const handleDragEnd = () => {
    onChange(localValue)
  }

  return (
    <div className="range-slider">
      <div className="range-label">
        {label}: {localValue}
      </div>
      <div className="range-track" ref={trackRef}>
        <div className="range-fill" style={{ width: `${((localValue - min) / (max - min)) * 100}%` }}></div>
        <motion.div
          className="range-handle"
          drag="x"
          dragConstraints={trackRef}
          dragElastic={0}
          dragMomentum={false}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          style={{ left: `${((localValue - min) / (max - min)) * 100}%` }}
        />
      </div>
      <div className="range-values">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}

// Komponen ActivityTimeline untuk menampilkan aktivitas pengguna
const ActivityTimeline = ({ activities }) => {
  const [expandedActivity, setExpandedActivity] = useState(null)

  const toggleActivity = (activityId) => {
    setExpandedActivity(expandedActivity === activityId ? null : activityId)
  }

  // Kelompokkan aktivitas berdasarkan tanggal
  const groupedActivities = activities.reduce((groups, activity) => {
    const date = new Date(activity.timestamp).toLocaleDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(activity)
    return groups
  }, {})

  return (
    <div className="activity-timeline">
      {Object.entries(groupedActivities).map(([date, dateActivities]) => (
        <div key={date} className="timeline-day">
          <div className="timeline-date">{date}</div>
          <div className="timeline-activities">
            {dateActivities.map((activity) => (
              <motion.div
                key={activity.id}
                className={`timeline-activity ${expandedActivity === activity.id ? "expanded" : ""}`}
                onClick={() => toggleActivity(activity.id)}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="activity-time">
                  {new Date(activity.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
                <div className="activity-icon">
                  {activity.action === "Login" && <i className="fas fa-sign-in-alt"></i>}
                  {activity.action === "Logout" && <i className="fas fa-sign-out-alt"></i>}
                  {activity.action.includes("Edit") && <i className="fas fa-edit"></i>}
                  {activity.action.includes("Add") && <i className="fas fa-plus-circle"></i>}
                  {activity.action.includes("Update") && <i className="fas fa-sync-alt"></i>}
                  {activity.action.includes("Order") && <i className="fas fa-shopping-cart"></i>}
                  {activity.action.includes("Profile") && <i className="fas fa-user-edit"></i>}
                  {activity.action.includes("Support") && <i className="fas fa-headset"></i>}
                </div>
                <div className="activity-content">
                  <div className="activity-action">{activity.action}</div>
                  <AnimatePresence>
                    {expandedActivity === activity.id && (
                      <motion.div
                        className="activity-details"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {activity.details}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="activity-expand">
                  <i className={`fas fa-chevron-${expandedActivity === activity.id ? "up" : "down"}`}></i>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// Komponen utama ManageUsers
const ManageUsers = () => {
  const [users, setUsers] = useState(initialUsers)
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [filterLoginDays, setFilterLoginDays] = useState(30)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationMessage, setConfirmationMessage] = useState("")

  // Filter users berdasarkan kriteria
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = filterRole ? user.role === filterRole : true
    const matchesStatus = filterStatus ? user.status === filterStatus : true

    // Filter berdasarkan login terakhir
    const lastLoginDate = user.lastLogin ? new Date(user.lastLogin) : null
    const now = new Date()
    const daysDifference = lastLoginDate
      ? Math.floor((now - lastLoginDate) / (1000 * 60 * 60 * 24))
      : Number.POSITIVE_INFINITY

    const matchesLoginDays = daysDifference <= filterLoginDays

    return matchesSearch && matchesRole && matchesStatus && matchesLoginDays
  })

  // Handler untuk memilih user
  const handleSelectUser = (user) => {
    setSelectedUser(user)
  }

  // Handler untuk mengubah status user
  const handleStatusToggle = (userId) => {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          const newStatus = user.status === "active" ? "inactive" : "active"
          if (selectedUser && selectedUser.id === userId) {
            setSelectedUser({ ...selectedUser, status: newStatus })
          }
          return { ...user, status: newStatus }
        }
        return user
      }),
    )

    showConfirmationMessage("Status pengguna berhasil diperbarui")
  }

  // Handler untuk mengubah permission
  const handlePermissionToggle = (userId, permission) => {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          const updatedPermissions = {
            ...user.permissions,
            [permission]: !user.permissions[permission],
          }

          if (selectedUser && selectedUser.id === userId) {
            setSelectedUser({
              ...selectedUser,
              permissions: updatedPermissions,
            })
          }

          return {
            ...user,
            permissions: updatedPermissions,
          }
        }
        return user
      }),
    )

    showConfirmationMessage("Izin pengguna berhasil diperbarui")
  }

  // Handler untuk mengubah data user
  const handleUserDataChange = (userId, field, value) => {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          const updatedUser = { ...user, [field]: value }

          if (selectedUser && selectedUser.id === userId) {
            setSelectedUser(updatedUser)
          }

          return updatedUser
        }
        return user
      }),
    )

    showConfirmationMessage(`${field.charAt(0).toUpperCase() + field.slice(1)} pengguna berhasil diperbarui`)
  }

  // Validator untuk email
  const validateEmail = (email) => {
    if (!email) return "Email tidak boleh kosong"
    if (!/\S+@\S+\.\S+/.test(email)) return "Format email tidak valid"
    return ""
  }

  // Validator untuk nama
  const validateName = (name) => {
    if (!name) return "Nama tidak boleh kosong"
    if (name.length < 3) return "Nama minimal 3 karakter"
    return ""
  }

  // Menampilkan pesan konfirmasi
  const showConfirmationMessage = (message) => {
    setConfirmationMessage(message)
    setShowConfirmation(true)
    setTimeout(() => setShowConfirmation(false), 3000)
  }

  return (
    <div className="manage-users-container">
      <div className="admin-header">
        <h1>Kelola Pengguna</h1>
        <div className="admin-actions">
          <button className="action-button primary-button">
            <i className="fas fa-plus"></i> Tambah Pengguna
          </button>
        </div>
      </div>

      <div className="users-dashboard">
        <div className="users-sidebar">
          <div className="filter-section">
            <h3>Filter Pengguna</h3>

            <div className="search-box">
              <input
                type="text"
                placeholder="Cari pengguna..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fas fa-search"></i>
            </div>

            <div className="filter-group">
              <label>Role</label>
              <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                <option value="">Semua Role</option>
                {availableRoles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Status</label>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="">Semua Status</option>
                <option value="active">Aktif</option>
                <option value="inactive">Tidak Aktif</option>
              </select>
            </div>

            <div className="filter-group">
              <RangeSlider
                min={1}
                max={90}
                value={filterLoginDays}
                onChange={setFilterLoginDays}
                label="Login dalam (hari)"
              />
            </div>
          </div>

          <div className="users-list">
            <h3>Daftar Pengguna</h3>
            <div className="users-count">{filteredUsers.length} pengguna ditemukan</div>

            <div className="users-scroll">
              <AnimatePresence>
                {filteredUsers.map((user) => (
                  <motion.div
                    key={user.id}
                    className={`user-card ${selectedUser?.id === user.id ? "selected" : ""}`}
                    onClick={() => handleSelectUser(user)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <div className="user-avatar">
                      {user.avatar ? (
                        <img src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      ) : (
                        <div className="avatar-placeholder">{user.name.charAt(0)}</div>
                      )}
                      <div className={`status-indicator ${user.status}`}></div>
                    </div>

                    <div className="user-info">
                      <div className="user-name">{user.name}</div>
                      <div className="user-email">{user.email}</div>
                      <div className="user-role">
                        {availableRoles.find((role) => role.id === user.role)?.name || user.role}
                      </div>
                    </div>

                    <div className="user-actions">
                      <button
                        className={`status-toggle ${user.status}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleStatusToggle(user.id)
                        }}
                        aria-label={`Toggle status to ${user.status === "active" ? "inactive" : "active"}`}
                      >
                        <i className={`fas fa-${user.status === "active" ? "check" : "times"}`}></i>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredUsers.length === 0 && (
                <div className="no-users-found">
                  <i className="fas fa-user-slash"></i>
                  <p>Tidak ada pengguna yang ditemukan</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="user-details">
          {selectedUser ? (
            <div className="user-profile">
              <div className="profile-header">
                <div className="profile-avatar">
                  {selectedUser.avatar ? (
                    <img src={selectedUser.avatar || "/placeholder.svg"} alt={selectedUser.name} />
                  ) : (
                    <div className="avatar-placeholder large">{selectedUser.name.charAt(0)}</div>
                  )}
                </div>

                <div className="profile-info">
                  <h2>
                    <EditableField
                      value={selectedUser.name}
                      onSave={(value) => handleUserDataChange(selectedUser.id, "name", value)}
                      validator={validateName}
                    />
                  </h2>

                  <div className="profile-meta">
                    <div className="meta-item">
                      <i className="fas fa-envelope"></i>
                      <EditableField
                        value={selectedUser.email}
                        onSave={(value) => handleUserDataChange(selectedUser.id, "email", value)}
                        validator={validateEmail}
                        type="email"
                      />
                    </div>

                    <div className="meta-item">
                      <i className="fas fa-user-tag"></i>
                      <EditableField
                        value={selectedUser.role}
                        onSave={(value) => handleUserDataChange(selectedUser.id, "role", value)}
                        type="select"
                        options={availableRoles}
                      />
                    </div>

                    <div className="meta-item">
                      <i className="fas fa-calendar-alt"></i>
                      <span>Terdaftar: {new Date(selectedUser.registeredDate).toLocaleDateString()}</span>
                    </div>

                    <div className="meta-item">
                      <i className="fas fa-clock"></i>
                      <span>
                        Login terakhir:{" "}
                        {selectedUser.lastLogin
                          ? new Date(selectedUser.lastLogin).toLocaleString()
                          : "Belum pernah login"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="profile-status">
                  <div className={`status-badge ${selectedUser.status}`}>
                    {selectedUser.status === "active" ? "Aktif" : "Tidak Aktif"}
                  </div>
                </div>
              </div>

              <div className="profile-tabs">
                <div className="tab-navigation">
                  <button className="tab-button active">Izin Akses</button>
                  <button className="tab-button">Aktivitas</button>
                  <button className="tab-button">Pesanan</button>
                  <button className="tab-button">Keamanan</button>
                </div>

                <div className="tab-content">
                  <div className="permissions-section">
                    <h3>Izin Akses</h3>
                    <div className="permissions-grid">
                      <ToggleSwitch
                        isOn={selectedUser.permissions.manageProducts}
                        onToggle={() => handlePermissionToggle(selectedUser.id, "manageProducts")}
                        label="Kelola Produk"
                        disabled={selectedUser.role === "customer"}
                      />

                      <ToggleSwitch
                        isOn={selectedUser.permissions.manageOrders}
                        onToggle={() => handlePermissionToggle(selectedUser.id, "manageOrders")}
                        label="Kelola Pesanan"
                        disabled={selectedUser.role === "customer"}
                      />

                      <ToggleSwitch
                        isOn={selectedUser.permissions.manageUsers}
                        onToggle={() => handlePermissionToggle(selectedUser.id, "manageUsers")}
                        label="Kelola Pengguna"
                        disabled={selectedUser.role !== "admin"}
                      />

                      <ToggleSwitch
                        isOn={selectedUser.permissions.manageContent}
                        onToggle={() => handlePermissionToggle(selectedUser.id, "manageContent")}
                        label="Kelola Konten"
                        disabled={selectedUser.role === "customer"}
                      />

                      <ToggleSwitch
                        isOn={selectedUser.permissions.viewReports}
                        onToggle={() => handlePermissionToggle(selectedUser.id, "viewReports")}
                        label="Lihat Laporan"
                        disabled={selectedUser.role === "customer"}
                      />
                    </div>

                    <div className="permissions-note">
                      <i className="fas fa-info-circle"></i>
                      <p>
                        Beberapa izin mungkin dibatasi berdasarkan role pengguna. Ubah role untuk mengaktifkan lebih
                        banyak izin.
                      </p>
                    </div>
                  </div>

                  <div className="activity-section">
                    <h3>Riwayat Aktivitas</h3>
                    <ActivityTimeline activities={selectedUser.activity} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-user-selected">
              <div className="empty-state">
                <i className="fas fa-user-circle"></i>
                <h3>Pilih pengguna untuk melihat detail</h3>
                <p>Klik pada salah satu pengguna di daftar untuk melihat dan mengelola informasi mereka.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notifikasi konfirmasi */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            className="confirmation-notification"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <i className="fas fa-check-circle"></i>
            <span>{confirmationMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ManageUsers
