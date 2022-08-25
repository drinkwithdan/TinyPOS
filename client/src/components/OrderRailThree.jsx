import { OrderDocket } from "./OrderDocket"

export const OrderRailThree = ({ orders, handleOrderStatus }) => {

  const orderOneList = orders.filter((order) => order.status === 3)

  const orderList = orderOneList.map((order) => {
    return <OrderDocket 
      key={order.order_id} 
      order={order}
      handleOrderStatus={handleOrderStatus}
    />
  })

  return (
    <div>
      <h3 className="order-rail-title">Ready</h3>
      <div className="order-rail">
        {orders.length ? orderList : <h3>There are no current orders</h3>}
      </div>
    </div>
  )
}
