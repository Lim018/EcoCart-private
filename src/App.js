import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import LandingPage from "./pages/LandingPage"
import ArticleArchive from "./pages/ArticleArchive"
import ArticleDetail from "./pages/ArticleDetail"
import ProductCatalog from "./pages/ProductCatalog"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import TransactionHistory from "./pages/TransactionHistory"
import ManageArticles from "./pages/ManageArticles"
import ManageProducts from "./pages/ManageProducts"
import ManageUsers from "./pages/ManageUsers"
import ManageTransactions from "./pages/ManageTransactions"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/articles" element={<ArticleArchive />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/products" element={<ProductCatalog />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/transactions" element={<TransactionHistory />} />
          <Route path="/admin/articles" element={<ManageArticles />} />
          <Route path="/admin/products" element={<ManageProducts />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/transactions" element={<ManageTransactions />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
