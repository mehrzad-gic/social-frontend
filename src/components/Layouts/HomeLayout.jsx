import { Outlet, useNavigate } from "react-router-dom";  
import Header from "../Home/Ui/Header";  
import ChatBox from "../Home/Ui/ChatBox";  
import '../../assets/home/css/style.css';  
import React, { useEffect, useState } from "react";  
import { toast } from 'react-toastify';  
import { login } from "../../Helpers/Helpers";  
import Loading from "../Home/Ui/Loading";

// HomeLayout Component  
const HomeLayout = () => {  
    
    const navigate = useNavigate();  
    const [isLoading, setIsLoading] = useState(true);  

    useEffect(() => {  
        const checkLogin = async () => {  
            const isLoggedIn = await login(); // Wait for the login function to complete  

            if (isLoggedIn === false) {  
                toast.error('You are not authorized to view this page.');   
                
                setTimeout(() => {  
                    navigate("/login");  
                }, 2000);  
            } else {  
                setIsLoading(false); // User is logged in, stop loading  
            }  
        };  

        checkLogin();
    }, [navigate]);  

    // Show a loading indicator while checking login status
    if (isLoading) {
        return <Loading/>; // You can replace this with a spinner or loading component
    }

    return (  
        <>  
            <Header />  
            <ChatBox />  
            <Outlet context={{ isLoading }} /> {/* Pass isLoading to Outlet context */}
        </>  
    );  
}  

export default HomeLayout;
