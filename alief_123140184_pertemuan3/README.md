# 🚀 Aplikasi Manajemen Buku Pribadi

Ini adalah proyek submisi untuk **Tugas Praktikum React Dasar**. Aplikasi ini adalah sistem manajemen buku pribadi yang memungkinkan pengguna mencatat buku-buku yang dimiliki, sedang dibaca, atau ingin dibeli.

Aplikasi ini dibuat menggunakan React (dengan Vite) dan memanfaatkan Hooks, Context API, dan React Router. Seluruh data disimpan secara persisten di `localStorage` browser.

---

## 📸 Screenshot Antarmuka

Berikut adalah tampilan dari aplikasi yang sudah jadi.

### Halaman Utama (Tambah, Filter, & Daftar Buku)

<img width="1919" height="918" alt="image" src="https://github.com/user-attachments/assets/60a3b56e-0305-4dc6-8659-66fd7187c66b" />

### Halaman Statistik

<img width="1919" height="920" alt="image" src="https://github.com/user-attachments/assets/aaaa57f7-3645-4393-bcd0-27ecac9272ff" />


---

## ✨ Fitur Utama

- **Manajemen Buku (CRUD):** Pengguna dapat menambah, mengedit, dan menghapus data buku.
- **Pelacakan Status:** Setiap buku memiliki status: "Ingin Dibeli", "Sedang Dibaca", atau "Sudah Dimiliki".
- **Pencarian Cepat:** Mencari buku secara instan berdasarkan judul atau penulis.
- **Filter Status:** Memfilter daftar buku yang tampil berdasarkan statusnya.
- **Statistik Buku:** Halaman khusus untuk melihat ringkasan jumlah buku berdasarkan status.
- **Penyimpanan Persisten:** Data tidak akan hilang saat browser ditutup karena disimpan di `localStorage`.
- **Validasi Form:** _Error handling_ sederhana diterapkan pada form untuk memastikan judul dan penulis diisi.

---

## 🛠️ Teknologi yang Digunakan

- **Vite:** Sebagai _build tool_ dan _development server_.
- **React 18:** Inti library (menggunakan _functional components_).
- **React Router DOM v6:** Untuk navigasi _client-side_ antar halaman.
- **Vitest & React Testing Library:** Untuk _unit testing_.
- **CSS Murni:** Untuk _styling_ komponen (tanpa _framework_ CSS).

---

## 🏃‍♂️ Instruksi Instalasi & Menjalankan

### Prasyarat

