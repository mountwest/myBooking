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

    $http.get('http://data.fixer.io/api/latest?access_key=70465cfb10a0683063762ffcd4dcbb40')
      .success(function (data) {
        $scope.exchange = data;
        console.log(data);
      })

    $scope.symbols = [
      {eur: "€"},
      {usd: "$"},
    ]

    console.log($scope.symbols[0]);

    $scope.currencySelected = function (selected){
      $scope.currency = $scope.symbols[selected];
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