import './App.css'; // Deja el archivo de estilos si lo necesitas
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Aquí puedes agregar un header global si lo necesitas, pero lo básico ya está en Home */}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;