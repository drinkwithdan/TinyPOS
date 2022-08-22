import CheckoutForm from "./CheckoutForm"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Navbar from "./Navbar"
import Header from "./Header"
import Footer from "./Footer"

const PUBLIC_KEY = "pk_test_51LYfmWCtVmpHSWWF2so3YS0qA32TxS7xZ0xC1bWpOp8aBBCQYmeBTAHdl3aFV2vn9jq3VQNzECdCeYkpAo2BK3Mr00KJj5qNVX"
const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Checkout = ({ cart, handleCheckoutSubmit }) => {

  return (
    <div className="checkout">
      <Navbar cart={cart} />
      <Header />
      <Elements stripe={stripeTestPromise} >
        <CheckoutForm handleCheckoutSubmit={handleCheckoutSubmit} />
      </Elements>
      <Footer />
    </div>
  )
}

export default Checkout