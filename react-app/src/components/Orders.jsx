import { OrderRailOne } from "./OrderRailOne"

// // REDUNDANT CODE?
// const Order = (order) => {
//   const itemsList = order.order.items.map((item) => {
//     return <li>{item.name} x {item.cartQuantity}</li>
//   })
//   return (
//     <div className="order">
//       <h3>{order.order.name}</h3>
//       <h3>{order.order.contact}</h3>
//       <ul>
//         {itemsList}
//       </ul>
//     </div>
//   )
// }

const Orders = ({ orders }) => {

  return (
    <div className="orders">
      <h1>Orders</h1>
      <OrderRailOne orders={orders}/>
    </div>
  )
}

export default Orders