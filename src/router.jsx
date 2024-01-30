// import the function to amke a browser router from react-router-dom
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { About } from "./pages/about/about";
import { Home } from "./pages/home/home";
import App from "./App";


// define our router and export it from this file
const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "about",
          element: <About />,
        },
        {
          path: "home",
          element: <Home />,
        }
      ],
    },
  ]);

  // create a routes componant that passes our router obect to the RouterProvider to be used in our main.jsx 
  export function Routes () {
    return <RouterProvider router={router} />
  }