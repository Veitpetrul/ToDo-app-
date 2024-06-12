const inputFieldEl = document.querySelector("#inputField");
const btn = document.getElementById("btn");
const toDoList = document.querySelector("#todoList");
const doneBtn = document.getElementById("doneBtn");

const state = {
  todos: [],
};

function render() {
  // Clear the current list
  toDoList.innerHTML = "";
  state.todos.forEach((notes) => {
    const li = document.createElement("li");

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = notes.done;
    checkBox.id = `checkbox-${notes.id}`;

    const label = document.createElement("label");
    label.htmlFor = checkBox.id;
    label.textContent = notes.description;

    li.appendChild(checkBox);
    li.appendChild(label);
    toDoList.appendChild(li);

    checkBox.addEventListener("change", () => {
      notes.done = !notes.done;
      saveTodosToLocalStorage();
      render(); // Re-render to reflect changes
    });
  });
}

// Save the current state to LocalStorage
function saveTodosToLocalStorage() {
  localStorage.setItem("currentTodos", JSON.stringify(state.todos));
}

// Load the state from LocalStorage
function loadTodosFromLocalStorage() {
  const savedTodos = localStorage.getItem("currentTodos");
  if (savedTodos) {
    state.todos = JSON.parse(savedTodos);
  }
}

document.getElementById("todoForm").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission
  // Filter duplicates
  const inputField = inputFieldEl.value.trim();
  const found = state.todos.find(
    (element) => element.description === inputField
  );
  console.log(found);

  if (inputField == "" || found !== undefined) return;

  state.todos.push({
    description: inputField,
    done: false,
    id: Math.random() * Date.now(),
  });

  saveTodosToLocalStorage();
  render();
  inputFieldEl.value = "";
});

doneBtn.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent form submission

  //todos = [...newSet(todos)]; wrong approach

  // Filter out the completed todos
  state.todos = state.todos.filter((notes) => !notes.done);
  saveTodosToLocalStorage();
  render();
});

// Add event listeners to radio buttons for filtering
document.querySelectorAll('input[name="tasks"]').forEach((radio) => {
  radio.addEventListener("change", (event) => {
    state.filter = event.target.value;
    render();
  });
});

loadTodosFromLocalStorage();
render();
