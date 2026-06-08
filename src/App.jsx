import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminRoute from "./components/AdminRoute"

import Home from "./pages/Home"
import BrowseItems from "./pages/BrowseItems"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import PostLostItem from "./pages/PostLostItem"
import PostFoundItem from "./pages/PostFoundItem"
import ItemDetails from "./pages/ItemDetails"
import MyPosts from "./pages/MyPosts"
import AdminDashboard from "./pages/AdminDashboard"
import About from "./pages/About"
import NotFound from "./pages/NotFound"

function AppLayout() {
  const location = useLocation()

  const validRoutes = [
    "/",
    "/browse",
    "/login",
    "/signup",
    "/about",
    "/dashboard",
    "/post-lost",
    "/post-found",
    "/my-posts",
    "/admin",
  ]

  const isItemDetailsPage = location.pathname.startsWith("/items/")
  const isValidRoute =
    validRoutes.includes(location.pathname) || isItemDetailsPage

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <ScrollToTop />

      {isValidRoute && <Navbar />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<BrowseItems />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/items/:id" element={<ItemDetails />} />
          <Route path="/about" element={<About />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/post-lost"
            element={
              <ProtectedRoute>
                <PostLostItem />
              </ProtectedRoute>
            }
          />

          <Route
            path="/post-found"
            element={
              <ProtectedRoute>
                <PostFoundItem />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-posts"
            element={
              <ProtectedRoute>
                <MyPosts />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {isValidRoute && <Footer />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App