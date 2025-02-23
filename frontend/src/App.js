import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Home2 from "./pages/home2/Home2";
import Store from "./pages/store/Store";
import HomeUser from "./pages/home/HomeUser";
import StoreSearch from "./pages/store/store_search/StoreSearch";
import StoreProfile from "./pages/store/store_profile/StoreProfile";
import UpdateForm from "./components/store/UpdateForm";

import LoginPage from "./pages/login/LoginPage";
import Register from "./pages/register/RegisterPage";
import { AuthProvider } from "./context/authContext";



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthProvider><Layout /></AuthProvider>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/user",
          children: [
            {
              path: "search",
              element: <Search />,
            },
            {
              path: "home",
              element: <HomeUser />,
            },
          ],
        },
        {
          path: "/store",
          children: [
            {
              path: "home",
              element: <Home2 />,
            },
            { path: "form",
              element: <Store />

            },
            {
              path: "search",
              element: <StoreSearch/>
            },
            {
              path: "profile",
              element: <StoreProfile/>
            },
            {
              path: "update_form",
              element: <UpdateForm />,
            }
          ],
        },
        {
          path: "/login",
          element: <LoginPage />, // en authContext solicita que la ruta este en AuthProvider
        },
        {
          path: "/register",
          element: <Register />, // en authContext solicita que la ruta este en AuthProvider
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
