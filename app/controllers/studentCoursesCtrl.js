var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.controller('studentCoursesCtrl', ['$scope','$location','$window','StudentService',function($scope, $location, $window, StudentService){
    //===================== SCOPE VARIABLES =====================//
    $scope.availableCourses = "";

    //===================== SCOPE FUNCTIONS =====================//

    /* Function: getAvailableCourses()
    |   Gets all available courses
    */
    $scope.getAvailableCourses = function(){
        StudentService.getAvailableCourses($window.localStorage.getItem("jwtToken"))
        .then(function(response){
            $scope.availableCourses = response.data;
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

    /* Function: subscribeCourse()
    |   Subscribes to the specified course (by id)
    */
    $scope.subscribeCourse = function(courseId){
        StudentService.subscribeCourse($window.localStorage.getItem("jwtToken"), courseId)
        .then(function(response){
            alert("Ti sei iscritto al corso!");
        })
        .catch(function(err){
            alert("Errore nella sottoscrizione del corso, probabilmente il tuo token è scaduto. Ri-esegui il login.");
            // Logout
            $window.localStorage.setItem("jwtToken", "");
            $window.localStorage.setItem("userRole", "");
            $window.localStorage.setItem("authenticated", "false");
            $location.path('/redirect');
        });
    };

    // Gets all the available courses at page load
    $scope.getAvailableCourses();
}]);