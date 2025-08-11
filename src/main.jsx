import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./components/router/Router/Router.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Helmet } from 'react-helmet-async';
import { HelmetProvider } from 'react-helmet-async';


const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <div className="max-w-7xl mx-auto">
          {" "}
          <RouterProvider router={router}></RouterProvider>
        </div>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
);
