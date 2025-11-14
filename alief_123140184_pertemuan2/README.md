# 📊 Personal Dashboard - Dokumentasi

## 📝 Deskripsi Aplikasi

Personal Dashboard adalah aplikasi web sederhana namun powerful untuk mengelola informasi pribadi Anda. Aplikasi ini memungkinkan pengguna untuk menambah, mengedit, dan menghapus tiga jenis item:

- ✅ **Tugas** - untuk to-do list dan task management
- 📝 **Catatan** - untuk menyimpan catatan pribadi
- 📅 **Jadwal** - untuk mengatur jadwal dan appointment

## Screenshoot Aplikasi

<img width="1919" height="801" alt="image" src="https://github.com/user-attachments/assets/3ca6b55b-02ce-463d-90e4-dfe08c92d94a" />

<img width="1919" height="619" alt="image" src="https://github.com/user-attachments/assets/b87dbd9e-96ed-4ab4-8674-e6524c40e5ab" />

## ✨ Fitur Utama

### 1. Interaktif

- ➕ Tambah item baru dengan form yang intuitif
- ✏️ Edit item yang sudah ada dengan modal popup
- 🗑️ Hapus item dengan konfirmasi
- 🔍 Pencarian real-time untuk menemukan item dengan cepat
- 📑 Filter berdasarkan tipe item (Semua, Tugas, Catatan, Jadwal)

### 2. Penyimpanan Lokal

- 💾 Semua data disimpan di localStorage browser
- 🔄 Data persisten - tidak hilang saat browser ditutup
- 📦 Tidak memerlukan backend atau database eksternal

### 3. User Interface/User Experience

- 🎨 Desain modern dengan gradient yang menarik
- 📱 Responsive design - bekerja di desktop dan mobile
- ⚡ Smooth animations dan transitions
- 📊 Dashboard statistik real-time
- 🌈 Color-coded untuk tipe item yang berbeda

## 🚀 Fitur ES6+ yang Diimplementasikan

### 1. `let` dan `const`

```javascript
const storage = new StorageManager("dashboardItems");
let currentFilter = "all";
```

Digunakan konsisten di seluruh aplikasi untuk deklarasi variabel yang lebih aman.

### 2. Arrow Functions (Minimal 3 implementasi)

```javascript
// Arrow function dalam event listener
tab.addEventListener("click", () => {
  this.handleTabChange(tab);
});

// Arrow function dalam array methods
const filtered = items.filter((item) => item.type === "task");

// Arrow function dalam async operations
return new Promise((resolve) => {
  const data = localStorage.getItem(this.storageKey);
  resolve(data);
});
```

### 3. Template Literals

```javascript
// Untuk dynamic rendering
const html = `
    <div class="item-card">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
    </div>
`;

// Untuk string interpolation
console.log(`Item ${id} berhasil dihapus!`);
```

### 4. Async/Await dan Promises

```javascript
// Async function dengan await
async handleAddItem() {
    const newItem = new DashboardItem(...);
    await this.storage.addItem(newItem);
    await this.render();
}

// Promise-based storage operations
async getItems() {
    return new Promise((resolve) => {
        const data = localStorage.getItem(this.storageKey);
        resolve(JSON.parse(data));
    });
}
```

### 5. Classes (Implementasi Classes)

```javascript
// Class untuk item
class DashboardItem {
  constructor(id, type, title, category) {
    this.id = id;
    this.type = type;
    // ...
  }

  toObject() {
    /* ... */
  }
  static fromObject(obj) {
    /* ... */
  }
}

// Class untuk storage management
class StorageManager {
  constructor(storageKey) {
    /* ... */
  }
  async getItems() {
    /* ... */
  }
  async saveItems(items) {
    /* ... */
  }
}

// Class untuk UI management
class DashboardUI {
  constructor(storageManager) {
    /* ... */
  }
  async render() {
    /* ... */
  }
}
```

### 6. Additional ES6+ Features

- **Destructuring**: `const { type, title, category } = formData;`
- **Spread Operator**: `items[index] = { ...items[index], ...updatedData };`
- **Array Methods**: `filter()`, `map()`, `find()`, `findIndex()`, `sort()`
- **Default Parameters**: `constructor(storageKey = 'dashboardItems')`
- **Static Methods**: `static fromObject(obj)`

## 🎯 Cara Menggunakan

### 1. Menambah Item Baru

1. Pilih **Tipe Item** (Tugas/Catatan/Jadwal)
2. Isi **Judul** item
3. Isi **Kategori** (contoh: Pekerjaan, Pribadi, Kuliah)
4. (Opsional) Pilih **Tanggal**
5. (Opsional) Isi **Deskripsi**
6. Klik tombol **"Tambahkan Item"**

### 2. Mencari Item

- Gunakan kotak pencarian di bagian atas daftar item
- Ketik kata kunci (judul, kategori, atau deskripsi)
- Hasil akan difilter secara real-time

### 3. Filter Berdasarkan Tipe

- Klik tab **"Semua"** untuk melihat semua item
- Klik tab **"Tugas"** untuk melihat hanya tugas
- Klik tab **"Catatan"** untuk melihat hanya catatan
- Klik tab **"Jadwal"** untuk melihat hanya jadwal

### 4. Mengedit Item

1. Klik tombol **"✏️ Edit"** pada item yang ingin diedit
2. Modal akan muncul dengan data item
3. Ubah data yang diinginkan
4. Klik **"Simpan Perubahan"**

### 5. Menghapus Item

1. Klik tombol **"🗑️ Hapus"** pada item yang ingin dihapus
2. Konfirmasi penghapusan
3. Item akan dihapus dari dashboard

## 💾 Pengelolaan Data

### localStorage Structure

Data disimpan dalam format JSON array:

```javascript
[
  {
    id: "1635789456789",
    type: "task",
    title: "Mengerjakan Tugas Praktikum",
    category: "Kuliah",
    description: "Membuat aplikasi dashboard dengan ES6+",
    date: "2025-10-27",
    createdAt: "2025-10-27T10:30:00.000Z",
  },
  // ... more items
];
```

### Data Persistence

- Data otomatis tersimpan setiap kali ada perubahan
- Data tetap ada meskipun browser ditutup
- Data terikat pada domain/browser tertentu
- Untuk menghapus semua data: bersihkan localStorage browser

## 📊 Statistik Dashboard

Dashboard menampilkan 4 kartu statistik:

1. **Total Tugas** - Jumlah item dengan tipe "task"
2. **Total Catatan** - Jumlah item dengan tipe "note"
3. **Total Jadwal** - Jumlah item dengan tipe "schedule"
4. **Total Item** - Jumlah total semua item

Statistik diupdate secara real-time setiap ada perubahan.

## 🔧 Teknologi yang Digunakan

- **HTML5** - Struktur semantic
- **CSS3** - Styling modern dengan gradients, flexbox, grid
- **JavaScript ES6+** - Logic dan interactivity
- **localStorage API** - Data persistence
- **No external dependencies** - Pure vanilla JavaScript

## 📱 Browser Compatibility

Aplikasi ini kompatibel dengan browser modern yang mendukung:

- ES6+ JavaScript features
- CSS Grid dan Flexbox
- localStorage API
- Async/Await

## 🐛 Error Handling

Aplikasi memiliki error handling untuk berbagai skenario:

```javascript
try {
  await this.storage.addItem(newItem);
  this.showNotification("Item berhasil ditambahkan!");
} catch (error) {
  console.error("Error adding item:", error);
  alert("Gagal menambahkan item!");
}
```
