document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === '') return;

    const taskText = taskInput.value;
    taskInput.value = '';

    const task = createTaskElement(taskText);
    taskList.appendChild(task);

    saveTasks();
}

function createTaskElement(taskText) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const deleteButton = document.createElement('button');
   
    li.appendChild(span);
    li.appendChild(deleteButton);
    

    span.textContent = taskText;
    deleteButton.textContent = 'Delete';


    li.addEventListener('click', toggleTask);
    deleteButton.addEventListener('click', deleteTask);


    return li;
}

function toggleTask(event) {
    const li = event.target.closest('li');
    li.classList.toggle('completed');

    saveTasks();
}

function deleteTask(event) {
    const li = event.target.closest('li');
    li.remove();

    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = [];

    taskList.querySelectorAll('li').forEach((li) => {
        const taskText = li.querySelector('span').textContent;
        const isCompleted = li.classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task) => {
        const li = createTaskElement(task.text);
        if (task.completed) {
            li.classList.add('completed');
        }
        taskList.appendChild(li);
    });
}
