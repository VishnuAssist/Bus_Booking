import { Suspense, lazy } from "react";
import { Navigate, type RouteObject } from "react-router-dom";
import LazyLoading from "../Component/Loading/LazyLoading";
import RouteAuth from "../Auth/RouteAuth";
import SidebarLayout from "../Layout/AppLayout/SideBarLayout";
import BaseLayout from "../Layout/BaseLayout";
import STS from "../Screens/sts";
import TopBarLayout from "../Layout/AppLayout/TopBarLayout";

const Loader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<LazyLoading />}>
      <Component {...props} />
    </Suspense>
  );

const Profile = Loader(lazy(() => import("../Screens/Profile")));
const OperatorManagement = Loader(
  lazy(() => import("../Screens/OperatorManagement"))
);

const Store = Loader(lazy(() => import("../Screens/store/index")));
const Dictionary = Loader(lazy(() => import("../Screens/Dictionary/index")));
const StoreTarget = Loader(lazy(() => import("../Screens/storeTarget")));
const StoreUser = Loader(lazy(() => import("../Screens/storeUser")));

const Status404 = Loader(lazy(() => import("../Component/Status/Status404")));
const Status500 = Loader(lazy(() => import("../Component/Status/Status500")));
const Status401 = Loader(lazy(() => import("../Component/Status/Status401")));
const StatusComingSoon = Loader(
  lazy(() => import("../Component/Status/ComingSoon"))
);
const StatusMaintenance = Loader(
  lazy(() => import("../Component/Status/Maintenance"))
);

const routes: RouteObject[] = [
  {
    path: "",
    element: <BaseLayout />,
    children: [
      // {
      //   path: "/Login",
      //   element: <Login />,
      // },
      {
        path: "",
        element: <Navigate to="/Login" replace />,
      },

      {
        path: "status",
        children: [
          {
            path: "",
            element: <Navigate to="404" replace />,
          },
          {
            path: "404",
            element: <Status404 />,
          },
          {
            path: "500",
            element: <Status500 />,
          },
          {
            path: "maintenance",
            element: <StatusMaintenance />,
          },
          {
            path: "coming-soon",
            element: <StatusComingSoon />,
          },
        ],
      },
      {
        path: "*",
        element: <Status404 />,
      },
      {
        path: "401",
        element: <Status401 />,
      },
    ],
  },
  {
    element: <RouteAuth />,
    children: [
      {
        path: "dashboards",
        element: <TopBarLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="Dashboard" replace />,
          },
          {
            path: "Profile",
            element: <Profile />,
          },
          {
            path: "operatormanagemet",
            element: <OperatorManagement />,
          },
        ],
      },
    ],
  },
  {
    element: <RouteAuth />,
    children: [
      {
        element: <TopBarLayout />,
        children: [
          {
            path: "sts",
            element: <STS />,
            children: [
              {
                index: true,
                element: <Navigate to="sales" replace />,
              },
              // {
              //   path: "/Login",
              //   element: <Login />,
              // },
              // {
              //   path: "",
              //   element: <Navigate to="/Login" replace />,
              // },

              {
                path: "target",
                element: <StoreTarget />,
              },

              {
                path: "store",
                element: <Store />,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    element: <RouteAuth />,
    children: [
      {
        path: "settings",
        element: <TopBarLayout />,
        children: [
          {
            path: "dictionary",
            element: <Dictionary />,
          },
          {
            path: "store",
            element: <Store />,
          },
          {
            path: "target",
            element: <StoreTarget />,
          },
          {
            path: "storeTarget",
            element: <StoreTarget />,
          },
          {
            path: "StoreUser",
            element: <StoreUser />,
          },
        ],
      },
    ],
  },
];

export default routes;
