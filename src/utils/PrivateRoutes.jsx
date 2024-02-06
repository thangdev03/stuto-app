import React from "react"
import { Navigate, Outlet } from "react-router-dom"

export default function PrivateRoutes() {
    let auth = true;
    return auth ? <Outlet /> : <Navigate to="/login" />
}