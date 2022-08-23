import AdminNavbar from "./AdminNavbar"
import LoadingSpinner from "./LoadingSpinner"
import { OrderRailOne } from "./OrderRailOne"
import { OrderRailThree } from "./OrderRailThree"
import { OrderRailTwo } from "./OrderRailTwo"

const Orders = ({ orders, user, handleLogout }) => {
  console.log(orders);
  return (
    <div className="orders">
      <AdminNavbar user={user} handleLogout={handleLogout} />
      <div className="orders-spacer"></div>
      {orders ? <OrderRailOne orders={orders} /> : <LoadingSpinner />}
      {orders ? <OrderRailTwo orders={orders} /> : <LoadingSpinner />}
      {orders ? <OrderRailThree orders={orders} /> : <LoadingSpinner />}
    </div>
  )
}

export default Orders