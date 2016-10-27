var app = angular.module('taskMan', ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      resolve: {
        taskPromise: ['tasks', function(tasks){
          return tasks.getAll();
        }]
      }
    })

    .state('tasks',{
    	url: '/tasks/{id}',
    	templateUrl: '/tasks.html',
    	controller:'TaskCtrl'
    });

  	$urlRouterProvider.otherwise('home');
}]);

app.factory('tasks', ['$http',function($http){
	var obj = {
		tasks: []
	};
  obj.getAll = function(){
    return $http.get('/tasks').success(function(data){
      angular.copy(data,obj.tasks);
    });
  };
  obj.create = function(task) {
    return $http.post('/tasks',task).success(function(data){
    obj.tasks.push(data);
    });
  };

	return obj;	
}]);

app.controller('MainCtrl', [
'$scope',
'tasks',
function($scope, tasks){

  $scope.tasks = tasks.tasks;

  $scope.addTask = function(){
  	if(!$scope.title || $scope.description === '') { return; }
  	tasks.create({title: $scope.title, 
  		description: $scope.description,
  		date: $scope.date,
  		priority: $scope.priority});
  	$scope.title = '';
  	$scope.description = '';
  	$scope.date = '';
  	$scope.priority = '';
  };
}])

app.controller('TaskCtrl', [
'$scope',
'$stateParams',
'tasks',
function($scope, $stateParams, tasks){
$scope.task = tasks.tasks[$stateParams.id];
}]);