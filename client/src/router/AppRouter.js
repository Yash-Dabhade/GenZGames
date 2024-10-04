import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Shopping from "../pages/Shopping";
import GameDetail from "../pages/GameDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Orders from "../pages/Orders";
import RateGame from "../pages/RateGame";
import Page404 from "../pages/Page404";
import GoogleSignInPage from "../pages/GoogleSignInPage";
import Admin from "../pages/Admin";

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Shopping />} />
        <Route path="/details" element={<GameDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/google/:token" element={<GoogleSignInPage />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/rategame" element={<RateGame />} />
        {/* <Route path="/for/admin" element={<Admin />} /> */}
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </>
  );
}
