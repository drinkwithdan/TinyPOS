import { useState } from "react"
import { useParams } from "react-router-dom"
import { FormControl, FormGroup, InputLabel, Input, Checkbox, Button } from "@mui/material"

const EditItem = ({ products }) => {
  const [fields, setFields] = useState({})
  const params = useParams()

  // Find item to edit from params
  const item = products.find((product) => product.item_id == params.id)

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(fields);
    // handleNewItemSubmit(fields)
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
            value={item.name}
          />
        </FormControl>
        <FormControl fullWidth sx={{ margin: "5px" }} >
          <InputLabel>Description</InputLabel>
          <Input
            id="description"
            required
            onChange={handleChange}
            value={item.description}
          />
        </FormControl>
        <FormControl fullWidth sx={{ margin: "5px" }} >
          <InputLabel>Image URL</InputLabel>
          <Input
            id="imageURL"
            required
            onChange={handleChange}
            value={item.imageURL}
          />
        </FormControl>
        <FormControl fullWidth sx={{ margin: "5px" }} >
          <InputLabel>Price</InputLabel>
          <Input
            id="price"
            type="number"
            required
            onChange={handleChange}
            value={item.price}
          />
        </FormControl>
        <FormControl fullWidth sx={{ margin: "5px" }} >
          <InputLabel>Active?</InputLabel>
          <Checkbox
            id="active"
            onChange={handleChange}
            defaultChecked={item.active}
          />
        </FormControl>
        <Button type="submit" >Submit</Button>
      </form>
    </div>
  )
}

export default EditItem