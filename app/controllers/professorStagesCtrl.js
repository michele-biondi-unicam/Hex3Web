var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.controller('professorStagesCtrl', ['$scope','$window','ProfessorService',function($scope, $window, ProfessorService){
    //================= SCOPE VARIABLES ====================//
    $scope.company = "";
    $scope.description = "";
    $scope.stages = "";

    //================= SCOPE FUNCTIONS ====================//
    
    /* Function: getStages()
    |   Gets all the stages of the professor from the database
    */
    $scope.getStages = function(){
        ProfessorService.getStages($window.localStorage.getItem("jwtToken"))
        .then(function(response){
            $scope.stages = response.data.reverse(); // Ordered by most recent
        })
        .catch(function(err){
            alert("Errore nella ricezione degli stages");
        });
    };

    /* Function: createStage()
    |   Creates the stage
    */
    $scope.createStage = function(){
        if($scope.company == "" || $scope.company == undefined ||
           $scope.description == "" || $scope.description == undefined)
        {
            alert("Compila tutti i campi per creare uno stage");
            return;
        }

        ProfessorService.createStage($window.localStorage.getItem("jwtToken"), $scope.company, $scope.description)
        .then(function(response){
            // I blank out forms
            $scope.company = "";
            $scope.description = "";

            // Refreshes the professor stages
            $scope.getStages();
        })
        .catch(function(err){
            alert("Errore nella creazione dello stage");
        });
    };

    //================= STARTUP ====================//

    // Lists all the stages of the professor at page load
    $scope.getStages();
}]);