export class DashboardItem {
  constructor(id, type, title, category, description, date, createdAt) {
    this.id = id || Date.now().toString();
    this.type = type;
    this.title = title;
    this.category = category;
    this.description = description || "";
    this.date = date || "";
    this.createdAt = createdAt || new Date().toISOString();
  }
  /**
   * Convert item to object for storage
   */

  toObject() {
    return {
      id: this.id,
      type: this.type,
      title: this.title,
      category: this.category,
      description: this.description,
      date: this.date,
      createdAt: this.createdAt,
    };
  }
  /**
   * Create item from stored object
   */

  static fromObject(obj) {
    return new DashboardItem(
      obj.id,
      obj.type,
      obj.title,
      obj.category,
      obj.description,
      obj.date,
      obj.createdAt
    );
  }
}
/**
 * Class untuk mengelola storage
 */

export class StorageManager {
  constructor(storageKey = "dashboardItems") {
    this.storageKey = storageKey;
  }
  /**
   * Get all items from localStorage (Async/Promise)
   */

  async getItems() {
    return new Promise((resolve) => {
      try {
        const data = localStorage.getItem(this.storageKey);
        const items = data ? JSON.parse(data) : [];
        resolve(items.map((item) => DashboardItem.fromObject(item)));
      } catch (error) {
        console.error("Error getting items:", error);
        resolve([]);
      }
    });
  }
  /**
   * Save all items to localStorage (Async/Promise)
   */

  async saveItems(items) {
    return new Promise((resolve, reject) => {
      try {
        const data = items.map((item) => item.toObject());
        localStorage.setItem(this.storageKey, JSON.stringify(data));
        resolve(true);
      } catch (error) {
        console.error("Error saving items:", error);
        reject(error);
      }
    });
  }
  /**
   * Add new item
   */

  async addItem(item) {
    const items = await this.getItems();
    items.push(item);
    await this.saveItems(items);
    return item;
  }
  /**
   * Update existing item
   */

  async updateItem(id, updatedData) {
    const items = await this.getItems();
    const index = items.findIndex((item) => item.id === id);

    if (index !== -1) {
      items[index] = { ...items[index], ...updatedData };
      await this.saveItems(items);
      return items[index];
    }

    throw new Error("Item not found");
  }
  /**
   * Delete item
   */

  async deleteItem(id) {
    const items = await this.getItems();
    const filteredItems = items.filter((item) => item.id !== id);
    await this.saveItems(filteredItems);
    return true;
  }
}
/**
 * Class untuk mengelola UI Dashboard
 */

export class DashboardUI {
  constructor(storageManager) {
    this.storage = storageManager;
    this.currentFilter = "all";
    this.searchQuery = "";
    this.initializeEventListeners();
    this.render();
  }
  /**
   * Initialize all event listeners
   */

