var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.controller('homepageCtrl', ['$scope','$rootScope',function($scope, $rootScope){
    if($rootScope.authenticated){
        $scope.template = '/views/homepage/homepageSignedIn.html';
    } else {
        $scope.template = '/views/homepage/homepageNotSignedIn.html';
    }

    $scope.token = $rootScope.jwtToken;
}]);