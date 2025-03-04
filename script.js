document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    const taskTitleInput = document.getElementById("taskTitle");
    const taskCategoryInput = document.getElementById("taskCategory");
    const taskDueDateInput = document.getElementById("taskDueDate");
    const filterCategory = document.getElementById("filterCategory");
    const filterStatus = document.getElementById("filterStatus");
    const addTaskButton = document.getElementById("addTaskButton");
    const progressBar = document.getElementById("taskProgressBar");
    const toggleDarkMode = document.getElementById("toggleDarkMode");

    addTaskButton.addEventListener("click", addTask);
    filterCategory.addEventListener("change", displayTasks);
    filterStatus.addEventListener("change", displayTasks);
    
    toggleDarkMode.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });

    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }

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
        taskForm.reset();
        displayTasks();
    }

    function displayTasks() {
        taskList.innerHTML = "";
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        tasks.forEach((task, i) => {
            const listItem = document.createElement("div");
            listItem.classList.add("list-group-item", "d-flex", "align-items-center", "justify-content-between");

            const titleElement = document.createElement("span");
            titleElement.textContent = task.title;

            const dueDateElement = document.createElement("span");
            dueDateElement.textContent = `Due: ${task.dueDate || "No due date"}`;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "🗑";
            deleteButton.classList.add("btn", "btn-danger", "btn-sm");
            deleteButton.addEventListener("click", () => deleteTask(i));

            listItem.append(titleElement, dueDateElement, deleteButton);
            taskList.appendChild(listItem);
        });

        updateProgressBar();
    }

    function deleteTask(index) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    }

    displayTasks();
});