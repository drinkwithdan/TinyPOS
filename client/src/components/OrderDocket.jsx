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
            <h3>{new Date(order.timestamp).toLocaleString("en-US", { hour: "2-digit", minute: "2-digit" }, { timeZone: "Australia/Melbourne" })}</h3>
          </div>
        </div>
        <ul>
          {itemsList}
        </ul>
        <div>
          <button>ACCEPT</button>
        </div>
      </div>
    </div>
  )
}
