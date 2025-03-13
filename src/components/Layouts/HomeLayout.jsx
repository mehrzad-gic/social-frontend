import { Outlet, useLoaderData, redirect } from "react-router-dom";  
import Header from "../Home/Ui/Header";  
import ChatBox from "../Home/Ui/ChatBox";  
import '../../assets/home/css/style.css';  
import React from "react";  
import { toast } from 'react-toastify';  
import { login } from "../../Helpers/Helpers";  
import Loading from "../Home/Ui/Loading";

export const loader = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
        toast.error("You must be logged in to view this page.");
        return redirect("/login"); // Return redirect instead of calling it
    }

    const isLogin = await login();
    if (isLogin === false) {
        toast.error("You must be logged in to view this page.");
        return redirect("/login"); // Return redirect instead of calling it
    }

    console.log("Loader is called", isLogin);
    
    return { isLoading: false }; // This will be used in HomeLayout
};

const HomeLayout = () => {  
    const { isLoading } = useLoaderData();

    if (isLoading) return <Loading />;

    return (  
        <>  
            <Header />  
            <ChatBox />  
            <Outlet context={{ isLoading }} /> {/* Pass isLoading to Outlet context */}
        </>  
    );  
}  

export default HomeLayout;
