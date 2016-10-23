var path = require('path');
var fs = require('fs');
var Tasks = require('../../models/tasks.js');
var _ = require('lodash');
var util = require('util');
var Async = require('async');
var moment = require('moment');
var Q = require('q');

var sendResponse = function (res, status, content) {
    if(status >= 400) {
        res.status(status).end(content);
    } else {
        res.status(status).json(content);
    }
}

var getTasks = function(req, res) {
    Tasks.find({}, function (err, tasks) {
        if(err) {
            return sendResponse(res, 400, err);
        }
        sendResponse(res, 200, tasks);
    });
};

var getTaskByTitle = function(req, res) {
    var title = req.params.title;
    if (!title) {
        return sendResponse(res, 400, 'Error, null title');
    }
    Tasks.findOne({
        'title': title
    }, function (err, task) {
        if(err || !task) {
            return sendResponse(res, 404, err);
        }
        sendResponse(res, 200, task);
    });
};

var addTask = function(req, res) {
    var task = new Tasks({
        title: req.body.title,
        description: req.body.description
    });
    task.save(function (err) {
        if(err) {
            return sendResponse(res, 400, err);
        }
        sendResponse(res, 200, 'Add new done!');
    });
};

var editTask = function(req, res) {
    Tasks.findById(req.body._id, function (err, task) {
        if(err || !task) {
            return sendResponse(res, 404, 'Not found!');
        }

        task.title = req.body.title;
        task.description = req.body.description;
        task.save(function (err) {
            if(err) {
                return sendResponse(res, 400, err);
            }
            sendResponse(res, 200, 'Edit done!');
        });
    });
};

var deleteTask = function(req, res) {
    Tasks.findByIdAndRemove(req.body._id, function(err, task) {
        if (err || !task) {
            return sendResponse(res, 404, err);
        }
        sendResponse(res, 200, 'Delete done!');
    });
};

module.exports = {
    getTasks: getTasks,
    getTaskByTitle: getTaskByTitle,
    addTask: addTask,
    editTask: editTask,
    deleteTask: deleteTask
}
