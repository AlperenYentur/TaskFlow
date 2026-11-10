const { readTasks, writeTasks } = require('../models/taskModel');

const statusList = ['pending', 'in-progress', 'completed'];
const priorityList = ['low', 'medium', 'high'];

function getAllTasks(req, res) {
  const tasks = readTasks();
  res.json(tasks);
}

function getTaskById(req, res) {
  const id = Number(req.params.id);
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ message: 'Görev bulunamadı' });
  }

  res.json(task);
}

function createTask(req, res) {
  const { title, description, status, priority, assignee } = req.body || {};

  if (!title) {
    return res.status(400).json({ message: 'title alanı zorunlu' });
  }
  if (status && !statusList.includes(status)) {
    return res.status(400).json({ message: 'status geçersiz (pending, in-progress, completed)' });
  }
  if (priority && !priorityList.includes(priority)) {
    return res.status(400).json({ message: 'priority geçersiz (low, medium, high)' });
  }

  const tasks = readTasks();

  let newId = 1;
  if (tasks.length > 0) {
    newId = tasks[tasks.length - 1].id + 1;
  }

  const now = new Date().toISOString();
  const newTask = {
    id: newId,
    title: title,
    description: description || '',
    status: status || 'pending',
    priority: priority || 'medium',
    assignee: assignee || '',
    createdAt: now,
    updatedAt: now,
  };

  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json(newTask);
}

function updateTask(req, res) {
  const id = Number(req.params.id);
  const { title, description, status, priority, assignee } = req.body || {};

  const tasks = readTasks();
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ message: 'Görev bulunamadı' });
  }
  if (title === '') {
    return res.status(400).json({ message: 'title boş olamaz' });
  }
  if (status && !statusList.includes(status)) {
    return res.status(400).json({ message: 'status geçersiz (pending, in-progress, completed)' });
  }
  if (priority && !priorityList.includes(priority)) {
    return res.status(400).json({ message: 'priority geçersiz (low, medium, high)' });
  }

  if (title) task.title = title;
  if (description !== undefined) task.description = description;
  if (status) task.status = status;
  if (priority) task.priority = priority;
  if (assignee !== undefined) task.assignee = assignee;
  task.updatedAt = new Date().toISOString();

  writeTasks(tasks);
  res.json(task);
}

function deleteTask(req, res) {
  const id = Number(req.params.id);
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Görev bulunamadı' });
  }

  tasks.splice(index, 1);
  writeTasks(tasks);

  res.json({ message: 'Görev silindi' });
}

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
