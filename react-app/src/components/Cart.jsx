import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import Header from "./Header"
import Footer from "./Footer"
import CartList from './CartList'

const Cart = ({ cart, removeFromCart }) => {
  return (
    <div className="cart">
      <Navbar cart={cart} />
      <Header />
      {cart.items.length ? 
        <CartList 
          cart={cart} 
          removeFromCart={removeFromCart} 
        /> : <h3>There's nothing in your cart</h3>
      }
      <Link to="/" className="goto-home-button" >
        BACK TO HOME
      </Link>
      <Footer />
    </div>
  )
}

export default Cart
