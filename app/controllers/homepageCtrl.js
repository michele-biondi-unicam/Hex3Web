var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.controller('homepageCtrl', ['$scope','$rootScope',function($scope, $rootScope){
    if($rootScope.authenticated){
        if($rootScope.userRole == "student"){ // Studente
            $scope.homePageTemplate = '/templates/homepage/homepageStudent.html';
        } else if ($rootScope.userRole == "professor"){ // Professore
            $scope.homePageTemplate = '/templates/homepage/homepageProfessor.html';
        } else if ($rootScope.userRole == "admin"){ // Admin
            $scope.homePageTemplate = '/templates/homepage/homepageAdmin.html';
        } else { // Altro
            $scope.homePageTemplate = '/templates/homepage/homepageNotSignedIn.html';
        }
    } else { // Non autenticato
        $scope.homePageTemplate = '/templates/homepage/homepageNotSignedIn.html';
    }

    $scope.token = $rootScope.jwtToken;
}]);