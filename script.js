// Wait for the DOM to load before running the script
document.addEventListener("DOMContentLoaded", function () {
    
    // Hooks to the DOM
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    const taskTitleInput = document.getElementById("taskTitle");
    const taskDescriptionInput = document.getElementById("taskDescription");
    const taskCategoryInput = document.getElementById("taskCategory");
    const taskDueDateInput = document.getElementById("taskDueDate"); // Due date input
    const filterCategory = document.getElementById("filterCategory");
    const filterStatus = document.getElementById("filterStatus");
    const addTaskButton = document.getElementById("addTaskButton");

    // Attach event listener to the Add Task button
    addTaskButton.addEventListener("click", function () {
        addTask();
    });

    // Event listeners for filtering
    filterCategory.addEventListener("change", displayTasks);
    filterStatus.addEventListener("change", displayTasks);

    // Function to add a new task
    function addTask() {
        const taskTitle = taskTitleInput.value;
        const taskDescription = taskDescriptionInput.value;
        const taskCategory = taskCategoryInput.value;
        const taskDueDate = taskDueDateInput.value; // Get the due date

        if (taskTitle === "") {
            alert("Please enter a task title.");
            return;
        }

        const task = {
            title: taskTitle,
            description: taskDescription,
            category: taskCategory,
            dueDate: taskDueDate || "No due date", // Store due date (default if empty)
            completed: false
        };

        saveTask(task);
        taskForm.reset();
    }

    // Function to save a task
    function saveTask(task) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    }

    // Function to display tasks (with sorting and filtering)
    function displayTasks() {
        taskList.innerHTML = "";
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        let selectedCategory = filterCategory.value;
        let selectedStatus = filterStatus.value;

        // Sort tasks by due date (earliest first, empty dates at the end)
        tasks.sort((a, b) => {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate) - new Date(b.dueDate);
        });

        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];

            // Apply Category Filter
            if (selectedCategory !== "all" && task.category !== selectedCategory) {
                continue;
            }

            // Apply Status Filter
            if (selectedStatus === "completed" && !task.completed) {
                continue;
            } else if (selectedStatus === "pending" && task.completed) {
                continue;
            }

            // Create task item
            const listItem = document.createElement("div");
            listItem.classList.add("list-group-item");

            if (task.completed) {
                listItem.classList.add("completed");
            }

            const titleElement = document.createElement("span");
            titleElement.textContent = task.title;
            titleElement.classList.add("task-title");

            const categoryElement = document.createElement("span");
            categoryElement.textContent = task.category;
            categoryElement.classList.add("task-category");

            if (task.category === "Work") {
                categoryElement.classList.add("work");
            } else if (task.category === "Personal") {
                categoryElement.classList.add("personal");
            } else if (task.category === "Urgent") {
                categoryElement.classList.add("urgent");
            }

            const dueDateElement = document.createElement("span");
            dueDateElement.textContent = `Due: ${task.dueDate || "No due date"}`;
            dueDateElement.classList.add("task-due-date");

            const completeButton = document.createElement("button");
            completeButton.textContent = "✔";
            completeButton.classList.add("btn", "btn-success", "btn-sm", "ms-2");
            completeButton.addEventListener("click", function () {
                toggleComplete(i);
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "🗑";
            deleteButton.classList.add("btn", "btn-danger", "btn-sm", "ms-2");
            deleteButton.addEventListener("click", function () {
                deleteTask(i);
            });

            listItem.appendChild(titleElement);
            listItem.appendChild(categoryElement);
            listItem.appendChild(dueDateElement);
            listItem.appendChild(completeButton);
            listItem.appendChild(deleteButton);

            taskList.appendChild(listItem);
        }
    }

    // Function to toggle task completion
    function toggleComplete(index) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    }

    // Function to delete a task
    function deleteTask(index) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    }

    // Initial function call to load tasks on page load
    displayTasks();
});