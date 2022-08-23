import { OrderDocket } from "./OrderDocket";

export const OrderRailTwo = ({ orders }) => {

  const orderOneList = orders.filter((order) => order.status === 2)

  const orderList = orderOneList.map((order) => {
    return <OrderDocket key={order.id} order={order} />
  })

  return (
    <div>
      <h3>Prepping</h3>
      <div className="order-rail">
        {orders.length ? orderList : <h3>There are no current orders</h3>}
      </div>
    </div>
  )
}