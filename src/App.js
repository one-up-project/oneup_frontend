import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Home2 from "./pages/home2/Home2";
import Store from "./pages/store/Store";
import HomeUser from "./pages/home/HomeUser";
import StoreSearch from "./pages/store/store_search/StoreSearch";
import StoreProfile from "./pages/store/store_profile/StoreProfile";
import HistorialStore from "./pages/store/store_historial/StoreHistorial.jsx";
import HistorialUser from "./pages/user/UserHistorial"; 
import Favorites from "./pages/user/Favorites.jsx";  
import UserProfile from "./pages/user/UserProfile";  

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
              path: "history", 
              element: <HistorialUser />,
            },
            {
              path: "favorites", 
              element: <Favorites />,
            },
            {
              path: "profile", 
              element: <UserProfile />,
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
            { 
              path: "form",
              element: <Store />,
            },
            {
              path: "search",
              element: <StoreSearch />,
            },
            {
              path: "history", 
              element: <HistorialStore />,
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
