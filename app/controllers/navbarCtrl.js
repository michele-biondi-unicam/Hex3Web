var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.controller('navbarCtrl', ['$scope',function($scope){
    $scope.sidebarToggle = function(){
        var mySidebar = document.getElementById("sidebar");

        if (mySidebar.style.display === 'block') {
        mySidebar.style.display = 'none';
        } else {
        mySidebar.style.display = 'block';
    }
    }
}]);