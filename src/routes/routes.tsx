import {
  createBrowserRouter,
} from "react-router-dom";
import Login from "../component/login/Login";
import Main from "../layout/Main";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>
  },
  {
    path: "/login",
    element: <Login></Login>
  },
]);

export default router