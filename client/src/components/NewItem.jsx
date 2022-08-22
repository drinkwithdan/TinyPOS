import { useState } from "react"
import { FormControl, FormGroup, InputLabel, Input, Checkbox, Button } from "@mui/material"

const NewItem = ({ handleNew }) => {
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
      <h3>New Item</h3>
      <form onSubmit={handleSubmit} >
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
            required
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ margin: "5px" }} >
          <InputLabel>Image URL</InputLabel>
          <Input
            id="imageURL"
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
        <Button type="submit" >Submit</Button>
      </form>
    </div>
  )
}

export default NewItem