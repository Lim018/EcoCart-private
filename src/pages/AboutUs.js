"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import "../styles/AboutUs.css"
import { initParallaxEffects } from "../utils/parallax"

const AboutUs = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [carbonSaved, setCarbonSaved] = useState(0)
  const [expandedCard, setExpandedCard] = useState(null)
  const [isVisible, setIsVisible] = useState({})
  const timelineRef = useRef(null)
  const counterRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  // Timeline data
  const timelineData = [
    {
      year: 2018,
      title: "Awal Mula",
      description: "EcoCart didirikan dengan visi sederhana: membuat belanja online lebih ramah lingkungan.",
      image: "/eco-friendly-oral-care.png",
    },
    {
      year: 2019,
      title: "Peluncuran Platform",
      description: "Peluncuran platform e-commerce pertama kami yang berfokus pada produk ramah lingkungan.",
      image: "/folded-organic-tee.png",
    },
    {
      year: 2020,
      title: "Ekspansi Produk",
      description: "Memperluas katalog produk untuk mencakup lebih banyak kategori ramah lingkungan.",
      image: "/colorful-produce-bags.png",
    },
    {
      year: 2021,
      title: "Sertifikasi Karbon Netral",
      description: "Mencapai sertifikasi karbon netral untuk seluruh operasi perusahaan.",
      image: "/portable-solar-charging.png",
    },
    {
      year: 2022,
      title: "Kemitraan Global",
      description: "Membangun kemitraan dengan organisasi lingkungan global untuk memperluas dampak.",
      image: "/emerald-canopy.png",
    },
    {
      year: 2023,
      title: "Inovasi Berkelanjutan",
      description: "Meluncurkan inisiatif penelitian untuk material berkelanjutan generasi berikutnya.",
      image: "/interconnected-eco-production.png",
    },
  ]

  // Team data
  const teamData = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Visioner lingkungan dengan latar belakang di teknologi dan keberlanjutan. Sarah mendirikan EcoCart untuk mengatasi masalah limbah e-commerce.",
      image: "/thoughtful-gaze.png",
      quote: "Keberlanjutan bukanlah pilihan, tetapi keharusan untuk masa depan kita.",
    },
    {
      name: "David Chen",
      role: "Chief Sustainability Officer",
      bio: "Ahli ekologi dengan pengalaman 15 tahun dalam pengembangan produk berkelanjutan dan inisiatif karbon netral.",
      image: "/serene-gaze.png",
      quote: "Setiap produk yang kita buat adalah kesempatan untuk membuat dunia lebih baik.",
    },
    {
      name: "Amina Patel",
      role: "Head of Product",
      bio: "Spesialis produk dengan fokus pada desain ramah lingkungan dan pengalaman pengguna yang intuitif.",
      image: "/thoughtful-gaze.png",
      quote: "Desain yang baik harus mempertimbangkan dampaknya terhadap planet ini.",
    },
    {
      name: "Michael Rodriguez",
      role: "Supply Chain Director",
      bio: "Ahli rantai pasok yang berspesialisasi dalam praktik pengadaan etis dan logistik rendah karbon.",
      image: "/serene-gaze.png",
      quote: "Rantai pasok yang transparan adalah kunci untuk bisnis yang benar-benar berkelanjutan.",
    },
  ]

  // Value cards data
  const valueCards = [
    {
      title: "Keberlanjutan",
      icon: "🌱",
      shortDesc: "Komitmen kami terhadap praktik bisnis yang berkelanjutan.",
      longDesc:
        "Kami berkomitmen untuk mengurangi jejak karbon dalam setiap aspek bisnis kami. Dari pengadaan bahan baku hingga pengiriman produk, kami selalu mencari cara untuk meminimalkan dampak lingkungan. Kami bekerja dengan pemasok yang memiliki nilai-nilai serupa dan terus mengevaluasi proses kami untuk perbaikan berkelanjutan.",
    },
    {
      title: "Transparansi",
      icon: "🔍",
      shortDesc: "Keterbukaan dalam setiap aspek operasi kami.",
      longDesc:
        "Kami percaya bahwa konsumen berhak mengetahui dari mana produk mereka berasal dan bagaimana produk tersebut dibuat. Kami menyediakan informasi terperinci tentang rantai pasok kami, praktik manufaktur, dan dampak lingkungan dari setiap produk. Laporan keberlanjutan tahunan kami tersedia untuk umum, dan kami selalu terbuka untuk umpan balik dan pertanyaan.",
    },
    {
      title: "Inovasi",
      icon: "💡",
      shortDesc: "Mendorong solusi baru untuk tantangan lingkungan.",
      longDesc:
        "Inovasi adalah jantung dari apa yang kami lakukan. Kami terus meneliti dan mengembangkan material baru, proses produksi, dan model bisnis yang dapat mengurangi dampak lingkungan sambil meningkatkan pengalaman pelanggan. Tim R&D kami bekerja sama dengan universitas dan lembaga penelitian terkemuka untuk mengembangkan teknologi berkelanjutan generasi berikutnya.",
    },
    {
      title: "Komunitas",
      icon: "👥",
      shortDesc: "Membangun jaringan individu dan bisnis yang peduli.",
      longDesc:
        "Kami percaya bahwa perubahan nyata terjadi melalui tindakan kolektif. Kami aktif membangun komunitas pelanggan, mitra, dan karyawan yang peduli tentang keberlanjutan. Melalui program pendidikan, acara, dan platform online kami, kami memberdayakan orang untuk membuat pilihan yang lebih berkelanjutan dalam kehidupan sehari-hari mereka dan menyebarkan pesan tentang pentingnya konsumsi yang bertanggung jawab.",
    },
  ]

  // Testimonials data
  const testimonials = [
    {
      name: "Jessica T.",
      role: "Pelanggan Setia",
      quote:
        "EcoCart telah mengubah cara saya berbelanja. Saya sekarang dapat membuat pilihan yang lebih baik untuk planet ini tanpa mengorbankan kualitas.",
      image: "/thoughtful-gaze.png",
    },
    {
      name: "Marcus L.",
      role: "Mitra Bisnis",
      quote:
        "Bermitra dengan EcoCart adalah salah satu keputusan terbaik yang kami buat. Komitmen mereka terhadap keberlanjutan sejalan dengan nilai-nilai kami.",
      image: "/serene-gaze.png",
    },
    {
      name: "Sophia R.",
      role: "Aktivis Lingkungan",
      quote:
        "EcoCart adalah contoh bagaimana bisnis dapat menjadi kekuatan untuk kebaikan. Model mereka menunjukkan bahwa profitabilitas dan keberlanjutan dapat berjalan beriringan.",
      image: "/thoughtful-gaze.png",
    },
  ]

  // Impact data
  const impactData = {
    initialCarbon: 25000,
    incrementRate: 0.5, // kg per second
    trees: 45000,
    projects: 12,
    partners: 28,
  }

  // Handle intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }))
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll(".observe-me").forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Handle parallax effect
  useEffect(() => {
    if (timelineRef.current) {
      const parallaxElements = Array.from(timelineRef.current.querySelectorAll(".parallax-item"))
      const parallaxSpeeds = parallaxElements.map(() => Math.random() * 0.3 + 0.1)

      const cleanup = initParallaxEffects(parallaxElements, parallaxSpeeds)
      return cleanup
    }
  }, [])

  // Handle carbon counter
  useEffect(() => {
    const interval = setInterval(() => {
      setCarbonSaved((prev) => {
        const newValue = prev + impactData.incrementRate
        return Number.parseFloat(newValue.toFixed(1))
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  // Handle card expansion
  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index)
  }

  return (
    <div className="about-us-container">
      {/* Hero Section with Parallax */}
      <motion.section
        className="hero-section"
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content">
          <h1>Tentang EcoCart</h1>
          <p>Memimpin revolusi e-commerce berkelanjutan</p>
        </div>
      </motion.section>

      {/* Mission Statement */}
      <section className="mission-section observe-me" id="mission">
        <motion.div
          className="mission-content"
          initial={{ y: 50, opacity: 0 }}
          animate={isVisible["mission"] ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2>Misi Kami</h2>
          <p>
            Di EcoCart, kami berkomitmen untuk mengubah cara dunia berbelanja online. Kami percaya bahwa setiap
            pembelian adalah kesempatan untuk membuat dampak positif pada planet kita. Melalui produk berkelanjutan,
            praktik bisnis yang bertanggung jawab, dan edukasi konsumen, kami bekerja untuk menciptakan masa depan di
            mana e-commerce dan keberlanjutan berjalan beriringan.
          </p>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section observe-me" id="timeline" ref={timelineRef}>
        <h2>Perjalanan Kami</h2>
        <div className="timeline">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              className={`timeline-item parallax-item ${index % 2 === 0 ? "left" : "right"}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isVisible["timeline"] ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="timeline-content">
                <div className="timeline-year">{item.year}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="timeline-image-container">
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="timeline-image" />
                </div>
              </div>
            </motion.div>
          ))}
          <div className="timeline-line"></div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section observe-me" id="values">
        <h2>Nilai-Nilai Kami</h2>
        <div className="values-container">
          {valueCards.map((card, index) => (
            <motion.div
              key={index}
              className={`value-card ${expandedCard === index ? "expanded" : ""}`}
              onClick={() => toggleCard(index)}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible["values"] ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: expandedCard === null ? 1.05 : 1 }}
            >
              <div className="value-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <AnimatePresence>
                {expandedCard === index ? (
                  <motion.div
                    className="value-long-desc"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{card.longDesc}</p>
                  </motion.div>
                ) : (
                  <p className="value-short-desc">{card.shortDesc}</p>
                )}
              </AnimatePresence>
              <div className="expand-indicator">
                {expandedCard === index ? "Klik untuk menutup" : "Klik untuk detail"}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Impact Counter Section */}
      <section className="impact-section observe-me" id="impact" ref={counterRef}>
        <h2>Dampak Kami</h2>
        <div className="impact-counter-container">
          <motion.div
            className="impact-counter"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isVisible["impact"] ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="counter-value">{carbonSaved.toLocaleString()}</div>
            <div className="counter-label">kg Karbon Diselamatkan</div>
          </motion.div>
          <div className="impact-stats">
            <div className="stat-item">
              <div className="stat-value">{impactData.trees.toLocaleString()}</div>
              <div className="stat-label">Pohon Ditanam</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{impactData.projects}</div>
              <div className="stat-label">Proyek Lingkungan</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{impactData.partners}</div>
              <div className="stat-label">Mitra Keberlanjutan</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section observe-me" id="team">
        <h2>Tim Kami</h2>
        <div className="team-gallery">
          {teamData.map((member, index) => (
            <motion.div
              key={index}
              className="team-member"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible["team"] ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="member-image-container">
                <img src={member.image || "/placeholder.svg"} alt={member.name} className="member-image" />
                <div className="member-quote">
                  <p>"{member.quote}"</p>
                </div>
              </div>
              <h3>{member.name}</h3>
              <div className="member-role">{member.role}</div>
              <p className="member-bio">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section observe-me" id="testimonials">
        <h2>Apa Kata Mereka</h2>
        <div className="testimonial-slider">
          <div className="testimonial-track" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-slide">
                <div className="testimonial-content">
                  <div className="testimonial-quote">"{testimonial.quote}"</div>
                  <div className="testimonial-author">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="testimonial-image"
                    />
                    <div>
                      <div className="testimonial-name">{testimonial.name}</div>
                      <div className="testimonial-role">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonial-indicators">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`indicator ${activeTestimonial === index ? "active" : ""}`}
                onClick={() => setActiveTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section observe-me" id="cta">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible["cta"] ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2>Bergabunglah dengan Misi Kami</h2>
          <p>
            Bersama-sama, kita dapat menciptakan masa depan yang lebih berkelanjutan melalui pilihan belanja yang
            bertanggung jawab.
          </p>
          <div className="cta-buttons">
            <button className="primary-button">Jelajahi Produk</button>
            <button className="secondary-button">Pelajari Lebih Lanjut</button>
          </div>
        </motion.div>
      </section>

      {/* Dark Mode Toggle */}
      <button className="dark-mode-toggle">
        <span className="toggle-icon">🌓</span>
        <span className="toggle-text">Toggle Dark Mode</span>
      </button>
    </div>
  )
}

export default AboutUs
