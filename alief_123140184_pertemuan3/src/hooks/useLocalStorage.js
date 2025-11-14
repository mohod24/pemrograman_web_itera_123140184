import { useState, useEffect } from "react";

/**
 * Mendapatkan nilai dari localStorage atau menggunakan nilai awal.
 * Ini dijalankan sebagai fungsi agar localStorage HANYA dibaca saat awal saja.
 */
function getSavedValue(key, initialValue) {
  const savedValue = localStorage.getItem(key);

  if (savedValue) {
    try {
      return JSON.parse(savedValue);
    } catch (e) {
      // Jika data di localStorage rusak, kembalikan nilai awal
      console.error("Gagal parsing JSON dari localStorage", e);
      return initialValue;
    }
  }

  // Jika tidak ada nilai tersimpan, kembalikan nilai awal
  // Jika nilai awal adalah fungsi, jalankan fungsinya
  return initialValue instanceof Function ? initialValue() : initialValue;
}

/**
 * Sebuah custom hook yang mirip dengan useState, namun otomatis
 * menyimpan nilainya ke localStorage setiap kali berubah.
 */
export function useLocalStorage(key, initialValue) {
  // Gunakan fungsi getSavedValue untuk inisialisasi state
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue);
  });

  // Gunakan useEffect untuk menyimpan ke localStorage setiap kali 'value' berubah
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Gagal menyimpan ke localStorage", e);
    }
  }, [key, value]); // Hanya jalankan jika key atau value berubah

  return [value, setValue];
}
