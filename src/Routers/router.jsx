import { createBrowserRouter } from "react-router-dom";
import DashboardRoutes from "../Layout/Dashboard/DashboardRoutes";
import Overview from "../Pages/Dashboard/Overview/Overview";
import Products from "../Pages/Dashboard/Products/Products";
import CreateProduct from "../Pages/Dashboard/Products/CreateProduct";
import ProductDetails from "../Pages/Dashboard/Products/ProductDetails";
import ProductUpdate from "../Pages/Dashboard/Products/ProductUpdate";
import ProductCategory from "../Pages/Dashboard/Products/ProductCategory";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardRoutes />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Overview />
          </PrivateRoute>
        ),
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "create-product",
        element: <CreateProduct />,
      },
      {
        path: "product-details",
        element: <ProductDetails />,
      },
      {
        path: "product-update",
        element: <ProductUpdate />,
      },
      {
        path: "product-category",
        element: <ProductCategory />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
