var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.controller('sidebarCtrl', ['$scope','$location','$window',function($scope, $location, $window){
    $scope.$on('$locationChangeSuccess', function() {
        if($window.localStorage.getItem("userRole") == "student"){
            $scope.sidebarTemplate = '/templates/sidebar/sidebarStudent.html';
        } else if($window.localStorage.getItem("userRole") == "professor"){
            $scope.sidebarTemplate = '/templates/sidebar/sidebarProfessor.html';
        } else  if($window.localStorage.getItem("userRole") == "admin"){
            $scope.sidebarTemplate = '/templates/sidebar/sidebarAdmin.html';
        } else {
             $scope.sidebarTemplate = '/templates/sidebar/sidebarNotSignedIn.html';
        }
    });

    //Logout function
    $scope.logout = function(){
        $window.localStorage.setItem("jwtToken", "");
        $window.localStorage.setItem("userRole", "");
        $window.localStorage.setItem("authenticated", "false");
        $location.path("/redirect");
    };

    $scope.sidebarClose = function(){
        var mySidebar = document.getElementById("sidebar");
        mySidebar.style.display = "none";
    };

}]);