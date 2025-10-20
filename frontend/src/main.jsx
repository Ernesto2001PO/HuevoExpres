import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import AppNavbar  from './components/AppNavbar';
import Registro from './pages/Regsitro';
import Productos from './pages/Productos';

// --- Renderizado de la Aplicación ---

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          {/* El Navbar se coloca aquí, fuera de <Routes> */}
          <AppNavbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/productos" element={<Productos />} />



            {/* Agrega aquí el resto de tus rutas */}
          </Routes>
          
          {/* Aquí podrías poner un Footer si también quieres que sea global */}

        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);

