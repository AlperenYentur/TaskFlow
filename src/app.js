const express = require('express');
const logger = require('./middleware/logger');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(logger);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('TaskFlow API çalışıyor');
});

app.use('/tasks', taskRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
