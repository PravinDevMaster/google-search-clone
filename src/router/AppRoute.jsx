import React, { lazy, Suspense } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

// lazy loading pages for better performance
const LandingPage = lazy(() => import("../pages/LandingPage"));
const SearchPage = lazy(() => import("../pages/SearchPage"));
export const AppRoute = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="w-screen h-screen flex justify-center items-center">
            Loading...
          </div>
        }
      >
        <Routes>
          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<LandingPage />} />{" "}
            <Route path="/search" element={<SearchPage />} />
          </Route>
          {/* Public Routes */}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
};