  initializeEventListeners() {
    // Add form submission
    document.getElementById("addForm").addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleAddItem();
    }); // Edit form submission

    document.getElementById("editForm").addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleEditItem();
    }); // Tab filtering

    document.querySelectorAll(".tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        this.handleTabChange(tab);
      });
    }); // Search functionality

    document.getElementById("searchInput").addEventListener("input", (e) => {
      this.searchQuery = e.target.value.toLowerCase();
      this.render();
    });

    // Modal close listeners (Improved)
    const modal = document.getElementById("editModal");
    modal.addEventListener("click", (e) => {
      // Close on outside click
      if (e.target.id === "editModal") {
        this.closeEditModal();
      }
      // Close on 'x' button click
      if (e.target.classList.contains("close-modal")) {
        this.closeEditModal();
      }
    });
  }
  /**
   * Handle adding new item
   */

  async handleAddItem() {
    const type = document.getElementById("itemType").value;
    const title = document.getElementById("itemTitle").value;
    const category = document.getElementById("itemCategory").value;
    const description = document.getElementById("itemDescription").value;
    const date = document.getElementById("itemDate").value;

    if (!type || !title || !category) {
      alert("Mohon lengkapi field yang wajib diisi!");
      return;
    }

    const newItem = new DashboardItem(
      null,
      type,
      title,
      category,
      description,
      date
    );

    try {
      await this.storage.addItem(newItem);
      document.getElementById("addForm").reset();
      await this.render();
      this.showNotification("Item berhasil ditambahkan!");
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Gagal menambahkan item!");
    }
  }
  /**
   * Handle editing item
   */

  async handleEditItem() {
    const id = document.getElementById("editItemId").value;
    const type = document.getElementById("editItemType").value;
    const title = document.getElementById("editItemTitle").value;
    const category = document.getElementById("editItemCategory").value;
    const description = document.getElementById("editItemDescription").value;
    const date = document.getElementById("editItemDate").value;

    try {
      await this.storage.updateItem(id, {
        type,
        title,
        category,
        description,
        date,
      });
      this.closeEditModal();
      await this.render();
      this.showNotification("Item berhasil diupdate!");
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Gagal mengupdate item!");
    }
  }
  /**
   * Handle tab change
   */

  handleTabChange(tab) {
    // Update active tab
    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.remove("active"));
    tab.classList.add("active"); // Update filter

    this.currentFilter = tab.dataset.type;
    this.render();
  }
  /**
   * Open edit modal with item data
   */

  openEditModal(item) {
    document.getElementById("editItemId").value = item.id;
    document.getElementById("editItemType").value = item.type;
    document.getElementById("editItemTitle").value = item.title;
    document.getElementById("editItemCategory").value = item.category;
    document.getElementById("editItemDescription").value = item.description;
    document.getElementById("editItemDate").value = item.date;

    document.getElementById("editModal").classList.add("active");
  }
  /**
   * Close edit modal
   */

  closeEditModal() {
    document.getElementById("editModal").classList.remove("active");
  }
  /**
   * Delete item with confirmation
   */

  async deleteItem(id) {
    if (confirm("Apakah Anda yakin ingin menghapus item ini?")) {
      try {
        await this.storage.deleteItem(id);
        await this.render();
        this.showNotification("Item berhasil dihapus!");
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Gagal menghapus item!");
      }
    }
  }
  /**
   * Filter items based on current filter and search
   */

  async getFilteredItems() {
    const allItems = await this.storage.getItems();

    let filtered = allItems; // Apply type filter

    if (this.currentFilter !== "all") {
      filtered = filtered.filter((item) => item.type === this.currentFilter);
    } // Apply search filter

    if (this.searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(this.searchQuery) ||
          item.category.toLowerCase().includes(this.searchQuery) ||
          item.description.toLowerCase().includes(this.searchQuery)
      );
    } // Sort by date (newest first)

    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return filtered;
  }
  /**
   * Update statistics
   */

  async updateStats() {
    const items = await this.storage.getItems();

    const taskCount = items.filter((item) => item.type === "task").length;
    const noteCount = items.filter((item) => item.type === "note").length;
    const scheduleCount = items.filter(
      (item) => item.type === "schedule"
    ).length;

    document.getElementById("taskCount").textContent = taskCount;
    document.getElementById("noteCount").textContent = noteCount;
    document.getElementById("scheduleCount").textContent = scheduleCount;
    document.getElementById("totalCount").textContent = items.length;
  }
  /**
   * Get type icon
   */

  getTypeIcon(type) {
    const icons = {
      task: "✅",
      note: "📝",
      schedule: "📅",
    };
    return icons[type] || "📄";
  }
  /**
   * Get type label
   */

  getTypeLabel(type) {
    const labels = {
      task: "Tugas",
      note: "Catatan",
      schedule: "Jadwal",
    };
    return labels[type] || type;
  }
  /**
   * Format date
   */

  formatDate(dateString) {
    if (!dateString) return "";

    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  }
  /**
   * Render item card
   */

  renderItemCard(item) {
    return `
                <div class="item-card">
                    <div class="item-header">
                        <div class="item-title">
                            ${this.getTypeIcon(item.type)} ${item.title}
                        </div>
                        <div class="item-actions">
                            <button class="btn btn-edit" onclick="dashboard.openEditModal(${JSON.stringify(
                              item
                            ).replace(/"/g, "&quot;")})">
                                ✏️ Edit
                            </button>
                            <button class="btn btn-delete" onclick="dashboard.deleteItem('${
                              item.id
                            }')">
                                🗑️ Hapus
                            </button>
                        </div>
                    </div>
                    ${
                      item.description
                        ? `<div class="item-content">${item.description}</div>`
                        : ""
                    }
                    <div class="item-meta">
                        <span class="category-badge">${item.category}</span>
                        <span>📋 ${this.getTypeLabel(item.type)}</span>
                        ${
                          item.date
                            ? `<span>📅 ${this.formatDate(item.date)}</span>`
                            : ""
                        }
                        <span>🕒 ${this.formatDate(item.createdAt)}</span>
                    </div>
                </div>
            `;
  }
  /**
   * Render all items
   */

  async render() {
    const items = await this.getFilteredItems();
    const grid = document.getElementById("itemsGrid");

    if (items.length === 0) {
      grid.innerHTML = `
                <div class="empty-state">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="12" y1="18" x2="12" y2="12"></line>
                        <line x1="9" y1="15" x2="15" y2="15"></line>
                    </svg>
                    <p>${
                      this.searchQuery
                        ? "Tidak ada item yang sesuai dengan pencarian."
                        : "Belum ada item. Tambahkan item pertama Anda!"
                    }</p>
                </div>
            `;
    } else {
      grid.innerHTML = items.map((item) => this.renderItemCard(item)).join("");
    }

    await this.updateStats();
  }
  /**
   * Show notification (simple implementation)
   */

  showNotification(message) {
    console.log("Notification:", message);
  }
}


