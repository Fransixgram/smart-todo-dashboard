// 1. Select DOM elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// 2. State Management: Load initial tasks from localStorage or default to an empty array
let tasks = JSON.parse(localStorage.getItem('todo_tasks')) || [];

// 3. Render function to sync the UI with our tasks array
function renderTasks() {
    // Clear out the current DOM list entirely to prevent duplicates
    taskList.innerHTML = '';

    // Loop through the tasks array and build the HTML structure for each item
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'todo-item';
        
        listItem.innerHTML = `
            <span class="task-text ${task.completed ? 'completed' : ''}" data-index="${index}">
                ${task.text}
            </span>
            <button class="delete-btn" data-index="${index}">X</button>
        `;

        taskList.appendChild(listItem);
    });

    // Save the current state of the array to the browser's storage
    localStorage.setItem('todo_tasks', JSON.stringify(tasks));
}

// 4. Function to add a task to the state
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    // Push a fresh task object into our state array
    tasks.push({
        text: taskText,
        completed: false
    });

    // Re-render UI and clear input
    renderTasks();
    taskInput.value = '';
}

// 5. Handle clicks inside the list container (Delete & Toggle Complete via array indexes)
function handleListClick(event) {
    const targetElement = event.target;
    const index = targetElement.getAttribute('data-index');

    if (index === null) return; // Ignore clicks that aren't on interactive items

    // Case A: Clicked delete button
    if (targetElement.classList.contains('delete-btn')) {
        tasks.splice(index, 1); // Remove 1 item from the array at that specific index
    }

    // Case B: Clicked task text
    if (targetElement.classList.contains('task-text')) {
        tasks[index].completed = !tasks[index].completed; // Toggle the completion true/false boolean
    }

    // Always re-render UI after updating the state array
    renderTasks();
}

// 6. Attach Event Listeners
addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

taskList.addEventListener('click', handleListClick);

// 7. Initial invocation to render tasks saved from previous sessions when page loads
renderTasks();