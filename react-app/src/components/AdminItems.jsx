import { Link } from "react-router-dom"
// import itemsData from "../data/items-data"
import AdminItemCard from "./AdminItemCard"

const AdminItems = ({products, handleDelete}) => {

  const itemsList = products.map((item) => {
    return <AdminItemCard 
      key={item.item_id} 
      item={item}
      handleDelete={handleDelete}
    />
  })

  return (
    <div className="itemlist">
      <div className="card-container">
        <h2>Current Products:</h2>
        <Link to="/items/new" className="goto-cart-button">ADD NEW ITEM</Link>
        {products && itemsList}
      </div>
    </div>
  )
}

export default AdminItems