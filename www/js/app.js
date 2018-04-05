// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state("root", {
        url: "/root",
        templateUrl: "/templates/root.html",
        abstract: true
      }) // root end

      // ROOMS // 
      .state("root.rooms", {
        url: "/rooms",
        views: {
          "rooms-view": {
            templateUrl: "/templates/rooms.html",
            controller: "ListController"
          }
        }
      })

      // ROOM //
      .state("root.room", {
        url: "/rooms/:ID",
        views: {
          "rooms-view": {
            templateUrl: "/templates/room.html",
            controller: "ListController"
          }
        }
      })

    $urlRouterProvider.otherwise("/root/rooms");

  })

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    })

    function ContentController($scope, $ionicSideMenuDelegate) {
      $scope.toggleRight = function () {
        $ionicSideMenuDelegate.toggleRight();
      };
    }

  })

  .controller("ListController", function ($scope, $http, $stateParams) {

    $http.get('http://localhost/crossplatform/get.php')
      .success(function (data) {
        $scope.rooms = data;
        console.log(data);
      })

    $scope.ID = $stateParams.ID;
    $scope.currency = "EUR";
    $scope.rate = 1;

    $http.get('http://data.fixer.io/api/latest?access_key=70465cfb10a0683063762ffcd4dcbb40')
      .success(function (data) {
        $scope.exchange = data;
        $scope.currencies = Object.keys($scope.exchange.rates);
        !$scope.rate ? $scope.rate = $scope.currencies.EUR : "";
      })
    
    $scope.configCurrency = function (myCurrency) {
      $scope.currency = myCurrency;
      $scope.rate = $scope.exchange.rates[myCurrency];
      console.log($scope.currency);
      console.log($scope.rate);
    }

  })

  .controller("FormController", function ($scope, $http, $filter) {

    $scope.data = {};

    $scope.today = $filter("date")(Date.now(),'yyyy-MM-dd');
    
    $scope.startdateFormat = function (startdate) {
      $scope.data.startdate = startdate.toLocaleDateString();
    }

    $scope.enddateFormat = function (enddate) {
      $scope.data.enddate = enddate.toLocaleDateString();
    }

    $scope.diffDate = function (data) {

      var checkin = new Date(data.startdate);
      var checkout = new Date(data.enddate);
      var timeDiff = Math.abs(checkout.getTime() - checkin.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      var diffD = parseInt(diffDays);
      if (!diffD || diffD == 0) { 
          diffD = 1;
        };
      $scope.diffD = diffD;
      return diffD;
    };

    $scope.submit = function (data) {

      console.log(data.enddate - data.startdate);
      console.log(data);
      data.id = $scope.ID;

      var url = "http://localhost/crossplatform/submit.php"
      $http.post(url, data)
        .then(function (response) {
          $scope.response = response;
          console.log($scope.response);
        })
    }
  })

  .controller('PopupCtrl', function($scope, $ionicPopup) {

    // When button is clicked, the popup will be shown...
    $scope.showConfirm = function() {
   
             // Custom popup
      var confirmPopup = $ionicPopup.show({
        template: '<list><p><b>Check in:</b> {{data.startdate}}</p><p><b>Check out:</b> {{data.enddate}}</p><p><b>Reservee:</b> {{data.firstname}} {{data.lastname}}</p><p><b>Email:</b> {{data.email}}</p><p><b>Phone:</b> {{data.phone}}</p><hr><p>Room no. {{ID}} ({{room.price}} SEK/night)</p><p>Total cost = <b>{{room.price * diffDate(data)}}:- ( € {{ ((room.price * diffDate(data))/exchange.rates.SEK).toFixed(2) }} )</b></p></list>',
        title: 'Reservation confirmed',
        scope: $scope,
     
        buttons: [ {
              text: '<b>Ok</b>',
              type: 'button-positive',
              onTap: function(e) {
           
        
              }
           }
        ]
     });

 
       confirmPopup.then(function(res) {
             console.log('Submitted');
       });
     
    };
 
 })