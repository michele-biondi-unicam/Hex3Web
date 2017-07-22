var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.controller('homepageCtrl', ['$scope','$rootScope',function($scope, $rootScope){
    if($rootScope.authenticated){
        $scope.template = '/templates/homepage/homepageSignedIn.html';
    } else {
        $scope.template = '/templates/homepage/homepageNotSignedIn.html';
    }

    $scope.token = $rootScope.jwtToken;
}]);