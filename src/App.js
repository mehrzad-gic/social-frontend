import { Route, Routes } from "react-router-dom";
import HomeLayout from "./components/Layouts/HomeLayout";
import Index from "./components/Home/Index";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./components/Home/Auth/ForgotPassword";
import Login from "./components/Home/Auth/Login";
import Register from "./components/Home/Auth/Register";
import Create from "./components/Home/Post/Create";
import NotFound from "./components/Home/NotFound";
import ThemeSwitcher from "./components/Layouts/ThemeSwitcher";
import AppContext from "./Context/AppContext";
import DashboardLayout from "./components/Layouts/DashboardLayout";
import Info from "./components/Dashboard/Pages/Info";

function App() {
  
  const [loading, setLoading] = useState(false);
  const [postLikes, setPostLikes] = useState([]);  
  const [commentLikes, setCommentLikes] = useState([]);  
  const [postSaves, setPostSaves] = useState([]);  

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <AppContext.Provider
        value={{
          loading,
          setLoading,
          setPostLikes,
          postLikes,
          commentLikes,
          setCommentLikes,
          postSaves,
          setPostSaves
        }}
      >
        <Routes>

          <Route element={<HomeLayout />}>

            <Route path="" element={<Index />} />

            <Route path="/create-post" element={<Create />} />

            <Route path="*" element={<NotFound />} />

            <Route element={<DashboardLayout/>}>
                <Route path="dashboard/info" element={<Info/>}/>
                <Route path="dashboard/Messaging" element={<Info/>}/>
                <Route path="dashboard/Communication" element={<Info/>}/>
                <Route path="dashboard/CloseAccount" element={<Info/>}/>
                <Route path="dashboard/Privacy" element={<Info/>}/>
                <Route path="dashboard/Notification" element={<Info/>}/>
            </Route>

          </Route>

          <Route element={<ForgotPassword />} path="/forgot-password" />

          <Route element={<Login />} path="/Login" />

          <Route element={<Register />} path="/Register" />

        </Routes>

      </AppContext.Provider>
    </>
  );
}

export default App;
