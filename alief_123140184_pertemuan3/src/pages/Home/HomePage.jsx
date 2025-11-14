import React, { useState } from "react";
import BookForm from "../../components/BookForm/BookForm";
import BookFilter from "../../components/BookFilter/BookFilter";
import BookList from "../../components/BookList/BookList";

const HomePage = () => {
  // State untuk filter & search (Lifting State Up)
  const [filterStatus, setFilterStatus] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");

  // State untuk menentukan buku mana yang sedang di-edit
  // null = tidak ada (mode "Tambah Buku")
  // object = ada buku (mode "Edit Buku")
  const [bookToEdit, setBookToEdit] = useState(null);

  // Fungsi ini akan dipanggil oleh BookList saat tombol 'Edit' diklik
  const handleEditClick = (book) => {
    setBookToEdit(book);
    // Scroll ke atas agar form edit terlihat
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fungsi ini akan dipanggil oleh BookForm saat selesai edit/batal
  const handleDoneEditing = () => {
    setBookToEdit(null);
  };

  return (
    <div>
      <h2>Dashboard Buku Pribadi</h2>

      {/* Komponen Form ini sekarang pintar.
        Jika 'bookToEdit' ada isinya, dia jadi mode Edit.
        Jika 'bookToEdit' null, dia jadi mode Tambah.
      */}
      <BookForm bookToEdit={bookToEdit} onDone={handleDoneEditing} />

      <hr style={{ margin: "30px 0" }} />

      <h3>Koleksi Bukumu</h3>

      {/* Komponen Filter ini "dikendalikan" oleh state di HomePage
       */}
      <BookFilter
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Komponen List menerima state filter 
        dan fungsi untuk 'trigger' mode edit
      */}
      <BookList
        filterStatus={filterStatus}
        searchQuery={searchQuery}
        onEditClick={handleEditClick}
      />
    </div>
  );
};

export default HomePage;
