import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default PrivateRoute 