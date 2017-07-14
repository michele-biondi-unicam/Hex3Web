var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.service('AuthenticationService', ['$q','$http', function($q, $http){
        console.log("Hello i'm the AuthenticationService");
        var self = this;
        this.loggedUser; // Contains the logged user



        //============ FUNCTIONS ==============//
        this.login = function(name, psw){
            var deferred = $q.defer();

            $http.post('http://localhost:8080/api/authenticate',{'name':name, 'password':password})
            .success(function(data){
                self.loggedUser = data;
                deferred.resolve(data);
            })
            .error(function(err, code){
                self.loggedUser = undefined; // user reset
                deferred.reject(err);
            });

            return deferred.promise;
        }
}]).run(function(AuthenticationService){});
