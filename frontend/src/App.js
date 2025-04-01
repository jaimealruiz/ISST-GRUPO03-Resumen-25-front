import './App.css'; // Deja el archivo de estilos si lo necesitas
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login"
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Aquí puedes agregar un header global si lo necesitas, pero lo básico ya está en Home */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;