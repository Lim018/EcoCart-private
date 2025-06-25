"use client"

import { useState, useEffect } from "react"
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from "@dnd-kit/core"
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { motion, AnimatePresence } from "framer-motion"
import "../styles/ManageArticles.css"
import AdminLayout from "../components/AdminLayout"

// Data contoh untuk artikel
const initialArticles = [
  {
    id: 1,
    title: "Dampak Fast Fashion terhadap Lingkungan Kita",
    slug: "dampak-fast-fashion-lingkungan",
    excerpt:
      "Mengeksplorasi bagaimana industri fast fashion berkontribusi terhadap degradasi lingkungan dan apa yang dapat dilakukan konsumen.",
    content: `
      <h2>Biaya Lingkungan dari Fast Fashion</h2>
      <p>Industri fashion adalah salah satu pencemar terbesar di dunia. Fast fashion, yang ditandai dengan siklus produksi cepat dan pakaian berbiaya rendah, telah memperburuk masalah ini.</p>
      <p>Menurut studi terbaru, industri fashion bertanggung jawab atas 10% emisi karbon global, menjadikannya salah satu industri paling mencemari di seluruh dunia.</p>
      <img src="/circular-fashion-cycle.png" alt="Siklus Fashion Sirkular" />
      <h2>Polusi dan Konsumsi Air</h2>
      <p>Pewarnaan tekstil adalah pencemar air terbesar kedua secara global. Proses ini membutuhkan banyak air, dan banyak pabrik membuang air limbah yang tidak diolah ke sungai.</p>
      <p>Dibutuhkan sekitar 2.000 galon air untuk memproduksi satu celana jeans. Ini setara dengan jumlah air yang diminum satu orang selama periode 7 tahun.</p>
      <h2>Alternatif Berkelanjutan</h2>
      <p>Konsumen dapat membuat perbedaan dengan memilih opsi fashion berkelanjutan. Ini termasuk membeli dari merek etis, membeli pakaian bekas, dan memperpanjang umur pakaian melalui perawatan yang tepat.</p>
      <p>Banyak perusahaan inovatif sekarang mengembangkan kain ramah lingkungan dan menerapkan model bisnis sirkular untuk mengurangi limbah dan dampak lingkungan.</p>
    `,
    author: "Emma Rodriguez",
    category: "sustainability",
    tags: ["fashion", "lingkungan", "keberlanjutan"],
    featuredImage: "/circular-fashion-cycle.png",
    status: "published",
    publishDate: "2023-05-15T10:00:00Z",
    lastModified: "2023-05-20T14:30:00Z",
  },
  {
    id: 2,
    title: "Hidup Zero Waste: Panduan untuk Pemula",
    slug: "hidup-zero-waste-panduan-pemula",
    excerpt:
      "Langkah-langkah sederhana untuk mengurangi limbah dalam kehidupan sehari-hari dan bergerak menuju gaya hidup yang lebih berkelanjutan.",
    content: `
      <h2>Memahami Zero Waste</h2>
      <p>Hidup zero waste adalah tentang mengurangi jumlah sampah yang kita kirim ke tempat pembuangan sampah dengan membuat pilihan sadar tentang apa yang kita beli dan bagaimana kita membuang barang.</p>
      <p>Konsep ini mengikuti hierarki: Tolak, Kurangi, Gunakan Kembali, Daur Ulang, dan Kompos.</p>
      <img src="/backyard-compost-system.png" alt="Sistem Kompos Halaman Belakang" />
      <h2>Memulai</h2>
      <p>Mulailah dengan penggantian sederhana seperti menggunakan tas belanja yang dapat digunakan kembali, botol air, dan cangkir kopi. Perubahan kecil ini dapat secara signifikan mengurangi limbah plastik Anda.</p>
      <p>Selanjutnya, pertimbangkan kemasan makanan Anda. Belanja di toko curah dengan wadah Anda sendiri dan beli produk segar tanpa kemasan bila memungkinkan.</p>
      <h2>Melampaui Dasar-dasar</h2>
      <p>Seiring kemajuan Anda, lihat area lain di rumah Anda. Ganti barang sekali pakai dengan alternatif yang dapat digunakan kembali, seperti serbet kain, pembungkus lilin lebah, dan pisau cukur keselamatan.</p>
      <p>Ingat, zero waste adalah perjalanan, bukan tujuan. Fokus pada kemajuan, bukan kesempurnaan.</p>
    `,
    author: "Michael Chang",
    category: "lifestyle",
    tags: ["zero-waste", "keberlanjutan", "gaya-hidup"],
    featuredImage: "/backyard-compost-system.png",
    status: "published",
    publishDate: "2023-06-10T09:15:00Z",
    lastModified: "2023-06-12T11:45:00Z",
  },
  {
    id: 3,
    title: "Memahami Jejak Karbon",
    slug: "memahami-jejak-karbon",
    excerpt: "Apa itu jejak karbon, bagaimana cara menghitungnya, dan mengapa penting untuk masa depan planet kita.",
    content: `
      <h2>Apa itu Jejak Karbon?</h2>
      <p>Jejak karbon adalah jumlah total gas rumah kaca (termasuk karbon dioksida dan metana) yang dihasilkan oleh tindakan kita.</p>
      <p>Jejak karbon rata-rata untuk seseorang di Amerika Serikat adalah 16 ton, salah satu tingkat tertinggi di dunia.</p>
      <img src="/global-carbon-cycle.png" alt="Siklus Karbon Global" />
      <h2>Menghitung Dampak Anda</h2>
      <p>Jejak karbon dapat diukur dengan melakukan penilaian emisi gas rumah kaca. Berbagai kalkulator online dapat membantu individu menentukan jejak karbon mereka.</p>
      <p>Kontributor utama jejak karbon individu termasuk transportasi, perumahan, dan makanan.</p>
      <h2>Mengurangi Jejak Anda</h2>
      <p>Ada banyak cara untuk mengurangi jejak karbon Anda, seperti menggunakan transportasi umum, makan makanan yang bersumber lokal, dan meningkatkan efisiensi energi rumah.</p>
      <p>Offset karbon juga dapat dibeli untuk menyeimbangkan emisi yang tidak dapat dihilangkan.</p>
    `,
    author: "Dr. James Wilson",
    category: "climate",
    tags: ["jejak-karbon", "perubahan-iklim", "keberlanjutan"],
    featuredImage: "/global-carbon-cycle.png",
    status: "draft",
    publishDate: null,
    lastModified: "2023-07-05T16:20:00Z",
  },
  {
    id: 4,
    title: "Alternatif Plastik untuk Barang Sehari-hari",
    slug: "alternatif-plastik-barang-sehari-hari",
    excerpt:
      "Temukan alternatif ramah lingkungan untuk produk plastik umum yang dapat membantu mengurangi dampak lingkungan Anda.",
    content: `
      <h2>Masalah Plastik</h2>
      <p>Polusi plastik adalah salah satu masalah lingkungan yang paling mendesak saat ini. Setiap tahun, jutaan ton plastik berakhir di lautan kita, membahayakan kehidupan laut dan ekosistem.</p>
      <p>Plastik sekali pakai, khususnya, berkontribusi secara signifikan terhadap masalah ini karena umur pendeknya dan tingkat daur ulang yang buruk.</p>
      <img src="/cascading-plastic-alternatives.png" alt="Alternatif Plastik" />
      <h2>Alternatif Dapur</h2>
      <p>Di dapur, pertimbangkan untuk menggunakan pembungkus lilin lebah alih-alih plastik pembungkus, wadah stainless steel atau kaca alih-alih plastik, dan peralatan bambu alih-alih peralatan plastik.</p>
      <p>Untuk belanja bahan makanan, bawa tas kain Anda sendiri, kantong produk, dan wadah untuk barang curah.</p>
      <h2>Alternatif Kamar Mandi</h2>
      <p>Di kamar mandi, beralih ke sikat gigi bambu, sabun batang alih-alih sabun cair dalam botol plastik, dan sampo dan kondisioner padat.</p>
      <p>Produk menstruasi juga memiliki alternatif ramah lingkungan, seperti cangkir menstruasi, pembalut kain, dan celana dalam periode.</p>
    `,
    author: "Sophia Lee",
    category: "lifestyle",
    tags: ["bebas-plastik", "keberlanjutan", "ramah-lingkungan"],
    featuredImage: "/cascading-plastic-alternatives.png",
    status: "scheduled",
    publishDate: "2023-08-20T08:00:00Z",
    lastModified: "2023-07-25T13:10:00Z",
  },
  {
    id: 5,
    title: "Kebangkitan Merek Fashion Berkelanjutan",
    slug: "kebangkitan-merek-fashion-berkelanjutan",
    excerpt:
      "Bagaimana merek fashion inovatif memimpin jalan dalam keberlanjutan dan mengubah industri menjadi lebih baik.",
    content: `
      <h2>Pergeseran dalam Industri Fashion</h2>
      <p>Dalam beberapa tahun terakhir, telah terjadi pergeseran signifikan dalam industri fashion menuju praktik yang lebih berkelanjutan. Perubahan ini didorong oleh permintaan konsumen dan kesadaran yang berkembang tentang masalah lingkungan.</p>
      <p>Merek fashion berkelanjutan berfokus pada produksi etis, praktik tenaga kerja yang adil, dan bahan ramah lingkungan.</p>
      <img src="/interconnected-eco-production.png" alt="Produksi Ramah Lingkungan" />
      <h2>Bahan Inovatif</h2>
      <p>Banyak merek berkelanjutan bereksperimen dengan bahan inovatif, seperti kain yang terbuat dari botol plastik daur ulang, limbah pertanian, dan bahkan jamur.</p>
      <p>Bahan-bahan ini tidak hanya mengurangi limbah tetapi sering kali memiliki jejak karbon yang lebih rendah dibandingkan dengan kain konvensional.</p>
      <h2>Transparansi dan Keterlacakan</h2>
      <p>Aspek kunci dari fashion berkelanjutan adalah transparansi. Merek semakin berbagi informasi tentang rantai pasokan mereka, memungkinkan konsumen untuk membuat pilihan yang lebih terinformasi.</p>
      <p>Beberapa perusahaan bahkan menggunakan teknologi blockchain untuk memberikan keterlacakan lengkap dari bahan baku hingga produk jadi.</p>
    `,
    author: "Emma Rodriguez",
    category: "fashion",
    tags: ["fashion", "keberlanjutan", "merek-etis"],
    featuredImage: "/interconnected-eco-production.png",
    status: "published",
    publishDate: "2023-07-08T11:30:00Z",
    lastModified: "2023-07-10T09:45:00Z",
  },
]

