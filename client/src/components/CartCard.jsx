const CartCard = ({ item, removeFromCart }) => {

  // Handles delete button clicks
  const handleClick = () => {
    removeFromCart(item)
  }

  return (
    <div className="cart-card">
      <div className="cart-card-text">
        <div>
          {item.name}
        </div>
        <div>
          ({item.cartQuantity} in cart)
        </div>
      </div>
      <div className="cart-card-list-right">
        <div style={{ margin: "5px" }}>
          ${(item.price * item.cartQuantity).toFixed(2)}
        </div>
        <button
          className="cart-card-delete"
          onClick={handleClick}
        >
          REMOVE
        </button>
      </div>
    </div>
  )
}

export default CartCard