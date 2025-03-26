import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import HomeLayout from "./components/Layouts/HomeLayout";
import Index from "./components/Home/Index";
import { ToastContainer, toast } from "react-toastify";
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
// import { login } from "./Helpers/Helpers";
import ThemeSwitcher from "./components/Layouts/ThemeSwitcher";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CheckOtp from "./components/Home/Auth/CheckOtp.jsx";
import CheckOtpForgotPassword from "./components/Home/Auth/CheckOtpForgotPassword.jsx";
import AdminLayout from "./components/Admin/Layout/AdminLayout";
import IndexAdmin from "./components/Admin/Index";
import Tags from "./components/Admin/Tag/List";
import CreateTag from "./components/Admin/Tag/Create";
import EditTag from "./components/Admin/Tag/Edit";
import Jobs from "./components/Home/Jobs/Jobs";
import JobDetail from "./components/Home/Jobs/JobDetail";
import CreateJob from "./components/Home/Jobs/CreateJob";
import MyApplications from "./components/Home/Jobs/MyApplications";

const queryClient = new QueryClient({
    defaultOptions:{
      queries:{
        staleTime:60 * 2 * 1000,
      }
    }
});

function App() {

  const router = createBrowserRouter([

    // Home Routes
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { path: "/", element: <Index /> },
        { path: "/create-post", element: <Create /> },
        { path: "/jobs", element: <Jobs /> },
        { path: "/jobs/:slug", element: <JobDetail /> },
        { path: "/jobs/create", element: <CreateJob /> },
        { path: "/jobs/applications", element: <MyApplications /> },
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

    // Dashboard Routes
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { path: "info", element: <Info /> },
        { path: "Messaging", element: <Info /> },
        { path: "Communication", element: <Info /> },
        { path: "CloseAccount", element: <Info /> },
      ]
    },

    // Auth Routes
    {
      path: "/",
      children: [
        { path: "/forgot-password", element: <ForgotPassword /> },
        { path: "/Login", element: <Login /> },
        { path: "/Register", element: <Register /> },
        { path: "/check-otp/:email", element: <CheckOtp /> },
        { path: "/check-forgot-password/:email", element: <CheckOtpForgotPassword /> },
      ]
    },

    // Admin Routes
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        { index: true, element: <IndexAdmin /> },
        { path: 'content/tags', element: <Tags /> },
        { path: 'content/tags/create', element: <CreateTag /> },
        { path: 'content/tags/edit/:slug', element: <EditTag /> },
      ]
    },

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
      <ThemeSwitcher />
      <QueryClientProvider client={queryClient}>
        <LikesProvider>
          <SavesProvider>
            <RouterProvider router={router} />
          </SavesProvider>
        </LikesProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
