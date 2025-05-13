"use client"

import { useState } from "react"
import "../styles/FAQAccordion.css"

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const faqs = [
    {
      question: "Bagaimana cara melakukan pemesanan di EcoCart?",
      answer:
        'Untuk melakukan pemesanan di EcoCart, Anda dapat mengikuti langkah-langkah berikut: Pilih produk yang ingin Anda beli, tambahkan ke keranjang, lalu klik "Checkout". Isi informasi pengiriman dan pembayaran, lalu konfirmasi pesanan Anda. Anda akan menerima email konfirmasi setelah pesanan berhasil dibuat.',
    },
    {
      question: "Berapa lama waktu pengiriman produk?",
      answer:
        'Waktu pengiriman produk EcoCart bervariasi tergantung lokasi Anda. Untuk pengiriman dalam kota biasanya membutuhkan waktu 1-2 hari kerja. Untuk pengiriman antar kota di Pulau Jawa membutuhkan waktu 2-4 hari kerja, sedangkan untuk luar Pulau Jawa membutuhkan waktu 4-7 hari kerja. Anda dapat melacak status pengiriman melalui halaman "Riwayat Transaksi".',
    },
    {
      question: "Apakah produk EcoCart ramah lingkungan?",
      answer:
        "Ya, semua produk EcoCart dirancang dengan mempertimbangkan dampak lingkungan. Kami menggunakan bahan-bahan yang berkelanjutan, kemasan yang dapat didaur ulang atau terurai secara alami, dan proses produksi yang meminimalkan jejak karbon. Setiap produk memiliki label yang menunjukkan sertifikasi dan dampak lingkungan yang telah dikurangi.",
    },
    {
      question: "Bagaimana kebijakan pengembalian produk?",
      answer:
        "EcoCart menerima pengembalian produk dalam waktu 14 hari setelah penerimaan jika produk dalam kondisi asli dan belum digunakan. Untuk memulai proses pengembalian, silakan hubungi tim layanan pelanggan kami melalui email di returns@ecocart.id atau melalui formulir kontak di website kami. Biaya pengiriman untuk pengembalian ditanggung oleh pelanggan kecuali jika produk cacat atau salah kirim.",
    },
    {
      question: "Apakah EcoCart menyediakan layanan konsultasi?",
      answer:
        'Ya, EcoCart menyediakan layanan konsultasi untuk membantu Anda memilih produk ramah lingkungan yang sesuai dengan kebutuhan Anda. Anda dapat menjadwalkan sesi konsultasi dengan tim ahli kami melalui halaman "Jadwalkan Konsultasi" di website kami. Konsultasi ini gratis dan dapat dilakukan secara online atau di kantor kami.',
    },
  ]

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="faq-container">
      {faqs.map((faq, index) => (
        <div key={index} className={`faq-item ${activeIndex === index ? "active" : ""}`}>
          <div className="faq-question" onClick={() => toggleAccordion(index)}>
            <span>{faq.question}</span>
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
              className="faq-icon"
            >
              {activeIndex === index ? (
                <line x1="5" y1="12" x2="19" y2="12"></line>
              ) : (
                <>
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </>
              )}
            </svg>
          </div>
          <div className="faq-answer">
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FAQAccordion
