import CircularProgress from "@mui/material/CircularProgress"

const LoadingSpinner = () => {
  return(
    <div className="spinner">
      <CircularProgress sx={{color: "teal"}} />
    </div>
  )
}

export default LoadingSpinner