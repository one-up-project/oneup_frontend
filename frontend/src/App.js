import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";

import {LoginPage} from "./pages/login/LoginPage";
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
          path: "/search",
          element: <Search />,
        },
        {
          path: "/login",
          element:<LoginPage /> , // en authContext solicita que la ruta este en AuthProvider
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
