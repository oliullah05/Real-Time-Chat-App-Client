import {
  createBrowserRouter,
} from "react-router-dom";
import Login from "../component/login/Login";
import Main from "../layout/Main";
import Register from "../component/register/register";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>
  },
  {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: "/register",
    element: <Register></Register>
  },
]);

export default router