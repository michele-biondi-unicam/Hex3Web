var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.controller('professorCoursesCtrl', ['$scope','$window','ProfessorService',function($scope, $window, ProfessorService){
    //================= SCOPE VARIABLES ====================//
    $scope.topic = "";
    $scope.CFU = 0;
    $scope.courses = "";

    //================= SCOPE FUNCTIONS ====================//
    
    /* Function: getCourses()
    |   Gets all the courses of the professor from the database
    */
    $scope.getCourses = function(){
        ProfessorService.getCourses($window.localStorage.getItem("jwtToken"))
        .then(function(response){
            $scope.courses = response.data.reverse(); // Ordered by most recent
        })
        .catch(function(err){
            alert("Errore nella ricezione dei corsi");
        });
    };



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
            // I Update the courses
            $scope.getCourses();
        })
        .catch(function(err){
            alert("Errore nella creazione del corso");
        });
    };

    $scope.getCourses();
}]);