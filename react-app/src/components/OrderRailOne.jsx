import { OrderDocket } from "./OrderDocket"

export const OrderRailOne = ({ orders }) => {
  console.log(orders);
  const orderOneList = orders.filter((order) => {
      return order.status === 1
    })

  const orderList = orderOneList.map((order) => {
    return <OrderDocket key={order.id} order={order} />
  })

  return (
    <div>
      <h3>Order Rail 1</h3>
      <div className="order-rail">
        {orders.length ? orderList : <h3>There are no current orders</h3>}
      </div>
    </div>
  )
}
