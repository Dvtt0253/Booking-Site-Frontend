import React from "react";
import NewLogo from './NewLogo.jsx';
function VerifyMessage(){
    return(
    <>
   <NewLogo/>
    <div className="verify-div">
            <h2>Verify Your Email Address</h2>
            <p>You will receive an email shortly to verify your email address. Please verify to proceed.</p>
        </div>
    </>
        
    );

}
export default VerifyMessage
