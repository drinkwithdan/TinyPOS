import { useState } from "react"
import { Link } from "react-router-dom"
import { FormControl, FormGroup, InputLabel, Input, Checkbox, Button } from "@mui/material"
import AdminNavbar from "./AdminNavbar"

const Login = ({ user, handleLogout, handleLogin }) => {
  const [fields, setFields] = useState()

  const handleChange = (event) => {
    setFields({
      ...fields,
      [event.target.id]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin(fields)
  }

  return (
    <div className="form-container">
    <AdminNavbar user={user} handleLogout={handleLogout} />
      <form onSubmit={handleSubmit} className="form-container">
      <h1>Login</h1>
        <FormControl sx={{ margin: "5px", width: "80%" }}>
          <InputLabel>Username</InputLabel>
          <Input 
            id="username"
            required
            onChange={handleChange} 
          />
        </FormControl>
        <FormControl sx={{ margin: "5px", width:"80%" }}>
          <InputLabel>Password</InputLabel>
          <Input 
            id="password"
            required
            type="password"
            onChange={handleChange} 
          />
        </FormControl>
        <Button type="submit">Submit</Button>
        <p>No account? Register <Link to="/users/register">here.</Link></p>
        <p>Back to <Link to="/home">Customer Site</Link></p>
      </form>
      
    </div>
  )
}

export default Login