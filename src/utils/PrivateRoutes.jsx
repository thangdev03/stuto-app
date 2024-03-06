import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext";

export default function PrivateRoutes() {
    const [state, dispatch] = useAuthContext();
    const { user } = state;

    return user ? <Outlet /> : <Navigate to="/login" />
}