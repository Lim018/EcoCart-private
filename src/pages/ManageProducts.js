"use client"

import React, { useState, useCallback } from "react"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { motion, AnimatePresence } from "framer-motion"
import "../styles/ManageProducts.css"

// Mock data for products
const initialProducts = [
  {
    id: 1,
    name: "Bamboo Toothbrush Set",
    category: "personal-care",
    price: 12.99,
    stock: 150,
    tags: ["bathroom", "eco-friendly", "plastic-free"],
    images: ["/bamboo-toothbrush-set.png"],
    description: "Set of 4 eco-friendly bamboo toothbrushes with charcoal-infused bristles.",
    specifications: {
      material: "Bamboo",
      dimensions: "19cm x 2cm x 2cm",
      weight: "15g",
      packaging: "Recyclable cardboard",
    },
    featured: true,
    status: "active",
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    category: "clothing",
    price: 24.99,
    stock: 75,
    tags: ["apparel", "organic", "fair-trade"],
    images: ["/organic-cotton-tshirt.png"],
    description: "Soft, comfortable t-shirt made from 100% organic cotton.",
    specifications: {
      material: "100% Organic Cotton",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Natural", "Blue", "Green"],
      certification: "GOTS Certified",
    },
    featured: false,
    status: "active",
  },
  {
    id: 3,
    name: "Reusable Produce Bags",
    category: "kitchen",
    price: 15.99,
    stock: 200,
    tags: ["kitchen", "shopping", "zero-waste"],
    images: ["/reusable-produce-bags.png"],
    description: "Set of 5 mesh bags for grocery shopping, perfect for fruits and vegetables.",
    specifications: {
      material: "Organic Cotton Mesh",
      dimensions: "Various sizes",
      weight: "10g per bag",
      washable: "Machine washable",
    },
    featured: true,
    status: "active",
  },
  {
    id: 4,
    name: "Solar Power Bank",
    category: "electronics",
    price: 39.99,
    stock: 50,
    tags: ["tech", "solar", "travel"],
    images: ["/solar-power-bank.png"],
    description: "Portable charger with solar panels for eco-friendly charging on the go.",
    specifications: {
      capacity: "10,000 mAh",
      inputs: "USB-C, Solar",
      outputs: "2x USB-A",
      dimensions: "14cm x 7cm x 1.5cm",
    },
    featured: false,
    status: "active",
  },
  {
    id: 5,
    name: "Beeswax Food Wraps",
    category: "kitchen",
    price: 18.99,
    stock: 120,
    tags: ["kitchen", "food-storage", "plastic-free"],
    images: ["/beeswax-food-wraps.png"],
    description: "Reusable food wraps made from organic cotton and beeswax. A sustainable alternative to plastic wrap.",
    specifications: {
      material: "Organic Cotton, Beeswax, Jojoba Oil",
      sizes: ["S", "M", "L"],
      quantity: "Set of 3",
      washable: "Hand wash with cold water",
    },
    featured: true,
    status: "active",
  },
]

// Available product categories
const categories = [
  { id: "personal-care", name: "Personal Care" },
  { id: "clothing", name: "Clothing" },
  { id: "kitchen", name: "Kitchen" },
  { id: "electronics", name: "Electronics" },
  { id: "home", name: "Home" },
  { id: "outdoor", name: "Outdoor" },
]

// Available tags for autocomplete
const availableTags = [
  "bathroom",
  "eco-friendly",
  "plastic-free",
  "apparel",
  "organic",
  "fair-trade",
  "kitchen",
  "shopping",
  "zero-waste",
  "tech",
  "solar",
  "travel",
  "food-storage",
  "reusable",
  "sustainable",
  "biodegradable",
  "compostable",
  "recycled",
  "vegan",
  "cruelty-free",
  "natural",
  "handmade",
  "local",
  "ethical",
  "minimalist",
]

