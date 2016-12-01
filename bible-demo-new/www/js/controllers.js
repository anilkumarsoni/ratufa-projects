angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, Message, $state, $ionicScrollDelegate, $stateParams, Chats) {
  // $scope.chat = Chats.get($stateParams.chatId);

   var vm = $scope.vm = {};
    //console.log(vm);
    $scope.loggedUser = {
      "id": "12",
      "email": "anil@gmail.com",
      "name": "Anil ks" 
    }

    $scope.patientId = "12";
    $scope.doctorId = "21";

    $scope.roomId = "patient"+$scope.patientId+"-doctor"+$scope.doctorId
    //console.log($scope.roomId);
    angular.extend(vm, {
      newMessage: "",
      messages: Message.get($scope.roomId),
      currentUser: $scope.loggedUser,
      sendMessage: sendMessage,
      remove: remove
    });

    function sendMessage(message) {
      Message.send(message, $scope.loggedUser).then(function(){
        $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
      });
      vm.newMessage = "";
    }

    function remove(chat) {
      Message.remove(chat);
    }


})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller('HelpDirectionCtrl', function($scope, $ionicPlatform,$ionicHistory,$localstorage,$state,$cordovaGeolocation,$ionicLoading) {
  $ionicPlatform.ready(function(){
    $scope.mapArray = [
      {
        'latitude':'22.7195681',
        'longitude':'75.8577271',
        'name':'palasia Chaplain',  
      },
      {
        'latitude':'22.7532851',
        'longitude':'75.8936961',
        'name':'vijay nagar Chaplain',  
      },
      {
        'latitude':'22.7177101',
        'longitude':'75.8544851',
        'name':'rajbada Chaplain',  
      },
      {
        'latitude':'22.7396761',
        'longitude':'75.8810461',
        'name':'palasia Chaplain',  
      }
    ];
  function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
  }
  function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
    directionsService.route({
      origin: pointA,
      destination: pointB,
      travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  var h = document.documentElement.clientHeight-58;
  $scope.ScreenHeight = h+'px';
  var m = h-180;
  $scope.MapHeight = m+'px';


  // Getting the map selector in DOM
  var div = document.getElementById("map_canvas");

  // Invoking Map using Google Map SDK v2 by dubcanada
  var map = plugin.google.maps.Map.getMap(div,{
      'camera': {
          'latLng': setPosition(22.753285, 75.893696),
          'zoom': 10
      }
  });

  // Invoking Map using Google Map SDK v2 by dubcanada
  //var map = plugin.google.maps.Map.getMap(div);

  
  // Capturing event when Map load are ready.
  map.addEventListener(plugin.google.maps.event.MAP_READY, function(){

      
    var onSuccess = function(location) {
      var msg = ["Current your location:\n",
        "latitude:" + location.latLng.lat,
        "longitude:" + location.latLng.lng,
        "speed:" + location.speed,
        "time:" + location.time,
        "bearing:" + location.bearing].join("\n");

        var distance_km;
        var nearestLocatoin = [];
        for (i = 0; i < $scope.mapArray.length; i++) {
          if(distance_km==undefined || distance_km=='undefined' || distance_km=='' || distance_km==null){
              var distance_km = getDistanceFromLatLonInKm(location.latLng.lat,location.latLng.lng,Number($scope.mapArray[i].latitude),Number($scope.mapArray[i].longitude));
          }else{
            var tmp_dist = getDistanceFromLatLonInKm(location.latLng.lat,location.latLng.lng,Number($scope.mapArray[i].latitude),Number($scope.mapArray[i].longitude));
            if(tmp_dist < distance_km){
              var nearestLocatoin = [];
              distance_km = tmp_dist;
              nearestLocatoin.push({'min_dis':distance_km,'lt':$scope.mapArray[i].latitude,'lg':$scope.mapArray[i].longitude,'name':$scope.mapArray[i].name});
              
            }
          }
        }
        //alert(nearestLocatoin[0].lt+" "+nearestLocatoin[0].lg);
        // Defining markers for demo
        
        var DestinationlatLng = Number(nearestLocatoin[0].lt)+","+Number(nearestLocatoin[0].lg);
        var markers = [{
            position: setPosition(location.latLng.lat, location.latLng.lng),
            title: "Marker 1"
        }, {
            position: setPosition(Number(nearestLocatoin[0].lt), Number(nearestLocatoin[0].lg)),
            title: nearestLocatoin[0].name
        }];
        console.log(location.latLng);
        console.log(DestinationlatLng);

        // Bind markers
        for (var i = 0; i < markers.length; i++) {
            map.addMarker({
                'marker': markers[i],
                'position': markers[i].position,
                'title': markers[i].title
            }, function(marker) {

                // Defining event for each marker
                // marker.on("click", function() {
                //     alert(marker.get('marker').title);
                // });

                marker.showInfoWindow();
                

            });
        }
      // map.addMarker({
      //   'position': location.latLng,
      //   'title': msg
      // }, function(marker) {
      //   marker.showInfoWindow();
      // });
      map.on(plugin.google.maps.event.MAP_CLICK, function(latLng) {
        setTimeout(function() {

            if (confirm("Do you want to go?")) {
              plugin.google.maps.external.launchNavigation({
                "from": location.latLng,
                "to": DestinationlatLng
              });
            }
          }, 500);
      });
    };

    var onError = function(msg) {
      alert("error: " + msg);
    };
    map.getMyLocation(onSuccess, onError);
  });

  // Function that return a LatLng Object to Map
  function setPosition(lat, lng) {
      return new plugin.google.maps.LatLng(lat, lng);
  }
  });
})
;
