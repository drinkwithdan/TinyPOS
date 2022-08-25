import { Link } from "react-router-dom"
import PersonIcon from "@mui/icons-material/Person"
import HomeIcon from "@mui/icons-material/Home"
import AssignmentIcon from '@mui/icons-material/Assignment'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'

const AdminNavbar = ({ user, handleLogout }) => {
  return (
    <div className="admin-navbar">
      <div className="navbar-spaced"></div>

      <div className="left-icon">
        <Link to="/items">
          <HomeIcon fontSize="large" sx={{ color: "black" }} />
        </Link>
      </div>

      <div className="orders-logo">
        <Link to="/orders">
          <AssignmentIcon fontSize="large" sx={{ color: "black" }} />
        </Link>
      </div>

      <div className="logo">
        <h1>Admin</h1>
      </div>

      <div className="completed-logo">
        <Link to="/orders/collected">
          <AssignmentTurnedInIcon fontSize="large" sx={{ color: "black"  }} />
        </Link>
      </div>

      <div className="right-icon">
        {user ?
          <button onClick={handleLogout} className="logout-button" >
            LOGOUT 
            {/* <PersonIcon fontSize="small" sx={{ color: "red" }} />  */}
          </button>
          :
          <Link to="/users/login" className="login-button">
            LOGIN 
            {/* <PersonIcon fontSize="medium" sx={{ color: "green" }} /> */}
          </Link>
        }
      </div>

      <div className="navbar-spaced"></div>
    </div>
  )
}

export default AdminNavbar
