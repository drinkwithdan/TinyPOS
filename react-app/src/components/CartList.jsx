import CartCard from "./CartCard"
import { Link } from "react-router-dom"

const CartList = ({ cart, removeFromCart }) => {
  const cartList = cart.items.map((item) => {
    return <CartCard item={item} key={item.item_id} removeFromCart={removeFromCart} />
  })

  return (
    <div className="cart-list">
      <h2>Your cart:</h2>
      {cartList}
      <div className="cart-totals">
        <h2>Total: ${cart.subTotal.toFixed(2)}</h2>
      </div>
      <div className="cart-checkout-button">
        <Link to="/checkout" className="goto-checkout-button">CHECKOUT</Link>
        </div>
    </div>
  )
}

export default CartList