// Kategori artikel yang tersedia
const categories = [
  { id: "sustainability", name: "Keberlanjutan" },
  { id: "lifestyle", name: "Gaya Hidup" },
  { id: "climate", name: "Iklim" },
  { id: "fashion", name: "Fashion" },
  { id: "technology", name: "Teknologi" },
  { id: "food", name: "Makanan & Nutrisi" },
]

// Tag yang tersedia untuk autocomplete
const availableTags = [
  "keberlanjutan",
  "lingkungan",
  "ramah-lingkungan",
  "zero-waste",
  "bebas-plastik",
  "perubahan-iklim",
  "jejak-karbon",
  "energi-terbarukan",
  "fashion",
  "merek-etis",
  "slow-fashion",
  "minimalisme",
  "gaya-hidup",
  "kesehatan",
  "kesejahteraan",
  "organik",
  "vegan",
  "teknologi",
  "inovasi",
  "teknologi-hijau",
  "tenaga-surya",
  "daur-ulang",
  "makanan",
  "nabati",
  "lokal",
  "musiman",
  "fair-trade",
]

// Item perpustakaan media
const initialMediaItems = [
  {
    id: 1,
    name: "Siklus Fashion Sirkular",
    type: "image",
    url: "/circular-fashion-cycle.png",
    uploadDate: "2023-05-10T09:30:00Z",
  },
  {
    id: 2,
    name: "Sistem Kompos Halaman Belakang",
    type: "image",
    url: "/backyard-compost-system.png",
    uploadDate: "2023-06-05T14:20:00Z",
  },
  {
    id: 3,
    name: "Siklus Karbon Global",
    type: "image",
    url: "/global-carbon-cycle.png",
    uploadDate: "2023-06-28T11:15:00Z",
  },
  {
    id: 4,
    name: "Alternatif Plastik Bertingkat",
    type: "image",
    url: "/cascading-plastic-alternatives.png",
    uploadDate: "2023-07-15T16:40:00Z",
  },
  {
    id: 5,
    name: "Produksi Eko Saling Terhubung",
    type: "image",
    url: "/interconnected-eco-production.png",
    uploadDate: "2023-07-02T10:50:00Z",
  },
  { id: 6, name: "Kanopi Zamrud", type: "image", url: "/emerald-canopy.png", uploadDate: "2023-04-18T13:25:00Z" },
  { id: 7, name: "Tatapan Tenang", type: "image", url: "/serene-gaze.png", uploadDate: "2023-05-22T15:10:00Z" },
  {
    id: 8,
    name: "Tatapan Penuh Pemikiran",
    type: "image",
    url: "/thoughtful-gaze.png",
    uploadDate: "2023-06-14T09:05:00Z",
  },
]

