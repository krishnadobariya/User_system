import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../src/components/pages/HomePage";
import Register from "../src/components/pages/RegisterPage";
import Login from "../src/components/pages/LoginPage";
import Admin from "../src/components/pages/AdminPage";
import AdminLogin from "./components/Admin/AdminLogin";
// import Metamask from './Metamask'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
