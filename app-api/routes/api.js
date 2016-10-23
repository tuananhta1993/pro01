var express = require('express');
var router = express.Router();
var app = express();
var path = require('path');

var taskApiHandler = require('./apiHandler/taskApiHandler');

/* Tasks api */
router.get('/tasks', taskApiHandler.getTasks);
router.get('/task/:title', taskApiHandler.getTaskByTitle);
router.post('/tasks', taskApiHandler.addTask);
router.post('/task/edit', taskApiHandler.editTask);
router.post('/task/delete', taskApiHandler.deleteTask);

module.exports = router;
