import React, { useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Error404Page } from "../pages/Error404Page";
import { Login } from "../pages/Login";
import { Notes } from "../pages/Notes";
import { Users } from "../pages/Users";

export const AppRoutes = () => {
  const navigator = useNavigate();
  const token = localStorage.getItem("token");
  console.log("el token en AppRoutes ", token);

  return (
    <div>
      {token && (
        <div className="bg-green-600 flex  justify-between items-center px-6">
          <Link to="/" className="px-2 text-white text-2xl py-2">
            RoutesApp
          </Link>
          <nav>
            <Link to="/" className="text-white  px-2">
              Users
            </Link>
            <Link to="/notes" className="text-white  px-2">
              Notes
            </Link>
            <button
              className="text-white  px-2"
              onClick={() => {
                localStorage.removeItem("token");
                navigator("/login");
              }}
            >
              Cerrar sesion
            </button>
          </nav>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Error404Page />} />
      </Routes>
    </div>
  );
};
