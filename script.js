// Wait for the DOM to load before running the script
document.addEventListener("DOMContentLoaded", function () {
    
    // Hooks to the DOM
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    const taskTitleInput = document.getElementById("taskTitle");
    const taskDescriptionInput = document.getElementById("taskDescription");
    const taskCategoryInput = document.getElementById("taskCategory");

    // Event listener for adding a new task
    const addTaskButton = document.getElementById("addTaskButton");
    addTaskButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent page reload
        addTask();
    });

    // Function to add a new task
    function addTask() {
        const taskTitle = taskTitleInput.value;
        const taskDescription = taskDescriptionInput.value;
        const taskCategory = taskCategoryInput.value;

        if (taskTitle === "") {
            alert("Please enter a task title.");
            return;
        }

        const task = {
            title: taskTitle,
            description: taskDescription,
            category: taskCategory,
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

    // Function to load and display tasks
    function displayTasks() {
        taskList.innerHTML = "";
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
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
