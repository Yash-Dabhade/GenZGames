import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Shopping from "../pages/Shopping";
import GameDetail from "../pages/GameDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Orders from "../pages/Orders";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentFailed from "../pages/PaymentFailed";
import RateGame from "../pages/RateGame";

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Shopping />} />
        <Route path="/details" element={<GameDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* TODO : protected routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/paymentfailed" element={<PaymentFailed />} />
        <Route path="/rategame" element={<RateGame />} />
      </Routes>
    </>
  );
}
