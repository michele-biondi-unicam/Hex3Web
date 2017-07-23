var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.controller('homepageCtrl', ['$scope','$rootScope',function($scope, $rootScope){
    if($rootScope.authenticated){
        $scope.homePageTemplate = '/templates/homepage/homepageSignedIn.html';
    } else {
        $scope.homePageTemplate = '/templates/homepage/homepageNotSignedIn.html';
    }

    $scope.token = $rootScope.jwtToken;
}]);