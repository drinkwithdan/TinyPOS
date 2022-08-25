import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { FormControl, InputLabel, Input, Checkbox, Button } from "@mui/material"
import AdminNavbar from "./AdminNavbar"

const EditItem = ({ products, user, handleLogout, handleEdit }) => {
  const params = useParams()
  // Find item to edit from params
  const item = products.find((product) => product.item_id == params.id)

  const [fields, setFields] = useState({ ...item })

  const handleSubmit = (event) => {
    event.preventDefault()
    handleEdit(fields)
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

  let checkboxValue = false
  if (fields.active === true) checkboxValue = true

  return (
    <div className="form-container">
      <AdminNavbar user={user} handleLogout={handleLogout} />
      <div className="form-container">
        <Link to="/items" className="goto-cart-button">BACK TO ITEMS</Link>
        <h3>Edit {item.name}</h3>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ margin: "5px" }} >
            <InputLabel>Name</InputLabel>
            <Input
              id="name"
              required
              onChange={handleChange}
              value={fields.name}
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
              value={fields.description}
            />
          </FormControl>
          <FormControl fullWidth sx={{ margin: "5px" }} >
            <InputLabel>Image URL</InputLabel>
            <Input
              id="imageurl"
              required
              multiline
              onChange={handleChange}
              value={fields.imageurl}
            />
          </FormControl>
          <FormControl fullWidth sx={{ margin: "5px" }} >
            <InputLabel>Price</InputLabel>
            <Input
              id="price"
              type="number"
              required
              onChange={handleChange}
              value={fields.price}
            />
          </FormControl>
          <FormControl fullWidth sx={{ margin: "5px" }} >
            <InputLabel>Active?</InputLabel>
            <Checkbox
              id="active"
              onChange={handleChange}
              checked={checkboxValue && "checked"}
            />
          </FormControl>
          <Button type="submit" >SAVE CHANGES</Button>
        </form>
      </div>
    </div>
  )
}

export default EditItem