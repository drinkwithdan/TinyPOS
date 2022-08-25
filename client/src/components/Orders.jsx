import AdminNavbar from "./AdminNavbar"
import LoadingSpinner from "./LoadingSpinner"
import { OrderRailOne } from "./OrderRailOne"
import { OrderRailThree } from "./OrderRailThree"
import { OrderRailTwo } from "./OrderRailTwo"

const Orders = ({ orders, user, handleLogout, handleOrderStatus }) => {
  // console.log(orders);
  return (
    <div className="orders">
      <AdminNavbar user={user} handleLogout={handleLogout} />
      <div className="orders-spacer"></div>
      {orders ? <OrderRailOne orders={orders} handleOrderStatus={handleOrderStatus} /> : <LoadingSpinner />}
      {orders ? <OrderRailTwo orders={orders} handleOrderStatus={handleOrderStatus} /> : <LoadingSpinner />}
      {orders ? <OrderRailThree orders={orders} handleOrderStatus={handleOrderStatus} /> : <LoadingSpinner />}
    </div>
  )
}

export default Orders