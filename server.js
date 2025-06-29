const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

let tasks = [];

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const { task } = req.body;
    if (task) {
        tasks.push({ id: Date.now(), task });
        res.status(201).json({ message: 'Task added.' });
    } else {
        res.status(400).json({ error: 'Task cannot be empty.' });
    }
});

app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== id);
    res.json({ message: 'Task deleted.' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
