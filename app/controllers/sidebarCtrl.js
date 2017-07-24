var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.controller('sidebarCtrl', ['$scope','$location','$rootScope',function($scope, $location, $rootScope){
    $scope.$on('$locationChangeSuccess', function() {
        if($rootScope.userRole == "student"){
            $scope.sidebarTemplate = '/templates/sidebar/sidebarStudent.html';
        } else if($rootScope.authenticated){
            $scope.sidebarTemplate = '/templates/sidebar/sidebarSignedIn.html';
        } else {
            $scope.sidebarTemplate = '/templates/sidebar/sidebarNotSignedIn.html';
        }
    });

    //Logout function
    $scope.logout = function(){
        $rootScope.jwtToken = "";
        $rootScope.userRole = "";
        $rootScope.authenticated = false;
        $location.path("/redirect");
    }

    $scope.sidebarClose = function(){
        var mySidebar = document.getElementById("sidebar");
        mySidebar.style.display = "none";
    }

}]);