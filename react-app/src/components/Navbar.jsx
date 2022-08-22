import { Link } from "react-router-dom"
import { Badge } from '@mui/material'
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import HomeIcon from "@mui/icons-material/Home"

const Navbar = ({ cart }) => {
  return (
    <div className="navbar">

      <div className="left-icon">
        <Link to="/">
          <HomeIcon fontSize="large" sx={{ color: "black" }} />
        </Link>
      </div>

      <div className="logo">
        <h1>Tiny Tacos 🌮 </h1>
      </div>

      <div className="right-icon">
        <Link to="/cart">
          <Badge badgeContent={cart.totalQuantity} color="info">
            <ShoppingCartIcon fontSize="large" sx={{ color: "black" }} />
          </Badge>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
