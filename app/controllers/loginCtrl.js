var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.controller('loginCtrl', ['$scope','$window','$location', 'AuthenticationService', function($scope, $window, $location, AuthenticationService){
    $scope.username = "";
    $scope.password = "";

    $scope.login = function(){
        
        if($scope.username == undefined || $scope.password == undefined 
            ||
           $scope.username == "" || $scope.password == "" 
        ){
            return; //Doesn't display errors if username and/or password are empty (web page already pops a tooltip)
        }

        AuthenticationService.login($scope.username, $scope.password)
        .then(function(response){
            // Save token for successive requests and role to change view.
            $window.localStorage.setItem("jwtToken", response.data.token);
            $window.localStorage.setItem("userRole", response.data.role);
            $window.localStorage.setItem("authenticated", "true");
            $location.path('/redirect');
        })
        .catch(function(err){
            alert("Username o password errati");

            //I reset password input form
            $scope.password = undefined;
        });
    };
}]);