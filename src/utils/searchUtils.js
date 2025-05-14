// Fungsi debounce untuk mengurangi API calls
export const debounce = (func, wait) => {
    let timeout
  
    const debounced = function (...args) {
      
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(this, args), wait)
    }
  
    debounced.cancel = () => {
      clearTimeout(timeout)
    }
  
    return debounced
  }
  
  // Fungsi untuk menyorot teks yang cocok dengan query
  export const highlightMatch = (text, query) => {
    if (!query) return text
  
    const parts = text.split(new RegExp(`(${query})`, "gi"))
  
    return parts
      .map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? `<span class="highlight">${part}</span>` : part,
      )
      .join("")
  }
  
  // Fungsi untuk memfilter produk berdasarkan query dan filter
  export const filterProducts = (products, query, filters) => {
    let filteredProducts = [...products]
  
    // Filter berdasarkan query
    if (query) {
      const lowerQuery = query.toLowerCase()
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerQuery) ||
          product.category.toLowerCase().includes(lowerQuery) ||
          product.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
      )
    }
  
    // Filter berdasarkan filter aktif
    if (filters.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.every((filter) => {
          const [type, value] = filter.split(":")
  
          switch (type) {
            case "category":
              return product.category === value
            case "price":
              const [min, max] = value.split("-").map(Number)
              return product.price >= min && product.price <= max
            case "rating":
              return product.rating >= Number(value)
            case "eco_score":
              return product.eco_score >= Number(value)
            case "tag":
              return product.tags.includes(value)
            default:
              return true
          }
        }),
      )
    }
  
    return filteredProducts
  }
  
  // Fungsi untuk mengurutkan produk
  export const sortProducts = (products, sortOption) => {
    const sortedProducts = [...products]
  
    switch (sortOption) {
      case "price_low":
        sortedProducts.sort((a, b) => a.price - b.price)
        break
      case "price_high":
        sortedProducts.sort((a, b) => b.price - a.price)
        break
      case "rating":
        sortedProducts.sort((a, b) => b.rating - a.rating)
        break
      case "eco_score":
        sortedProducts.sort((a, b) => b.eco_score - a.eco_score)
        break
      default: // relevance - no additional sorting
        break
    }
  
    return sortedProducts
  }
  
  // Fungsi untuk menghasilkan kueri terkait
  export const generateRelatedQueries = (query, products) => {
    if (!query) return []
  
    // Ekstrak kata kunci dari produk
    const keywords = new Set()
  
    products.forEach((product) => {
      keywords.add(product.category.toLowerCase())
      product.tags.forEach((tag) => keywords.add(tag.toLowerCase()))
    })
  
    // Filter kata kunci yang terkait dengan query
    const lowerQuery = query.toLowerCase()
    const relatedKeywords = Array.from(keywords).filter(
      (keyword) => keyword.includes(lowerQuery) || lowerQuery.includes(keyword),
    )
  
    // Batasi jumlah kueri terkait
    return relatedKeywords.slice(0, 5)
  }
  