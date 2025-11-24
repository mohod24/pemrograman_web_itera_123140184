# Tugas Praktikum 6 - Manajemen Matakuliah Pyramid

Aplikasi REST API sederhana untuk pengelolaan data Matakuliah menggunakan **Pyramid Framework** dan **PostgreSQL**. Proyek ini dibuat untuk memenuhi tugas Praktikum Pemrograman Web.

## Identitas Praktikan

- **Nama** : Mohd.Musyaffa Alief Athallah
- **NIM** : 123140184
- **Kelas**: Praktikum Pemrograman Web RB

---

## Deskripsi Proyek

Aplikasi ini menyediakan layanan API (Application Programming Interface) untuk melakukan operasi CRUD (_Create, Read, Update, Delete_) pada entitas Matakuliah. Data disimpan secara persisten menggunakan database PostgreSQL dan diakses menggunakan ORM SQLAlchemy.

### Fitur Utama

- Menampilkan daftar semua matakuliah.
- Menampilkan detail satu matakuliah berdasarkan ID.
- Menambahkan data matakuliah baru.
- Mengubah (update) data matakuliah.
- Menghapus data matakuliah.

---

## Prasyarat (Requirements)

Sebelum menjalankan aplikasi, pastikan perangkat memiliki:

- **Python 3.7** atau lebih baru.
- **PostgreSQL** (Service database harus sudah berjalan).
- **Virtual Environment** (disarankan).

---

## Panduan Instalasi & Setup Project (Detail)

Ikuti langkah-langkah berikut secara berurutan untuk menyiapkan lingkungan pengembangan di mesin lokal (Windows/Linux/macOS).

### 1. Persiapan Folder & Virtual Environment

Buka terminal/PowerShell, arahkan ke folder proyek, lalu buat dan aktifkan virtual environment agar instalasi paket terisolasi.

```bash
# Masuk ke direktori proyek (jika belum)
cd pyramid_matakuliah

# Buat Virtual Environment
python -m venv venv

# Aktifkan Virtual Environment
# Untuk Windows:
.\venv\Scripts\activate
# Untuk macOS/Linux:
source venv/bin/activate
```

### 2. Instalasi Dependensi

Install paket-paket Python yang dibutuhkan oleh aplikasi ini, termasuk driver database.

```bash
# Upgrade pip (opsional tapi disarankan)
pip install --upgrade pip setuptools

# Install paket aplikasi dalam mode editable
pip install -e .

# Install driver PostgreSQL (gunakan binary agar tidak perlu compile C++)
pip install psycopg2-binary
```

### 3. Pembuatan Database (via Terminal)

Kita perlu membuat database kosong di PostgreSQL. Anda bisa menggunakan pgAdmin atau perintah terminal berikut:

```bash
# Masuk ke console PostgreSQL (masukkan password saat diminta)
psql -U postgres

# Jalankan perintah SQL berikut untuk membuat database:
CREATE DATABASE pyramid_matakuliah;

# Verifikasi database (opsional)
\l

# Keluar dari console
\q
```

### 4. Konfigurasi Koneksi Database

Aplikasi perlu tahu cara menghubungi database.

1. Buka file development.ini di text editor.
2. Cari baris yang diawali sqlalchemy.url.
3. Ubah nilainya sesuai konfigurasi PostgreSQL lokal Anda:

```bash
# Format: postgresql://[user]:[password]@[host]:[port]/[nama_db]

# Contoh (Ganti 'admin123' dengan password PostgreSQL Anda):

sqlalchemy.url = postgresql://postgres:admin123@localhost:5432/pyramid_matakuliah
```

### 5. Migrasi Database (Membuat Tabel)

Gunakan Alembic untuk men-generate tabel matakuliah di dalam database yang baru dibuat.

```bash
# Membuat file revisi migrasi (jika belum ada)
alembic -c development.ini revision --autogenerate -m "init"

# Menerapkan migrasi ke database (Membuat Tabel)
alembic -c development.ini upgrade head
```

### 6. Inisialisasi Data Awal (Opsional)

Untuk memastikan koneksi benar-benar berhasil, jalankan skrip inisialisasi (script ini mungkin akan error jika tabel belum terbentuk di langkah 5).

```bash
initialize_pyramid_matakuliah_db development.ini
```

- Cara Menjalankan Server
  Setelah instalasi selesai, jalankan server pengembangan Pyramid dengan perintah:

```bash
pserve development.ini --reload
```

- Jika berhasil, terminal akan menampilkan: Serving on http://localhost:6543.
- Akses root aplikasi di browser: http://localhost:6543/

### 7. Dokumentasi API Endpoints

Berikut adalah daftar endpoint yang tersedia untuk manajemen data Matakuliah. Semua respons dikembalikan dalam format JSON.

![alt text](image.png)

- Contoh JSON Request (POST/PUT)

```bash
{
    "kode_mk": "IF221",
    "nama_mk": "Pemrograman Web RB",
    "sks": 3,
    "semester": 5
}
```

- Contoh JSON Request (POST/PUT)

Buat file .http dan gunakan script berikut untuk menguji API:
Note: Jangan lupa install terlebih dahulu extension vs code "Rest Client"

```bash
### Get All Data
GET http://localhost:6543/api/matakuliah

### Add New Data
POST http://localhost:6543/api/matakuliah
Content-Type: application/json

{
    "kode_mk": "IF1234",
    "nama_mk": "Basis Data",
    "sks": 3,
    "semester": 3
}

### Delete Data
DELETE http://localhost:6543/api/matakuliah/1
```

### 8. Testing dari Praktikan

![alt text](image-1.png)

![alt text](image-2.png)

![alt text](image-3.png)

![alt text](image-4.png)

![alt text](image-5.png)

![alt text](image-6.png)

![alt text](image-7.png)

![alt text](image-8.png)
