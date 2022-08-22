import Navbar from "./Navbar"
import Header from "./Header"
import Footer from "./Footer"
import CheckBoxIcon from "@mui/icons-material/CheckBox"

const Success = ({ cart }) => {


  return (
    <div className="success">
      <Navbar cart={cart} />
      <Header />
      <div className="order-received">
        <h1>Order received!</h1>
      </div>
      <div className="order-tick">
        <CheckBoxIcon variant="outline" color="success" sx={{ fontSize: 60 }} />
      </div> 
      <div className="order-message">
        <h3>You will receive a text message when your order is ready to collect</h3>
      </div>
      <Footer />
    </div>
  )
}

export default Success