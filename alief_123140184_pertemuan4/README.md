# Program Pengelolaan Data Nilai Mahasiswa

Program CLI (Command Line Interface) berbasis **Python** untuk mengelola data nilai mahasiswa, menghitung nilai akhir otomatis, menentukan grade, dan menampilkan statistik kelas secara ringkas serta informatif.

---

## 📘 Deskripsi

Program ini dibuat untuk memenuhi **Tugas Praktikum Python Dasar**. Sistem dapat menyimpan data mahasiswa, menghitung nilai akhir berdasarkan bobot tertentu, serta menampilkan informasi dalam tabel yang rapi.

### **📊 Bobot Penilaian**

- **UTS:** 30%
- **UAS:** 40%
- **Tugas:** 30%

### **🏅 Skema Grade**

- **A:** ≥ 80
- **B:** ≥ 70
- **C:** ≥ 60
- **D:** ≥ 50
- **E:** < 50

---

## ✨ Fitur Utama

- **CRUD Data Mahasiswa** — input, lihat, filter, dan hapus data.
- **Tabel Rapi** menggunakan library `tabulate`.
- **Perhitungan Otomatis** nilai akhir dan grade.
- **Pencarian Ekstrem** — menampilkan nilai tertinggi & terendah.
- **Filter Grade** — tampilkan hanya mahasiswa dengan grade tertentu.
- **Statistik Kelas** — menghitung rata-rata nilai akhir.

---

## 🛠️ Instalasi & Persiapan

### 1️⃣ Pastikan Python Terinstal

```bash
python --version
```

### 2️⃣ Instal Library yang Dibutuhkan

Pastikan `tabulate` telah terinstal:

```bash
pip install tabulate
```

### 3️⃣ Cara Menjalankan Program

1. Clone/download repository atau simpan file sebagai `184_pertemuan4.py`.
2. Buka terminal di direktori file.
3. Jalankan program:

```bash
python 184_pertemuan4.py
```

---

## 📂 Struktur Fungsi dalam Program

- **hitung_nilai_akhir()** — memproses bobot nilai.
- **tentukan_grade()** — menetapkan grade berdasarkan nilai akhir.
- **tampilkan_data()** — merender data dengan `tabulate`.
- **tambah_mahasiswa()** — input data + validasi.
- **cari_ekstrem()** — mencari nilai tertinggi & terendah dengan `sorted` dan `lambda`.
- **filter_by_grade()** — menampilkan mahasiswa dengan grade tertentu.

---

## 👤 Identitas Pembuat

- **Nama:** Mohd. Musyaffa Alief Athallah
- **NIM:** 123140184
- **Kelas:** Praktikum Pemrograman Web RB
- **Mata Kuliah:** Pemrograman Web RB