// Image component for drag and drop
const DraggableImage = ({ image, index, moveImage }) => {
  const ref = React.useRef(null)

  const [{ isDragging }, drag] = useDrag({
    type: "IMAGE",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover: (item, monitor) => {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      moveImage(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  drag(drop(ref))

  return (
    <div
      ref={ref}
      className={`product-image-preview ${isDragging ? "dragging" : ""}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <img src={image || "/placeholder.svg"} alt={`Product ${index + 1}`} />
      <div className="image-overlay">
        <button className="image-action-btn">
          <i className="fas fa-arrows-alt"></i>
        </button>
        <button className="image-action-btn">
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  )
}

// Tag component with autocomplete
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
        {selectedTags.map((tag, index) => (
          <motion.div key={index} className="tag" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <span>{tag}</span>
            <button onClick={() => removeTag(tag)}>×</button>
          </motion.div>
        ))}
      </div>
      <div className="tag-input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add tags..."
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

// Image uploader component
const ImageUploader = ({ images, setImages }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Convert files to image URLs (in a real app, you'd upload these to a server)
      const newImages = acceptedFiles.map((file) => URL.createObjectURL(file))
      setImages([...images, ...newImages])
    },
    [images, setImages],
  )

  const moveImage = (dragIndex, hoverIndex) => {
    const draggedImage = images[dragIndex]
    const newImages = [...images]
    newImages.splice(dragIndex, 1)
    newImages.splice(hoverIndex, 0, draggedImage)
    setImages(newImages)
  }

  return (
    <div className="image-uploader">
      <div className="dropzone" onClick={() => document.getElementById("file-input").click()}>
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            const files = Array.from(e.target.files)
            onDrop(files)
          }}
          style={{ display: "none" }}
        />
        <div className="dropzone-content">
          <i className="fas fa-cloud-upload-alt"></i>
          <p>Drag & drop images here or click to browse</p>
        </div>
      </div>

      <div className="image-previews">
        {images.map((image, index) => (
          <DraggableImage key={index} image={image} index={index} moveImage={moveImage} />
        ))}
      </div>
    </div>
  )
}

// Product form component
const ProductForm = ({ product, setProduct, categories }) => {
  // Get fields based on category
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
              <label>Ingredients</label>
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
              <label>Certifications</label>
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
              <label>Sizes</label>
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
              <label>Colors</label>
              <div className="color-selector">
                {["Natural", "Black", "White", "Blue", "Green", "Red"].map((color) => (
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
              <label>Dimensions</label>
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
              <label>Care Instructions</label>
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
              <label>Power Source</label>
              <select
                value={product.specifications?.powerSource || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    specifications: { ...product.specifications, powerSource: e.target.value },
                  })
                }
              >
                <option value="">Select Power Source</option>
                <option value="Solar">Solar</option>
                <option value="Battery">Battery</option>
                <option value="USB">USB</option>
                <option value="AC">AC</option>
                <option value="Multiple">Multiple</option>
              </select>
            </div>
            <div className="form-group">
              <label>Technical Specifications</label>
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
              <label>Warranty (months)</label>
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
        <label>Product Name</label>
        <input type="text" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Price ($)</label>
        <input
          type="number"
          step="0.01"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: Number.parseFloat(e.target.value) })}
        />
      </div>

      <div className="form-group">
        <label>Stock</label>
        <input
          type="number"
          value={product.stock}
          onChange={(e) => setProduct({ ...product, stock: Number.parseInt(e.target.value) })}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Tags</label>
        <TagSelector selectedTags={product.tags} setSelectedTags={(tags) => setProduct({ ...product, tags })} />
      </div>

      <div className="form-group">
        <label>Status</label>
        <select value={product.status} onChange={(e) => setProduct({ ...product, status: e.target.value })}>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={product.featured}
            onChange={(e) => setProduct({ ...product, featured: e.target.checked })}
          />
          Featured Product
        </label>
      </div>

      {product.category && getCategoryFields()}
    </div>
  )
}

// Main component
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

  // Filter and sort products
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
      if (sortDirection === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1
      } else {
        return a[sortField] < b[sortField] ? 1 : -1
      }
    })

  // Handle sort change
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Handle product selection
  const toggleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    } else {
      setSelectedProducts([...selectedProducts, productId])
    }
  }

  // Handle select all
  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map((product) => product.id))
    }
  }

  // Handle edit product
  const handleEditProduct = (product) => {
    setEditingProduct({ ...product })
    setIsEditing(true)
  }

  // Handle save product
  const handleSaveProduct = () => {
    // Save to undo stack
    setUndoStack([...undoStack, [...products]])
    setRedoStack([])

    if (editingProduct.id) {
      // Update existing product
      setProducts(products.map((p) => (p.id === editingProduct.id ? editingProduct : p)))
    } else {
      // Add new product
      const newProduct = {
        ...editingProduct,
        id: Math.max(...products.map((p) => p.id)) + 1,
      }
      setProducts([...products, newProduct])
    }

    setIsEditing(false)
    setEditingProduct(null)

    // Show confirmation
    setShowConfirmation(true)
    setTimeout(() => setShowConfirmation(false), 3000)
  }

  // Handle cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditingProduct(null)
  }

  // Handle new product
  const handleNewProduct = () => {
    setEditingProduct({
      name: "",
      category: "",
      price: 0,
      stock: 0,
      tags: [],
      images: [],
      description: "",
      specifications: {},
      featured: false,
      status: "draft",
    })
    setIsEditing(true)
  }

  // Handle bulk actions
  const handleBulkAction = (action) => {
    setConfirmationAction({
      type: action,
      callback: () => {
        // Save to undo stack
        setUndoStack([...undoStack, [...products]])
        setRedoStack([])

        switch (action) {
          case "delete":
            setProducts(products.filter((p) => !selectedProducts.includes(p.id)))
            break
          case "activate":
            setProducts(products.map((p) => (selectedProducts.includes(p.id) ? { ...p, status: "active" } : p)))
            break
          case "deactivate":
            setProducts(products.map((p) => (selectedProducts.includes(p.id) ? { ...p, status: "draft" } : p)))
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

  // Handle undo/redo
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
    <DndProvider backend={HTML5Backend}>
      <div className="manage-products-container">
        <div className="admin-header">
          <h1>Manage Products</h1>
          <div className="admin-actions">
            <button className="action-button undo-button" disabled={undoStack.length === 0} onClick={handleUndo}>
              <i className="fas fa-undo"></i> Undo
            </button>
            <button className="action-button redo-button" disabled={redoStack.length === 0} onClick={handleRedo}>
              <i className="fas fa-redo"></i> Redo
            </button>
            <button className="action-button primary-button" onClick={handleNewProduct}>
              <i className="fas fa-plus"></i> Add Product
            </button>
          </div>
        </div>

        {isEditing ? (
          <div className="edit-product-panel">
            <div className="panel-header">
              <h2>{editingProduct.id ? "Edit Product" : "New Product"}</h2>
              <div className="panel-actions">
                <button className="action-button" onClick={handleCancelEdit}>
                  Cancel
                </button>
                <button className="action-button primary-button" onClick={handleSaveProduct}>
                  Save Product
                </button>
              </div>
            </div>

            <div className="panel-content">
              <div className="product-edit-form">
                <div className="form-section">
                  <h3>Product Information</h3>
                  <ProductForm product={editingProduct} setProduct={setEditingProduct} categories={categories} />
                </div>

                <div className="form-section">
                  <h3>Product Images</h3>
                  <ImageUploader
                    images={editingProduct.images}
                    setImages={(images) => setEditingProduct({ ...editingProduct, images })}
                  />
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
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search"></i>
              </div>

              <div className="filter-options">
                <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            {selectedProducts.length > 0 && (
              <div className="bulk-actions">
                <span>{selectedProducts.length} products selected</span>
                <div className="action-buttons">
                  <button className="action-button" onClick={() => handleBulkAction("activate")}>
                    Activate
                  </button>
                  <button className="action-button" onClick={() => handleBulkAction("deactivate")}>
                    Deactivate
                  </button>
                  <button className="action-button" onClick={() => handleBulkAction("feature")}>
                    Feature
                  </button>
                  <button className="action-button" onClick={() => handleBulkAction("unfeature")}>
                    Unfeature
                  </button>
                  <button className="action-button danger-button" onClick={() => handleBulkAction("delete")}>
                    Delete
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
                    <th className="image-column">Image</th>
                    <th
                      className={`sortable ${sortField === "name" ? "sorted" : ""}`}
                      onClick={() => handleSort("name")}
                    >
                      Name
                      {sortField === "name" && (
                        <i className={`fas fa-sort-${sortDirection === "asc" ? "up" : "down"}`}></i>
                      )}
                    </th>
                    <th
                      className={`sortable ${sortField === "category" ? "sorted" : ""}`}
                      onClick={() => handleSort("category")}
                    >
                      Category
                      {sortField === "category" && (
                        <i className={`fas fa-sort-${sortDirection === "asc" ? "up" : "down"}`}></i>
                      )}
                    </th>
                    <th
                      className={`sortable ${sortField === "price" ? "sorted" : ""}`}
                      onClick={() => handleSort("price")}
                    >
                      Price
                      {sortField === "price" && (
                        <i className={`fas fa-sort-${sortDirection === "asc" ? "up" : "down"}`}></i>
                      )}
                    </th>
                    <th
                      className={`sortable ${sortField === "stock" ? "sorted" : ""}`}
                      onClick={() => handleSort("stock")}
                    >
                      Stock
                      {sortField === "stock" && (
                        <i className={`fas fa-sort-${sortDirection === "asc" ? "up" : "down"}`}></i>
                      )}
                    </th>
                    <th>Tags</th>
                    <th
                      className={`sortable ${sortField === "status" ? "sorted" : ""}`}
                      onClick={() => handleSort("status")}
                    >
                      Status
                      {sortField === "status" && (
                        <i className={`fas fa-sort-${sortDirection === "asc" ? "up" : "down"}`}></i>
                      )}
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
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
                        {product.images.length > 0 ? (
                          <img src={product.images[0] || "/placeholder.svg"} alt={product.name} />
                        ) : (
                          <div className="no-image">No Image</div>
                        )}
                      </td>
                      <td>{product.name}</td>
                      <td>{categories.find((c) => c.id === product.category)?.name || product.category}</td>
                      <td>${product.price.toFixed(2)}</td>
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
                          {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                        </span>
                        {product.featured && <span className="featured-badge">Featured</span>}
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
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Confirmation dialog */}
        {confirmationAction && (
          <div className="confirmation-dialog">
            <div className="confirmation-content">
              <h3>Confirm Action</h3>
              <p>
                {confirmationAction.type === "delete"
                  ? `Are you sure you want to delete ${selectedProducts.length} product(s)?`
                  : `Are you sure you want to ${confirmationAction.type} ${selectedProducts.length} product(s)?`}
              </p>
              <div className="confirmation-actions">
                <button className="action-button" onClick={() => setConfirmationAction(null)}>
                  Cancel
                </button>
                <button
                  className={`action-button ${confirmationAction.type === "delete" ? "danger-button" : "primary-button"}`}
                  onClick={() => {
                    confirmationAction.callback()
                    setConfirmationAction(null)
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success notification */}
        <AnimatePresence>
          {showConfirmation && (
            <motion.div
              className="success-notification"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
            >
              <i className="fas fa-check-circle"></i>
              <span>Changes saved successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DndProvider>
  )
}

export default ManageProducts
