var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.controller('professorExamsCtrl', ['$scope','$window','$location','ProfessorService',function($scope, $window, $location, ProfessorService){
    //================= SCOPE VARIABLES ====================//

        // variables to create the exam
    $scope.day = "";
    $scope.month = "";
    $scope.year ="";

    $scope.examDate = "";
    $scope.courseChoice = "";
    $scope.notes = "";

       // Arrays of objects needed for visualization
    $scope.exams = "";
    $scope.courses = "";
    
    //================= SCOPE FUNCTIONS ====================//

    /* Function: createExam()
        creates an exam
    */
    $scope.createExam = function(){
        if($scope.courseChoice == "" || $scope.courseChoice == undefined || $scope.day == "" || $scope.day == undefined || 
            $scope.month == "" || $scope.month == undefined ||
            $scope.year == "" || $scope.year == undefined )
           {
                alert("Compila almeno i campi della data e del corso per creare un esame");
                return;
           }
           // Set up date in Date Javascript format
           $scope.examDate = new Date($scope.year, $scope.month - 1, $scope.day);

           // Checks for undefined notes as they are not permitted because of the Schema
           if($scope.notes == undefined || $scope.notes == ""){
               $scope.notes = " ";
           }

           ProfessorService.createExam($window.localStorage.getItem("jwtToken"), $scope.examDate, $scope.courseChoice._id, $scope.notes)
           .then(function(response){
                alert("Esame creato!");
           })
           .catch(function(err){
            alert("Errore nella creazione dell'esame, probabilmente il tuo token è scaduto. Ri-esegui il login.");
            // Logout
            
           });


         
        };

    // !!! THIS IS THE SAME AS THE FUNCTION IN THE COURSES CONTROLLERS !!!
    /* Function: getCourses()
    |   Gets all the courses of the professor from the database
    */
    $scope.getCourses = function(){
        ProfessorService.getCourses($window.localStorage.getItem("jwtToken"))
        .then(function(response){
            $scope.courses = response.data.reverse(); // Ordered by most recent
        })
        .catch(function(err){
            alert("Errore nella ricezione dei corsi, probabilmente il tuo token è scaduto. Ri-esegui il login.");
            // Logout
            $window.localStorage.setItem("jwtToken", "");
            $window.localStorage.setItem("userRole", "");
            $window.localStorage.setItem("authenticated", "false");
            $location.path('/redirect');

        });
    };




    // ======================= PAGE STARTUP ========================//

    // Gets the courses for the form at page load
    $scope.getCourses();
    
}]);