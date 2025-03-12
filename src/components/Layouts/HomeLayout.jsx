import { Outlet, useLoaderData, redirect } from "react-router-dom";  
import Header from "../Home/Ui/Header";  
import ChatBox from "../Home/Ui/ChatBox";  
import '../../assets/home/css/style.css';  
import React from "react";  
import { toast } from 'react-toastify';  
import { login } from "../../Helpers/Helpers";  
import Loading from "../Home/Ui/Loading";




const HomeLayout = () => {  



    return (  
        <>  
            <Header />  
            <ChatBox />  
            <Outlet context={{  }} /> {/* Pass isLoggedIn to Outlet context */}
        </>  
    );  
}  

export default HomeLayout;
