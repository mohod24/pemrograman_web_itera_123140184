import { useMemo } from "react";
import { useBooks } from "../context/BookContext";

/**
 * Custom hook untuk menghitung dan menyediakan statistik buku.
 * Ini menggunakan 'useMemo' untuk efisiensi, sehingga penghitungan
 * hanya diulang jika daftar 'books' berubah.
 */
export const useBookStats = () => {
  const { books } = useBooks();

  const stats = useMemo(() => {
    // Inisialisasi penghitung
    let totalCount = books.length;
    let ownedCount = 0;
    let readingCount = 0;
    let toBuyCount = 0;

    // Loop melalui semua buku untuk menghitung
    for (const book of books) {
      if (book.status === "milik") {
        ownedCount++;
      } else if (book.status === "baca") {
        readingCount++;
      } else if (book.status === "beli") {
        toBuyCount++;
      }
    }

    // Kembalikan objek statistik
    return {
      totalCount,
      ownedCount,
      readingCount,
      toBuyCount,
    };
  }, [books]); // Dependensi: 'books'. Ini akan dihitung ulang hanya jika 'books' berubah.

  return stats;
};
