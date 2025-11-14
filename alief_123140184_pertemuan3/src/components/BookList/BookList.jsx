import React, { useMemo } from "react";
import { useBooks } from "../../context/BookContext";
import "./BookList.css";

// Komponen internal untuk satu item buku
const BookItem = ({ book, onEdit, onDelete }) => {
  const getStatusLabel = (status) => {
    switch (status) {
      case "beli":
        return "Ingin Dibeli";
      case "baca":
        return "Sedang Dibaca";
      case "milik":
        return "Sudah Dimiliki";
      default:
        return "Tidak Diketahui";
    }
  };

  return (
    <div className="book-item">
      <div className="book-info">
        <h4>{book.title}</h4>
        <p>{book.author}</p>
        <span className={`status-badge status-${book.status}`}>
          {getStatusLabel(book.status)}
        </span>
      </div>
      <div className="book-actions">
        <button onClick={() => onEdit(book)} className="btn-edit">
          Edit
        </button>
        <button onClick={() => onDelete(book.id)} className="btn-delete">
          Hapus
        </button>
      </div>
    </div>
  );
};

// Komponen List Utama
const BookList = ({ filterStatus, searchQuery, onEditClick }) => {
  const { books, deleteBook } = useBooks(); // Ambil dari Context

  // Gunakan useMemo untuk optimasi
  // Logika filter ini hanya akan berjalan ulang jika
  // 'books', 'filterStatus', atau 'searchQuery' berubah.
  const filteredBooks = useMemo(() => {
    let tempBooks = books;

    // 1. Filter berdasarkan Status
    if (filterStatus !== "semua") {
      tempBooks = tempBooks.filter((book) => book.status === filterStatus);
    }

    // 2. Filter berdasarkan Pencarian (SearchQuery)
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      tempBooks = tempBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(lowerQuery) ||
          book.author.toLowerCase().includes(lowerQuery)
      );
    }

    return tempBooks;
  }, [books, filterStatus, searchQuery]);

  if (filteredBooks.length === 0) {
    return <p>Tidak ada buku yang cocok dengan filter Anda.</p>;
  }

  return (
    <div className="book-list">
      {filteredBooks.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          onEdit={onEditClick} // Teruskan fungsi 'onEditClick' dari props
          onDelete={deleteBook} // Teruskan fungsi 'deleteBook' dari context
        />
      ))}
    </div>
  );
};

export default BookList;
