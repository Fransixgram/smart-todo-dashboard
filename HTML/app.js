// 1. Select the DOM elements we need to interact with
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// 2. Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();

    // Prevent users from adding empty tasks
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    // Create a new list item element
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';
    
    // Add text and a basic delete placeholder button inside the list item
    listItem.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="delete-btn">X</button>
    `;

    // Append the new item to our task list (ul)
    taskList.appendChild(listItem);

    // Clear the input field for the next task
    taskInput.value = '';
}

// 3. Function to handle actions inside the task list (Delete & Toggle Complete)
function handleListClick(event) {
    const targetElement = event.target;

    // CASE A: User clicks the delete button
    if (targetElement.classList.contains('delete-btn')) {
        const itemToDelete = targetElement.parentElement;
        itemToDelete.remove(); // Removes the <li> completely from the DOM
    }

    // CASE B: User clicks the task text to toggle completion
    if (targetElement.classList.contains('task-text')) {
        targetElement.classList.toggle('completed'); // Toggles a 'completed' class
    }
}

// 4. Attach Event Listeners
addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Listen for clicks on the entire list container (Event Delegation)
taskList.addEventListener('click', handleListClick);