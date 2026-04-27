import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Login from "../pages/Login.jsx";
import Index from "../pages/dashboards/Index.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Login /> },
      {
        path: "/dashboard",
        element: <Index />,
      },
    ],
  },
]);
