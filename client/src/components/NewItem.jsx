import { useState } from "react"
import { Link } from "react-router-dom"
import { FormControl, TextField, InputLabel, Input, Checkbox, Button } from "@mui/material"
import AdminNavbar from "./AdminNavbar"

const NewItem = ({ user, handleNew, handleLogout }) => {
  const [fields, setFields] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault()
    handleNew(fields)
  }

  const handleChange = (event) => {
    if (event.target.id === "active") {
      event.target.value = event.target.checked
    }
    setFields({
      ...fields,
      [event.target.id]: event.target.value
    })
  }

  return (
    <div className="form-container">
      <AdminNavbar user={user} handleLogout={handleLogout} />
      <form onSubmit={handleSubmit} className="form-container" >
      <h3>New Item</h3>
        <FormControl fullWidth sx={{ margin: "5px" }} >
          <InputLabel>Name</InputLabel>
          <Input
            id="name"
            required
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ margin: "5px" }} >
          <InputLabel>Description</InputLabel>
          <Input
            id="description"
            multiline
            rows={4}
            required
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ margin: "5px" }} >
          <InputLabel>Image URL</InputLabel>
          <Input
            id="imageURL"
            multiline
            required
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ margin: "5px" }} >
          <InputLabel>Price</InputLabel>
          <Input
            id="price"
            type="number"
            required
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ margin: "5px" }} >
          <InputLabel>Active?</InputLabel>
          <Checkbox
            id="active"
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit" >ADD ITEM</Button>
        <Link to="/items" className="goto-cart-button">
          BACK TO ITEMS
        </Link>
      </form>
    </div>
  )
}

export default NewItem