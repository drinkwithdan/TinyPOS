import { useState } from "react"
import { CardElement } from "@stripe/react-stripe-js"
import { FormControl, InputLabel, Input, FormHelperText, Button } from "@mui/material"

const CheckoutForm = ({ handleCheckoutSubmit }) => {
  const [fields, setFields] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault()
    handleCheckoutSubmit(fields)
  }

  const handleChange = (event) => {
    setFields({
      ...fields,
      [event.target.id]: event.target.value
  })
  }

  return (
    <div className="form-container">
      <h1>Checkout</h1>
      <h3>Please input your details:</h3>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ margin: "5px" }} >
          <InputLabel>Name</InputLabel>
          <Input 
            id="name" 
            required 
            onChange={handleChange} 
          />
        </FormControl>
        <FormControl fullWidth sx={{ margin: "5px" }}>
          <InputLabel>Contact Number</InputLabel>
          <Input 
            type="number" 
            id="telephone"
            required 
            aria-describedby="my-helper-text" 
            onChange={handleChange} 
          />
          <FormHelperText id="my-helper-text">We need your number to notify you when your order is ready</FormHelperText>
        </FormControl>
        <FormControl fullWidth sx={{ margin: "5px" }}>
          <InputLabel>Address Line 1</InputLabel>
          <Input 
            id="address1" 
            onChange={handleChange} 
          />
        </FormControl>
        <FormControl fullWidth sx={{ margin: "5px" }}>
          <InputLabel>Address Line 2</InputLabel>
          <Input id="address2" onChange={handleChange} />
        </FormControl>
        <CardElement className="card-element" />

        <Button type="submit" >Submit</Button>
      </form>
    </div>
  )
}

export default CheckoutForm