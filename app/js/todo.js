const todoInput = document.querySelector(".todo-input");
// const inputSubmit = document.querySelector(".todo-submit");
const todoForm = document.querySelector(".todo-form");
const todosContainer = document.querySelector(".todos-container");
const todosAmount = document.querySelector(".todos-count");
const interactionsContainer = document.querySelector(".interactions");

let todos = [];

todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
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

function renderTodos(todos) {
    todosContainer.innerHTML = "";
    const filter = localStorage.getItem("filter");

    if (filter === "all") {
        todos.forEach(function (item) {
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
            todoWrapper.appendChild(todoButton);
            todoWrapper.appendChild(todoSpan);
            todoWrapper.appendChild(todoCross);

            todosContainer.append(todoWrapper);
        });
    } else if (filter === "active") {
        todos.forEach(function (item) {
            if (!item.completed) {
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
                todoWrapper.appendChild(todoButton);
                todoWrapper.appendChild(todoSpan);
                todoWrapper.appendChild(todoCross);

                todosContainer.append(todoWrapper);
            }
        });
    } else if (filter === "completed") {
        todos.forEach(function (item) {
            if (item.completed) {
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
                todoWrapper.appendChild(todoButton);
                todoWrapper.appendChild(todoSpan);
                todoWrapper.appendChild(todoCross);

                todosContainer.append(todoWrapper);
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

// toggle the value to completed and not completed
function toggle(id) {
    todos.forEach(function (item) {
        if (item.id == id) {
            item.completed = !item.completed;
        }
    });

    addToLocalStorage(todos);
}

function deleteTodo(id) {
    todos = todos.filter(function (item) {
        return item.id != id;
    });

    addToLocalStorage(todos);
}
function deleteCompletedTodos() {
    todos = todos.filter(function (item) {
        return item.completed != true;
    });

    addToLocalStorage(todos);
}

getFromLocalStorage();

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
interactionsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("clear-completed-todos")) {
        deleteCompletedTodos();
    } else if (event.target.classList.contains("all-todos")) {
        localStorage.setItem("filter", "all");
        renderTodos(todos);
    } else if (event.target.classList.contains("active-todos")) {
        localStorage.setItem("filter", "active");
        renderTodos(todos);
    } else if (event.target.classList.contains("completed-todos")) {
        localStorage.setItem("filter", "completed");
        renderTodos(todos);
    }
});
