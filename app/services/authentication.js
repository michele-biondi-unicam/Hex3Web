var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.service('AuthenticationService', ['$q','$http', function($q, $http){
        
        var self = this;
        this.loggedUser; // Contains the logged user



        //============ FUNCTIONS ==============//
        this.login = function(username, password){
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: 'http://localhost:8080/api/authenticate',
                data: {'username':username, 'password':password}
            })
            .then(function(data){
                self.loggedUser = data;
                deferred.resolve(data);
            })
            .catch(function(err, code){
                self.loggedUser = undefined; // user reset
                deferred.reject(err);
            });
            
            return deferred.promise;
        }
}]).run(function(AuthenticationService){});


/* To use the token in a request use self.loggedUser.token */