// Komponen blok konten yang dapat diseret
const ContentBlock = ({ id, content, index, handleContentChange, handleDeleteBlock }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: transform ? 0.5 : 1,
  }

  // Tentukan apakah blok adalah paragraf, judul, atau gambar
  const getBlockType = () => {
    if (content.startsWith("<h")) return "heading"
    if (content.startsWith("<img")) return "image"
    return "paragraph"
  }

  const blockType = getBlockType()

  // Ekstrak konten untuk pengeditan
  const getEditableContent = () => {
    if (blockType === "heading") {
      const match = content.match(/<h\d>(.*?)<\/h\d>/)
      return match ? match[1] : ""
    } else if (blockType === "paragraph") {
      const match = content.match(/<p>(.*?)<\/p>/)
      return match ? match[1] : ""
    } else if (blockType === "image") {
      const srcMatch = content.match(/src="(.*?)"/)
      const altMatch = content.match(/alt="(.*?)"/)
      return {
        src: srcMatch ? srcMatch[1] : "",
        alt: altMatch ? altMatch[1] : "",
      }
    }
    return ""
  }

  // Tangani perubahan konten berdasarkan jenis blok
  const onContentChange = (e) => {
    let newContent
    if (blockType === "heading") {
      newContent = `<h2>${e.target.value}</h2>`
    } else if (blockType === "paragraph") {
      newContent = `<p>${e.target.value}</p>`
    }
    handleContentChange(index, newContent)
  }

  // Render input yang berbeda berdasarkan jenis blok
  const renderBlockInput = () => {
    if (blockType === "heading") {
      return (
        <input
          type="text"
          value={getEditableContent()}
          onChange={onContentChange}
          placeholder="Teks judul"
          className="block-input heading-input"
        />
      )
    } else if (blockType === "paragraph") {
      return (
        <textarea
          value={getEditableContent()}
          onChange={onContentChange}
          placeholder="Teks paragraf"
          className="block-input paragraph-input"
        />
      )
    } else if (blockType === "image") {
      const { src, alt } = getEditableContent()
      return (
        <div className="image-block-content">
          <img src={src || "/placeholder.svg"} alt={alt} className="block-image-preview" />
          <div className="image-block-inputs">
            <input
              type="text"
              value={alt}
              onChange={(e) => {
                const newContent = content.replace(/alt="(.*?)"/, `alt="${e.target.value}"`)
                handleContentChange(index, newContent)
              }}
              placeholder="Teks alt gambar"
              className="block-input image-alt-input"
            />
          </div>
        </div>
      )
    }
  }

  return (
    <div ref={setNodeRef} style={style} className={`content-block ${blockType}-block`}>
      <div className="block-header">
        <div className="block-type">
          {blockType === "heading" && <i className="fas fa-heading"></i>}
          {blockType === "paragraph" && <i className="fas fa-paragraph"></i>}
          {blockType === "image" && <i className="fas fa-image"></i>}
          <span>{blockType === "heading" ? "Judul" : blockType === "paragraph" ? "Paragraf" : "Gambar"}</span>
        </div>
        <div className="block-actions">
          <button className="block-action-btn" title="Seret untuk mengatur ulang" {...attributes} {...listeners}>
            <i className="fas fa-grip-lines"></i>
          </button>
          <button className="block-action-btn delete-btn" onClick={() => handleDeleteBlock(index)} title="Hapus blok">
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
      <div className="block-content">{renderBlockInput()}</div>
    </div>
  )
}

