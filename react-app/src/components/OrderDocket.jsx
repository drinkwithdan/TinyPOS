export const OrderDocket = ({ order }) => {

  const itemsList = order.items.map((item) => {
    return <li key={item.name}>{item.name} x {item.cartQuantity}</li>
  })
  return (
    <div className="order-card">
      <div className="order" key={order.id}>
        <div className="order-title">
          <div>
            <h3>{order.name}</h3>
          </div>
          <div>
            <h3>{order.timestamp}</h3>
          </div>
        </div>
        <ul>
          {itemsList}
        </ul>
      </div>
    </div>
  )
}
