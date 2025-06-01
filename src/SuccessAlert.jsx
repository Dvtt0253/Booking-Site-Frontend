


function SuccessAlert({flashMessage = ""}) {
  
  

  return(
    <>
      {flashMessage != "" && <div className ="success-flash">
      <p>{flashMessage}</p>
      </div>}
    </>
    
    
  );
  
}
export default SuccessAlert
  
