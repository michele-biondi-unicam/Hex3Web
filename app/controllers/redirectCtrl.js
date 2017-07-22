var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.controller('redirectCtrl', ['$scope','$location',function($scope, $location){
    // Little hack to reload the homepage
    $location.path("/");
}]);