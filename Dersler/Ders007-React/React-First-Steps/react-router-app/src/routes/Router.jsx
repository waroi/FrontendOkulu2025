import { useRoutes, Navigate } from "react-router";
import HomeView from "../views/HomeView";
import ParametreView from "../views/ParametreView";
import userRouter from "./userRouter";
import NewView from "../views/NewView";
import EconomyNewView from "../views/EconomyNewView";
import SportNewView from "../views/SportNewView";

const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <HomeView />,
    },
    {
      path: "/parametre/:id",
      element: <ParametreView />,
    },
    userRouter,
    {
      path: "/haberler",
      element: <NewView />,
      children: [
        { index: true, element: <Navigate to="ekonomi" /> },
        {
          path: "ekonomi",
          element: <EconomyNewView />,
        },
        {
          path: "spor",
          element: <SportNewView />,
        },
      ],
    },
  ]);
  return routes;
};

export default Router;
