import { createBrowserRouter } from "react-router-dom";
import Main from "../../../layouts/Main/Main";
import Home from "../../page/Home/Home";
import Login from "../../page/Home/Login/Login";
import Contact from "../../page/Home/contact/Contact";
import Profile from "../../page/Home/Profile/Profile";
import About from "../../page/About/About";
import CardDetails from "../../page/Home/Card_Details/CardDetails";
import Category from "../../page/Home/categeory/Category";
import CategoryOutlet from "../../page/Home/categoryOutlet/CategoryOutlet";
import ShopingCart from "../../page/Shop/ShopingCart";
import Wishlist from "../../page/Home/Wishlist/Wishlist";
import Register from "../../page/Home/register/Register";
import Setting from "../../page/Setting/Setting";
import Dashboard from "../../page/Home/Navbar/Dashboard/Dashboard";
import UserHome from "../../page/Home/Navbar/Dashboard/UserHome";
import ManageUser from "../../page/Home/Navbar/Dashboard/Admin/ManageUser";
import PrivateRouter from "./privateRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/profile",
        element: <PrivateRouter><Profile /></PrivateRouter>,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/product/:id",
        element: <CardDetails />,
        loader: async ({ params }) => {
          try {
            const res = await fetch(
              `http://localhost:3100/products/${params.id}`
            );
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const text = await res.text();
            if (!text) return null;
            return JSON.parse(text);
          } catch (error) {
            console.error("Error loading product:", error);
            return null;
          }
        },
      },
      {
        path: "/products/:category",
        element: <CategoryOutlet></CategoryOutlet>,
        loader: async ({ params }) => {
          const rea = await fetch(
            `http://localhost:3100/products/${params.category}`
          );
          if (!rea.ok) {
            throw new Error("Failed to fetch products for category");
          }
        },
      },
      {
        path: "/cart",
        element: <PrivateRouter><ShopingCart></ShopingCart></PrivateRouter>,
      },
      {
        path: "/wishlist",
        element: <PrivateRouter><Wishlist></Wishlist></PrivateRouter>,
      },
      {
        path: "/signup",
        element: <Register></Register>,
      },
      {
        path: "/settings",
        element: <PrivateRouter><Setting></Setting></PrivateRouter>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>,
    children: [
      {
        path: "userHome",
        element: <UserHome></UserHome>,
      },
      {
        path: "dashboard/admin/users",
        element: <PrivateRouter><ManageUser></ManageUser></PrivateRouter>,
      },
    ],
  },
]);

export default router;
