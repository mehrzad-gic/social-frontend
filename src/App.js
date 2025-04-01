import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import HomeLayout from "./components/Home/Layout/HomeLayout.jsx";
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
import DashboardLayout from "./components/Dashboard/Layout/DashboardLayout.jsx";
import Info from "./components/Dashboard/Pages/Info";
// import { login } from "./Helpers/Helpers";
import ThemeSwitcher from "./components/Common/ThemeSwitcher.jsx";
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
import Categories from "./components/Admin/Category/List";
import CreateCategory from "./components/Admin/Category/Create";
import EditCategory from "./components/Admin/Category/Edit";
import Reports from "./components/Admin/Report/List";
import CreateReport from "./components/Admin/Report/Create.jsx";
import EditReport from "./components/Admin/Report/Edit.jsx";
import Rejects from "./components/Admin/Reject/List";
import CreateReject from "./components/Admin/Reject/Create.jsx"
import EditReject from "./components/Admin/Reject/Edit.jsx"
import FaqCategories from "./components/Admin/FaqCategory/List.jsx";
import CreateFaqCategory from "./components/Admin/FaqCategory/Create.jsx";
import EditFaqCategory from "./components/Admin/FaqCategory/Edit.jsx";
import Faqs from "./components/Admin/Faq/List";
import CreateFaq from "./components/Admin/Faq/Create";
import EditFaq from "./components/Admin/Faq/Edit";
import CategoryPrices from "./components/Admin/CategoryPrice/List.jsx";
import CreateCategoryPrice from "./components/Admin/CategoryPrice/Create.jsx";
import EditCategoryPrice from "./components/Admin/CategoryPrice/Edit.jsx";
import Posts from "./components/Admin/Post/List";
import CreatePost from "./components/Admin/Post/Create";
import EditPost from "./components/Admin/Post/Edit";
import Comments from "./components/Admin/Comment/List";
import CreateComment from "./components/Admin/Comment/Create";
import EditComment from "./components/Admin/Comment/Edit";
import Users from "./components/Admin/User/List";
import CreateUser from "./components/Admin/User/Create";
import EditUser from "./components/Admin/User/Edit";
import Roles from "./components/Admin/Role/List";
import CreateRole from "./components/Admin/Role/Create";
import EditRole from "./components/Admin/Role/Edit";
import Permissions from "./components/Admin/Permission/List";
import CreatePermission from "./components/Admin/Permission/Create";
import EditPermission from "./components/Admin/Permission/Edit";

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

        // Tag Routes
        { path: 'content/tags', element: <Tags /> },
        { path: 'content/tags/create', element: <CreateTag /> },
        { path: 'content/tags/edit/:slug', element: <EditTag /> },

        // Category Routes
        { path: 'content/categories', element: <Categories /> },
        { path: 'content/categories/create', element: <CreateCategory /> },
        { path: 'content/categories/edit/:slug', element: <EditCategory /> },

        // CategoryPrice Routes
        { path: 'content/category-prices/:category', element: <CategoryPrices /> },
        { path: 'content/category-prices/create/:category', element: <CreateCategoryPrice /> },
        { path: 'content/category-prices/edit/:category/:id', element: <EditCategoryPrice /> }, // Fix route parameters

        // Report Routes
        { path: 'content/reports' , element: <Reports/> },
        { path: 'content/reports/create' , element: <CreateReport/>},
        { path: 'content/reports/edit/:slug' , element: <EditReport/>},


        // Reject Routes
        { path: 'content/rejects' , element: <Rejects/> },
        { path: 'content/rejects/create' , element: <CreateReject/>},
        { path: 'content/rejects/edit/:slug' , element: <EditReject/>},

        // FaqCategory Routes
        { path: 'content/faq-categories', element: <FaqCategories /> },
        { path: 'content/faq-categories/create', element: <CreateFaqCategory /> },
        { path: 'content/faq-categories/edit/:slug', element: <EditFaqCategory /> },

        // Faq Routes
        { path: 'content/faqs', element: <Faqs /> },
        { path: 'content/faqs/create', element: <CreateFaq /> },
        { path: 'content/faqs/edit/:slug', element: <EditFaq /> },

        // user Routes
        { path: 'users', element: <Users /> },
        { path: 'users/create', element: <CreateUser /> },
        { path: 'users/edit/:slug', element: <EditUser /> },

        // role Routes
        { path: 'users/roles', element: <Roles /> },
        { path: 'users/roles/create', element: <CreateRole /> },
        { path: 'users/roles/edit/:id', element: <EditRole /> },

        // permission Routes
        { path: 'users/permissions', element: <Permissions /> },
        { path: 'users/permissions/create', element: <CreatePermission /> },
        { path: 'users/permissions/edit/:id', element: <EditPermission /> },
        

        // Posts Routes
        { path: 'content/posts', element: <Posts /> },
        { path: 'content/posts/create', element: <CreatePost /> },
        { path: 'content/posts/edit/:slug', element: <EditPost /> },

        // Comments Routes
        { path: 'content/comments', element: <Comments /> },
        { path: 'content/comments/create', element: <CreateComment /> },
        { path: 'content/comments/edit/:slug', element: <EditComment /> },

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
