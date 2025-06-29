const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

async function loadTasks() {
    const res = await fetch('/tasks');
    const tasks = await res.json();
    taskList.innerHTML = '';
    tasks.forEach(({ id, task }) => {
        const li = document.createElement('li');
        li.innerHTML = `${task} <button onclick="deleteTask(${id})">❌</button>`;
        taskList.appendChild(li);
    });
}

taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const task = taskInput.value.trim();
    if (task) {
        await fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task })
        });
        taskInput.value = '';
        loadTasks();
    }
});

async function deleteTask(id) {
    await fetch(`/tasks/${id}`, { method: 'DELETE' });
    loadTasks();
}

loadTasks();
