import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { MscLogo } from "../../assets/brand/MscLogo";

const LoginPage = () => {
  const [email, setEmail] = useState("adrian@example.com");
  const [password, setPassword] = useState("NuevaClaveSegura123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="max-w-md mx-auto mt-20 p-6 shadow-md rounded bg-white items-center flex flex-col justify-center">
      <MscLogo width={150} />
      <h1 className="text-2xl font-bold  mb-5">MSC Chatbot </h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <input
          type="email"
          placeholder="Correo"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
