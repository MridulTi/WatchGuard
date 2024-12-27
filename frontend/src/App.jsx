import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Dashboard/Home";
import MainLayout from "./Pages/More/MainLayout";
import Monitoring from "./Pages/Monitoring/Monitoring";
import Monitor from "./Pages/Monitoring/Monitor";
import { useDashboardContext } from "./Context/DashboardContext";
import Reg_Log from "./Pages/Reg_Log";
export default function App() {
  const {loggedIn}=useDashboardContext();
  const router = createBrowserRouter([
    {
      path:"/",
      element:loggedIn?<Navigate to="/app"/>:<Navigate to="/auth"/>
    },
    {
      path:'/auth',
      element:loggedIn?<Navigate to="/app"/>:<Reg_Log/>
    },
    {
      path: "/app",
      element: loggedIn?<MainLayout />:<Navigate to="/auth"/>,
      children: [
        {
          path: "/app/",
          element: <Home />,
        },
        {
          path: "/app/monitor",
          element: <Monitor />,
          children: [
            {

              path: "/app/monitor/:Slugs",
              element: <Monitoring />
            }
          ]
        },
      ]
    },
  ]);
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  )
}