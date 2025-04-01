import React, { useNavigate, useState } from 'react';
//import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with:", username, password);
    // Aquí iría la lógica de autenticación
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Iniciar sesión</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
        >
          Iniciar sesión
        </button>
        <p className="text-center text-gray-600 mt-4">
          ¿No tienes cuenta?
          <button onClick={() => navigate("/signup")} className="text-blue-500 ml-1">
            Regístrate
          </button>
        </p>
        <button
          onClick={() => navigate("/")}
          className="w-full bg-gray-300 hover:bg-gray-400 text-black p-2 rounded-lg mt-4"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
