import React from "react";
// 1. Import komponen navigasi
import { Routes, Route, Link } from "react-router-dom";

// 2. Import halaman (pages) yang sudah kita buat
import HomePage from "./pages/Home/HomePage";
import StatsPage from "./pages/Stats/StatsPage";
import "./App.css"; // Kita masih bisa pakai App.css untuk styling global

function App() {
  return (
    <div className="app-container">
      {/* 3. Buat navigasi sederhana (Link menggantikan tag <a>) */}
      <nav>
        <ul>
          <li>
            <Link to="/">Beranda</Link>
          </li>
          <li>
            <Link to="/stats">Statistik</Link>
          </li>
        </ul>
      </nav>

      {/* 4. Tentukan area di mana halaman akan di-render */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
