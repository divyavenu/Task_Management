var mongoose = require('mongoose')

var TaskSchema = new mongoose.Schema({
	title: String,
	description: String,
	date: { type: Date, default: Date.now },
	priority: {type: Number, default: 0}
});

mongoose.model('Task',TaskSchema);