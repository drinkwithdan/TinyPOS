import { Link } from "react-router-dom"
// import itemsData from "../data/items-data"
import ItemCard from "./ItemCard"

const ItemList = ({products, cart, addToCart}) => {

  const activeItemsList = products.filter((item) => item.active === true)

  const itemsList = activeItemsList.map((item) => {
    return <ItemCard 
      key={item.item_id} 
      item={item}
      cart={cart}
      addToCart={addToCart}
    />
  })

  return (
    <div className="itemlist">
      <h2>Add items to cart</h2>
      <div className="card-container">
        {products && itemsList}
        <Link to="/cart" className="goto-cart-button">GO TO CART</Link>
      </div>
    </div>
  )
}

export default ItemList
