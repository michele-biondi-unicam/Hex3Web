var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.controller('studentCareerCtrl', ['$scope','$location','$window','StudentService',function($scope, $location, $window, StudentService){
    //===================== SCOPE VARIABLES =====================//
    $scope.subscribedCourses = "";

    //===================== SCOPE FUNCTIONS =====================//
    /* Function: getStudentCourses()
    |   Gets all subscribed courses
    */
    $scope.getStudentCourses = function(){
        StudentService.getStudentCourses($window.localStorage.getItem("jwtToken"))
        .then(function(response){
            $scope.subscribedCourses = response.data;
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

    // At page load gets all the student subscribed courses
    $scope.getStudentCourses();
    
}]);