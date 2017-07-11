hexTreWebApp.controller('registerCtrl', ['$scope' ,function($scope){

    /*
        Function name: change_username()
        Changes the username according to name and surname.
        Expected result : name.surname
        N.B: if the name or surname is empty it should only display the other. 
    */
    $scope.change_username = function(){
        if($scope.name == null || $scope.name == "" && $scope.surname == null || $scope.surname == ""){
            $scope.username = "";
        }
        else if($scope.name == null || $scope.name == ""){
            $scope.username = $scope.surname.toLowerCase();
        }else if($scope.surname == null || $scope.surname == ""){
            $scope.username = $scope.name.toLowerCase(); }
        else {
            $scope.username = $scope.name.toLowerCase() + "." + $scope.surname.toLowerCase();
        } 
    }
}]);
