var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.controller('loginCtrl', ['$scope', 'AuthenticationService', function($scope, AuthenticationService){
    $scope.username = "";
    $scope.password = "";

    $scope.login = function(){
        AuthenticationService.login($scope.username, $scope.password)
        .then(function(data){
            console.log(data);
            alert('User' + data.name + 'Logged' + JSON.stringify(data));
        })
        .catch(function(err){
            alert("Username o password errati")

            //I reset inputs forms
            $scope.username = undefined;
            $scope.password = undefined;
        });
    }
}]);