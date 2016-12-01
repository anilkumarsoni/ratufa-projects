var myapp = angular.module('Mytest',[

		"ui.router",
	    "ngSanitize",
	    "home.ctrl"

	]);
myapp.controller('LoginCtrl',['$scope',function($scope){
	//alert("hi");
}]);
myapp.controller('signupCtrl',['$scope',function($scope){
	//alert("hi");
}]);

myapp.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise("/login");
	$stateProvider.state('login',{
		url:'/login',
		templateUrl:'views/login.html',
		controller:'LoginCtrl'
	})
	.state('signup',{
		url:'/signup',
		templateUrl:'views/signup.html',
		controller:'signupCtrl'
	})
	.state('home',{
		url:'/home',
		templateUrl:'views/home.html',
		controller:'homeCtrl'
	})
}]);

myapp.run(['$rootScope','$state',function($rootScope,$state){
	$rootScope.$state = $state;
}]);