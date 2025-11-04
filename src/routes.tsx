import { createBrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import { Shop } from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import BlogPost from "./pages/BlogPost";
import Blog from "./pages/Blog";
import BulkOrders from "./pages/BulkOrders";
import Quality from "./pages/Quality";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/bulk-orders",
    element: <BulkOrders />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/blog/:id",
    element: <BlogPost />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);