import React from "react";
import { useBookStats } from "../../hooks/useBookStats";
import "./StatsPage.css"; // Kita buat file CSS-nya

const StatsPage = () => {
  // Panggil hook-nya. Cukup satu baris!
  const { totalCount, ownedCount, readingCount, toBuyCount } = useBookStats();

  return (
    <div className="stats-page">
      <h2>Statistik Buku</h2>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Buku</h3>
          <p className="stat-number">{totalCount}</p>
        </div>

        <div className="stat-card">
          <h3>Buku Dimiliki</h3>
          <p className="stat-number" style={{ color: "#6f42c1" }}>
            {ownedCount}
          </p>
        </div>

        <div className="stat-card">
          <h3>Sedang Dibaca</h3>
          <p className="stat-number" style={{ color: "#28a745" }}>
            {readingCount}
          </p>
        </div>

        <div className="stat-card">
          <h3>Ingin Dibeli</h3>
          <p className="stat-number" style={{ color: "#007bff" }}>
            {toBuyCount}
          </p>
        </div>
      </div>

      {totalCount === 0 && (
        <p className="empty-stats">
          Anda belum menambahkan buku apa pun. Mulai tambahkan di halaman
          Beranda!
        </p>
      )}
    </div>
  );
};

export default StatsPage;
