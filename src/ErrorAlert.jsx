function ErrorAlert({errorMessage = ""}){
  return(
    <>
      {errorMessage != "" && <div className="error-flash">
        <p>{errorMessage}</p>
      </div>}
    </>
  );  
}
export default ErrorAlert
