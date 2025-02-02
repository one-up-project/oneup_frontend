import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
//import Navbar from "./components/navbar/Navbar";
import Store from "./pages/store/Store";
//import StoreCard from "./components/store-card/StoreCard";
import Home2 from "./pages/home2/Home2";
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
          path: "/search",
          element: <Search />,
        },
        {
          path: "/store",
          element: <Store/>,
        },
        {
          path: "home",
          element: <Home2 />,

        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
