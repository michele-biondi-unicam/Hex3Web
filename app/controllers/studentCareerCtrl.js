var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.controller('studentCareerCtrl', ['$scope','$location','$window','StudentService',function($scope, $location, $window, StudentService){
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
            alert(JSON.stringify(response.data));
        }) 
        .catch(function(err){
            //SCADE IL TOKEN
            alert("Error");
        });
    };

    // Gets all the available courses at page load
    $scope.getAvailableCourses();
}]);