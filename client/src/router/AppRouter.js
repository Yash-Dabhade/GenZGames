import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Shopping from "../pages/Shopping";
import GameDetail from "../pages/GameDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Shopping />} />
        <Route path="/details" element={<GameDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