// Komponen pemilih tag
const TagSelector = ({ selectedTags, setSelectedTags }) => {
  const [inputValue, setInputValue] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)

    if (value.trim()) {
      const filteredSuggestions = availableTags
        .filter((tag) => tag.toLowerCase().includes(value.toLowerCase()))
        .filter((tag) => !selectedTags.includes(tag))
      setSuggestions(filteredSuggestions)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const addTag = (tag) => {
    if (tag.trim() && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag])
      setInputValue("")
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className="tag-selector">
      <div className="selected-tags">
        <AnimatePresence>
          {selectedTags.map((tag, index) => (
            <motion.div key={index} className="tag" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <span>{tag}</span>
              <button onClick={() => removeTag(tag)}>×</button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="tag-input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Tambahkan tag..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              addTag(inputValue)
            }
          }}
          onFocus={() => setShowSuggestions(true)}
        />
        {showSuggestions && suggestions.length > 0 && (
          <div className="tag-suggestions">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="tag-suggestion" onClick={() => addTag(suggestion)}>
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Komponen perpustakaan media
const MediaLibrary = ({ mediaItems, onSelectMedia, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedItem, setSelectedItem] = useState(null)

  const filteredItems = mediaItems.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSelect = () => {
    if (selectedItem) {
      onSelectMedia(selectedItem)
      onClose()
    }
  }

  return (
    <div className="media-library-overlay">
      <div className="media-library">
        <div className="media-library-header">
          <h3>Perpustakaan Media</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="media-search">
          <input
            type="text"
            placeholder="Cari media..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="media-grid">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`media-item ${selectedItem?.id === item.id ? "selected" : ""}`}
              onClick={() => setSelectedItem(item)}
            >
              <img src={item.url || "/placeholder.svg"} alt={item.name} />
              <div className="media-item-info">
                <span className="media-item-name">{item.name}</span>
                <span className="media-item-date">{new Date(item.uploadDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="media-library-footer">
          <button className="action-button" onClick={onClose}>
            Batal
          </button>
          <button className="action-button primary-button" onClick={handleSelect} disabled={!selectedItem}>
            Pilih
          </button>
        </div>
      </div>
    </div>
  )
}

// Komponen editor teks kaya
const RichTextEditor = ({ content, setContent }) => {
  // Parse konten menjadi blok
  const parseContent = () => {
    if (!content) return []
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, "text/html")
    const elements = Array.from(doc.body.children)
    return elements.map((el) => el.outerHTML)
  }

  const [contentBlocks, setContentBlocks] = useState(parseContent())
  const sensors = useSensors(useSensor(PointerSensor))

  // Perbarui konten induk saat blok berubah
  useEffect(() => {
    setContent(contentBlocks.join("\n"))
  }, [contentBlocks, setContent])

  // Tangani akhir seret
  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over.id) {
      setContentBlocks((blocks) => {
        const oldIndex = blocks.findIndex((_, idx) => `block-${idx}` === active.id)
        const newIndex = blocks.findIndex((_, idx) => `block-${idx}` === over.id)
        return arrayMove(blocks, oldIndex, newIndex)
      })
    }
  }

  // Tangani perubahan konten
  const handleContentChange = (index, newContent) => {
    const newBlocks = [...contentBlocks]
    newBlocks[index] = newContent
    setContentBlocks(newBlocks)
  }

  // Tangani hapus blok
  const handleDeleteBlock = (index) => {
    const newBlocks = [...contentBlocks]
    newBlocks.splice(index, 1)
    setContentBlocks(newBlocks)
  }

  // Tambahkan blok baru
  const addBlock = (type) => {
    let newBlock
    switch (type) {
      case "heading":
        newBlock = "<h2>Judul Baru</h2>"
        break
      case "paragraph":
        newBlock = "<p>Teks paragraf baru...</p>"
        break
      case "image":
        setShowMediaLibrary(true)
        return
      default:
        return
    }
    setContentBlocks([...contentBlocks, newBlock])
  }

  // Tangani pemilihan media
  const [showMediaLibrary, setShowMediaLibrary] = useState(false)

  const handleSelectMedia = (media) => {
    const newBlock = `<img src="${media.url}" alt="${media.name}" />`
    setContentBlocks([...contentBlocks, newBlock])
  }

  return (
    <div className="rich-text-editor">
      <div className="editor-toolbar">
        <button className="toolbar-btn" onClick={() => addBlock("heading")} title="Tambah Judul">
          <i className="fas fa-heading"></i>
        </button>
        <button className="toolbar-btn" onClick={() => addBlock("paragraph")} title="Tambah Paragraf">
          <i className="fas fa-paragraph"></i>
        </button>
        <button className="toolbar-btn" onClick={() => addBlock("image")} title="Tambah Gambar">
          <i className="fas fa-image"></i>
        </button>
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={contentBlocks.map((_, index) => `block-${index}`)}
          strategy={verticalListSortingStrategy}
        >
          <div className="editor-content">
            {contentBlocks.map((block, index) => (
              <ContentBlock
                key={index}
                id={`block-${index}`}
                content={block}
                index={index}
                handleContentChange={handleContentChange}
                handleDeleteBlock={handleDeleteBlock}
              />
            ))}
            {contentBlocks.length === 0 && (
              <div className="empty-editor">
                <p>Mulai menambahkan blok konten menggunakan toolbar di atas.</p>
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>
      {showMediaLibrary && (
        <MediaLibrary
          mediaItems={initialMediaItems}
          onSelectMedia={handleSelectMedia}
          onClose={() => setShowMediaLibrary(false)}
        />
      )}
    </div>
  )
}

// Komponen pratinjau konten
const ContentPreview = ({ content }) => {
  // Log konten untuk debugging
  console.log("Konten pratinjau:", content)

  // Coba render konten, fallback jika salah bentuk
  try {
    return (
      <div className="content-preview">
        <div className="preview-content" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    )
  } catch (error) {
    console.error("Error rendering preview:", error)
    return (
      <div className="content-preview">
        <p>Error rendering preview: Konten salah bentuk</p>
      </div>
    )
  }
}

// Komponen kalender penjadwalan
const SchedulingCalendar = ({ publishDate, setPublishDate }) => {
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedDate, setSelectedDate] = useState(publishDate ? new Date(publishDate) : new Date())
  const [selectedTime, setSelectedTime] = useState(
    publishDate
      ? `${new Date(publishDate).getHours().toString().padStart(2, "0")}:${new Date(publishDate)
          .getMinutes()
          .toString()
          .padStart(2, "0")}`
      : "09:00",
  )

  const handleDateSelect = (date) => {
    setSelectedDate(date)
  }

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value)
  }

  const handleSave = () => {
    const [hours, minutes] = selectedTime.split(":").map(Number)
    const dateTime = new Date(selectedDate)
    dateTime.setHours(hours, minutes, 0, 0)
    setPublishDate(dateTime.toISOString())
    setShowCalendar(false)
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Belum dijadwalkan"
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  // Generate hari kalender
  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    const days = []
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const days = generateCalendarDays()
  const weekdays = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"]
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ]

  return (
    <div className="scheduling-calendar">
      <div className="schedule-display" onClick={() => setShowCalendar(!showCalendar)}>
        <i className="fas fa-calendar-alt"></i>
        <span>{formatDate(publishDate)}</span>
        <i className={`fas fa-chevron-${showCalendar ? "up" : "down"}`}></i>
      </div>
      {showCalendar && (
        <div className="calendar-dropdown">
          <div className="calendar-header">
            <button
              className="month-nav"
              onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <h4>
              {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </h4>
            <button
              className="month-nav"
              onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          <div className="calendar-grid">
            {weekdays.map((day) => (
              <div key={day} className="weekday">
                {day}
              </div>
            ))}
            {days.map((day, index) => (
              <div
                key={index}
                className={`calendar-day ${!day ? "empty" : ""} ${
                  day &&
                  day.getDate() === selectedDate.getDate() &&
                  day.getMonth() === selectedDate.getMonth() &&
                  day.getFullYear() === selectedDate.getFullYear()
                    ? "selected"
                    : ""
                }`}
                onClick={() => day && handleDateSelect(day)}
              >
                {day && day.getDate()}
              </div>
            ))}
          </div>
          <div className="time-selector">
            <label>Waktu:</label>
            <input type="time" value={selectedTime} onChange={handleTimeChange} />
          </div>
          <div className="calendar-actions">
            <button
              className="action-button"
              onClick={() => {
                setPublishDate(null)
                setShowCalendar(false)
              }}
            >
              Hapus
            </button>
            <button className="action-button primary-button" onClick={handleSave}>
              Atur Tanggal & Waktu
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Komponen utama
const ManageArticles = () => {
  const [articles, setArticles] = useState(initialArticles)
  const [selectedArticles, setSelectedArticles] = useState([])
  const [editingArticle, setEditingArticle] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationAction, setConfirmationAction] = useState(null)
  const [undoStack, setUndoStack] = useState([])
  const [redoStack, setRedoStack] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [sortField, setSortField] = useState("title")
  const [sortDirection, setSortDirection] = useState("asc")
  const [mediaItems, setMediaItems] = useState(initialMediaItems)
  const [showMediaLibrary, setShowMediaLibrary] = useState(false)

  // Filter dan urutkan artikel
  const filteredArticles = articles
    .filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = filterCategory ? article.category === filterCategory : true
      const matchesStatus = filterStatus ? article.status === filterStatus : true
      return matchesSearch && matchesCategory && matchesStatus
    })
    .sort((a, b) => {
      let valueA, valueB
      if (sortField === "publishDate") {
        valueA = a.publishDate ? new Date(a.publishDate).getTime() : 0
        valueB = b.publishDate ? new Date(b.publishDate).getTime() : 0
      } else {
        valueA = a[sortField]
        valueB = b[sortField]
      }
      if (sortDirection === "asc") {
        return valueA > valueB ? 1 : -1
      } else {
        return valueA < valueB ? 1 : -1
      }
    })

  // Tangani perubahan pengurutan
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Tangani pemilihan artikel
  const toggleArticleSelection = (articleId) => {
    if (selectedArticles.includes(articleId)) {
      setSelectedArticles(selectedArticles.filter((id) => id !== articleId))
    } else {
      setSelectedArticles([...selectedArticles, articleId])
    }
  }

  // Tangani pilih semua
  const toggleSelectAll = () => {
    if (selectedArticles.length === filteredArticles.length) {
      setSelectedArticles([])
    } else {
      setSelectedArticles(filteredArticles.map((article) => article.id))
    }
  }

  // Tangani edit artikel
  const handleEditArticle = (article) => {
    setEditingArticle({ ...article })
    setIsEditing(true)
  }

  // Hasilkan slug dari judul
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
  }

  // Tangani simpan artikel
  const handleSaveArticle = () => {
    setUndoStack([...undoStack, [...articles]])
    setRedoStack([])
    if (!editingArticle.slug || editingArticle.title !== articles.find((a) => a.id === editingArticle.id)?.title) {
      editingArticle.slug = generateSlug(editingArticle.title)
    }
    editingArticle.lastModified = new Date().toISOString()
    if (editingArticle.id) {
      setArticles(articles.map((a) => (a.id === editingArticle.id ? editingArticle : a)))
    } else {
      const newArticle = {
        ...editingArticle,
        id: Math.max(...articles.map((a) => a.id)) + 1,
        lastModified: new Date().toISOString(),
      }
      setArticles([...articles, newArticle])
    }
    setIsEditing(false)
    setEditingArticle(null)
    setShowConfirmation(true)
    setTimeout(() => setShowConfirmation(false), 3000)
  }

  // Tangani batal edit
  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditingArticle(null)
  }

  // Tangani artikel baru
  const handleNewArticle = () => {
    setEditingArticle({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      author: "",
      category: "",
      tags: [],
      featuredImage: "",
      status: "draft",
      publishDate: null,
      lastModified: new Date().toISOString(),
    })
    setIsEditing(true)
  }

  // Tangani tindakan massal
  const handleBulkAction = (action) => {
    setConfirmationAction({
      type: action,
      callback: () => {
        setUndoStack([...undoStack, [...articles]])
        setRedoStack([])
        switch (action) {
          case "delete":
            setArticles(articles.filter((a) => !selectedArticles.includes(a.id)))
            break
          case "publish":
            setArticles(
              articles.map((a) =>
                selectedArticles.includes(a.id)
                  ? {
                      ...a,
                      status: "published",
                      publishDate: new Date().toISOString(),
                    }
                  : a,
              ),
            )
            break
          case "draft":
            setArticles(
              articles.map((a) => (selectedArticles.includes(a.id) ? { ...a, status: "draft", publishDate: null } : a)),
            )
            break
          default:
            break
        }
        setSelectedArticles([])
        setShowConfirmation(true)
        setTimeout(() => setShowConfirmation(false), 3000)
      },
    })
  }

  // Tangani undo/redo
  const handleUndo = () => {
    if (undoStack.length > 0) {
      const prevState = undoStack[undoStack.length - 1]
      setRedoStack([...redoStack, [...articles]])
      setArticles(prevState)
      setUndoStack(undoStack.slice(0, -1))
    }
  }

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1]
      setUndoStack([...undoStack, [...articles]])
      setArticles(nextState)
      setRedoStack(redoStack.slice(0, -1))
    }
  }

  // Tangani pemilihan gambar unggulan
  const handleSelectFeaturedImage = (media) => {
    setEditingArticle({ ...editingArticle, featuredImage: media.url })
    setShowMediaLibrary(false)
  }

  return (
    <AdminLayout>
      <div className="manage-articles-container">
        {/* Header Admin */}
        <div className="admin-header">
          <h1>Kelola Artikel</h1>
          <div className="admin-actions">
            <button className="action-button undo-button" disabled={undoStack.length === 0} onClick={handleUndo}>
              <i className="fas fa-undo"></i> Batalkan
            </button>
            <button className="action-button redo-button" disabled={redoStack.length === 0} onClick={handleRedo}>
              <i className="fas fa-redo"></i> Ulangi
            </button>
            <button className="action-button primary-button" onClick={handleNewArticle}>
              <i className="fas fa-plus"></i> Tambah Artikel
            </button>
          </div>
        </div>

        {/* Panel Pengeditan atau Daftar Artikel */}
        {isEditing ? (
          <div className="edit-article-panel">
            <div className="panel-header">
              <h2>{editingArticle.id ? "Edit Artikel" : "Artikel Baru"}</h2>
              <div className="panel-actions">
                <button className="action-button" onClick={handleCancelEdit}>
                  Batal
                </button>
                <button className="action-button primary-button" onClick={handleSaveArticle}>
                  Simpan Artikel
                </button>
              </div>
            </div>
            <div className="panel-content">
              <div className="article-edit-form">
                <div className="form-section article-info">
                  <div className="form-group">
                    <label>Judul</label>
                    <input
                      type="text"
                      value={editingArticle.title}
                      onChange={(e) =>
                        setEditingArticle({
                          ...editingArticle,
                          title: e.target.value,
                        })
                      }
                      placeholder="Judul artikel"
                    />
                  </div>
                  <div className="form-group">
                    <label>Ringkasan</label>
                    <textarea
                      value={editingArticle.excerpt}
                      onChange={(e) =>
                        setEditingArticle({
                          ...editingArticle,
                          excerpt: e.target.value,
                        })
                      }
                      placeholder="Ringkasan singkat artikel"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Kategori</label>
                      <select
                        value={editingArticle.category}
                        onChange={(e) =>
                          setEditingArticle({
                            ...editingArticle,
                            category: e.target.value,
                          })
                        }
                      >
                        <option value="">Pilih Kategori</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Penulis</label>
                      <input
                        type="text"
                        value={editingArticle.author}
                        onChange={(e) =>
                          setEditingArticle({
                            ...editingArticle,
                            author: e.target.value,
                          })
                        }
                        placeholder="Penulis artikel"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Tag</label>
                    <TagSelector
                      selectedTags={editingArticle.tags}
                      setSelectedTags={(tags) => setEditingArticle({ ...editingArticle, tags })}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        value={editingArticle.status}
                        onChange={(e) => {
                          const newStatus = e.target.value
                          const newArticle = {
                            ...editingArticle,
                            status: newStatus,
                          }
                          if (newStatus === "published" && !editingArticle.publishDate) {
                            newArticle.publishDate = new Date().toISOString()
                          }
                          if (newStatus === "draft") {
                            newArticle.publishDate = null
                          }
                          setEditingArticle(newArticle)
                        }}
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Dipublikasikan</option>
                        <option value="scheduled">Dijadwalkan</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Tanggal Publikasi</label>
                      <SchedulingCalendar
                        publishDate={editingArticle.publishDate}
                        setPublishDate={(date) => {
                          const newArticle = {
                            ...editingArticle,
                            publishDate: date,
                          }
                          if (date) {
                            const publishDate = new Date(date)
                            const now = new Date()
                            if (publishDate > now) {
                              newArticle.status = "scheduled"
                            } else {
                              newArticle.status = "published"
                            }
                          }
                          setEditingArticle(newArticle)
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Gambar Unggulan</label>
                    <div className="featured-image-selector">
                      {editingArticle.featuredImage ? (
                        <div className="featured-image-preview">
                          <img src={editingArticle.featuredImage || "/placeholder.svg"} alt="Unggulan" />
                          <button
                            className="remove-image-btn"
                            onClick={() =>
                              setEditingArticle({
                                ...editingArticle,
                                featuredImage: "",
                              })
                            }
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ) : (
                        <button className="select-image-btn" onClick={() => setShowMediaLibrary(true)}>
                          <i className="fas fa-image"></i>
                          <span>Pilih Gambar Unggulan</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-section article-content">
                  <div className="editor-container">
                    <div className="editor-header">
                      <h3>Konten</h3>
                      <div className="editor-tabs">
                        <button className="editor-tab active">Edit</button>
                        <button className="editor-tab">Pratinjau</button>
                      </div>
                    </div>
                    <div className="editor-preview-container">
                      <RichTextEditor
                        content={editingArticle.content}
                        setContent={(content) => setEditingArticle({ ...editingArticle, content })}
                      />
                      <ContentPreview content={editingArticle.content} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="filter-bar">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Cari artikel..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search"></i>
              </div>
              <div className="filter-options">
                <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                  <option value="">Semua Kategori</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="">Semua Status</option>
                  <option value="published">Dipublikasikan</option>
                  <option value="draft">Draft</option>
                  <option value="scheduled">Dijadwalkan</option>
                </select>
              </div>
            </div>
            {selectedArticles.length > 0 && (
              <div className="bulk-actions">
                <span>{selectedArticles.length} artikel dipilih</span>
                <div className="action-buttons">
                  <button className="action-button" onClick={() => handleBulkAction("publish")}>
                    Publikasikan
                  </button>
                  <button className="action-button" onClick={() => handleBulkAction("draft")}>
                    Pindahkan ke Draft
                  </button>
                  <button className="action-button danger-button" onClick={() => handleBulkAction("delete")}>
                    Hapus
                  </button>
                </div>
              </div>
            )}
            <div className="articles-table">
              <table>
                <thead>
                  <tr>
                    <th className="checkbox-column">
                      <input
                        type="checkbox"
                        checked={selectedArticles.length === filteredArticles.length && filteredArticles.length > 0}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th className="image-column">Gambar</th>
                    <th
                      className={`sortable ${sortField === "title" ? "sorted" : ""}`}
                      onClick={() => handleSort("title")}
                    >
                      Judul
                      {sortField === "title" && (
                        <i className={`fas fa-sort-${sortDirection === "asc" ? "up" : "down"}`}></i>
                      )}
                    </th>
                    <th
                      className={`sortable ${sortField === "author" ? "sorted" : ""}`}
                      onClick={() => handleSort("author")}
                    >
                      Penulis
                      {sortField === "author" && (
                        <i className={`fas fa-sort-${sortDirection === "asc" ? "up" : "down"}`}></i>
                      )}
                    </th>
                    <th
                      className={`sortable ${sortField === "category" ? "sorted" : ""}`}
                      onClick={() => handleSort("category")}
                    >
                      Kategori
                      {sortField === "category" && (
                        <i className={`fas fa-sort-${sortDirection === "asc" ? "up" : "down"}`}></i>
                      )}
                    </th>
                    <th>Tag</th>
                    <th
                      className={`sortable ${sortField === "status" ? "sorted" : ""}`}
                      onClick={() => handleSort("status")}
                    >
                      Status
                      {sortField === "status" && (
                        <i className={`fas fa-sort-${sortDirection === "asc" ? "up" : "down"}`}></i>
                      )}
                    </th>
                    <th
                      className={`sortable ${sortField === "publishDate" ? "sorted" : ""}`}
                      onClick={() => handleSort("publishDate")}
                    >
                      Dipublikasikan
                      {sortField === "publishDate" && (
                        <i className={`fas fa-sort-${sortDirection === "asc" ? "up" : "down"}`}></i>
                      )}
                    </th>
                    <th>Tindakan</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredArticles.map((article) => (
                      <motion.tr
                        key={article.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={selectedArticles.includes(article.id) ? "selected" : ""}
                      >
                        <td className="checkbox-column">
                          <input
                            type="checkbox"
                            checked={selectedArticles.includes(article.id)}
                            onChange={() => toggleArticleSelection(article.id)}
                          />
                        </td>
                        <td className="image-column">
                          {article.featuredImage ? (
                            <img src={article.featuredImage || "/placeholder.svg"} alt={article.title} />
                          ) : (
                            <div className="no-image">Tidak Ada Gambar</div>
                          )}
                        </td>
                        <td className="title-column">
                          <div className="article-title">{article.title}</div>
                          <div className="article-excerpt">{article.excerpt.substring(0, 60)}...</div>
                        </td>
                        <td>{article.author}</td>
                        <td>{categories.find((c) => c.id === article.category)?.name || article.category}</td>
                        <td className="tags-column">
                          {article.tags.map((tag, index) => (
                            <span key={index} className="tag">
                              {tag}
                            </span>
                          ))}
                        </td>
                        <td>
                          <span className={`status-badge ${article.status}`}>
                            {article.status === "published"
                              ? "Dipublikasikan"
                              : article.status === "draft"
                                ? "Draft"
                                : article.status === "scheduled"
                                  ? "Dijadwalkan"
                                  : article.status}
                          </span>
                        </td>
                        <td>
                          {article.publishDate
                            ? new Date(article.publishDate).toLocaleDateString()
                            : "Belum dipublikasikan"}
                        </td>
                        <td className="actions-column">
                          <button className="action-icon-button" onClick={() => handleEditArticle(article)}>
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="action-icon-button danger"
                            onClick={() => {
                              setSelectedArticles([article.id])
                              handleBulkAction("delete")
                            }}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Dialog Konfirmasi */}
        {confirmationAction && (
          <div className="confirmation-dialog">
            <div className="confirmation-content">
              <h3>Konfirmasi Tindakan</h3>
              <p>
                {confirmationAction.type === "delete"
                  ? `Apakah Anda yakin ingin menghapus ${selectedArticles.length} artikel?`
                  : `Apakah Anda yakin ingin ${
                      confirmationAction.type === "publish" ? "mempublikasikan" : "memindahkan ke draft"
                    } ${selectedArticles.length} artikel?`}
              </p>
              <div className="confirmation-actions">
                <button className="action-button" onClick={() => setConfirmationAction(null)}>
                  Batal
                </button>
                <button
                  className={`action-button ${confirmationAction.type === "delete" ? "danger-button" : "primary-button"}`}
                  onClick={() => {
                    confirmationAction.callback()
                    setConfirmationAction(null)
                  }}
                >
                  Konfirmasi
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Perpustakaan Media */}
        {showMediaLibrary && (
          <div className="media-library-overlay">
            <MediaLibrary
              mediaItems={mediaItems}
              onSelectMedia={handleSelectFeaturedImage}
              onClose={() => setShowMediaLibrary(false)}
            />
          </div>
        )}

        {/* Notifikasi Sukses */}
        <AnimatePresence>
          {showConfirmation && (
            <motion.div
              className="success-notification"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
            >
              <i className="fas fa-check-circle"></i>
              <span>Perubahan berhasil disimpan!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  )
}

export default ManageArticles
