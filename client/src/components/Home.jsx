import Navbar from './Navbar'
import Header from './Header'
import ItemList from './ItemList'
import Footer from './Footer'
import LoadingSpinner from './LoadingSpinner'


const Home = ({ products, cart, addToCart }) => {
  console.log();
  return (
    <div className="home">
      <Navbar cart={cart} />
      {products ? <ItemList 
        products={products}
        cart={cart} 
        addToCart={addToCart} 
      /> : <LoadingSpinner />}
      <Footer />
    </div>
  )
}

export default Home
