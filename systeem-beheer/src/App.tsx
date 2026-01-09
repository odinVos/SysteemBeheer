import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import CreateLendWizard from "./components/CreateLendWizard";
import ConnectionDatabase from "./components/ConnectionDatabase";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/create-lend" element={<CreateLendWizard />} />
        <Route path="*" element={<Navigate to="/home" />} />
        <Route path="db" element={<ConnectionDatabase />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
