import { useState } from "react"
import { FormControl, FormGroup, InputLabel, Input, Checkbox, Button } from "@mui/material"

export const Register = () => {
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
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ margin: "5px" }}>
          <InputLabel>Username</InputLabel>
          <Input 
            id="username"
            required
            onChange={handleChange} 
          />
        </FormControl>
        <FormControl fullWidth sx={{ margin: "5px" }}>
          <InputLabel>Password</InputLabel>
          <Input 
            id="password"
            required
            onChange={handleChange} 
          />
        </FormControl>
      </form>
    </div>
  )
}