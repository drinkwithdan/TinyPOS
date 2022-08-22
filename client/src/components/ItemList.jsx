import { Link } from "react-router-dom"
// import itemsData from "../data/items-data"
import ItemCard from "./ItemCard"

const ItemList = ({products, cart, addToCart}) => {

  const itemsList = products.map((item) => {
    return <ItemCard 
      key={item.item_id} 
      item={item}
      cart={cart}
      addToCart={addToCart}
    />
  })

  return (
    <div className="itemlist">
      <div className="card-container">
        <h2>Add items to cart</h2>
        {products && itemsList}
        <Link to="/cart" className="goto-cart-button">GO TO CART</Link>
      </div>
    </div>
  )
}

export default ItemList
