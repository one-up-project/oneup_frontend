import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
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
          path: "/user",
          children: [
            {
              path: "search",
              element: <Search />,
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
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
