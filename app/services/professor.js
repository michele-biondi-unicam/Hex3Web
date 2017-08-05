var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.service('ProfessorService', ['$q','$http', function($q, $http){
        
        //============ FUNCTIONS ==============//
        /* Function: createStage(token, company, description)
        |  Creates a stage 
        */
        this.createStage = function(token, company, description){
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: 'http://localhost:8080/professor/addStage',
                data: {'token':token, 'company':company, 'description':description}
            })
            .then(function(response){
                deferred.resolve(response);
            })
            .catch(function(err, code){
                deferred.reject(err);
            });
            
            return deferred.promise;
        };
}]).run(function(ProfessorService){});