Pastikan Anda memiliki [Node.js](https://nodejs.org/) (versi 18.x atau lebih tinggi) dan `npm` terinstal di komputer Anda.

### Langkah-langkah

1.  **Clone repository ini:**

    ```bash
    git clone [https://github.com/username-anda/nama-repo-anda.git](https://github.com/username-anda/nama-repo-anda.git)
    ```

2.  **Masuk ke direktori proyek:**

    ```bash
    cd nama-repo-anda
    ```

3.  **Instal semua _dependency_:**

    ```bash
    npm install
    ```

4.  **Menjalankan aplikasi di mode _development_:**
    Perintah ini akan menjalankan server lokal (biasanya di `http://localhost:5173`).

    ```bash
    npm run dev
    ```

5.  **Menjalankan _testing_:**
    Untuk menjalankan _unit tests_ yang telah dibuat:
    ```bash
    npm test
    ```

---

## ⚛️ Penjelasan Fitur React yang Digunakan

Sesuai persyaratan tugas, berikut adalah penjelasan penerapan konsep-konsep React dalam proyek ini:

### 1. Hooks (useState & useEffect)

- **`useState`**: Digunakan secara ekstensif untuk mengelola _state_ lokal di dalam komponen.
  - **Contoh:** Di `src/components/BookForm/BookForm.jsx` untuk mengelola data input form (`formData`) dan _state_ validasi (`errors`).
  - **Contoh:** Di `src/pages/Home/HomePage.jsx` untuk mengelola _state_ filter (`filterStatus` dan `searchQuery`) serta _state_ buku yang akan diedit (`bookToEdit`).
- **`useEffect`**: Digunakan untuk menangani _side effects_.
  - **Contoh:** Di `src/hooks/useLocalStorage.js` untuk memantau perubahan _state_ `value` dan menyimpannya ke `localStorage` setiap kali `value` tersebut berubah.
  - **Contoh:** Di `src/components/BookForm/BookForm.jsx` untuk memantau prop `bookToEdit`. Jika prop itu berubah, `useEffect` akan mengisi _state_ form dengan data buku tersebut (mode edit).

### 2. Context API (State Management)

- **`useContext`** diimplementasikan untuk _state management_ global, menghindari _prop-drilling_.
- **Lokasi:** `src/context/BookContext.js`
- **Penjelasan:** `BookContext` dibuat untuk menyimpan _state_ `books` serta fungsi-fungsi CRUD (`addBook`, `updateBook`, `deleteBook`). `BookProvider` membungkus seluruh aplikasi di `main.jsx`, sehingga komponen apa pun (seperti `BookList` atau `BookForm`) dapat mengakses data buku dan fungsinya menggunakan _custom hook_ `useBooks()`.

### 3. React Router

- **`react-router-dom`** digunakan untuk membuat aplikasi _multi-halaman_ (SPA).
- **Lokasi:** `src/App.jsx` (konfigurasi `<Routes>` dan `<Route>`) dan `src/main.jsx` (pembungkus `<BrowserRouter>`).
- **Penjelasan:** Ini memungkinkan navigasi antara halaman "Beranda" (`/`) dan halaman "Statistik" (`/stats`) tanpa perlu me-_refresh_ seluruh halaman.

### 4. Custom Hooks (Minimal 2)

Dua _custom hook_ dibuat untuk abstraksi dan reusabilitas logika:

1.  **`useLocalStorage.js`**: Hook ini bertindak seperti `useState` namun secara otomatis menyinkronkan _state_-nya dengan `localStorage` browser. Ini membuat data persisten.
2.  **`useBookStats.js`**: Hook ini mengambil data `books` dari `BookContext` dan mengisolasi logika untuk menghitung statistik (total, dimiliki, dibaca, dll.). Ini membuat komponen `StatsPage.jsx` tetap bersih dan fokus pada tampilan.

### 5. Komponen Reusable (Minimal 3)

Tiga komponen presentasional utama dibuat di dalam `src/components/`:

1.  **`BookForm`**: Komponen _reusable_ yang menangani penambahan dan pengeditan buku. Komponen ini memiliki _state_ internal untuk form.
2.  **`BookFilter`**: Komponen "terkontrol" (_controlled component_) yang _reusable_ untuk menyediakan input pencarian dan filter status.
3.  **`BookList`**: Komponen _reusable_ yang bertanggung jawab untuk me-render daftar buku setelah menerapkan logika filter dan pencarian yang diterima via _props_.

---

## 🧪 Laporan Testing

Proyek ini menerapkan **5 _unit tests_** menggunakan **Vitest** dan **React Testing Library** sesuai persyaratan.

### Laporan Hasil Tes

(Catatan: Jalankan `npm test` di terminal Anda, ambil screenshot hasilnya, dan letakkan di sini.)

<img width="1006" height="913" alt="image" src="https://github.com/user-attachments/assets/3cd5ce69-d706-411c-ae45-db5a351b5a04" />


### Penjelasan Tes yang Dibuat

1.  **File: `src/components/BookFilter/BookFilter.test.jsx`**

    - **Tes 1:** Memastikan komponen me-render input pencarian dan filter status dengan benar.
    - **Tes 2:** Memastikan fungsi `setSearchQuery` dipanggil saat pengguna mengetik di _search bar_.
    - **Tes 3:** Memastikan fungsi `setFilterStatus` dipanggil saat pengguna mengubah nilai _dropdown_ filter.

2.  **File: `src/components/BookForm/BookForm.test.jsx`**
    - **Tes 4:** Memastikan _error handling_ berjalan dan pesan _error_ muncul jika form di-submit dalam keadaan kosong.
    - **Tes 5:** Memastikan fungsi `addBook` (dari _context_) dipanggil dengan data yang benar saat form diisi lengkap dan di-submit.
