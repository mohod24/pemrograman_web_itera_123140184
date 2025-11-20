# Sistem Manajemen Perpustakaan (Python OOP)

## Deskripsi Project

Project ini adalah implementasi sistem manajemen perpustakaan sederhana berbasis CLI (Command Line Interface). Sistem ini dibangun untuk memenuhi Tugas Praktikum Python OOP dengan fokus utama pada penerapan empat pilar OOP: **Inheritance, Encapsulation, Polymorphism,** dan **Abstraction**.

Program ini memungkinkan pengguna untuk mengelola inventaris perpustakaan yang terdiri dari berbagai jenis item (Buku dan Majalah) dengan alur interaktif.

---

## Struktur File & Direktori

<img width="286" height="245" alt="image" src="https://github.com/user-attachments/assets/5fdf33ae-0317-4a07-a6d7-c0e55b67e2a6" />

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

_Running Program_

<img width="595" height="786" alt="image" src="https://github.com/user-attachments/assets/50e9ed92-2c80-4f3c-9207-b196deb39979" />

<img width="762" height="628" alt="image" src="https://github.com/user-attachments/assets/df1e0b85-e986-4897-b450-b0a85957588e" />

<img width="766" height="802" alt="image" src="https://github.com/user-attachments/assets/30aa3fab-5742-4aa5-b2f4-82563ad2b7b0" />


_Diagram Class_

<img width="1121" height="708" alt="image" src="https://github.com/user-attachments/assets/5ccc2cf5-b86d-4447-9baa-be0d601ade38" />

---

- **Author:** Mohd.Musyaffa Alief Athallah
- **NIM:** 123140194
