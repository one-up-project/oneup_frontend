import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import HomeStore from "./pages/store/home-store/HomeStore";
import Store from "./pages/store/Store";
import HomeUser from "./pages/user/home-user/HomeUser";
import FavoritesUser from "./pages/user/favorites-user/FavoritesUser";
import ProfileUser from "./pages/user/profile-user/ProfileUser";
import StoreProfile from "./pages/store/store_profile/StoreProfile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
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
            {
              path: "favorites",
              element: <FavoritesUser />,
            },
            {
              path: "profile",
              element: <ProfileUser />,
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
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
