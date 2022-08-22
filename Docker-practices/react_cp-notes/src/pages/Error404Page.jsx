import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Error404Page = () => {
  return (
    <div className="flex flex-row justify-center content-center bg-white h-screen items-center align-middle">
      <div className="m-auto flex flex-col justify-center">
        <h1 className="text-4xl text-red-700 mb-5">
          NO SE HA ENCONTRADO LA PAGINA :(
        </h1>

        <Link
          className="bg-green-600 text-white py-3 px-3 rounded-md shadow flex flex-row justify-center"
          to="/"
        >
          Regresar
        </Link>
      </div>
    </div>
  );
};
