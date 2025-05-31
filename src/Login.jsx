import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlueLogo from './BlueLogo.jsx';
import {CsrfTokenProvider} from './CsrfTokenContext.jsx';



function Login() {

    const navigate = useNavigate();
    const[isLoggedIn, setIsLoggedIn] = useState(false);
   

  


    const handleLogin = async (formData) => {

        

        try{
            const response = await fetch('https://booking-site-api.onrender.com/login_auth',{
                method: 'POST',
                body: formData,
                credentials: 'include',
               
            },

            
              
            )
            const data = await response.json();
            console.log(data);
            if(data.status === 403 && data.offense === "Login Attempts"){
                navigate('/403_Response');
                

            }
            else if(data.status === 403 && data.offense === "Payloads"){
                navigate('403_Payloads');
               

            }
            else if(data.success && data.Role === "User"){

                navigate('/please_wait');
                setIsLoggedIn(True);
               
             

            }
            else if(data.success && data.Role === "Admin"){
                navigate('/admin_homepage');
                setIsLoggedIn(True);
                
               
                
            }
            else{

                navigate('/login_page');
                alert(data.message);
               
            }
        }catch(error){
            console.log( error);
            alert("Please wait and try again shortly.");
            navigate('/confirm_loading');
            
        }





    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        handleLogin(formData);

    }
    

    return(
            <>
                {isLoggedIn && <CsrfTokenProvider/>}
            
            
                <BlueLogo/>
            <div className="login-form">
                    <form onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        <label htmlFor="login-email">Email:</label>
                        <input type="email" id="login-email" name="login-email" required/>
                        <label htmlFor="login-password">Password:</label>
                        <input type="password" id="login-password" name="login-password" required/>
                        <p>Forgot Your Password? <a href="#"><p onClick={() => navigate('/reset_password')}>Reset Your Password Here</p></a></p>
                        <button type="submit">Log In</button>

                    

                    </form>
                </div>

            
            
            </>
        
    );
   
}

export default Login
