var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.controller('sidebarCtrl', ['$scope','$location','$rootScope',function($scope, $location, $rootScope){
    $scope.$on('$locationChangeSuccess', function() {
        if($rootScope.userRole == "student"){
            $scope.sidebarTemplate = '/templates/sidebar/sidebarStudent.html';
        } else if($rootScope.userRole == "professor"){
            $scope.sidebarTemplate = '/templates/sidebar/sidebarProfessor.html';
        } else  if($rootScope.userRole == "admin"){
            $scope.sidebarTemplate = '/templates/sidebar/sidebarAdmin.html';
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