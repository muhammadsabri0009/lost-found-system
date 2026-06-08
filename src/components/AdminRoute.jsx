import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function AdminRoute({ children }) {
  const { currentUser, userData } = useAuth()

  if (!currentUser) {
    return <Navigate to="/login" />
  }

  if (userData?.role !== "admin") {
    return <Navigate to="/dashboard" />
  }

  return children
}

export default AdminRoute