const addBtn = document.querySelector(".add-btn");
const todoList = document.querySelector(".TODO ul");
const searchBar = document.querySelector(".search-bar");

function saveTasks() {
    const tasks = []
    todoList.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.querySelector(".task").textContent,
            done: li.querySelector("input").checked
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
    saved.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <label class="checkbox">
                <input type="checkbox" ${task.done ? "checked" : ""}>
                <span class="custom"></span>
                <span class="task">${task.text}</span>
            </label>
            <button class="delete-btn">X</button>
        `;
        todoList.appendChild(li);
    });
}

addBtn.addEventListener("click", () => {
    const text = prompt("New task:");
    if (!text) return;

    const li = document.createElement("li");
    li.innerHTML = `<label class = "checkbox">
                    <input type="checkbox">
                    <span class = "custom"></span>
                    <span class = "task">${text}</span>
                </label>
                <button class = "delete-btn">X</button>
    `;
    todoList.appendChild(li);
    saveTasks();
});

todoList.addEventListener("click", e => {
    if (e.target.classList.contains("delete-btn")) {
        e.target.closest("li").remove();
        saveTasks();
    }
});

todoList.addEventListener("change", e => {
    if (e.target.type === "checkbox") saveTasks();
});

searchBar.addEventListener("input", e => {
    const term = e.target.value.toLowerCase();
    todoList.querySelectorAll("li").forEach(li => {
        const task = li.querySelector(".task").textContent.toLowerCase();
        li.style.display = task.includes(term) ? "flex" : "none";
    });
});


document.addEventListener("DOMContentLoaded", loadTasks);