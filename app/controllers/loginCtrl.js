var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.controller('loginCtrl', ['$scope','$location', 'AuthenticationService', function($scope, $location, AuthenticationService){
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
        .then(function(data){
            console.log(data);
            //alert('User' + data.name + 'Logged' + JSON.stringify(data));
            $location.path('/homepageuser');
        })
        .catch(function(err){
            alert("Username o password errati");

            //I reset inputs forms
            $scope.username = undefined;
            $scope.password = undefined;
        });
    }
}]);