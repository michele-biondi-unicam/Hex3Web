var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.controller('professorStagesCtrl', ['$scope','$rootScope','ProfessorService',function($scope, $rootScope, ProfessorService){
    $scope.company = "";
    $scope.description = "";

    $scope.createStage = function(){
        if($scope.company == "" || $scope.company == undefined ||
           $scope.description == "" || $scope.description == undefined)
        {
            alert("Compila il form per creare uno stage");
            return;
        }

        ProfessorService.createStage($rootScope.jwtToken, $scope.company, $scope.description)
        .then(function(response){
            alert("Stage creato");
        })
        .catch(function(err){
            alert("Error nella creazione dello stage");
        });
    };
}]);