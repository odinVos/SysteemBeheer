import React from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="*" element={<Navigate to="/home" />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
