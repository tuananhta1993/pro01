var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Tasks = new Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        dropDups: true
    },
    description: String
});

module.exports = mongoose.model('tasks', Tasks);
