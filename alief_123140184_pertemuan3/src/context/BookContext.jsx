import React, { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid"; // Kita perlu UUID untuk ID buku yang unik

// Kita perlu menginstal 'uuid' untuk ID unik
// Jalankan di terminal Anda: npm install uuid

/*
  Struktur data buku yang kita inginkan:
  {
    id: "string-unik",
    title: "string",
    author: "string",
    status: "milik" | "baca" | "beli"
  }
*/

// 1. Buat Context
const BookContext = createContext();

// 2. Buat Provider (Komponen yang "membungkus" aplikasi)
export function BookProvider({ children }) {
  // Gunakan custom hook kita! Data akan otomatis tersimpan di localStorage
  // dengan key 'books' dan nilai awal array kosong.
  const [books, setBooks] = useLocalStorage("books", []);

  // --- Fungsi CRUD (Create, Read, Update, Delete) ---

  const addBook = (title, author, status) => {
    const newBook = {
      id: uuidv4(), // Buat ID unik
      title,
      author,
      status,
    };
    // Tambahkan buku baru ke array 'books' yang sudah ada
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const updateBook = (id, updatedData) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, ...updatedData } : book
      )
    );
  };

  const deleteBook = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  // 'useMemo' digunakan untuk optimasi
  // Nilai 'value' hanya akan dibuat ulang jika 'books' berubah.
  const value = useMemo(
    () => ({
      books,
      addBook,
      updateBook,
      deleteBook,
    }),
    [books] // Dependensi: 'books'
  );

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

// 3. Buat Custom Hook (untuk memudahkan penggunaan Context)
// Nanti di komponen lain, kita tinggal panggil `useBooks()`
export const useBooks = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error("useBooks harus digunakan di dalam BookProvider");
  }
  return context;
};
