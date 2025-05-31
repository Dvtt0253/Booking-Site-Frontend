import {useState, useEffect} from 'react';
import UserHomepage from './UserHomepage.jsx';
import { useNavigate } from 'react-router-dom';
import PostWarmup from './PostWarmup.jsx';
import NewLogo from './NewLogo.jsx';
import {CsrfTokenProvider} from './CsrfTokenContext.jsx';

function LoadingPage(){

    const [ready, setReady] = useState(false);
    const navigate = useNavigate();

    useEffect(() =>{

        const interval = setInterval(async () => {
            try{
                const response = await fetch('https://booking-site-api.onrender.com/check_connection', {
                    credentials: 'include',
                });
                const data = await response.json();
                if(data.status === 200){
                    setReady(true);
                    clearInterval(interval);
                }
                else{
                    setReady(false);
                }
            }catch(error){
                setReady(false);
            }

        }, 1000)

        return () => clearInterval(interval);

    }, [])

    if(!ready){
        return(
             <>
            <NewLogo/>
            <div className="loading-divs">
                <p>Loading ...</p>

            </div>
                
            </>
        );
    }
    else{
       return(
       
             <CsrfTokenProvider>
                  <PostWarmup/>
             </CsrfTokenProvider>
           
        
       
       );

    }
}
export default LoadingPage
