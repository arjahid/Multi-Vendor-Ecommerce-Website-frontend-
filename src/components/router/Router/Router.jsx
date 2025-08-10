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
        element: <Profile />,
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
            const res = await fetch(`http://localhost:3100/products/${params.id}`);
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
        path:'/products/:category',
        element:<CategoryOutlet></CategoryOutlet>,
        loader:async ({params})=>{
          const rea=await fetch(`http://localhost:3100/products/${params.category}`);
          if (!rea.ok) {
            throw new Error("Failed to fetch products for category");
          }
        
          
        }
      },
      {
        path:'/cart',
        element:<ShopingCart></ShopingCart>
      }

     
    ],
  },
]);

export default router;
