import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Navigate to="/notes" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={token ? <Navigate to="/notes" replace /> : <Register />}
      />
      <Route
        path="/notes"
        element={token ? <Notes /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
}
