import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BookForm from "./BookForm";
// Kita perlu BookProvider, TAPI kita akan 'mock' context-nya
import { BookProvider, useBooks } from "../../context/BookContext";

// 1. Mock 'uuid'
vi.mock("uuid", () => ({
  v4: () => "id-unik-123", // Selalu kembalikan ID yang sama saat tes
}));

// 2. Mock 'useBooks' hook
vi.mock("../../context/BookContext", async () => {
  // Ambil modul aslinya
  const actual = await vi.importActual("../../context/BookContext");

  // Buat fungsi mock untuk 'addBook'
  const mockAddBook = vi.fn();

  // Kembalikan modul, tapi 'useBooks'-nya kita ganti
  return {
    ...actual, // ...BookProvider, dll (tetap pakai yang asli)
    useBooks: () => ({
      addBook: mockAddBook, // Ganti addBook dengan mock
      updateBook: vi.fn(),
      deleteBook: vi.fn(),
      books: [], // Beri data awal jika perlu
    }),
  };
});

// Helper function untuk me-render komponen dengan provider
// (Kita tidak bisa pakai provider asli karena 'useBooks' sudah di-mock)
const renderBookForm = (props) => {
  return render(<BookForm {...props} />);
};

describe("Komponen BookForm", () => {
  // Reset mock 'addBook' sebelum setiap tes
  // Kita perlu akses 'useBooks' yang sudah di-mock
  let mockAddBook;
  beforeEach(async () => {
    // Muat ulang mock useBooks untuk mendapatkan fungsi mockAddBook terbaru
    const { useBooks } = await import("../../context/BookContext");
    mockAddBook = useBooks().addBook;
    mockAddBook.mockClear(); // Hapus hitungan panggilan sebelumnya
  });

  // Test Case 4: Memastikan validasi error handling berjalan
  it("seharusnya menampilkan pesan error jika form disubmit kosong", async () => {
    renderBookForm({}); // Render form tambah (kosong)

    // Klik tombol 'Simpan Buku'
    fireEvent.click(screen.getByRole("button", { name: /simpan buku/i }));

    // Gunakan 'waitFor' untuk menunggu state error di-update
    await waitFor(() => {
      // Harapkan 2 pesan error muncul
      expect(screen.getByText("Judul tidak boleh kosong")).toBeInTheDocument();
      expect(
        screen.getByText("Penulis tidak boleh kosong")
      ).toBeInTheDocument();
    });

    // Pastikan 'addBook' TIDAK dipanggil
    expect(mockAddBook).not.toHaveBeenCalled();
  });

  // Test Case 5: Memastikan 'addBook' dipanggil saat submit berhasil
  it("seharusnya memanggil addBook dengan data yang benar saat submit berhasil", async () => {
    renderBookForm({}); // Render form tambah

    // 1. Isi form
    fireEvent.change(screen.getByLabelText(/judul buku/i), {
      target: { value: "Buku React Keren" },
    });
    fireEvent.change(screen.getByLabelText(/penulis/i), {
      target: { value: "Penulis Hebat" },
    });
    fireEvent.change(screen.getByLabelText(/status/i), {
      target: { value: "baca" }, // Ganti status ke 'Sedang Dibaca'
    });

    // 2. Klik submit
    fireEvent.click(screen.getByRole("button", { name: /simpan buku/i }));

    // 3. Cek hasil
    await waitFor(() => {
      // Harapkan 'addBook' dipanggil
      expect(mockAddBook).toHaveBeenCalledTimes(1);
      // Harapkan dipanggil dengan argumen yang benar
      expect(mockAddBook).toHaveBeenCalledWith(
        "Buku React Keren",
        "Penulis Hebat",
        "baca"
      );
    });
  });
});
