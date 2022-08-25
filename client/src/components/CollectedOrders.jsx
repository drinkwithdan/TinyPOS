import AdminNavbar from "./AdminNavbar"
import LoadingSpinner from "./LoadingSpinner"
import { OrderDocket } from "./OrderDocket"

const CollectedOrders = ({ orders, user, handleLogout, handleOrderStatus }) => {

  const collectedOrderList = orders.filter((order) => order.status === 4)

  const orderList = collectedOrderList.map((order) => {
    return <OrderDocket order={order} handleOrderStatus={handleOrderStatus} />
  })
  
  return (
    <div className="collected-orders">
      <AdminNavbar user={user} />
      <h3 className="collected-title">Collected orders</h3>
      <div className="collected-container">
        {orders ? orderList : <LoadingSpinner />}
      </div>
    </div>
  )
}

export default CollectedOrders