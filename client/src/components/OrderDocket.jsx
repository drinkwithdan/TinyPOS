export const OrderDocket = ({ order, handleOrderStatus }) => {

  const handleNextStatusClick = () => {
    handleOrderStatus(order.order_id, order.status + 1)
  }

  // Text displayed on each button
  const buttonCodes = {
    1: "ACCEPT",
    2: "READY",
    3: "COLLECTED",
    4: "ARCHIVE"
  }

  const itemsList = order.items.map((item) => {
    return <div key={item.item_id} className="order-item">
      <div className="order-item-name">{item.item_name}</div>
      <div className="order-item-quantity">x {item.quantity}</div>
    </div>
  })
  return (
    <div className="order-card">
      <div className="order" key={order.id}>
        <div className="order-title">
          <div className="order-title-name">
            <h3>{order.name}</h3>
          </div>
          <div className="order-title-time">
            {new Date(order.timestamp).toLocaleString("en-US", { hour: "2-digit", minute: "2-digit" }, { timeZone: "Australia/Melbourne" })}
          </div>
        </div>
        <div className="order-items-list">
          {itemsList}
        </div>
        <div>
          <button className="docket-button" onClick={handleNextStatusClick}>
            {buttonCodes[order.status]}
          </button>
        </div>
      </div>
    </div>
  )
}
