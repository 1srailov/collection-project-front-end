import { Navigate, useRoutes } from "react-router-dom";
import Home from "../components/Home/Home";
import CollectionById from "../components/Collection/CollectionById";
import Item from "../components/Item/Item";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

const AppPath = () => {
  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/collection/:id", element: <CollectionById /> },
    { path: "/collection/:id/item/:id", element: <Item /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "*", element: <Navigate to="/" /> },
  ]);
};

export default AppPath;
