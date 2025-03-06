import { Outlet, useLoaderData, redirect } from "react-router-dom";  
import Header from "../Home/Ui/Header";  
import ChatBox from "../Home/Ui/ChatBox";  
import '../../assets/home/css/style.css';  
import React from "react";  
import { toast } from 'react-toastify';  
import { login } from "../../Helpers/Helpers";  
import Loading from "../Home/Ui/Loading";


// Loader function to check login status
export const homeLayoutLoader = async () => {
    const isLoggedIn = await login();
    if (!isLoggedIn) {
        toast.error('You are not authorized to view this page.');
        return redirect("/login");
    }
    return { isLoggedIn };
};

const HomeLayout = () => {  

    const { isLoggedIn } = useLoaderData();

    if (!isLoggedIn) {
        return <Loading/>;
    }

    return (  
        <>  
            <Header />  
            <ChatBox />  
            <Outlet context={{ isLoggedIn }} /> {/* Pass isLoggedIn to Outlet context */}
        </>  
    );  
}  

export default HomeLayout;
