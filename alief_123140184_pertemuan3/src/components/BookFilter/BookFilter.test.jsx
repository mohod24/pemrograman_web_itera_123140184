import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BookFilter from "./BookFilter";

// 'describe' mengelompokkan tes-tes kita
describe("Komponen BookFilter", () => {
  // Test Case 1: Memastikan komponen me-render input dengan benar
  it("seharusnya me-render input pencarian dan filter status", () => {
    // Siapkan mock function (fungsi tiruan)
    const mockSetSearchQuery = vi.fn();
    const mockSetFilterStatus = vi.fn();

    render(
      <BookFilter
        filterStatus="semua"
        setFilterStatus={mockSetFilterStatus}
        searchQuery=""
        setSearchQuery={mockSetSearchQuery}
      />
    );

    // Cari elemen berdasarkan placeholder
    expect(screen.getByPlaceholderText(/cari buku/i)).toBeInTheDocument();
    // Cari elemen berdasarkan nilai default-nya
    expect(screen.getByDisplayValue("Semua")).toBeInTheDocument();
  });

  // Test Case 2: Memastikan input pencarian berfungsi saat diketik
  it("seharusnya memanggil setSearchQuery saat input pencarian diketik", () => {
    const mockSetSearchQuery = vi.fn();
    const mockSetFilterStatus = vi.fn();

    render(
      <BookFilter
        filterStatus="semua"
        setFilterStatus={mockSetFilterStatus}
        searchQuery=""
        setSearchQuery={mockSetSearchQuery}
      />
    );

    const searchInput = screen.getByPlaceholderText(/cari buku/i);

    // Simulasikan pengguna mengetik "React"
    fireEvent.change(searchInput, { target: { value: "React" } });

    // Harapkan fungsi mock kita dipanggil dengan nilai "React"
    expect(mockSetSearchQuery).toHaveBeenCalledWith("React");
  });

  // Test Case 3: Memastikan filter status berfungsi saat diubah
  it("seharusnya memanggil setFilterStatus saat filter status diubah", () => {
    const mockSetSearchQuery = vi.fn();
    const mockSetFilterStatus = vi.fn();

    render(
      <BookFilter
        filterStatus="semua"
        setFilterStatus={mockSetFilterStatus}
        searchQuery=""
        setSearchQuery={mockSetSearchQuery}
      />
    );

    const statusSelect = screen.getByDisplayValue("Semua");

    // Simulasikan pengguna mengubah filter ke "baca" (Sedang Dibaca)
    fireEvent.change(statusSelect, { target: { value: "baca" } });

    // Harapkan fungsi mock kita dipanggil dengan nilai "baca"
    expect(mockSetFilterStatus).toHaveBeenCalledWith("baca");
  });
});
