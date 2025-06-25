"use client"

import { useState, useCallback } from "react"
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from "@dnd-kit/core"
import { SortableContext, useSortable, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { motion, AnimatePresence } from "framer-motion"
import "../styles/ManageProducts.css"
import AdminLayout from "../components/AdminLayout"

// Format harga dalam Rupiah
const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price * 15000) // Konversi USD ke IDR
}

// Data contoh untuk produk
const initialProducts = [
  {
    id: 1,
    name: "Set Sikat Gigi Bambu",
    category: "personal-care",
    price: 12.99,
    stock: 150,
    tags: ["kamar-mandi", "ramah-lingkungan", "bebas-plastik"],
    images: ["/bamboo-toothbrush-set.png"],
    description: "Set 4 sikat gigi bambu ramah lingkungan dengan bulu sikat yang mengandung arang.",
    specifications: {
      material: "Bambu",
      dimensions: "19cm x 2cm x 2cm",
      weight: "15g",
      packaging: "Kardus daur ulang",
    },
    featured: true,
    status: "active",
  },
  {
    id: 2,
    name: "Kaos Katun Organik",
    category: "clothing",
    price: 24.99,
    stock: 75,
    tags: ["pakaian", "organik", "fair-trade"],
    images: ["/organic-cotton-tshirt.png"],
    description: "Kaos lembut dan nyaman yang terbuat dari 100% katun organik.",
    specifications: {
      material: "100% Katun Organik",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Natural", "Biru", "Hijau"],
      certification: "Bersertifikat GOTS",
    },
    featured: false,
    status: "active",
  },
  {
    id: 3,
    name: "Kantong Belanja Reusable",
    category: "kitchen",
    price: 15.99,
    stock: 200,
    tags: ["dapur", "belanja", "zero-waste"],
    images: ["/reusable-produce-bags.png"],
    description: "Set 5 kantong jaring untuk belanja bahan makanan, sempurna untuk buah dan sayuran.",
    specifications: {
      material: "Jaring Katun Organik",
      dimensions: "Berbagai ukuran",
      weight: "10g per kantong",
      washable: "Dapat dicuci dengan mesin",
    },
    featured: true,
    status: "active",
  },
  {
    id: 4,
    name: "Power Bank Tenaga Surya",
    category: "electronics",
    price: 39.99,
    stock: 50,
    tags: ["teknologi", "tenaga-surya", "travel"],
    images: ["/solar-power-bank.png"],
    description: "Pengisi daya portabel dengan panel surya untuk pengisian ramah lingkungan saat bepergian.",
    specifications: {
      capacity: "10.000 mAh",
      inputs: "USB-C, Solar",
      outputs: "2x USB-A",
      dimensions: "14cm x 7cm x 1.5cm",
    },
    featured: false,
    status: "active",
  },
  {
    id: 5,
    name: "Pembungkus Makanan Beeswax",
    category: "kitchen",
    price: 18.99,
    stock: 120,
    tags: ["dapur", "penyimpanan-makanan", "bebas-plastik"],
    images: ["/beeswax-food-wraps.png"],
    description:
      "Pembungkus makanan reusable yang terbuat dari katun organik dan lilin lebah. Alternatif berkelanjutan untuk plastik pembungkus.",
    specifications: {
      material: "Katun Organik, Lilin Lebah, Minyak Jojoba",
      sizes: ["S", "M", "L"],
      quantity: "Set isi 3",
      washable: "Cuci tangan dengan air dingin",
    },
    featured: true,
    status: "active",
  },
]

// Kategori produk yang tersedia
const categories = [
  { id: "personal-care", name: "Perawatan Pribadi" },
  { id: "clothing", name: "Pakaian" },
  { id: "kitchen", name: "Dapur" },
  { id: "electronics", name: "Elektronik" },
  { id: "home", name: "Rumah" },
  { id: "outdoor", name: "Luar Ruangan" },
]

// Tag yang tersedia untuk autocomplete
const availableTags = [
  "kamar-mandi",
  "ramah-lingkungan",
  "bebas-plastik",
  "pakaian",
  "organik",
  "fair-trade",
  "dapur",
  "belanja",
  "zero-waste",
  "teknologi",
  "tenaga-surya",
  "travel",
  "penyimpanan-makanan",
  "reusable",
  "berkelanjutan",
  "biodegradable",
  "dapat-dikompos",
  "daur-ulang",
  "vegan",
  "bebas-kekejaman",
  "alami",
  "buatan-tangan",
  "lokal",
  "etis",
  "minimalis",
]

