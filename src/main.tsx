import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import Home from "./pages/Home.tsx";
import Receipe from "./pages/Receipe.tsx";
import Favorite from "./pages/Favorite.tsx";
import AllReceipe from "./pages/AllReceipe.tsx";
import AddReceipe from "./pages/AddReceipe.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/receipe/:id",
    element: <Receipe />,
  },
  {
    path: "/fav",
    element: <Favorite />,
  },
  {
    path: "/receipe/all",
    element: <AllReceipe />,
  },
  {
    path: "/add",
    element: <AddReceipe />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
