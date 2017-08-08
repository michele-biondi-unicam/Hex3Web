var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.controller('professorCoursesCtrl', ['$scope','$window','ProfessorService',function($scope, $window, ProfessorService){
    //================= SCOPE VARIABLES ====================//
    $scope.topic = "";
    $scope.CFU = 0;

    //================= SCOPE FUNCTIONS ====================//
    
    /* Function: createCourse()
    |   Creates the course
    */
    $scope.createCourse = function(){
        if($scope.topic == "" || $scope.topic == undefined ||
           $scope.CFU == 0 || $scope.CFU == undefined)
        {
            alert("Compila tutti i campi per creare un corso");
            return;
        }

        ProfessorService.createCourse($window.localStorage.getItem("jwtToken"), $scope.topic, $scope.CFU)
        .then(function(response){
            // I reset forms
            $scope.topic = "";
            $scope.CFU = 0;
        })
        .catch(function(err){
            alert("Errore nella creazione del corso");
        });
    };

    
}]);