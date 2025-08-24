import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
import RootLayOut from "./components/RootLayOut";
import Login from "./features/auth/Login.jsx";
import Register from "./features/auth/Register.jsx";
import AdminUi from "./features/admin/AdminUi.jsx";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayOut />,
      children: [
        {
          index: true,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "admin-panel",
          element: <AdminUi />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
