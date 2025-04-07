import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../Home/Ui/Sidebar";
import { useEffect, useState } from "react";

// DashboardLayout
const DashboardLayout = () => {

    const storage = JSON.parse(localStorage.getItem('user'));
    const user = storage?.user || null;
    const token = storage?.jwt || null;
    const navigate = useNavigate();

    if (!user || !token) navigate('/login')
    console.log(user, token)
        
    return(
        <>
        <main>
            <div className="container">
                <div className="row mt-5 mb-4">
                    <Sidebar/>
                    <div className="col-md-6 vstack gap-3">
                        <div className="tab-content py-0 mb-0">
                        <Outlet context={{user,token}} /> {/* Pass isLoading to Outlet context */}
                        </div>
                    </div>
                </div>
            </div>
        </main>
        </>
    )

};

export default DashboardLayout;