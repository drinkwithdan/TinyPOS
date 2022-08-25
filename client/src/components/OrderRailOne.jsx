import { OrderDocket } from "./OrderDocket"

export const OrderRailOne = ({ orders, handleOrderStatus }) => {

  const orderOneList = orders.filter((order) => order.status === 1)

  const orderList = orderOneList.map((order) => {
    return <OrderDocket 
      key={order.order_id} 
      order={order} 
      handleOrderStatus={handleOrderStatus} 
    />
  })

  return (
    <div>
      <h3 className="order-rail-title">New</h3>
      <div className="order-rail">
        {orders.length ? orderList : <h3>There are no current orders</h3>}
      </div>
    </div>
  )
}
