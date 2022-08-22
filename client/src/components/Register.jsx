import { useState } from "react"
import { FormControl, FormGroup, InputLabel, Input, Checkbox, Button } from "@mui/material"

const Register = () => {
  const [fields, setFields] = useState()

  const handleChange = (event) => {
    setFields({
      ...fields,
      [event.target.id]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(fields);
  }

  return (
    <div className="register-form">
      <h1>Register:</h1>
      <form onSubmit={handleSubmit}>
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
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}

export default Register