/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";

const NotFound = lazy(() => import("./pages/NotFound"));
const LiveStreams = lazy(() => import("./pages/liveStream"));
const LiveStream = lazy(() => import("./pages/liveStream/item"));

type TRoute = {
  path: string;
  element: JSX.Element;
};

export const PageRoutes: TRoute[] = [
  {
    path: "/liveStreams",
    element: <LiveStreams />,
  },
  {
    path: "/liveStreams/:id",
    element: <LiveStream />,
  },

  //   {
  //     path: "/confirmation_salary/:id",
  //     element: <SalaryWithOfficeExpensesEA />,
  //   },

  { path: "*", element: <NotFound /> },
];
