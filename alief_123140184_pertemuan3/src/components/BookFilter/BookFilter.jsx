import React from "react";
import "./BookFilter.css";

const BookFilter = ({
  filterStatus,
  setFilterStatus,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="Cari buku berdasarkan judul atau penulis..."
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="status-filter">
        <label>Filter Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="semua">Semua</option>
          <option value="beli">Ingin Dibeli</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="milik">Sudah Dimiliki</option>
        </select>
      </div>
    </div>
  );
};

export default BookFilter;
