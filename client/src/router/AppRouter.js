import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Shopping from "../pages/Shopping";
import GameDetail from "../pages/GameDetail";

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Shopping />} />
        <Route path="/details" element={<GameDetail />} />
      </Routes>
    </>
  );
}
