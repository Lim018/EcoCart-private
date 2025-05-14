// Fungsi untuk mendapatkan data pengguna
export const getUserData = async () => {
    // Simulasi API call dengan timeout
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: "user123",
          name: "Andi Wijaya",
          email: "andi.wijaya@example.com",
          phone: "081234567890",
          address: "Jl. Sudirman No. 123",
          city: "Jakarta",
          postalCode: "12345",
          province: "DKI Jakarta",
          country: "Indonesia",
          profileImage: "/diverse-group-profile.png",
          sustainabilityStats: {
            plasticSaved: 2450,
            waterSaved: 5680,
            co2Reduced: 320,
            energySaved: 450,
          },
          recentActivity: [
            {
              type: "purchase",
              description: "Membeli Bamboo Toothbrush Set",
              date: "2 hari yang lalu",
            },
            {
              type: "badge",
              description: "Mendapatkan badge 'Plastic Reducer'",
              date: "5 hari yang lalu",
            },
            {
              type: "review",
              description: "Menulis ulasan untuk Reusable Produce Bags",
              date: "1 minggu yang lalu",
            },
            {
              type: "purchase",
              description: "Membeli Organic Cotton T-shirt",
              date: "2 minggu yang lalu",
            },
          ],
          orders: [
            {
              id: "ord001",
              orderNumber: "ECO-12345",
              date: "15 Mei 2023",
              status: "delivered",
              totalAmount: 350000,
              subtotal: 320000,
              shippingCost: 15000,
              tax: 15000,
              trackingSteps: [
                {
                  title: "Pesanan Diterima",
                  date: "15 Mei 2023, 10:30",
                  completed: true,
                },
                {
                  title: "Pesanan Diproses",
                  date: "15 Mei 2023, 14:45",
                  completed: true,
                },
                {
                  title: "Pesanan Dikirim",
                  date: "16 Mei 2023, 09:15",
                  completed: true,
                },
                {
                  title: "Pesanan Tiba",
                  date: "18 Mei 2023, 13:20",
                  completed: true,
                },
              ],
              items: [
                {
                  id: "item001",
                  name: "Bamboo Toothbrush Set",
                  variant: "Soft Bristle",
                  quantity: 2,
                  price: 75000,
                  image: "/bamboo-toothbrush-set.png",
                },
                {
                  id: "item002",
                  name: "Reusable Produce Bags",
                  variant: "Set of 5",
                  quantity: 1,
                  price: 120000,
                  image: "/reusable-produce-bags.png",
                },
                {
                  id: "item003",
                  name: "Beeswax Food Wraps",
                  variant: "Mixed Sizes",
                  quantity: 1,
                  price: 150000,
                  image: "/beeswax-food-wraps.png",
                },
              ],
            },
            {
              id: "ord002",
              orderNumber: "ECO-12346",
              date: "2 Juni 2023",
              status: "shipped",
              totalAmount: 450000,
              subtotal: 420000,
              shippingCost: 15000,
              tax: 15000,
              trackingSteps: [
                {
                  title: "Pesanan Diterima",
                  date: "2 Juni 2023, 15:20",
                  completed: true,
                },
                {
                  title: "Pesanan Diproses",
                  date: "3 Juni 2023, 09:30",
                  completed: true,
                },
                {
                  title: "Pesanan Dikirim",
                  date: "3 Juni 2023, 16:45",
                  completed: true,
                },
                {
                  title: "Pesanan Tiba",
                  date: "",
                  completed: false,
                },
              ],
              items: [
                {
                  id: "item004",
                  name: "Organic Cotton T-shirt",
                  variant: "M, Navy Blue",
                  quantity: 1,
                  price: 250000,
                  image: "/organic-cotton-tshirt.png",
                },
                {
                  id: "item005",
                  name: "Solar Power Bank",
                  variant: "10000mAh",
                  quantity: 1,
                  price: 200000,
                  image: "/solar-power-bank.png",
                },
              ],
            },
            {
              id: "ord003",
              orderNumber: "ECO-12347",
              date: "10 Juni 2023",
              status: "processing",
              totalAmount: 180000,
              subtotal: 150000,
              shippingCost: 15000,
              tax: 15000,
              trackingSteps: [
                {
                  title: "Pesanan Diterima",
                  date: "10 Juni 2023, 11:15",
                  completed: true,
                },
                {
                  title: "Pesanan Diproses",
                  date: "",
                  completed: false,
                },
                {
                  title: "Pesanan Dikirim",
                  date: "",
                  completed: false,
                },
                {
                  title: "Pesanan Tiba",
                  date: "",
                  completed: false,
                },
              ],
              items: [
                {
                  id: "item006",
                  name: "Herb Garden Kit",
                  variant: "Basic",
                  quantity: 1,
                  price: 150000,
                  image: "/herb-garden-kit.png",
                },
              ],
            },
          ],
          wishlist: [
            {
              id: "wish001",
              name: "Bamboo Cutlery Set",
              price: 85000,
              inStock: true,
              sustainabilityScore: 90,
              image: "/bamboo-cutlery-set.png",
            },
            {
              id: "wish002",
              name: "Stainless Steel Water Bottle",
              originalPrice: 180000,
              discountPrice: 150000,
              inStock: true,
              sustainabilityScore: 85,
              image: "/stainless-steel-bottle.png",
            },
            {
              id: "wish003",
              name: "Recycled Paper Notebook",
              price: 65000,
              inStock: false,
              sustainabilityScore: 75,
              image: "/recycled-paper-notebook.png",
            },
            {
              id: "wish004",
              name: "Organic Cotton Bedding",
              price: 850000,
              inStock: true,
              sustainabilityScore: 95,
              image: "/placeholder.svg?key=rcfmv",
            },
          ],
          recommendations: [
            {
              id: "rec001",
              name: "Bamboo Dish Brush",
              price: 45000,
              image: "/placeholder.svg?key=ut1l2",
              isNew: true,
              sustainabilityScore: 85,
              recommendationReason: "Berdasarkan pembelian Bamboo Toothbrush Set",
            },
            {
              id: "rec002",
              name: "Organic Cotton Tote Bag",
              originalPrice: 120000,
              discountPrice: 95000,
              discount: 20,
              image: "/organic-cotton-tote-bag.png",
              sustainabilityScore: 90,
              recommendationReason: "Pelanggan yang membeli Reusable Produce Bags juga membeli ini",
            },
            {
              id: "rec003",
              name: "Natural Deodorant",
              price: 85000,
              image: "/natural-deodorant.png",
              sustainabilityScore: 80,
              recommendationReason: "Produk populer dalam kategori Personal Care",
            },
            {
              id: "rec004",
              name: "Reusable Coffee Cup",
              price: 125000,
              image: "/placeholder.svg?key=t9xmq",
              isNew: true,
              sustainabilityScore: 85,
              recommendationReason: "Berdasarkan preferensi produk ramah lingkungan Anda",
            },
            {
              id: "rec005",
              name: "Shampoo Bar",
              originalPrice: 75000,
              discountPrice: 60000,
              discount: 20,
              image: "/solid-shampoo-bar.png",
              sustainabilityScore: 95,
              recommendationReason: "Produk bebas plastik untuk perawatan rambut",
            },
          ],
          badges: [
            {
              id: "badge001",
              name: "Plastic Reducer",
              category: "Pengurangan Plastik",
              unlocked: true,
              dateUnlocked: "5 Mei 2023",
              description: "Menghindari penggunaan 1 kg plastik sekali pakai melalui pembelian produk ramah lingkungan.",
              achievementDetails: "Anda telah menghindari 1.2 kg plastik sekali pakai!",
              icon: "/placeholder.svg?key=ybsr5",
              relatedBadges: [
                {
                  id: "badge002",
                  name: "Plastic Warrior",
                  icon: "/placeholder.svg?key=nxepu",
                },
              ],
            },
            {
              id: "badge002",
              name: "Plastic Warrior",
              category: "Pengurangan Plastik",
              unlocked: false,
              progress: 2.5,
              target: 5,
              requirement: "Hindari penggunaan 5 kg plastik sekali pakai melalui pembelian produk ramah lingkungan.",
              description: "Menghindari penggunaan 5 kg plastik sekali pakai melalui pembelian produk ramah lingkungan.",
              icon: "/placeholder.svg?key=sbydu",
            },
            {
              id: "badge003",
              name: "Eco Shopper",
              category: "Belanja Berkelanjutan",
              unlocked: true,
              dateUnlocked: "20 April 2023",
              description: "Melakukan 5 pembelian produk ramah lingkungan.",
              achievementDetails: "Anda telah melakukan 7 pembelian produk ramah lingkungan!",
              icon: "/placeholder.svg?height=100&width=100&query=eco%20shopper%20badge",
            },
            {
              id: "badge004",
              name: "Eco Enthusiast",
              category: "Belanja Berkelanjutan",
              unlocked: false,
              progress: 12,
              target: 20,
              requirement: "Lakukan 20 pembelian produk ramah lingkungan.",
              description: "Melakukan 20 pembelian produk ramah lingkungan.",
              icon: "/placeholder.svg?height=100&width=100&query=eco%20enthusiast%20badge",
            },
            {
              id: "badge005",
              name: "Water Saver",
              category: "Konservasi Air",
              unlocked: true,
              dateUnlocked: "10 Mei 2023",
              description: "Menghemat 1000 liter air melalui pembelian produk hemat air.",
              achievementDetails: "Anda telah menghemat 1250 liter air!",
              icon: "/placeholder.svg?height=100&width=100&query=water%20saver%20badge",
            },
            {
              id: "badge006",
              name: "Carbon Reducer",
              category: "Pengurangan Karbon",
              unlocked: false,
              progress: 150,
              target: 300,
              requirement: "Kurangi 300 kg emisi karbon melalui pembelian produk ramah lingkungan.",
              description: "Mengurangi 300 kg emisi karbon melalui pembelian produk ramah lingkungan.",
              icon: "/placeholder.svg?height=100&width=100&query=carbon%20reducer%20badge",
            },
          ],
          paymentMethods: [
            {
              id: "pm001",
              type: "visa",
              cardNumber: "**** **** **** 1234",
              cardHolder: "Andi Wijaya",
              expiryDate: "05/25",
              cvv: "***",
              isDefault: true,
            },
            {
              id: "pm002",
              type: "mastercard",
              cardNumber: "**** **** **** 5678",
              cardHolder: "Andi Wijaya",
              expiryDate: "08/24",
              cvv: "***",
              isDefault: false,
            },
          ],
          settings: {
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
        })
      }, 1000)
    })
  }
  
  // Fungsi untuk memformat harga dalam Rupiah
  export const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }
  
  // Fungsi untuk memformat persentase
  export const formatPercentage = (value) => {
    return `${Math.round(value)}%`
  }
  
  // Fungsi untuk mendapatkan status pesanan dalam bahasa Indonesia
  export const getOrderStatusText = (status) => {
    const statusMap = {
      processing: "Diproses",
      shipped: "Dikirim",
      delivered: "Diterima",
      cancelled: "Dibatalkan",
    }
    return statusMap[status] || status
  }
  
  // Fungsi untuk mendapatkan warna status pesanan
  export const getOrderStatusColor = (status) => {
    const colorMap = {
      processing: "#ff9800",
      shipped: "#2196f3",
      delivered: "#4caf50",
      cancelled: "#f44336",
    }
    return colorMap[status] || "#888"
  }
  
  // Fungsi untuk memvalidasi email
  export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }
  
  // Fungsi untuk memvalidasi nomor telepon
  export const validatePhone = (phone) => {
    const re = /^[0-9]{10,13}$/
    return re.test(phone)
  }
  
  // Fungsi untuk memvalidasi kode pos
  export const validatePostalCode = (postalCode) => {
    const re = /^[0-9]{5}$/
    return re.test(postalCode)
  }
  
  // Fungsi untuk memvalidasi nomor kartu kredit
  export const validateCreditCard = (cardNumber) => {
    const re = /^[0-9]{16}$/
    return re.test(cardNumber)
  }
  
  // Fungsi untuk memvalidasi tanggal kedaluwarsa kartu kredit
  export const validateExpiryDate = (expiryDate) => {
    const re = /^(0[1-9]|1[0-2])\/([0-9]{2})$/
    if (!re.test(expiryDate)) return false
  
    const [month, year] = expiryDate.split("/")
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear() % 100
    const currentMonth = currentDate.getMonth() + 1
  
    const expiryYear = Number.parseInt(year, 10)
    const expiryMonth = Number.parseInt(month, 10)
  
    if (expiryYear < currentYear) return false
    if (expiryYear === currentYear && expiryMonth < currentMonth) return false
  
    return true
  }
  
  // Fungsi untuk memvalidasi CVV
  export const validateCVV = (cvv) => {
    const re = /^[0-9]{3,4}$/
    return re.test(cvv)
  }
  
  // Fungsi untuk mendapatkan jenis kartu kredit berdasarkan nomor kartu
  export const getCreditCardType = (cardNumber) => {
    const firstDigit = cardNumber.charAt(0)
    const firstTwoDigits = cardNumber.substring(0, 2)
  
    if (firstDigit === "4") return "visa"
    if (firstTwoDigits >= "51" && firstTwoDigits <= "55") return "mastercard"
    if (firstTwoDigits === "34" || firstTwoDigits === "37") return "amex"
    return "unknown"
  }
  
  // Fungsi untuk memformat nomor kartu kredit
  export const formatCreditCardNumber = (cardNumber) => {
    if (!cardNumber) return ""
    const cardType = getCreditCardType(cardNumber)
    const groups = cardType === "amex" ? [4, 6, 5] : [4, 4, 4, 4]
  
    let formattedNumber = ""
    let currentPosition = 0
  
    for (const groupLength of groups) {
      if (currentPosition + groupLength <= cardNumber.length) {
        formattedNumber += cardNumber.substring(currentPosition, currentPosition + groupLength)
        if (currentPosition + groupLength < cardNumber.length) {
          formattedNumber += " "
        }
        currentPosition += groupLength
      }
    }
  
    return formattedNumber
  }
  
  // Fungsi untuk memformat tanggal kedaluwarsa kartu kredit
  export const formatExpiryDate = (input) => {
    const cleaned = input.replace(/\D/g, "")
    if (cleaned.length > 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`
    }
    return cleaned
  }
  
  // Fungsi untuk menghasilkan ID unik
  export const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
  
  // Fungsi untuk mendapatkan tanggal saat ini dalam format Indonesia
  export const getCurrentDate = () => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date().toLocaleDateString("id-ID", options)
  }
  
  // Fungsi untuk mendapatkan waktu saat ini dalam format Indonesia
  export const getCurrentTime = () => {
    const options = { hour: "2-digit", minute: "2-digit" }
    return new Date().toLocaleTimeString("id-ID", options)
  }
  
  // Fungsi untuk mendapatkan tanggal dan waktu saat ini dalam format Indonesia
  export const getCurrentDateTime = () => {
    return `${getCurrentDate()}, ${getCurrentTime()}`
  }
  