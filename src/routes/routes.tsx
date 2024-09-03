import {
  createBrowserRouter,
} from "react-router-dom";

import { Suspense, lazy } from "react";
import Message from "../component/Home/message/Message";
import Loading from "../component/shared/Loading";
import Home from "../layout/Home";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
const Login = lazy(() => import("../component/login/Login"))
const Register = lazy(() => import("../component/register/register"))
const ForgotPassword = lazy(() => import("../component/forgotPassword/ForgotPassword"))


const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><Home></Home></PrivateRoute>,
    children: [
      {
        path: "/",
        element: <p className="">Please Select a chat</p>
      },
      {
        path: "/inbox/:conversationId",
        element: <Message></Message>
      },
    ]
  },


  {
    path: "/login",
    element: <PublicRoute>
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense></PublicRoute>
  },
  {
    path: "/register",
    element: <PublicRoute>
      <Suspense fallback={<Loading />}>
        <Register />
      </Suspense></PublicRoute>
  },
  {
    path: "/forgot-password",
    element: <PublicRoute>
      <Suspense fallback={<Loading />}>
        <ForgotPassword />
      </Suspense></PublicRoute>
  },
]);

export default router