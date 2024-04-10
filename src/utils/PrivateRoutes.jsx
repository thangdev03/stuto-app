import React from "react"
import { Navigate, Outlet } from "react-router-dom"

export default function PrivateRoutes() {
    const user = JSON.parse(localStorage.getItem("user"));
    const isAuth = user && user.role == "client" ? true : false

    return isAuth ? <Outlet /> : <Navigate to="/login" />
}