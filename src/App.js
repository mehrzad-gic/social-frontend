import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "./components/Layouts/HomeLayout";
import Index from "./components/Home/Index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./components/Home/Auth/ForgotPassword";
import Login from "./components/Home/Auth/Login";
import Register from "./components/Home/Auth/Register";
import Create from "./components/Home/Post/Create";
import NotFound from "./components/Home/NotFound";
import { LikesProvider } from "./Context/LikesContext";
import { SavesProvider } from "./Context/SavesContext";
import DashboardLayout from "./components/Layouts/DashboardLayout";
import Info from "./components/Dashboard/Pages/Info";


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { path: "/", element: <Index /> },
        { path: "/create-post", element: <Create /> },
        { path: "*", element: <NotFound /> },
        {
          path: "dashboard",
          element: <DashboardLayout />,
          children: [
            { path: "info", element: <Info /> },
            { path: "Messaging", element: <Info /> },
            { path: "Communication", element: <Info /> },
            { path: "CloseAccount", element: <Info /> },
            { path: "Privacy", element: <Info /> },
            { path: "Notification", element: <Info /> },
          ],
        },
      ],
    },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/Login", element: <Login /> },
    { path: "/Register", element: <Register /> },
  ]);

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

      <LikesProvider>
        <SavesProvider>
          <RouterProvider router={router} />
        </SavesProvider>
      </LikesProvider>

    </>

  );

}

export default App;
