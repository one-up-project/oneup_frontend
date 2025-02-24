import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Home2 from "./pages/home2/Home2";
import Store from "./pages/store/Store";
import HomeUser from "./pages/home/HomeUser";
import StoreSearch from "./pages/store/store_search/StoreSearch";
import StoreProfile from "./pages/store/store_profile/StoreProfile";

import LoginPage from "./pages/login/LoginPage";
import Register from "./pages/register/RegisterPage";
import UpdateUser from "./pages/user/UserUpdate";

import { AuthProvider } from "./context/authContext";



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (<AuthProvider><Layout /></AuthProvider>),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/user", // esta sección no esta renderizando las paginas hijas
          children: [
            {
              path: "search",
              element: <Search />,
            },
            {
              path: "home",
              element: <HomeUser />,
            },
            {
              path: "updateUser",
              element: <UpdateUser />,
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
/*
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />}  />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/client" element={<h1> Clientes </h1>} />
          <Route path="/restaurant" element={<h1> Restaurantes </h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
*/

}

export default App;
