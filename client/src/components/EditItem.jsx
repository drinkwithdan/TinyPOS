import { useState } from "react"
import { useParams } from "react-router-dom"
import { FormControl, FormGroup, InputLabel, Input, Checkbox, Button } from "@mui/material"

const EditItem = ({ products, handleEdit }) => {
  const params = useParams()
  // Find item to edit from params
  const item = products.find((product) => product.item_id == params.id)

  const [fields, setFields] = useState({...item})

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

  return (
    <div className="form-container">
      <h3>Edit {item.name}</h3>
      <form onSubmit={handleSubmit} >
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
            value={fields.active}
          />
        </FormControl>
        <Button type="submit" >Submit</Button>
      </form>
    </div>
  )
}

export default EditItem