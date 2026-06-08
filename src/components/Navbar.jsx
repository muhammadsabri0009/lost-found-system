import { useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar() {
  const { currentUser, logout, userData } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  async function handleLogout() {
    try {
      await logout()
      setMenuOpen(false)
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-white text-blue-700 font-semibold"
        : "text-white hover:bg-blue-600 hover:text-white"
    }`

  const mobileLinkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-white text-blue-700 font-semibold"
        : "text-white hover:bg-blue-700"
    }`

  return (
    <nav className="bg-blue-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          onClick={closeMenu}
          className="text-2xl font-bold tracking-wide hover:text-blue-100 transition"
        >
          Lost & Found
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden bg-white text-blue-700 px-3 py-1 rounded-lg font-bold hover:bg-blue-50 transition"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <div className="hidden md:flex gap-2 text-sm font-medium items-center">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/browse" className={navLinkClass}>
            Browse
          </NavLink>

          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>

          {currentUser && userData?.role === "student" && (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                Student Dashboard
              </NavLink>

              <NavLink to="/post-lost" className={navLinkClass}>
                Post Lost
              </NavLink>

              <NavLink to="/post-found" className={navLinkClass}>
                Post Found
              </NavLink>

              <NavLink to="/my-posts" className={navLinkClass}>
                My Posts
              </NavLink>
            </>
          )}

          {currentUser && userData?.role === "admin" && (
            <NavLink to="/admin" className={navLinkClass}>
              Admin Dashboard
            </NavLink>
          )}

          {currentUser && (
            <button
              onClick={handleLogout}
              className="ml-2 bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 hover:text-red-600 transition-all duration-200 shadow-sm"
            >
              Logout
            </button>
          )}

          {!currentUser && (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 shadow-sm"
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-2 text-sm font-medium bg-blue-800">
          <NavLink onClick={closeMenu} to="/" className={mobileLinkClass}>
            Home
          </NavLink>

          <NavLink onClick={closeMenu} to="/browse" className={mobileLinkClass}>
            Browse
          </NavLink>

          <NavLink onClick={closeMenu} to="/about" className={mobileLinkClass}>
            About
          </NavLink>

          {currentUser && userData?.role === "student" && (
            <>
              <NavLink
                onClick={closeMenu}
                to="/dashboard"
                className={mobileLinkClass}
              >
                Student Dashboard
              </NavLink>

              <NavLink
                onClick={closeMenu}
                to="/post-lost"
                className={mobileLinkClass}
              >
                Post Lost
              </NavLink>

              <NavLink
                onClick={closeMenu}
                to="/post-found"
                className={mobileLinkClass}
              >
                Post Found
              </NavLink>

              <NavLink
                onClick={closeMenu}
                to="/my-posts"
                className={mobileLinkClass}
              >
                My Posts
              </NavLink>
            </>
          )}

          {currentUser && userData?.role === "admin" && (
            <NavLink onClick={closeMenu} to="/admin" className={mobileLinkClass}>
              Admin Dashboard
            </NavLink>
          )}

          {currentUser && (
            <button
              onClick={handleLogout}
              className="w-full bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 hover:text-red-600 transition"
            >
              Logout
            </button>
          )}

          {!currentUser && (
            <>
              <NavLink
                onClick={closeMenu}
                to="/login"
                className={mobileLinkClass}
              >
                Login
              </NavLink>

              <NavLink
                onClick={closeMenu}
                to="/signup"
                className="block bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold text-center hover:bg-blue-50 transition"
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar