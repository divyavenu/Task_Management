var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose')
var Task = mongoose.model('Task')

router.get('/tasks', function(req,res,next){
	Task.find(function(err,tasks){
		if(err) { return next(err);}
		res.json(tasks);
	});
});

router.post('/tasks', function(req,res,next){
	var task = new Task(req.body);
	task.save(function(err,task){
		if(err) {return next(err);}
		
		res.json(task);
	});
});

router.get('/tasks/:task', function(req, res) {
	console.log(req.task);
  res.json(req.task);
});

router.param("task",function(req,res,next,id) {
	var query = Task.findById(id);
	query.exec(function(err,task){
		if (err) { return next(err); }
    	if (!task) { return next(new Error('can\'t find task')); }

	    req.task = task;
	    return next();
	});
});


module.exports = router;
