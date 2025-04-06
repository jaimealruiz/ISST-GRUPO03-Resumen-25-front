import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Catalogo from "../pages/Catalogo";
import SubirResumen from "../pages/SubirResumen";
import NotFound from "../pages/NotFound";
import ResumenDetalle from "../pages/ResumenDetalle";
import Navbar from "../components/Navbar";

function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/escritor/subir" element={<SubirResumen />} />
        <Route path="/resumen/:id" element={<ResumenDetalle />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