// Komponen gambar yang dapat diseret
const DraggableImage = ({ image, index, removeImage }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: `image-${index}` })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: transform ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="product-image-preview">
      <img src={image || "/placeholder.svg"} alt={`Produk ${index + 1}`} />
      <div className="image-overlay">
        <button className="image-action-btn" {...attributes} {...listeners} title="Seret untuk mengatur ulang">
          <i className="fas fa-arrows-alt"></i>
        </button>
        <button className="image-action-btn danger" onClick={() => removeImage(index)} title="Hapus gambar">
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
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

// Komponen pengunggah gambar
const ImageUploader = ({ images, setImages }) => {
  const sensors = useSensors(useSensor(PointerSensor))

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Validasi dan konversi file ke URL gambar
      const validImages = acceptedFiles.filter((file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type))
      if (validImages.length === 0) {
        alert("Silakan unggah file gambar yang valid (JPEG, PNG, GIF).")
        return
      }
      const newImages = validImages.map((file) => URL.createObjectURL(file))
      setImages([...images, ...newImages])
    },
    [images, setImages],
  )

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over.id) {
      setImages((currentImages) => {
        const oldIndex = Number(active.id.split("-")[1])
        const newIndex = Number(over.id.split("-")[1])
        return arrayMove(currentImages, oldIndex, newIndex)
      })
    }
  }

  return (
    <div className="image-uploader">
      <div className="dropzone" onClick={() => document.getElementById("file-input").click()}>
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/jpeg,image/png,image/gif"
          onChange={(e) => {
            const files = Array.from(e.target.files)
            onDrop(files)
          }}
          style={{ display: "none" }}
        />
        <div className="dropzone-content">
          <i className="fas fa-cloud-upload-alt"></i>
          <p>Seret & lepas gambar di sini atau klik untuk menjelajah</p>
          <p className="dropzone-note">(JPEG, PNG, GIF saja)</p>
        </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={images.map((_, index) => `image-${index}`)} strategy={rectSortingStrategy}>
          <div className="image-previews">
            <AnimatePresence>
              {images.length > 0 ? (
                images.map((image, index) => (
                  <motion.div
                    key={`image-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <DraggableImage image={image} index={index} removeImage={removeImage} />
                  </motion.div>
                ))
              ) : (
                <motion.div className="empty-previews" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p>Belum ada gambar yang diunggah.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}

// Komponen formulir produk
const ProductForm = ({ product, setProduct, categories }) => {
  // Dapatkan bidang berdasarkan kategori
  const getCategoryFields = () => {
    switch (product.category) {
      case "personal-care":
        return (
          <div className="category-specific-fields">
            <div className="form-group">
              <label>Material</label>
              <input
                type="text"
                value={product.specifications?.material || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    specifications: { ...product.specifications, material: e.target.value },
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Bahan</label>
              <textarea
                value={product.specifications?.ingredients || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    specifications: { ...product.specifications, ingredients: e.target.value },
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Sertifikasi</label>
              <input
                type="text"
                value={product.specifications?.certification || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    specifications: { ...product.specifications, certification: e.target.value },
                  })
                }
              />
            </div>
          </div>
        )
      case "clothing":
        return (
          <div className="category-specific-fields">
            <div className="form-group">
              <label>Material</label>
              <input
                type="text"
                value={product.specifications?.material || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    specifications: { ...product.specifications, material: e.target.value },
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Ukuran</label>
              <div className="checkbox-group">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <label key={size} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={(product.specifications?.sizes || []).includes(size)}
                      onChange={(e) => {
                        const sizes = product.specifications?.sizes || []
                        if (e.target.checked) {
                          setProduct({
                            ...product,
                            specifications: { ...product.specifications, sizes: [...sizes, size] },
                          })
                        } else {
                          setProduct({
                            ...product,
                            specifications: { ...product.specifications, sizes: sizes.filter((s) => s !== size) },
                          })
                        }
                      }}
                    />
                    {size}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Warna</label>
              <div className="color-selector">
                {["Natural", "Hitam", "Putih", "Biru", "Hijau", "Merah"].map((color) => (
                  <div
                    key={color}
                    className={`color-option ${(product.specifications?.colors || []).includes(color) ? "selected" : ""}`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onClick={() => {
                      const colors = product.specifications?.colors || []
                      if (colors.includes(color)) {
                        setProduct({
                          ...product,
                          specifications: { ...product.specifications, colors: colors.filter((c) => c !== color) },
                        })
                      } else {
                        setProduct({
                          ...product,
                          specifications: { ...product.specifications, colors: [...colors, color] },
                        })
                      }
                    }}
                  >
                    {(product.specifications?.colors || []).includes(color) && <i className="fas fa-check"></i>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case "kitchen":
        return (
          <div className="category-specific-fields">
            <div className="form-group">
              <label>Material</label>
              <input
                type="text"
                value={product.specifications?.material || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    specifications: { ...product.specifications, material: e.target.value },
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Dimensi</label>
              <input
                type="text"
                value={product.specifications?.dimensions || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    specifications: { ...product.specifications, dimensions: e.target.value },
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Petunjuk Perawatan</label>
              <textarea
                value={product.specifications?.careInstructions || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    specifications: { ...product.specifications, careInstructions: e.target.value },
                  })
                }
              />
            </div>
          </div>
        )
      case "electronics":
        return (
          <div className="category-specific-fields">
            <div className="form-group">
              <label>Sumber Daya</label>
              <select
                value={product.specifications?.powerSource || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    specifications: { ...product.specifications, powerSource: e.target.value },
                  })
                }
              >
                <option value="">Pilih Sumber Daya</option>
                <option value="Solar">Tenaga Surya</option>
                <option value="Battery">Baterai</option>
                <option value="USB">USB</option>
                <option value="AC">AC</option>
                <option value="Multiple">Beberapa</option>
              </select>
            </div>
            <div className="form-group">
              <label>Spesifikasi Teknis</label>
              <textarea
                value={product.specifications?.technical || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    specifications: { ...product.specifications, technical: e.target.value },
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Garansi (bulan)</label>
              <input
                type="number"
                value={product.specifications?.warranty || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    specifications: { ...product.specifications, warranty: e.target.value },
                  })
                }
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="product-form">
      <div className="form-group">
        <label>Nama Produk</label>
        <input
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Kategori</label>
        <select
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          required
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
        <label>Harga (Rp)</label>
        <input
          type="number"
          step="0.01"
          value={product.price || ""}
          onChange={(e) => setProduct({ ...product, price: Number.parseFloat(e.target.value) || 0 })}
          required
        />
      </div>

      <div className="form-group">
        <label>Stok</label>
        <input
          type="number"
          value={product.stock || ""}
          onChange={(e) => setProduct({ ...product, stock: Number.parseInt(e.target.value) || 0 })}
        />
      </div>

      <div className="form-group">
        <label>Deskripsi</label>
        <textarea
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Tag</label>
        <TagSelector selectedTags={product.tags} setSelectedTags={(tags) => setProduct({ ...product, tags })} />
      </div>

      <div className="form-group">
        <label>Gambar</label>
        <ImageUploader images={product.images} setImages={(images) => setProduct({ ...product, images })} />
      </div>

      <div className="form-group">
        <label>Produk Unggulan</label>
        <input
          type="checkbox"
          checked={product.featured}
          onChange={(e) => setProduct({ ...product, featured: e.target.checked })}
        />
      </div>

      <div className="form-group">
        <label>Status</label>
        <select value={product.status} onChange={(e) => setProduct({ ...product, status: e.target.value })}>
          <option value="active">Aktif</option>
          <option value="inactive">Tidak Aktif</option>
          <option value="out-of-stock">Stok Habis</option>
        </select>
      </div>

      {product.category && (
        <div className="form-group">
          <label>Detail Khusus Kategori</label>
          {getCategoryFields()}
        </div>
      )}
    </div>
  )
}

// Komponen utama
const ManageProducts = () => {
  const [products, setProducts] = useState(initialProducts)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationAction, setConfirmationAction] = useState(null)
  const [undoStack, setUndoStack] = useState([])
  const [redoStack, setRedoStack] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")
  const [errors, setErrors] = useState({})

  // Filter dan urutkan produk
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = filterCategory ? product.category === filterCategory : true
      const matchesStatus = filterStatus ? product.status === filterStatus : true

      return matchesSearch && matchesCategory && matchesStatus
    })
    .sort((a, b) => {
      let valueA = a[sortField]
      let valueB = b[sortField]

      if (sortField === "price" || sortField === "stock") {
        valueA = Number(valueA) || 0
        valueB = Number(valueB) || 0
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

  // Tangani pemilihan produk
  const toggleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    } else {
      setSelectedProducts([...selectedProducts, productId])
    }
  }

  // Tangani pilih semua
  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map((product) => product.id))
    }
  }

  // Tangani edit produk
  const handleEditProduct = (product) => {
    setEditingProduct({ ...product, specifications: { ...product.specifications } })
    setIsEditing(true)
    setErrors({})
  }

  // Tangani produk baru
  const handleNewProduct = () => {
    setEditingProduct({
      id: null,
      name: "",
      category: "",
      price: 0,
      stock: 0,
      tags: [],
      images: [],
      description: "",
      specifications: {},
      featured: false,
      status: "active",
    })
    setIsEditing(true)
    setErrors({})
  }

  // Validasi produk
  const validateProduct = (product) => {
    const newErrors = {}
    if (!product.name.trim()) newErrors.name = "Nama produk wajib diisi"
    if (!product.category) newErrors.category = "Kategori wajib diisi"
    if (!product.price || product.price <= 0) newErrors.price = "Harga yang valid wajib diisi"
    return newErrors
  }

  // Tangani simpan produk
  const handleSaveProduct = () => {
    const validationErrors = validateProduct(editingProduct)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // Simpan ke tumpukan undo
    setUndoStack([...undoStack, [...products]])
    setRedoStack([])

    if (editingProduct.id) {
      // Perbarui produk yang ada
      setProducts(products.map((p) => (p.id === editingProduct.id ? editingProduct : p)))
    } else {
      // Tambahkan produk baru
      const newProduct = {
        ...editingProduct,
        id: Math.max(...products.map((p) => p.id)) + 1,
      }
      setProducts([...products, newProduct])
    }

    setIsEditing(false)
    setEditingProduct(null)
    setErrors({})

    // Tampilkan konfirmasi
    setShowConfirmation(true)
    setTimeout(() => setShowConfirmation(false), 3000)
  }

  // Tangani batal edit
  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditingProduct(null)
    setErrors({})
  }

  // Tangani tindakan massal
  const handleBulkAction = (action) => {
    setConfirmationAction({
      type: action,
      callback: () => {
        // Simpan ke tumpukan undo
        setUndoStack([...undoStack, [...products]])
        setRedoStack([])

        switch (action) {
          case "delete":
            setProducts(products.filter((p) => !selectedProducts.includes(p.id)))
            break
          case "active":
            setProducts(products.map((p) => (selectedProducts.includes(p.id) ? { ...p, status: "active" } : p)))
            break
          case "inactive":
            setProducts(products.map((p) => (selectedProducts.includes(p.id) ? { ...p, status: "inactive" } : p)))
            break
          case "feature":
            setProducts(products.map((p) => (selectedProducts.includes(p.id) ? { ...p, featured: true } : p)))
            break
          case "unfeature":
            setProducts(products.map((p) => (selectedProducts.includes(p.id) ? { ...p, featured: false } : p)))
            break
          default:
            break
        }

        setSelectedProducts([])
        setShowConfirmation(true)
        setTimeout(() => setShowConfirmation(false), 3000)
      },
    })
  }

  // Tangani undo/redo
  const handleUndo = () => {
    if (undoStack.length > 0) {
      const prevState = undoStack[undoStack.length - 1]
      setRedoStack([...redoStack, [...products]])
      setProducts(prevState)
      setUndoStack(undoStack.slice(0, -1))
    }
  }

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1]
      setUndoStack([...undoStack, [...products]])
      setProducts(nextState)
      setRedoStack(redoStack.slice(0, -1))
    }
  }

  return (
    <AdminLayout>
      <div className="manage-products-container">
        <div className="admin-header">
          <h1>Kelola Produk</h1>
          <div className="admin-actions">
            <button className="action-button undo-button" disabled={undoStack.length === 0} onClick={handleUndo}>
              <i className="fas fa-undo"></i> Batalkan
            </button>
            <button className="action-button redo-button" disabled={redoStack.length === 0} onClick={handleRedo}>
              <i className="fas fa-redo"></i> Ulangi
            </button>
            <button className="action-button primary-button" onClick={handleNewProduct}>
              <i className="fas fa-plus"></i> Tambah Produk
            </button>
          </div>
        </div>

        {isEditing ? (
          <div className="edit-product-panel">
            <div className="panel-header">
              <h2>{editingProduct.id ? "Edit Produk" : "Produk Baru"}</h2>
              <div className="panel-actions">
                <button className="action-button" onClick={handleCancelEdit}>
                  Batal
                </button>
                <button className="action-button primary-button" onClick={handleSaveProduct}>
                  Simpan Produk
                </button>
              </div>
            </div>

            <div className="panel-content">
              {Object.keys(errors).length > 0 && (
                <div className="error-messages">
                  {Object.values(errors).map((error, index) => (
                    <p key={index} className="error-message">
                      {error}
                    </p>
                  ))}
                </div>
              )}
              <ProductForm product={editingProduct} setProduct={setEditingProduct} categories={categories} />
            </div>
          </div>
        ) : (
          <>
            <div className="filter-bar">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Cari produk..."
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
                  <option value="active">Aktif</option>
                  <option value="inactive">Tidak Aktif</option>
                  <option value="out-of-stock">Stok Habis</option>
                </select>
              </div>
            </div>

            {selectedProducts.length > 0 && (
              <div className="bulk-actions">
                <span>{selectedProducts.length} produk dipilih</span>
                <div className="action-buttons">
                  <button className="action-button" onClick={() => handleBulkAction("active")}>
                    Aktifkan
                  </button>
                  <button className="action-button" onClick={() => handleBulkAction("inactive")}>
                    Nonaktifkan
                  </button>
                  <button className="action-button" onClick={() => handleBulkAction("feature")}>
                    Jadikan Unggulan
                  </button>
                  <button className="action-button" onClick={() => handleBulkAction("unfeature")}>
                    Hapus Unggulan
                  </button>
                  <button className="action-button danger-button" onClick={() => handleBulkAction("delete")}>
                    Hapus
                  </button>
                </div>
              </div>
            )}

            <div className="products-table">
              <table>
                <thead>
                  <tr>
                    <th className="checkbox-column">
                      <input
                        type="checkbox"
                        checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th className="image-column">Gambar</th>
                    <th
                      className={`sortable ${sortField === "name" ? "sorted" : ""}`}
                      onClick={() => handleSort("name")}
                    >
                      Nama
                      {sortField === "name" && (
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
                    <th
                      className={`sortable ${sortField === "price" ? "sorted" : ""}`}
                      onClick={() => handleSort("price")}
                    >
                      Harga
                      {sortField === "price" && (
                        <i className={`fas fa-sort-${sortDirection === "asc" ? "up" : "down"}`}></i>
                      )}
                    </th>
                    <th
                      className={`sortable ${sortField === "stock" ? "sorted" : ""}`}
                      onClick={() => handleSort("stock")}
                    >
                      Stok
                      {sortField === "stock" && (
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
                    <th>Tindakan</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredProducts.map((product) => (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={selectedProducts.includes(product.id) ? "selected" : ""}
                      >
                        <td className="checkbox-column">
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => toggleProductSelection(product.id)}
                          />
                        </td>
                        <td className="image-column">
                          {product.images[0] ? (
                            <img src={product.images[0] || "/placeholder.svg"} alt={product.name} />
                          ) : (
                            <div className="no-image">Tidak Ada Gambar</div>
                          )}
                        </td>
                        <td className="name-column">
                          <div className="product-name">{product.name}</div>
                          <div className="product-description">{product.description.substring(0, 60)}...</div>
                        </td>
                        <td>{categories.find((c) => c.id === product.category)?.name || product.category}</td>
                        <td>{formatPrice(product.price)}</td>
                        <td>{product.stock}</td>
                        <td className="tags-column">
                          {product.tags.map((tag, index) => (
                            <span key={index} className="tag">
                              {tag}
                            </span>
                          ))}
                        </td>
                        <td>
                          <span className={`status-badge ${product.status}`}>
                            {product.status === "active"
                              ? "Aktif"
                              : product.status === "inactive"
                                ? "Tidak Aktif"
                                : product.status === "out-of-stock"
                                  ? "Stok Habis"
                                  : product.status}
                          </span>
                          {product.featured && <span className="featured-badge">Unggulan</span>}
                        </td>
                        <td className="actions-column">
                          <button className="action-icon-button" onClick={() => handleEditProduct(product)}>
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="action-icon-button danger"
                            onClick={() => {
                              setSelectedProducts([product.id])
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

        {/* Dialog konfirmasi */}
        {confirmationAction && (
          <div className="confirmation-dialog">
            <div className="confirmation-content">
              <h3>Konfirmasi Tindakan</h3>
              <p>
                {confirmationAction.type === "delete"
                  ? `Apakah Anda yakin ingin menghapus ${selectedProducts.length} produk?`
                  : `Apakah Anda yakin ingin ${
                      confirmationAction.type === "active"
                        ? "mengaktifkan"
                        : confirmationAction.type === "inactive"
                          ? "menonaktifkan"
                          : confirmationAction.type === "feature"
                            ? "menjadikan unggulan"
                            : confirmationAction.type === "unfeature"
                              ? "menghapus status unggulan"
                              : confirmationAction.type
                    } ${selectedProducts.length} produk?`}
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

        {/* Notifikasi sukses */}
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

export default ManageProducts
