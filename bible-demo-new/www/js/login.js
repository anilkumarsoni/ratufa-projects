angular.module('login.module', [])
.controller('LoginCtrl', function($scope,$cordovaOauth,$http) {
	$scope.Login_LinkedIn = function(){
		$cordovaOauth.linkedin('81eg348o83f4mb', 'dkVSJU7xSSwDF8Xb', ['r_basicprofile', 'r_emailaddress']).then(function(success){
	      //Here you will get the access_token

	      //alert(JSON.stringify(success));

	      $http({method:"GET", url:"https://api.linkedin.com/v1/people/~:(email-address,first-name,last-name,picture-url)?format=json&oauth2_access_token="+success.access_token}).success(function(response){

	        // In response we will get firstname, lastname, emailaddress and picture url
	        // Note: If image is not uploaded in linkedIn account, we can't get image url
	        alert(JSON.stringify(response));
	        console.log(response);
	      }, function(error){
	        console.log(error);
	      })
	    }, function(error){
	      console.log(error);
	    })
	}

	$scope.Login_Twitter = function(){
		$cordovaOauth.twitter('xpbvJbI8rNjpdpFVyLhTl5CEq', 'Z5ezAOti62rtZxlICqw7HOuLfnW5fRPFcqdLJjmvQf9x0aAaeX').then(function(success){
	      alert(JSON.stringify(success));
	    }, function(error){
	      console.log(error);
	    })
	}

	
});