hexTreWebApp.controller('registerCtrl', ['$scope' ,function($scope){
    $scope.enabled = true;
    $scope.red = false;

    /*
        Function name: check_password_match()
        checks if the two passwords provided match 
    */
    $scope.check_password_match = function(){
        if($scope.password != $scope.passwordConfirm){
            $scope.enabled = false; // Disables the register button
            $scope.red = true; // Makes confirm password input bar red
        }
        else {
            $scope.enabled = true; // Re-activates the register button  
            $scope.red = false; // Restores the password bar to its default color
        }
    };


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
    };

    
}]);
