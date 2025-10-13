import { Suspense, lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import LazyLoading from '../Component/Loading/LazyLoading';
import RouteAuth from '../Auth/RouteAuth';
import SidebarLayout from '../Layout/AppLayout';
import BaseLayout from '../Layout/BaseLayout';

const Loader = (Component: any) => (props: any) =>
(
  <Suspense fallback={<LazyLoading />}>
    <Component {...props} />
  </Suspense>
);

// OverView
const Login = Loader(lazy(() => import('../Screens/auth')));
const Dashboard = Loader(lazy(() => import('../Screens/dashboard/index')));
const Commission = Loader(lazy(() => import('../Screens/commission/index')));
const LeaderBoard = Loader(lazy(() => import('../Screens/LeaderBoard')));
const Profile = Loader(lazy(() => import('../Screens/Profile')));
const Calender = Loader(lazy(() => import('../Screens/Calender')));

// Staff Portal
const Attendence = Loader(lazy(() => import('../Screens/StaffPortal/Attendence')));
const LeaveRequest = Loader(lazy(() => import('../Screens/StaffPortal/LeaveRequest')));
const Achievements = Loader(lazy(() => import('../Screens/StaffPortal/Achievements')));

// Admin
const AdminAchievement = Loader(lazy(() => import('../Screens/Admin/Achievements')));
const RuleEngine = Loader(lazy(() => import('../Screens/Admin/RuleEngine')));

const Dictionary = Loader(lazy(() => import('../Screens/dictionary/index')));
const Shift = Loader(lazy(() => import('../Screens/shift/index')));
const Store = Loader(lazy(() => import('../Screens/store/index')));
const StoreTarget = Loader(lazy(() => import('../Screens/storeTarget/index')));
const Sales = Loader(lazy(() => import('../Screens/sales/index')));





const Reports = Loader(lazy(() => import('../Screens/Reports/Index')));


const Status404 = Loader(
  lazy(() => import('../Component/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('../Component/Status/Status500'))
); const Status401 = Loader(
  lazy(() => import('../Component/Status/Status401'))
);
const StatusComingSoon = Loader(
  lazy(() => import('../Component/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('../Component/Status/Maintenance'))
);

const routes: RouteObject[] = [
  {
    path: "",
    element: <BaseLayout />,
    children: [
      {
        path: "/Login",
        element: <Login />,
      },
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
        element: <SidebarLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="Dashboard" replace />,
          },
          {
            path: "Dashboard",
            element: <Dashboard />,
          },
          {
            path: "Commission",
            element: <Commission />,
          },
          {
            path: "LeaderBoard",
            element: <LeaderBoard />,
          },
          {
            path: "Profile",
            element: <Profile />,
          },
          {
            path: "Calender",
            element: <Calender />,
          },
        ],
      },
    ],
  },
  {
    element: <RouteAuth />,
    children: [
      {
        path: "staff",
        element: <SidebarLayout />,
        children: [
          {
            path: "attendence",
            element: <Attendence />,
          },
          {
            path: "leaveRequest",
            element: <LeaveRequest />,
          },
          {
            path: "achievements",
            element: <Achievements />,
          },
        ],
      },
    ],
  },
  {
    element: <RouteAuth />,
    children: [
      {
        path: "admin",
        element: <SidebarLayout />,
        children: [
          {
            path: "achievement",
            element: <AdminAchievement />,
          },
          {
            path: "ruleEngine",
            element: <RuleEngine />,
          },
          {
            path: "reports",
            element: <Reports />,
          },
          {
            path: "reports",
            element: <Reports />,
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
        element: <SidebarLayout />,
        children: [
          // {
          //   index: true,
          //   element: <Navigate to="Dashboard" replace />,
          // },

          // {
          //   path: "Dashboard",
          //   element: <Dashboard />,
          // },
          {
            path: "Dictionary",
            element: <Dictionary />,
          },
          {
            path: "shift",
            element: <Shift />,
          },
          {
            path: "store",
            element: <Store />,
          },
          {
            path: "storeTarget",
            element: <StoreTarget />,
          },
          {
            path: "sales",
            element: <Sales />,
          },
        ],
      },
    ],
  },
];

export default routes;
