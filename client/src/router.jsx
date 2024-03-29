// import the function to amke a browser router from react-router-dom
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { About } from "./pages/about/about";
import { Home } from "./pages/home/home";
import { Blog } from "./pages/blog/blog"
import App from "./App";
import { BASE } from "./const";


// define our router and export it from this file
const router = createBrowserRouter([
    {
      path: BASE,
      element: <App />,
      children: [
        {
          path: "about",
          element: <About />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "blog",
          element: <Blog />,
        }
      ],
    },
  ]);

  // create a routes componant that passes our router obect to the RouterProvider to be used in our main.jsx 
  export function Routes () {
    return <RouterProvider router={router} />
  }