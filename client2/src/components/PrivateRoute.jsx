import React from "react";
import { useSelector } from "react-redux";
import DashBoard from "../pages/DashBoard";
import SignIn from "../pages/Signin";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}
