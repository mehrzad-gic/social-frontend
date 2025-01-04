import { Outlet } from "react-router-dom";
import Sidebar from "../Home/Ui/Sidebar";
import { useEffect, useState } from "react";

// DashboardLayout
const DashboardLayout = () => {

    const [user,setUser] = useState({});

    useEffect(() => {

        const userDto = JSON.parse(localStorage.getItem('user'));

        setUser(userDto.value.user);        
        
    },[]);

    return(
        <>
        <main>
            <div className="container">
                <div className="row mt-4 mb-4">
                    <Sidebar/>
                    <div className="col-md-6 vstack gap-3">
                        <div className="tab-content py-0 mb-0">
                        <Outlet context={{user }} /> {/* Pass isLoading to Outlet context */}
                        </div>
                    </div>
                </div>
            </div>
        </main>
        </>
    )

};

export default DashboardLayout;