import { Link } from "react-router-dom"
// import itemsData from "../data/items-data"
import AdminNavbar from "./AdminNavbar"
import AdminItemCard from "./AdminItemCard"
import LoadingSpinner from "./LoadingSpinner"

const AdminItems = ({products, user, handleLogout, handleDelete}) => {

  const itemsList = products.map((item) => {
    return <AdminItemCard 
      key={item.item_id} 
      item={item}
      handleDelete={handleDelete}
    />
  })

  return (
    <div className="itemlist">
      <AdminNavbar user={user} handleLogout={handleLogout} />
      <div className="card-container">
        <Link to="/orders" className="goto-cart-button">VIEW ORDERS</Link>
        <Link to="/items/new" className="goto-cart-button">ADD NEW ITEM</Link>
        {products ? itemsList : <LoadingSpinner />}
      </div>
    </div>
  )
}

export default AdminItems