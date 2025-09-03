import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
import RootLayOut from "./components/RootLayOut";
import Login from "./features/auth/Login.jsx";
import Register from "./features/auth/Register.jsx";
import AdminUi from "./features/admin/AdminUi.jsx";
import ProductAddForm from "./features/admin/ProductAddForm.jsx";
import ProductEditForm from "./features/admin/ProductEditForm.jsx";
import Home from "./features/home/Home.jsx";
import ProductDetail from "./features/product/ProductDetail.jsx";
import CartPage from "./features/cart/CartPage.jsx";
import ProfilePage from "./features/profile/ProfilePage.jsx";
import OrderDetail from "./features/orders/OrderDetail.jsx";
import AuthRoute from "./components/AuthRoute.jsx";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayOut />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          element: <AuthRoute />,
          children: [
            {
              path: "login",
              element: <Login />,
            },
            {
              path: "register",
              element: <Register />,
            },
          ],
        },

        {
          path: "product/:id",
          element: <ProductDetail />,
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
        {
          path: "cart",
          element: <CartPage />,
        },
        {
          path: "/order/:id",
          element: <OrderDetail />,
        },
        {
          path: "admin-panel",
          element: <AdminUi />,
        },
        {
          path: "product-add-form",
          element: <ProductAddForm />,
        },
        {
          path: "product-edit/:id",
          element: <ProductEditForm />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
