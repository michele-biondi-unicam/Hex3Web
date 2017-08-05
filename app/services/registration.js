var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.service('RegistrationService', ['$q','$http', function($q, $http){
        //============ FUNCTIONS ==============//
        /* Function: register(name,surname,username,password,role)
        */
        this.register = function(name, surname, username, password, role){
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: 'http://localhost:8080/api/signup',
                data: {
                        'username':username,
                        'name': name,
                        'surname': surname,
                        'password': password,
                        'role': role
                }
            })
            .then(function(response){
                deferred.resolve(response);    
            })
            .catch(function(err, code){
                deferred.reject(err);
            });

            return deferred.promise;
        };
}]).run(function(RegistrationService){});
