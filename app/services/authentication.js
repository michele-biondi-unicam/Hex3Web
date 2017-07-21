var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.service('AuthenticationService', ['$q','$http', function($q, $http){
        
        //============ FUNCTIONS ==============//
        this.login = function(username, password){
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: 'http://localhost:8080/api/authenticate',
                data: {'username':username, 'password':password}
            })
            .then(function(response){
                deferred.resolve(response.data);
            })
            .catch(function(err, code){
                deferred.reject(err);
            });
            
            return deferred.promise;
        }
}]).run(function(AuthenticationService){});
