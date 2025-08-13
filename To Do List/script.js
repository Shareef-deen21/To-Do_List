var icon = document.getElementById("icon");

icon.onclick = function(){
   document.body.classList.toggle("dark-theme");
   if(document.body.classList.contains("dark-theme")){
      icon.src = "imglogo/sun.png";         
   }else{
      icon.src = "imglogo/moon.png";  
   }
}


const todoinput = document.getElementById("inputlist")
const addbtn = document.getElementById("btn")
const todolist = document.getElementById("ToDoList")

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// creating todos
function renderTodos() {
    todolist.innerHTML = "";
    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        if (todo.completed) {
            li.classList.add("completed");
        }
        li.innerHTML = `
            <span class="text" data-number="${index + 1}">${todo.text}</span>
            ${todo.completed ? '<span class="completed-icon animate-checkmark"><i class="fas fa-check-circle"></i></span>' : ''}
            <div class="Buttons">
                <button class="complete-btn ${todo.completed ? 'completed' : ''}" 
                        onclick="toggleComplete(${index})">
                    ${todo.completed ? 'Completed' : 'Complete'}
                </button>
                <button class="edit" onclick="editTodo(${index})">Edit</button>
                <button onclick="deleteTodo(${index})">Delete</button>
            </div>
        `;
        todolist.appendChild(li);
    });
}

// Add a new todo
function addTodo() {
    const text = todoinput.value.trim();
    if (text) {
        todos.push({ 
            text, 
            completed: false // Add completed status default to false
        });
        todoinput.value = "";
        saveTodos();
        renderTodos();
    }
}

// Delete a todo
function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

// Edit a todo 
function editTodo(index) {
    const newText = prompt("Edit task:", todos[index].text);
    if (newText !== null) {
        todos[index].text = newText.trim();
        saveTodos();
        renderTodos();
    }
}

// Toggle complete status
function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
    
    // If we just completed the item, find its checkmark and animate it
    if (todos[index].completed) {
        const listItems = document.querySelectorAll('#ToDoList li');
        const completedItem = listItems[index];
        if (completedItem) {
            const checkmark = completedItem.querySelector('.completed-icon');
            if (checkmark) {
                checkmark.style.animation = 'none';
                // Trigger reflow to restart animation
                void checkmark.offsetWidth;
                checkmark.style.animation = 'checkmarkBounce 0.5s ease-out';
            }
        }
    }
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Event Listeners
addbtn.addEventListener("click", addTodo);
todoinput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodo();
});

// Initial render
renderTodos();