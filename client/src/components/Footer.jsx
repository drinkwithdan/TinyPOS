import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className="footer">
      <p>Copyright © TinyPOS 2022</p>
      
      <Link to="/items">Admin Login</Link> / <a href="https://github.com/drinkwithdan" target="_blank">Github</a>
    </div>
  )
}

export default Footer