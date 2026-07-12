import { createBrowserRouter,RouterProvider} from "react-router";

import HomePage from "./pages/Home.jsx"
import BusDetail from "./pages/BusDetail.jsx"
import AddRoute from "./admin/addRoute.jsx";

const router=createBrowserRouter([
{path:"/",element:<HomePage />},
{path:"/bus/:id",element:<BusDetail />},
{path:"/developer",element: <AddRoute />}



]);

export default function App(){
  return<RouterProvider router={router}></RouterProvider>
}