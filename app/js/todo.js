const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todosContainer = document.querySelector(".todos-container");
const todosAmount = document.querySelector(".todos-count");
const interactionsContainer = document.querySelector(".interactions");

let todos = [];
localStorage.setItem("filter", "all");

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo(todoInput.value);
});

function addTodo(item) {
    if (item !== "") {
        const todo = {
            id: Date.now(),
            name: item,
            completed: false,
        };
        todos.push(todo);
        addToLocalStorage(todos);
        todoInput.value = "";
    }
}
function render(item) {
    const frag = document.createDocumentFragment();
    const todoWrapper = document.createElement("div");
    const todoButton = document.createElement("button");
    const todoSpan = document.createElement("span");
    const todoCross = document.createElement("button");

    todoCross.classList.add("cross");
    if (item.completed === true) {
        todoWrapper.classList.add("todo", "done");
        todoButton.classList.add("checkbox", "checked");
    } else {
        todoWrapper.classList.add("todo");
        todoButton.classList.add("checkbox");
    }

    todoSpan.textContent = item.name;
    todoWrapper.setAttribute("data-key", item.id);

    frag.append(todoButton, todoSpan, todoCross);
    todoWrapper.append(frag);
    todosContainer.append(todoWrapper);
}
function renderTodos(todos) {
    todosContainer.innerHTML = "";
    const filter = localStorage.getItem("filter");

    if (filter === "all") {
        todos.forEach(function (item) {
            render(item);
        });
    } else if (filter === "active") {
        todos.forEach(function (item) {
            if (!item.completed) {
                render(item);
            }
        });
    } else if (filter === "completed") {
        todos.forEach(function (item) {
            if (item.completed) {
                render(item);
            }
        });
    }
    todosCount();
}

function todosCount() {
    todosAmount.textContent = `${todos.length} items left`;
}

function addToLocalStorage(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos(todos);
}

function getFromLocalStorage() {
    const reference = localStorage.getItem("todos");
    if (reference) {
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}

function toggle(id) {
    todos.forEach((item) => {
        if (item.id == id) {
            item.completed = !item.completed;
        }
    });
    addToLocalStorage(todos);
}

function deleteTodo(id) {
    todos = todos.filter((item) => item.id != id);
    addToLocalStorage(todos);
}
function deleteCompletedTodos() {
    todos = todos.filter((item) => item.completed != true);
    localStorage.setItem("filter", "all");
    addToLocalStorage(todos);
}

getFromLocalStorage();
todosCount();

todosContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("checkbox") && event.target.classList.contains("checked")) {
        event.target.classList.remove("checked");
        toggle(event.target.parentElement.getAttribute("data-key"));
    } else if (!event.target.classList.contains("checked")) {
        event.target.classList.add("checked");
        toggle(event.target.parentElement.getAttribute("data-key"));
    }

    if (event.target.classList.contains("cross")) {
        deleteTodo(event.target.parentElement.getAttribute("data-key"));
    }
});

document.querySelectorAll("button[data-type]").forEach((item) => {
    item.addEventListener("click", () => {
        localStorage.setItem("filter", item.dataset.type);
        renderTodos(todos);
    });
});
document.querySelector(".clear-completed-todos").addEventListener("click", () => {
    deleteCompletedTodos();
});
