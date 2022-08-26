import Navbar from "./Navbar"
import Header from "./Header"
import Footer from "./Footer"
import CheckBoxIcon from "@mui/icons-material/CheckBox"

const Success = ({ cart, orders }) => {

  const ordersInFront = orders.filter((order) => order.status === 1 || order.status === 2)

  return (
    <div className="success">
      <Navbar cart={cart} />
      <Header />
      <div className="order-received">
        <h1 className="form-h1">Order received!</h1>
        <h3>You order will be ready in approximately {ordersInFront.length * 2} minutes. </h3>
      </div>
      <div className="order-tick">
        <CheckBoxIcon variant="outline" color="success" sx={{ fontSize: 60 }} />
      </div> 
      <div className="order-message">
        <h3>You will receive a SMS when your order is ready to collect</h3>
      </div>
      <Footer />
    </div>
  )
}

export default Success