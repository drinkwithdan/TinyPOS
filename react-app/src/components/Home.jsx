import Navbar from './Navbar'
import Header from './Header'
import ItemList from './ItemList'
import Footer from './Footer'


const Home = ({ products, cart, addToCart }) => {
  console.log();
  return (
    <div className="home">
      <Navbar cart={cart} />
      <Header />
      {products && <ItemList 
        products={products}
        cart={cart} 
        addToCart={addToCart} 
      />}
      <Footer />
    </div>
  )
}

export default Home
