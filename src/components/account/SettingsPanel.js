"use client"

import { useState } from "react"
import { Bell, Lock, Sun, Globe, Save, RefreshCw } from "react-feather"
import "../../styles/SettingsPanel.css"

const SettingsPanel = ({ userSettings, onSaveSettings }) => {
  const [settings, setSettings] = useState(
    userSettings || {
      notifications: {
        orderUpdates: true,
        promotions: false,
        productRecommendations: true,
        sustainabilityTips: true,
        newsletter: false,
      },
      privacy: {
        shareActivityData: true,
        allowPersonalization: true,
        allowCookies: true,
      },
      appearance: {
        theme: "light",
        compactView: false,
        highContrast: false,
      },
      language: "id",
      currency: "IDR",
    },
  )

  const [isModified, setIsModified] = useState(false)

  // Handle toggle change
  const handleToggleChange = (category, setting) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [setting]: !settings[category][setting],
      },
    })
    setIsModified(true)
  }

  // Handle select change
  const handleSelectChange = (field, value) => {
    setSettings({
      ...settings,
      [field]: value,
    })
    setIsModified(true)
  }

  // Save settings
  const saveSettings = () => {
    if (onSaveSettings) {
      onSaveSettings(settings)
    }
    setIsModified(false)

    // Tampilkan notifikasi sukses
    alert("Pengaturan berhasil disimpan!")
  }

  // Reset settings
  const resetSettings = () => {
    setSettings(userSettings)
    setIsModified(false)
  }

  return (
    <div className="settings-panel">
      <div className="settings-header">
        <h2>Pengaturan</h2>
        <p>Sesuaikan preferensi akun Anda</p>
      </div>

      <div className="settings-sections">
        <div className="settings-section">
          <h3>
            <Bell size={18} /> Notifikasi
          </h3>
          <div className="settings-options">
            <div className="setting-item">
              <div className="setting-info">
                <label htmlFor="orderUpdates">Update Pesanan</label>
                <p>Dapatkan notifikasi tentang status pesanan Anda</p>
              </div>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="orderUpdates"
                  checked={settings.notifications.orderUpdates}
                  onChange={() => handleToggleChange("notifications", "orderUpdates")}
                />
                <label htmlFor="orderUpdates" className="toggle-label">
                  <span className="toggle-button"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label htmlFor="promotions">Promosi & Diskon</label>
                <p>Dapatkan informasi tentang penawaran khusus dan diskon</p>
              </div>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="promotions"
                  checked={settings.notifications.promotions}
                  onChange={() => handleToggleChange("notifications", "promotions")}
                />
                <label htmlFor="promotions" className="toggle-label">
                  <span className="toggle-button"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label htmlFor="productRecommendations">Rekomendasi Produk</label>
                <p>Dapatkan rekomendasi produk berdasarkan preferensi Anda</p>
              </div>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="productRecommendations"
                  checked={settings.notifications.productRecommendations}
                  onChange={() => handleToggleChange("notifications", "productRecommendations")}
                />
                <label htmlFor="productRecommendations" className="toggle-label">
                  <span className="toggle-button"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label htmlFor="sustainabilityTips">Tips Keberlanjutan</label>
                <p>Dapatkan tips dan trik untuk gaya hidup yang lebih berkelanjutan</p>
              </div>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="sustainabilityTips"
                  checked={settings.notifications.sustainabilityTips}
                  onChange={() => handleToggleChange("notifications", "sustainabilityTips")}
                />
                <label htmlFor="sustainabilityTips" className="toggle-label">
                  <span className="toggle-button"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label htmlFor="newsletter">Newsletter</label>
                <p>Berlangganan newsletter bulanan kami</p>
              </div>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={settings.notifications.newsletter}
                  onChange={() => handleToggleChange("notifications", "newsletter")}
                />
                <label htmlFor="newsletter" className="toggle-label">
                  <span className="toggle-button"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>
            <Lock size={18} /> Privasi
          </h3>
          <div className="settings-options">
            <div className="setting-item">
              <div className="setting-info">
                <label htmlFor="shareActivityData">Bagikan Data Aktivitas</label>
                <p>Izinkan kami menggunakan data aktivitas Anda untuk meningkatkan layanan</p>
              </div>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="shareActivityData"
                  checked={settings.privacy.shareActivityData}
                  onChange={() => handleToggleChange("privacy", "shareActivityData")}
                />
                <label htmlFor="shareActivityData" className="toggle-label">
                  <span className="toggle-button"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label htmlFor="allowPersonalization">Izinkan Personalisasi</label>
                <p>Izinkan kami mempersonalisasi pengalaman belanja Anda</p>
              </div>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="allowPersonalization"
                  checked={settings.privacy.allowPersonalization}
                  onChange={() => handleToggleChange("privacy", "allowPersonalization")}
                />
                <label htmlFor="allowPersonalization" className="toggle-label">
                  <span className="toggle-button"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label htmlFor="allowCookies">Izinkan Cookies</label>
                <p>Izinkan kami menggunakan cookies untuk meningkatkan pengalaman Anda</p>
              </div>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="allowCookies"
                  checked={settings.privacy.allowCookies}
                  onChange={() => handleToggleChange("privacy", "allowCookies")}
                />
                <label htmlFor="allowCookies" className="toggle-label">
                  <span className="toggle-button"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>
            <Sun size={18} /> Tampilan
          </h3>
          <div className="settings-options">
            <div className="setting-item">
              <div className="setting-info">
                <label htmlFor="theme">Tema</label>
                <p>Pilih tema tampilan yang Anda sukai</p>
              </div>
              <div className="toggle-switch theme-toggle">
                <input
                  type="checkbox"
                  id="theme"
                  checked={settings.appearance.theme === "dark"}
                  onChange={() =>
                    handleSelectChange("appearance", {
                      ...settings.appearance,
                      theme: settings.appearance.theme === "light" ? "dark" : "light",
                    })
                  }
                />
                <label htmlFor="theme" className="toggle-label">
                  <span className="toggle-icon light">☀️</span>
                  <span className="toggle-icon dark">🌙</span>
                  <span className="toggle-button"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label htmlFor="compactView">Tampilan Kompak</label>
                <p>Tampilkan lebih banyak konten dalam satu layar</p>
              </div>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="compactView"
                  checked={settings.appearance.compactView}
                  onChange={() => handleToggleChange("appearance", "compactView")}
                />
                <label htmlFor="compactView" className="toggle-label">
                  <span className="toggle-button"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label htmlFor="highContrast">Kontras Tinggi</label>
                <p>Tingkatkan kontras untuk keterbacaan yang lebih baik</p>
              </div>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="highContrast"
                  checked={settings.appearance.highContrast}
                  onChange={() => handleToggleChange("appearance", "highContrast")}
                />
                <label htmlFor="highContrast" className="toggle-label">
                  <span className="toggle-button"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>
            <Globe size={18} /> Bahasa & Mata Uang
          </h3>
          <div className="settings-options">
            <div className="setting-item">
              <div className="setting-info">
                <label htmlFor="language">Bahasa</label>
                <p>Pilih bahasa yang Anda inginkan</p>
              </div>
              <div className="select-container">
                <select
                  id="language"
                  className="settings-select"
                  value={settings.language}
                  onChange={(e) => handleSelectChange("language", e.target.value)}
                >
                  <option value="id">Bahasa Indonesia</option>
                  <option value="en">English</option>
                  <option value="zh">中文</option>
                  <option value="ja">日本語</option>
                </select>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label htmlFor="currency">Mata Uang</label>
                <p>Pilih mata uang yang Anda inginkan</p>
              </div>
              <div className="select-container">
                <select
                  id="currency"
                  className="settings-select"
                  value={settings.currency}
                  onChange={(e) => handleSelectChange("currency", e.target.value)}
                >
                  <option value="IDR">Rupiah (IDR)</option>
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="SGD">Singapore Dollar (SGD)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button className="reset-settings-btn" onClick={resetSettings} disabled={!isModified}>
          <RefreshCw size={16} />
          Reset
        </button>
        <button className="save-settings-btn" onClick={saveSettings} disabled={!isModified}>
          <Save size={16} />
          Simpan Pengaturan
        </button>
      </div>
    </div>
  )
}

export default SettingsPanel
