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

// 3. Attach Event Listeners
// Trigger when the user clicks the button
addTaskBtn.addEventListener('click', addTask);

// Trigger when the user presses the 'Enter' key inside the input field
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});