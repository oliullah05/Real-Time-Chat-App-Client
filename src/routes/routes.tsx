import {
  createBrowserRouter,
} from "react-router-dom";
import Login from "../component/login/Login";
import Main from "../layout/Main";
import Register from "../component/register/register";
import ForgotPassword from "../component/forgotPassword/ForgotPassword";
import PrivateRoute from "./PrivateRoute";




const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><Main></Main></PrivateRoute>
  },
  {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: "/register",
    element: <Register></Register>
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword></ForgotPassword>
  },
]);

export default router