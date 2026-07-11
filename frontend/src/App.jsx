import { createBrowserRouter,RouterProvider} from "react-router";

import HomePage from "./pages/Home.jsx"
import BusDetail from "./pages/BusDetail.jsx"

const router=createBrowserRouter([
{path:"/",element:<HomePage />},
{path:"/bus/:id",element:<BusDetail />}


]);

export default function App(){
  return<RouterProvider router={router}></RouterProvider>
}