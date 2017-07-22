var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.controller('sidebarCtrl', ['$scope','$location','$rootScope',function($scope, $location, $rootScope){
    
    
    $scope.$on('$locationChangeSuccess', function() {
        if($rootScope.authenticated){
            $scope.sidebarTemplate = '/templates/sidebar/sidebarSignedIn.html';
        } else {
            $scope.sidebarTemplate = '/templates/sidebar/sidebarNotSignedIn.html';
    }
    });

}]);