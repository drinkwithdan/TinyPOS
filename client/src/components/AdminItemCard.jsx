import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const AdminItemCard = ({ item, handleDelete }) => {

  const handleClick = () => {
    handleDelete(item)
  }

  return (
    <div className="card-item">

      <div className="card-image">
        <img src={item.imageURL} className="card-image-item" alt="Picture of item" />
      </div>

      <div className="card-body">

        <div className="card-title">

          <div>
            {item.name}
          </div>

          <div>
            ${item.price}
          </div>

        </div>

        <p>{item.description}</p>

        <div className="card-buttons-container">

          <Link to={`/items/edit/${item.item_id}`}>
            <button
              className="add-cart-button"
            >
              EDIT ITEM
            </button>
          </Link>
          <button
            className="add-cart-button"
            name="add"
            onClick={handleClick}
          >
            DELETE ITEM
          </button>
        </div>
      </div>

    </div>
  )
}

export default AdminItemCard
