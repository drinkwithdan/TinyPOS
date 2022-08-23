import { useState } from "react"
import { Link } from "react-router-dom"
import { FormControl, FormGroup, InputLabel, Input, Checkbox, Button } from "@mui/material"
import AdminNavbar from "./AdminNavbar"

const Register = ({ user, handleLogout, handleRegister }) => {
  const [fields, setFields] = useState()

  const handleChange = (event) => {
    setFields({
      ...fields,
      [event.target.id]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleRegister(fields)
  }

  return (
    <div className="form-container">
      <AdminNavbar user={user} handleLogout={handleLogout} />
      <form onSubmit={handleSubmit} className="form-container">
        <h1>Register New User</h1>
        <FormControl sx={{ margin: "5px", width: "80%" }}>
          <InputLabel>Username</InputLabel>
          <Input
            id="username"
            required
            onChange={handleChange}
          />
        </FormControl>
        <FormControl sx={{ margin: "5px", width: "80%" }}>
          <InputLabel>Password</InputLabel>
          <Input
            id="password"
            type="password"
            required
            onChange={handleChange}
          />
        </FormControl>
        <FormControl sx={{ margin: "5px", width: "80%" }}>
          <InputLabel>Secret phrase</InputLabel>
          <Input
            id="secret"
            type="password"
            required
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit">Submit</Button>
        <p>Already have an account? Login <Link to="/users/login">here.</Link></p>
      </form>
    </div>
  )
}

export default Register