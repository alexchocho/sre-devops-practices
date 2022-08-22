import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigator = useNavigate();
  const userData = localStorage.getItem("token");
  useEffect(() => {
    if (userData != null) {
      navigator("/");
    }
  }, []);

  return (
    <div className="flex flex-row justify-center content-center w-full  align-middle">
      <button
        onClick={() => {
          localStorage.setItem("token", "123345");
          navigator("/");
        }}
        className="bg-blue-700 text-white py-4 px-5 "
      >
        Login
      </button>
    </div>
  );
};
