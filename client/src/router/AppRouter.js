import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Shopping from "../pages/Shopping";
import GameDetail from "../pages/GameDetail";
import Login from "../pages/Login";

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Shopping />} />
        <Route path="/details" element={<GameDetail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
