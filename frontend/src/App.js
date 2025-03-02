import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import HomeStore from "./pages/store/home-store/HomeStore";
import Store from "./pages/store/Store";
import HomeUser from "./pages/user/home-user/HomeUser";
import Reserved from "./pages/user/reserved-user/Reserved";
import ProfileUser from "./pages/user/profile-user/ProfileUser";
import StoreProfile from "./pages/store/store_profile/StoreProfile";
import UpdateForm from "./components/store/UpdateForm";
import Pending from "./pages/store/pending/Pending";
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
              path: "reserved",
              element: <Reserved />,
            },
            {
              path: "profile",
              element: <ProfileUser />,
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
              element: <HomeStore />,
            },
            { path: "form", element: <Store /> },
            {
              path: "search",
              element: <Search />,
            },
            {
              path: "profile",
              element: <StoreProfile />,
            },
            {
              path: "update_form",
              element: <UpdateForm />,
            },
            {
              path: "pending",
              element: <Pending />,
            },
          ],
        },
        {
          path: "/login",
          element: <LoginPage />, // en authContext solicita que la ruta esté en AuthProvider
        },
        {
          path: "/register",
          element: <Register />, // en authContext solicita que la ruta esté en AuthProvider
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