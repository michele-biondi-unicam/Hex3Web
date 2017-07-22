var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.controller('loginCtrl', ['$scope','$rootScope','$location', 'AuthenticationService', function($scope, $rootScope, $location, AuthenticationService){
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
            $rootScope.jwtToken = response.data.token;
            $rootScope.userRole = response.data.role;
            $rootScope.authenticated = true;
            $location.path('/');
        })
        .catch(function(err){
            alert("Username o password errati");

            //I reset password input form
            $scope.password = undefined;
        });
    }
}]);