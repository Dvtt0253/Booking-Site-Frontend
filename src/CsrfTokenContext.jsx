import { createContext, useContext } from "react";
import {useState, useEffect} from 'react';

const CsrfTokenContext = createContext();

export function CsrfTokenProvider({children}){
    const [csrfToken, setCsrfToken] = useState("");
    
    

    useEffect(()=>{
        const fetchCsrf = setInterval( async () => {
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
