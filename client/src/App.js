import { useEffect, useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import { v4 as uuid } from "uuid"
import './App.css';
import Home from './components/Home';
import Cart from './components/Cart'
import Checkout from "./components/Checkout";
import Success from "./components/Success"
import Orders from "./components/Orders"
import NewItem from "./components/NewItem"
import Login from "./components/Login"
import Register from "./components/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminItems from "./components/AdminItems"
import EditItem from "./components/EditItem";
import LoadingSpinner from "./components/LoadingSpinner";

const App = () => {
  // // // // // useState // // // // //
  const [products, setProducts] = useState(null)
  const [orders, setOrders] = useState([])
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState({
    items: [],
    totalQuantity: 0,
    subTotal: 0
  })

  // // // // // GLOBAL VARIABLES // // // // //

  // Set navigate variable
  const navigate = useNavigate()

  // Get access to localStorage
  const getLocalCart = JSON.parse(localStorage.getItem("cart"))
  const getLocalOrders = JSON.parse(localStorage.getItem("orders"))

  // // Clears all localStorage
  // localStorage.clear()

  // // // // // useEffects // // // // //

  // On mount pull all products from database
  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch("/items")
      const data = await res.json()
      setProducts(data)
    }
    getProducts()
  }, [])

  // On mount pull all orders from database
  useEffect(() => {
    const getOrders = async () => {
      const res = await fetch("/orders")
      const data = await res.json()
      setOrders(data)
    }
    getOrders()
  }, [])

  // On mount check if a local cart exists and set cart state if so
  useEffect(() => {
    if (cart.items.length === 0 && getLocalCart !== null) {
      setCart(getLocalCart)
    }
  }, [])

  // // REDUNDANT?
  // // On mount check if there are any local orders and populate orders state
  // useEffect(() => {
  //   if (orders.length === 0 && getLocalOrders !== null) {
  //     setOrders(getLocalOrders)
  //   }
  // }, [])

  // On mount check if user is logged in
  useEffect(() => {
    const checkLoggedIn = async () => {
      const res = await fetch('/users/is-authenticated')
      const data = await res.json()
      setUser(data.user)
    }
    if (!user) checkLoggedIn()
  }, [user])

  // // // // // ITEMS CRUD RESTFUL ROUTES // // // // //

  const handleNew = async (newItem) => {
    const res = await fetch("/items/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem)
    })
    const data = await res.json()
    console.log(data);
    setProducts([
      ...products,
      data
    ])
    navigate("/items")
  }

  const handleEdit = async (editedItem) => {
    const res = await fetch(`/items/edit/<${editedItem.item_id}>`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedItem)
    })
    const returnedItem = await res.json()
    const index = products.indexOf(products.find((item) => item.item_id === editedItem.item_id))
    setProducts([
      ...products.splice(0, index),
      returnedItem,
      ...products.splice(index + 1)
    ])
    navigate("/items")
  }

  const handleDelete = async (itemToDelete) => {
    console.log(itemToDelete.item_id);
    const res = await fetch(`items/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemToDelete)
    })
    const deletedItem = await res.json()
    const newProducts = products.filter(item => item.item_id !== deletedItem.item_id)
    setProducts(newProducts)
  }

  // // // // // USERS CRUD RESTFUL ROUTES // // // // //

  // Register new user
  const handleRegister = async (newUser) => {
    const res = await fetch("/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser)
    })
    const data = await res.json()
    setUser(data.user)
    navigate("/items")
  }

  // Login existing user
  const handleLogin = async (userLoggingIn) => {
    const res = await fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLoggingIn)
    })
    const data = await res.json()
    setUser(data.user)
    navigate("/items")
  }

  // Logout user
  const handleLogout = async () => {
    const res = await fetch('/users/logout', {
      method: 'POST'
    })
    const data = await res.json()
    if (data.success) setUser(null)
    navigate("/users/login")
  }

  // // // // // ORDERS CRUD RESTFUL ROUTES // // // // //

  const handleNewOrder = async (newOrder) => {
    console.log("Fired")
    const res = await fetch("/orders/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder)
    })
    const data = await res.json()
    console.log(data);
    return data
  }

  const handleOrderStatus = async (order_id, newStatus) => {
    console.log("Change order", order_id, "to status", newStatus);
  }


  // // // // // CART LOGIC // // // // //

  // Adds item to cart with the current counter quantity
  const addToCart = (product, quantity) => {

    // Create Boolean to check if item is in cart
    const inCart = (product) => cart.items.find((item) => item.item_id === product.item_id)
    let items
    // If product is not available don't add to cart
    if (!product.active) return
    // If nothing in cart or product not in cart
    if (!cart.items.length || !inCart(product)) {
      // create items array with product added into array
      items = [...cart.items, { ...product, cartQuantity: quantity }]
    } else {
      // Otherwise increment the product amount by the quantity parameter
      items = cart.items.map((item) => {
        if (product.item_id !== item.item_id) return item
        return { ...item, cartQuantity: item.cartQuantity + quantity }
      })
    }
    // Update totals values in cart object to reflect above changes
    const totals = items.reduce((obj, item) => {
      // Total quantity of all items in cart
      obj.totalQuantity += item.cartQuantity
      // Subtotal of all items in cart
      obj.subTotal += item.price * item.cartQuantity
      return obj
      // Add into totals object
    }, { totalQuantity: 0, subTotal: 0 })
    // Spread totals key:values into cart object and set as new cart
    localStorage.setItem("cart", JSON.stringify({ items, ...totals }))
    setCart({ items, ...totals })
  }

  // Deletes the item passed in from the cart and resets the quantity and subTotal
  const removeFromCart = (item) => {
    const newCartItems = cart.items.filter((product) => product.item_id !== item.item_id)
    // Updates the totals values, removing the deleted item
    const totals = newCartItems.reduce((obj, item) => {
      obj.totalQuantity += item.cartQuantity
      obj.subTotal += item.price * item.cartQuantity
      return obj
      // Spreads those updated values into the newCartItems object
    }, { totalQuantity: 0, subTotal: 0 })
    // Sets the cart state with the new updated array
    localStorage.setItem("cart", JSON.stringify({ items: newCartItems, ...totals }))
    setCart({ items: newCartItems, ...totals })
    console.log(getLocalCart);
  }

  // Take form from checkout and append items to orders state
  const handleCheckoutSubmit = (form) => {

    // Create new order object, POST to database and add returned object to orders state
    const newOrder = {
      name: form.name,
      contact: form.telephone,
      items: [...cart.items] 
    }
    const returnedOrder = handleNewOrder(newOrder)
    const newOrders = [...orders]
    newOrders.push(returnedOrder)
    setOrders(newOrders)

    // Empty cart and localStorage
    localStorage.removeItem("cart")
    setCart({
      items: [],
      totalQuantity: 0,
      subTotal: 0
    })

    // Navigate to success page
    navigate("/success")
  }


  return (
    <div className="App">
      <Routes>

        <Route path="/items/loading" element={<LoadingSpinner />} />

        <Route path="/home" element={<Home
          products={products}
          addToCart={addToCart}
          cart={cart}
        />}
        />

        <Route path="/cart" element={<Cart
          cart={cart}
          removeFromCart={removeFromCart}
        />} />

        <Route path="/checkout" element={<Checkout
          cart={cart}
          handleCheckoutSubmit={handleCheckoutSubmit}
        />}
        />

        <Route path="/success" element={<Success cart={cart} />} />

        <Route path="/users/register" element={<Register
          handleRegister={handleRegister}
          user={user}
          handleLogout={handleLogout}
        />}
        />

        <Route path="/users/login" element={<Login
          handleLogin={handleLogin}
          user={user}
          handleLogout={handleLogout}
        />}
        />

        <Route path="/items" element={
          <ProtectedRoute user={user} >
            products && <AdminItems
              products={products}
              handleDelete={handleDelete}
              user={user}
              handleLogout={handleLogout}
            />
          </ProtectedRoute>
        } />

        <Route path="/items/new" element={
          <ProtectedRoute user={user} >
            <NewItem
              handleNew={handleNew}
              user={user}
              handleLogout={handleLogout}
            />
          </ProtectedRoute>
        } />

        <Route path="/items/edit/:id" element={
          <ProtectedRoute user={user} >
            products && <EditItem
              products={products}
              handleEdit={handleEdit}
              user={user}
              handleLogout={handleLogout}
            />
          </ProtectedRoute>
        } />

        <Route path="/orders" element={
          <ProtectedRoute user={user} >
            <Orders
              orders={orders}
              user={user}
              handleLogout={handleLogout}
              handleOrderStatus={handleOrderStatus}
            />
          </ProtectedRoute>
        } />

      </Routes>
    </div>
  );
}

export default App;
