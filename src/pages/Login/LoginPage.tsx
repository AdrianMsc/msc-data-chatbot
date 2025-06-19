import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { MscLogo } from "../../assets/brand/MscLogo";
import AuthStatusAlert from "../../components/AuthStatusAlert/AuthStatusAlert";
import type { RootState } from "../../store/store";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {}, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      const token = response.data?.access_token;
      if (token) {
        dispatch(login(token));
        navigate("/");
      } else {
        throw new Error("Token no recibido");
      }
    } catch (err: any) {
      console.error("Error al iniciar sesión:", err);
      setError(err.response?.data?.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="h-[calc(100vh-56px)] w-screen  flex items-center justify-center">
        <AuthStatusAlert />
        <div className="max-w-md min-w-96 mx-auto pt-10 pb-6 px-6 shadow-md rounded bg-white items-center flex flex-col justify-center ">
          <MscLogo width={150} />
          <h1 className="text-xl py-5 font-bold">Welcome</h1>
          <p className="pb-5 text-sm">Login to MSC Fuel Design System</p>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <label className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Username"
                className="w-full p-2 border border-solid text-base rounded border-monochromes-grey_xlight px-4 py-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="self-end text-sm text-monochromes-grey_dark">
                Forgot username?
              </span>
            </label>

            <label className="flex flex-col gap-3">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border border-solid text-base rounded border-monochromes-grey_xlight"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="self-end text-sm text-monochromes-grey_dark">
                Forgot password?
              </span>
            </label>

            <label className="py-6">
              <input type="checkbox" name="remember" className="mr-2" />
              Remeber me
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition"
            >
              {isAuthenticated
                ? "Already logged in"
                : loading
                ? "Loading..."
                : "Login"}
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="text-sm flex justify-center gap-x-2 pt-6">
              <a href="#">Don’t have an account?</a>
              <a href="#" className="text-primary-blue_dark">
                Create Account
              </a>
            </div>
          </form>
        </div>
      </main>
      <footer className="p-4 bg-white  text-center text-sm">
        © 2000 - 2023 MSC Industrial Direct Co., Inc.
      </footer>
    </>
  );
};

export default LoginPage;
