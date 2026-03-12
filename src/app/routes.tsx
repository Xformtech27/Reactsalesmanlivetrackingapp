import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { LiveTracking } from "./pages/LiveTracking";
import { CustomerVisit } from "./pages/CustomerVisit";
import { Reports } from "./pages/Reports";
import { Salesman } from "./pages/Salesman";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", Component: Dashboard },
      { path: "live-tracking", Component: LiveTracking },
      { path: "customer-visit", Component: CustomerVisit },
      { path: "reports", Component: Reports },
      { path: "salesman", Component: Salesman },
    ],
  },
]);