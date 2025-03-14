//Home.js
import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-8">
      {/* Navbar */}
      <nav className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Resumen.es</h1>
        <div className="flex gap-4">
          <button className="bg-gradient-to-r from-blue-400 to-purple-400 text-white px-4 py-2 rounded-lg">
            Login
          </button>
          <button className="bg-gradient-to-r from-blue-400 to-purple-400 text-white px-4 py-2 rounded-lg">
            Sign up
          </button>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="mt-10 flex gap-8">
        {/* Libros */}
        <div className="flex gap-4">
          <img src="/images/habitos-atomicos.jpg" className="w-32 rounded-lg" alt="Hábitos Atómicos" />
          <img src="/images/moved-my-cheese.jpg" className="w-32 rounded-lg" alt="Who Moved My Cheese?" />
          <img src="/images/nunca-te-pares.jpg" className="w-32 rounded-lg" alt="Nunca te Pares" />
        </div>

        {/* Descripción */}
        <div>
          <p className="text-lg font-semibold">
            ¿No tienes tiempo para leer libros enteros?
          </p>
          <p className="mt-2 text-gray-700">
            Aprovecha cada minuto con resúmenes claros, directos y prácticos.
          </p>
          <ul className="mt-4 text-gray-600 list-disc list-inside">
            <li>Lo mejor de los libros en minutos.</li>
            <li>Aprende sin perder tiempo.</li>
            <li>Decide si un libro vale la pena antes de comprarlo.</li>
          </ul>
        </div>
      </div>

      {/* Botón de catálogo */}
      <div className="mt-10 text-center">
        <button className="bg-gradient-to-r from-blue-400 to-purple-400 text-white px-6 py-2 rounded-lg flex items-center">
          🔍 Catálogo
        </button>
      </div>
    </div>
  );
};

export default Home;
