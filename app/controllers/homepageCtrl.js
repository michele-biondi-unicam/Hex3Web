var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.controller('homepageCtrl', ['$scope','$window',function($scope, $window){
    if($window.localStorage.getItem("authenticated") == "true"){
        if($window.localStorage.getItem("userRole") == "student"){ // Studente
            $scope.homePageTemplate = '/templates/homepage/homepageStudent.html';
        } else if ($window.localStorage.getItem("userRole") == "professor"){ // Professore
            $scope.homePageTemplate = '/templates/homepage/homepageProfessor.html';
        } else if ($window.localStorage.getItem("userRole") == "admin"){ // Admin
            $scope.homePageTemplate = '/templates/homepage/homepageAdmin.html';
        } else { // Altro
            $scope.homePageTemplate = '/templates/homepage/homepageNotSignedIn.html';
        }
    } else { // Non autenticato
        $scope.homePageTemplate = '/templates/homepage/homepageNotSignedIn.html';
    }

    $scope.token = $window.localStorage.getItem("jwtToken");
}]);