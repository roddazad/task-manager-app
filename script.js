document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("taskList");
    const taskTitleInput = document.getElementById("taskTitle");
    const taskCategoryInput = document.getElementById("taskCategory");
    const taskDueDateInput = document.getElementById("taskDueDate");
    const filterCategory = document.getElementById("filterCategory");
    const filterStatus = document.getElementById("filterStatus");
    const addTaskButton = document.getElementById("addTaskButton");

    addTaskButton.addEventListener("click", addTask);
    filterCategory.addEventListener("change", displayTasks);
    filterStatus.addEventListener("change", displayTasks);

    function addTask() {
        const taskTitle = taskTitleInput.value;
        const taskCategory = taskCategoryInput.value;
        const taskDueDate = taskDueDateInput.value;

        if (taskTitle === "") {
            alert("Please enter a task title.");
            return;
        }

        const task = { title: taskTitle, category: taskCategory, dueDate: taskDueDate, completed: false };
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskTitleInput.value = "";
        displayTasks();
    }

    function toggleComplete(index) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    }
    // ✅ Function to Toggle Dark Mode
function toggleDarkModeFunction() {
    document.body.classList.toggle("dark-mode");

    // ✅ Save preference in localStorage
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

// ✅ Event Listener for Dark Mode Button
document.getElementById("toggleDarkMode").addEventListener("click", toggleDarkModeFunction);

// ✅ Load Dark Mode Preference on Page Load
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}

    function deleteTask(index) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const taskItem = taskList.children[index];
    
        // ✅ Apply fade-out effect
        taskItem.classList.add("fade-out");
    
        setTimeout(() => {
            // ✅ Remove task after animation completes
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks();
        }, 300); // Wait for animation to finish
    }

    function displayTasks() {
        taskList.innerHTML = "";
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        let selectedCategory = filterCategory.value;
        let selectedStatus = filterStatus.value;
    
        tasks.forEach((task, i) => {
            // Apply category filter
            if (selectedCategory !== "all" && task.category !== selectedCategory) return;
    
            // Apply status filter
            if (selectedStatus === "completed" && !task.completed) return;
            if (selectedStatus === "pending" && task.completed) return;
    
            // ✅ Create task container
            const listItem = document.createElement("div");
            listItem.classList.add("list-group-item", "d-flex", "align-items-center", "justify-content-between");
    
            // ✅ Task Title
            const titleElement = document.createElement("span");
            titleElement.textContent = task.title;
            titleElement.classList.add("task-title", "me-3");
    
            // ✅ Task Category
            const categoryElement = document.createElement("span");
            categoryElement.textContent = `Category: ${task.category}`;
            categoryElement.classList.add("task-category", "me-3");
    
            if (task.category === "Work") {
                categoryElement.classList.add("badge", "bg-info");
            } else if (task.category === "Personal") {
                categoryElement.classList.add("badge", "bg-success");
            } else if (task.category === "Urgent") {
                categoryElement.classList.add("badge", "bg-danger");
            }
    
            // ✅ Due Date
            const dueDateElement = document.createElement("span");
            dueDateElement.textContent = `Due: ${task.dueDate || "No due date"}`;
            dueDateElement.classList.add("task-due-date", "me-3");
    
            // Highlight overdue tasks
            const today = new Date().toISOString().split("T")[0];
            if (task.dueDate && task.dueDate < today) {
                dueDateElement.classList.add("overdue");
            }
    
            // ✅ Completion Button (✔)
            const completeButton = document.createElement("button");
            completeButton.innerHTML = task.completed ? "✔" : "🔲";
            completeButton.classList.add("btn", "btn-success", "btn-sm", "me-2");
            if (task.completed) {
                completeButton.classList.add("btn-secondary");
            }
    
            completeButton.addEventListener("click", function () {
                toggleComplete(i);
            });
    
            // ✅ Delete Button (🗑)
            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = "🗑";
            deleteButton.classList.add("btn", "btn-danger", "btn-sm");
            deleteButton.addEventListener("click", function () {
                deleteTask(i);
            });
    
            // ✅ Append elements to task row
            listItem.append(titleElement, categoryElement, dueDateElement, completeButton, deleteButton);
            taskList.appendChild(listItem);
        });
    }

    displayTasks();
});