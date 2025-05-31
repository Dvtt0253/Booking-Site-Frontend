import { createContext, useContext } from "react";
import {useState, useEffect} from 'react';


const CsrfTokenContext = createContext();

export function CsrfTokenProvider({children}){
    const [csrfToken, setCsrfToken] = useState("");

    
    
    

    useEffect(()=>{
        console.log("check has started");
         const fetchCsrf = setInterval(async () => {
             console.log("interval has started");
             
            try{
                const response = await fetch('https://booking-site-api.onrender.com/get_user_csrf', {
                    credentials: 'include',
                });
                const data = await response.json();
                if(data.success){
                    setCsrfToken(data.session_csrf);
                    clearInterval(fetchCsrf);
                }
                else{
                    console.log("Response not found");
                }
            }catch(error){
                const retry = await fetch('https://booking-site-api.onrender.com/get_user_csrf',{
                    credentials: 'include',
                });
            }
        }, 2000)
        return () => clearInterval(fetchCsrf)
 
    }, [])

   

    return(
        <CsrfTokenContext.Provider value={{csrfToken}}>
            {children}
        </CsrfTokenContext.Provider>
    );

    
}
export function useCsrfToken(){
    return useContext(CsrfTokenContext);
}
