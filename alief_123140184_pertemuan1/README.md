Aplikasi Manajemen Tugas Mahasiswa

Aplikasi web sederhana untuk membantu mahasiswa mengelola semua tugas akademik mereka. Aplikasi ini memungkinkan pengguna untuk menambah, melihat, menandai selesai, dan menghapus tugas. Semua data disimpan secara lokal di browser menggunakan localStorage.

A. Screenshot Aplikasi

- Tampilan Utama Aplikasi
  <img width="1919" height="945" alt="image" src="https://github.com/user-attachments/assets/60d25733-34ca-4c0c-9ce0-106323be6946" />
  
- Fitur Filter dan Notifikasi
  <img width="1919" height="943" alt="image" src="https://github.com/user-attachments/assets/a1440c59-6a1a-430d-92a4-081451c27e3c" />
  
- Validasi Form

  <img width="379" height="732" alt="image" src="https://github.com/user-attachments/assets/31a7a495-f548-4a9f-9b54-3782c87e66ff" />


B. Cara Menjalankan Aplikasi

1. Simpan ketiga file (index.html, style.css, script.js) dalam satu folder yang sama.
2. Buka file index.html menggunakan browser web modern seperti Google Chrome, Firefox, atau Edge.
3. Aplikasi siap digunakan.

C. Daftar Fitur

1. Tambah Tugas Baru: Menambahkan tugas dengan nama, mata kuliah, dan deadline.
2. ashboard Statistik: Menampilkan ringkasan jumlah total tugas, tugas selesai, dan belum selesai.
3. Penyimpanan Lokal: Data tugas otomatis tersimpan di localStorage dan akan tetap ada bahkan setelah browser ditutup.
4. Ubah Status Tugas: Menandai tugas sebagai "selesai" atau "belum selesai" dengan satu klik.
5. Hapus Tugas: Menghapus tugas yang tidak lagi relevan dari daftar.
6. Filter Tugas: Memfilter tugas berdasarkan statusnya (Semua, Selesai, Belum Selesai).
7. Pencarian Real-time: Mencari tugas secara dinamis berdasarkan nama tugas atau mata kuliah.
8. Validasi Form: Mencegah pengiriman form jika ada kolom yang kosong atau tidak valid.
9. Notifikasi Toast: Memberikan notifikasi saat tugas berhasil ditambah atau dihapus.
10. Desain Responsif: Tampilan yang optimal di berbagai ukuran layar.

D. Penjelasan Teknis

Penggunaan localStorage
Penyimpanan Data: Setiap kali ada perubahan pada daftar tugas (menambah, mengubah, atau menghapus), seluruh array tasks akan diubah menjadi format string JSON dan disimpan ke localStorage.

JavaScript

saveTasks() {
    localStorage.setItem("studentTasks", JSON.stringify(this.tasks));
}

Pengambilan Data: Saat aplikasi dimuat, ia akan mencoba mengambil data dari localStorage. Jika ada, data JSON tersebut akan diubah kembali menjadi array. Jika tidak ada, aplikasi akan memuat data contoh awal.

JavaScript

loadTasks() {
    const savedTasks = localStorage.getItem("studentTasks");
    if (savedTasks) {
        this.tasks = JSON.parse(savedTasks);
    } else {
        // ... load initial mock data
    }
}

Validasi Form
Validasi diterapkan untuk memastikan semua input yang diperlukan diisi dengan benar sebelum tugas ditambahkan.

Atribut HTML: Atribut required digunakan pada elemen <input> di index.html untuk validasi dasar oleh browser.

Validasi JavaScript: Sebelum menambahkan tugas, fungsi validateForm() akan memeriksa apakah setiap input (nama, mata kuliah, deadline) sudah diisi dan apakah tanggal deadline tidak berada di masa lalu.

JavaScript

validateForm() {
    let isValid = true;
    // ... (logika pengecekan input nama dan mata kuliah) ...

    // Validasi Deadline
    if (!deadline) {
        this.showError("taskDeadline", "deadlineError", "Deadline wajib diisi");
        isValid = false;
    } else if (new Date(deadline) < new Date().setHours(0,0,0,0)) {
        this.showError("taskDeadline", "deadlineError", "Deadline tidak boleh di masa lalu");
        isValid = false;
    }
    return isValid;
}
