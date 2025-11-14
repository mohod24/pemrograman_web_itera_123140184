// ========== INITIALIZATION ==========
// Impor class yang dibutuhkan dari file app.js
import { StorageManager, DashboardUI } from "./app.js";

// Initialize storage manager
const storage = new StorageManager("dashboardItems");

// Initialize dashboard UI
const dashboard = new DashboardUI(storage);

// --- PENTING ---
// Membuat instance 'dashboard' dapat diakses secara global (di 'window')
// Ini diperlukan agar fungsi inline onclick="dashboard.deleteItem(...)"
// yang di-render di HTML dapat menemukan instance dashboard.
window.dashboard = dashboard;

// Log app initialization
console.log("Personal Dashboard initialized successfully!");
console.log(
  "Features: localStorage, ES6+, Classes, Async/Await, Interactive UI"
);

