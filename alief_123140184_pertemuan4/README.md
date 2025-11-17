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

## Dokumentasi Pengujian

- Skenario 1: Tampilan Awal & Menampilkan Data
<img width="960" height="594" alt="image" src="https://github.com/user-attachments/assets/14ae926a-390c-43c6-a36b-14434d7a85ac" />

- Skenario 2: Input Data Mahasiswa Baru
<img width="757" height="486" alt="image" src="https://github.com/user-attachments/assets/5f128e88-1033-45c1-8762-18239ec05416" />

- Skenario 3: Filter Grade, Nilai Tertinggi & Nilai Terendah
<img width="855" height="594" alt="image" src="https://github.com/user-attachments/assets/24e6e290-50aa-4b85-82b0-04665619f745" />

<img width="519" height="394" alt="image" src="https://github.com/user-attachments/assets/0c6a48db-4e56-48ca-8b51-8c1c9485a15b" />

<img width="527" height="405" alt="image" src="https://github.com/user-attachments/assets/6bfbd320-d409-4cc6-a868-6cfaeaf2d61a" />

---

## 👤 Identitas Pembuat

- **Nama:** Mohd. Musyaffa Alief Athallah
- **NIM:** 123140184
- **Kelas:** Praktikum Pemrograman Web RB
- **Mata Kuliah:** Pemrograman Web RB
