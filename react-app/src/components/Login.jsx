import { useState } from "react"
import { FormControl, FormGroup, InputLabel, Input, Checkbox, Button } from "@mui/material"

const Login = ({ handleLogin }) => {
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
    <div className="login-form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ margin: "5px", width: "100%" }}>
          <InputLabel>Username</InputLabel>
          <Input 
            id="username"
            required
            onChange={handleChange} 
          />
        </FormControl>
        <FormControl sx={{ margin: "5px", width:"100%" }}>
          <InputLabel>Password</InputLabel>
          <Input 
            id="password"
            required
            type="password"
            onChange={handleChange} 
          />
        </FormControl>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}

export default Login