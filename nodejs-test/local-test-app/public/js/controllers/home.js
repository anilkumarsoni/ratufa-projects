angular.module('home.ctrl',[])
.controller('homeCtrl',['$scope','$http',function($scope,$http){
	$scope.visible_update_btn = false;
	function Getcontat(){
		$http.get('/contactlist').success(function(responce){
			//console.log(responce);
			$scope.ContactList = responce;
			console.log($scope.ContactList);
		});
	}
	Getcontat();
	$scope.contactForm = {};
	$scope.AddContact = function(){
		$http.post('/contactlist',$scope.contactForm).success(function(responce){
			console.log(responce);
			$scope.contactForm = {};
			Getcontat();
		})

	}

	$scope.DeleteContact = function(id){
		$http.delete('/contactlist/'+id).success(function(responce){
			console.log(responce);
			Getcontat();
		});

	}

	$scope.EditContact = function(id){
		$http.get('/contactlist/'+id).success(function(responce){
			$scope.contactForm = {};
			$scope.contactForm = responce;
			$scope.visible_update_btn = true;
		});
	}

	$scope.UpdateContact = function(){
		$http.put('/contactlist',$scope.contactForm).success(function(responce){
			console.log(responce);
			Getcontat();

		})
	}
}]);