import { Navigate } from "react-router-dom"
import LoadingSpinner from "./LoadingSpinner"

const ProtectedRoute = ({ user, children }) => {
  if (user) {
    return children
  } else if (user === null) {
    return <LoadingSpinner />
  } else {
    return <Navigate to="/users/login" />
  }
}

export default ProtectedRoute