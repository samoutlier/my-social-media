const LoadingSpinner = () => {
  return <>
    <center className="loading-spinner">
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </center>

  </>
}

export default LoadingSpinner;