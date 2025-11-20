# Sistem Manajemen Perpustakaan (Python OOP)

## Deskripsi Project

Project ini adalah implementasi sistem manajemen perpustakaan sederhana berbasis CLI (Command Line Interface). Sistem ini dibangun untuk memenuhi Tugas Praktikum Python OOP dengan fokus utama pada penerapan empat pilar OOP: **Inheritance, Encapsulation, Polymorphism,** dan **Abstraction**.

Program ini memungkinkan pengguna untuk mengelola inventaris perpustakaan yang terdiri dari berbagai jenis item (Buku dan Majalah) dengan alur interaktif.

---

## Struktur File & Direktori

```text
alief_123140184_pertemuan5/
│
├── modules/ # [PACKAGE] Berisi logika inti OOP
│ ├── **init**.py # File penanda package Python
│ ├── base.py # Berisi Abstract Class (LibraryItem)
│ ├── items.py # Berisi Concrete Classes (Book & Magazine)
│ └── library.py # Berisi Class Manajer (Library) untuk pengelolaan data
│
├── main.py # [ENTRY POINT] File utama untuk menjalankan program/menu
└── README.md # Dokumentasi lengkap project

## Persyaratan Sistem & Instalasi

Program ini menggunakan **Python Standard Library** sepenuhnya, sehingga tidak memerlukan instalasi modul eksternal (pip install).

- **Bahasa:** Python 3.x (Disarankan Python 3.8+)
- **OS:** Windows / MacOS / Linux
- **Modul:** `abc` (Bawaan Python untuk Abstract Base Class), `os` (Untuk utilitas sistem)

### Cara Menjalankan Program

1.  Pastikan terminal berada di direktori folder project.
2.  Jalankan perintah berikut di terminal/CMD:
    ```bash
    python main.py
    ```

---

## Struktur & Implementasi OOP (Analisis Teknis)

Berikut adalah penjelasan detail mengenai bagaimana kode program memenuhi kriteria penilaian tugas:

### 1. Abstract Class & Inheritance (Bobot 30%)

- **Abstract Class (`LibraryItem`):** Saya membuat class `LibraryItem` yang mewarisi `ABC` (Abstract Base Class). Class ini berfungsi sebagai _blueprint_ atau kerangka dasar.
- **Inheritance (Pewarisan):**
  Terdapat dua class turunan, yaitu `Book` dan `Magazine`. Keduanya mewarisi atribut dasar (seperti `id` dan `title`) dari `LibraryItem`, namun memiliki atribut spesifik masing-masing (Buku memiliki `isbn`, Majalah memiliki `issue`).

### 2. Encapsulation (Bobot 25%)

- **Access Modifiers:**
  - **Protected (`_title`, `_item_id`):** Digunakan pada parent class agar bisa diakses oleh subclass turunannya.
  - **Private (`__author`, `__items`):** Digunakan pada atribut sensitif (seperti list koleksi di class `Library`) agar tidak bisa dimodifikasi secara langsung dari luar class. Ini menjaga integritas data.
- **Getter & Setter:**
  Akses data dilakukan melalui method perantara (seperti `add_item` atau `show_items`) untuk memastikan data yang masuk aman.

### 3. Polymorphism (Bobot 20%)

- **Method Overriding:**
  Class `Book` dan `Magazine` sama-sama memiliki method bernama `get_details()`.
- **Implementasi:**
  Meskipun nama method-nya sama, output yang dihasilkan berbeda.
  - `Book` menampilkan: Judul + Penulis + ISBN
  - `Magazine` menampilkan: Judul + Edisi + Bulan
    Saat looping di `show_items()`, program secara otomatis mengenali objek mana yang sedang dipanggil dan menjalankan versi method yang sesuai.

### 4. Property Decorator

- Menggunakan decorator `@property` pada atribut `title` di class `LibraryItem`.
- **Fungsi:** Memungkinkan validasi data saat pengisian judul (contoh: mencegah judul kosong) sekaligus mengakses method seolah-olah ia adalah variabel biasa.

---

## Fitur Program

1.  **Add Item (Interaktif):** User dapat memilih untuk menambahkan Buku atau Majalah dengan inputan spesifik.
2.  **Show All:** Menampilkan seluruh koleksi perpustakaan dengan format yang rapi.
3.  **Search System:** Mencari item berdasarkan **Kata Kunci Judul** (case-insensitive) atau **ID Item**.
4.  **Validasi Input:** Mencegah error jika user memasukkan menu yang salah.

---

## Screenshot & Diagram

_(Tempatkan screenshot hasil running program kamu di sini)_
_(Tempatkan gambar Diagram Class di sini)_

---

**Author:** Mohd.Musyaffa Alief Athallah
**NIM:** 123140194
