import React, { useState, useEffect } from "react";
import { useBooks } from "../../context/BookContext";
import "./BookForm.css"; // Kita akan buat file CSS ini

const BookForm = ({ bookToEdit, onDone }) => {
  // State internal untuk form
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    status: "beli", // Nilai default
  });
  const [errors, setErrors] = useState({});
  const { addBook, updateBook } = useBooks();

  // useEffect ini akan "mendengarkan" prop bookToEdit.
  // Jika prop itu ada (artinya kita mau 'edit'), isi form-nya.
  useEffect(() => {
    if (bookToEdit) {
      setFormData({
        title: bookToEdit.title,
        author: bookToEdit.author,
        status: bookToEdit.status,
      });
    } else {
      // Jika tidak (artinya kita mau 'tambah'), kosongkan form.
      resetForm();
    }
  }, [bookToEdit]); // Jalankan setiap 'bookToEdit' berubah

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validasi form (Error Handling)
  const validate = () => {
    let tempErrors = {};
    if (!formData.title) tempErrors.title = "Judul tidak boleh kosong";
    if (!formData.author) tempErrors.author = "Penulis tidak boleh kosong";
    setErrors(tempErrors);
    // Return true jika tidak ada error (Object.keys(tempErrors).length === 0)
    return Object.keys(tempErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({ title: "", author: "", status: "beli" });
    setErrors({});
    if (onDone) onDone(); // Panggil fungsi onDone dari parent
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return; // Hentikan jika validasi gagal

    if (bookToEdit) {
      // Mode Edit
      updateBook(bookToEdit.id, formData);
    } else {
      // Mode Tambah
      addBook(formData.title, formData.author, formData.status);
    }
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h3>{bookToEdit ? "Edit Buku" : "Tambah Buku Baru"}</h3>

      <div className="form-group">
        <label>Judul Buku</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <span className="error-text">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label>Penulis</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
        {errors.author && <span className="error-text">{errors.author}</span>}
      </div>

      <div className="form-group">
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="beli">Ingin Dibeli</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="milik">Sudah Dimiliki</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {bookToEdit ? "Update Buku" : "Simpan Buku"}
        </button>
        {/* Jika sedang edit, tampilkan tombol Batal */}
        {bookToEdit && (
          <button type="button" className="btn-secondary" onClick={resetForm}>
            Batal Edit
          </button>
        )}
      </div>
    </form>
  );
};

export default BookForm;
