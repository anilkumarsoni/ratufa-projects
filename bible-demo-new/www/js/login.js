angular.module('login.module', [])
.controller('LoginCtrl', function($scope,$cordovaOauth,$http,$auth,$state) {
	$scope.Login_LinkedIn = function(){
		$cordovaOauth.linkedin('81eg348o83f4mb', 'dkVSJU7xSSwDF8Xb', ['r_basicprofile', 'r_emailaddress']).then(function(success){
	      //Here you will get the access_token

	      //alert(JSON.stringify(success));

	      $http({method:"GET", url:"https://api.linkedin.com/v1/people/~:(email-address,first-name,last-name,picture-url)?format=json&oauth2_access_token="+success.access_token}).success(function(response){

		        // In response we will get firstname, lastname, emailaddress and picture url
		        // Note: If image is not uploaded in linkedIn account, we can't get image url
		        alert(JSON.stringify(response));
		        console.log(response);
		        $state.go("tab.dash");

	      }, function(error){
	        console.log(error);
	      })
	    }, function(error){
	      console.log(error);
	    })
	}
	$scope.email = "anilkumarsonix@gmail.com";
	$scope.password = "a@twitter";
	$scope.Login_Twitter = function(){
		//xpbvJbI8rNjpdpFVyLhTl5CEq
		//Z5ezAOti62rtZxlICqw7HOuLfnW5fRPFcqdLJjmvQf9x0aAaeX
		//13155180;
		// $auth.authenticate("twitter").then(function(response) {
	 //    	console.log(response);
	 //  	})
	 //  	.catch(function(response) {
	 //    	console.log(response);
	 //  	});

	 	$cordovaOauth.twitter('xpbvJbI8rNjpdpFVyLhTl5CEq', 'Z5ezAOti62rtZxlICqw7HOuLfnW5fRPFcqdLJjmvQf9x0aAaeX').then(function(success){
	      console.log(success);
	      $state.go("tab.dash");
	    }, function(error){
	      console.log(error);
	    })

	}

	
});