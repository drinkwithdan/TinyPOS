export const OrderDocket = ({ order, handleOrderStatus }) => {

  const handleClick = () => {
    handleOrderStatus(order.order_id, order.status + 1)
  }

  const itemsList = order.items.map((item) => {
    return <li key={item.item_id}>{item.item_name} x {item.quantity}</li>
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
          <button className="docket-button" onClick={handleClick}>
            NEXT RAIL
          </button>
        </div>
      </div>
    </div>
  )
}
