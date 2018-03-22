// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

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

  .controller("ListController", function($scope){
    $scope.rooms = [
      {id: 001, size: 1, type: "Small", price: 299},
      {id: 022, size: 1, type: "Small", price: 299},
      {id: 103, size: 1, type: "Big", price: 799},
      {id: 404, size: 2, type: "Small", price: 699},
      {id: 305, size: 2, type: "Big", price: 899},
      {id: 306, size: 4, type: "Big", price: 1199},
      {id: 207, size: 4, type: "Big", price: 1299},
      {id: 110, size: 8, type: "Big", price: 299},
    ];

    $scope.exchangeRate = [
      {eur: 9.2},
      {usd: 7.2},
    ]
  })
