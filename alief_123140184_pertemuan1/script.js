// Task Manager Application
class TaskManager {
  constructor() {
    this.tasks = [];
    this.currentFilter = "all";
    this.searchTerm = "";
    this.init();
  }

  init() {
    this.loadTasks();
    this.setupEventListeners();
    this.setMinDate();
    this.render();
  }

  // Load tasks from localStorage
  loadTasks() {
    const savedTasks = localStorage.getItem("studentTasks");
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    } else {
      // Initial mock data
      this.tasks = [
        {
          id: "1",
          name: "Tugas Algoritma - Sorting",
          course: "Algoritma dan Pemrograman",
          deadline: "2025-07-15",
          completed: false,
          createdAt: "2025-07-01",
        },
        {
          id: "2",
          name: "Paper Basis Data",
          course: "Basis Data",
          deadline: "2025-07-20",
          completed: false,
          createdAt: "2025-07-02",
        },
        {
          id: "3",
          name: "Presentasi Web Development",
          course: "Pemrograman Web",
          deadline: "2025-07-10",
          completed: true,
          createdAt: "2025-06-28",
        },
        {
          id: "4",
          name: "Laporan Praktikum Jaringan",
          course: "Jaringan Komputer",
          deadline: "2025-07-18",
          completed: false,
          createdAt: "2025-07-03",
        },
        {
          id: "5",
          name: "Quiz Sistem Operasi",
          course: "Sistem Operasi",
          deadline: "2025-07-12",
          completed: true,
          createdAt: "2025-06-30",
        },
      ];
      this.saveTasks();
    }
  }

  // Save tasks to localStorage
  saveTasks() {
    localStorage.setItem("studentTasks", JSON.stringify(this.tasks));
  }

  // Set minimum date for deadline input
  setMinDate() {
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("taskDeadline").setAttribute("min", today);
  }

  // Setup event listeners
  setupEventListeners() {
    // Form submission
    document.getElementById("taskForm").addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleAddTask();
    });

    // Search input
    document.getElementById("searchInput").addEventListener("input", (e) => {
      this.searchTerm = e.target.value.toLowerCase();
      this.render();
    });

    // Filter buttons
    document.querySelectorAll(".btn-filter").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.currentFilter = e.currentTarget.dataset.filter;
        document
          .querySelectorAll(".btn-filter")
          .forEach((b) => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        this.render();
      });
    });

    // Clear error on input
    ["taskName", "taskCourse", "taskDeadline"].forEach((id) => {
      document.getElementById(id).addEventListener("input", () => {
        this.clearError(id);
      });
    });
  }

  // Validate form
  validateForm() {
    let isValid = true;
    const name = document.getElementById("taskName").value.trim();
    const course = document.getElementById("taskCourse").value.trim();
    const deadline = document.getElementById("taskDeadline").value;

    // Clear all errors
    this.clearAllErrors();

    // Validate name
    if (!name) {
      this.showError("taskName", "nameError", "Nama tugas wajib diisi");
      isValid = false;
    }

    // Validate course
    if (!course) {
      this.showError("taskCourse", "courseError", "Mata kuliah wajib diisi");
      isValid = false;
    }

    // Validate deadline
    if (!deadline) {
      this.showError("taskDeadline", "deadlineError", "Deadline wajib diisi");
      isValid = false;
    } else {
      const selectedDate = new Date(deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        this.showError(
          "taskDeadline",
          "deadlineError",
          "Deadline tidak boleh di masa lalu"
        );
        isValid = false;
      }
    }

    return isValid;
  }

  // Show error
  showError(inputId, errorId, message) {
    document.getElementById(inputId).classList.add("error");
    document.getElementById(errorId).textContent = message;
  }

  // Clear specific error
  clearError(inputId) {
    const errorMap = {
      taskName: "nameError",
      taskCourse: "courseError",
      taskDeadline: "deadlineError",
    };
    document.getElementById(inputId).classList.remove("error");
    document.getElementById(errorMap[inputId]).textContent = "";
  }

  // Clear all errors
  clearAllErrors() {
    ["taskName", "taskCourse", "taskDeadline"].forEach((id) => {
      this.clearError(id);
    });
  }

  // Handle add task
  handleAddTask() {
    if (!this.validateForm()) {
      return;
    }

    const name = document.getElementById("taskName").value.trim();
    const course = document.getElementById("taskCourse").value.trim();
    const deadline = document.getElementById("taskDeadline").value;

    const newTask = {
      id: Date.now().toString(),
      name,
      course,
      deadline,
      completed: false,
      createdAt: new Date().toISOString().split("T")[0],
    };

    this.tasks.unshift(newTask);
    this.saveTasks();
    this.render();

    // Reset form
    document.getElementById("taskForm").reset();
    this.showToast(`${name} telah ditambahkan ke daftar tugas`, "success");
  }

  // Toggle task completion
  toggleTask(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
      this.render();
    }
  }

  // Delete task
  deleteTask(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (task && confirm(`Hapus tugas "${task.name}"?`)) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
      this.saveTasks();
      this.render();
      this.showToast(`${task.name} telah dihapus`, "error");
    }
  }

  // Get filtered tasks
  getFilteredTasks() {
    return this.tasks.filter((task) => {
      // Filter by search term
      const matchesSearch =
        task.name.toLowerCase().includes(this.searchTerm) ||
        task.course.toLowerCase().includes(this.searchTerm);

      // Filter by status
      const matchesFilter =
        this.currentFilter === "all"
          ? true
          : this.currentFilter === "completed"
          ? task.completed
          : this.currentFilter === "incomplete"
          ? !task.completed
          : true;

      return matchesSearch && matchesFilter;
    });
  }

  // Check if task is overdue
  isOverdue(task) {
    if (task.completed) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(task.deadline);
    deadline.setHours(0, 0, 0, 0);
    return deadline < today;
  }

  // Get days remaining
  getDaysRemaining(task) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(task.deadline);
    deadline.setHours(0, 0, 0, 0);
    const diff = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    return diff;
  }

  // Format date
  formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  }

  // Show toast notification
  showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");

    toastMessage.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  // Update statistics
  updateStatistics() {
    const total = this.tasks.length;
    const incomplete = this.tasks.filter((t) => !t.completed).length;
    const completed = this.tasks.filter((t) => t.completed).length;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("incompleteTasks").textContent = incomplete;
    document.getElementById("completedTasks").textContent = completed;

    document.getElementById("filterAllCount").textContent = total;
    document.getElementById("filterIncompleteCount").textContent = incomplete;
    document.getElementById("filterCompleteCount").textContent = completed;
  }

  // Render task list
  renderTaskList() {
    const taskList = document.getElementById("taskList");
    const filteredTasks = this.getFilteredTasks();

    if (filteredTasks.length === 0) {
      taskList.innerHTML = `
                <div class="empty-state">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>
                    <p>${
                      this.searchTerm || this.currentFilter !== "all"
                        ? "Tidak ada tugas yang sesuai dengan pencarian"
                        : "Belum ada tugas. Tambahkan tugas pertama Anda!"
                    }</p>
                </div>
            `;
      return;
    }

    taskList.innerHTML = filteredTasks
      .map((task) => {
        const overdue = this.isOverdue(task);
        const daysRemaining = this.getDaysRemaining(task);
        const isUrgent =
          !task.completed && daysRemaining <= 3 && daysRemaining >= 0;

        return `
                <div class="task-item ${task.completed ? "completed" : ""} ${
          overdue ? "overdue" : ""
        }">
                    <div class="task-content">
                        <div class="task-checkbox">
                            <input type="checkbox" 
                                   class="task-checkbox-input" 
                                   ${task.completed ? "checked" : ""}
                                   onchange="taskManager.toggleTask('${
                                     task.id
                                   }')">
                        </div>
                        <div class="task-details">
                            <h3 class="task-name">${task.name}</h3>
                            <div class="task-badges">
                                <span class="badge badge-course">${
                                  task.course
                                }</span>
                                ${
                                  task.completed
                                    ? '<span class="badge badge-completed">Selesai</span>'
                                    : ""
                                }
                                ${
                                  overdue
                                    ? '<span class="badge badge-overdue">Terlambat</span>'
                                    : ""
                                }
                                ${
                                  isUrgent
                                    ? '<span class="badge badge-urgent">Segera</span>'
                                    : ""
                                }
                            </div>
                            <div class="task-deadline">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                <span>Deadline: ${this.formatDate(
                                  task.deadline
                                )}</span>
                                ${
                                  !task.completed && daysRemaining >= 0
                                    ? `<span class="days-remaining">(${
                                        daysRemaining === 0
                                          ? "Hari ini"
                                          : `${daysRemaining} hari lagi`
                                      })</span>`
                                    : ""
                                }
                            </div>
                        </div>
                        <div class="task-actions">
                            <button class="btn-delete" onclick="taskManager.deleteTask('${
                              task.id
                            }')" aria-label="Hapus tugas">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            `;
      })
      .join("");
  }

  // Main render method
  render() {
    this.updateStatistics();
    this.renderTaskList();
  }
}

// Initialize the application
const taskManager = new TaskManager();
