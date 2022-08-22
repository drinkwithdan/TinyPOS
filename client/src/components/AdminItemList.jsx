import { Link } from "react-router-dom"
// import itemsData from "../data/items-data"
import ItemCard from "./ItemCard"

const AdminItemList = ({products, handleDelete}) => {

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
        <h2>Add items to cart</h2>
        {products && itemsList}
      </div>
    </div>
  )
}

export default AdminItemList