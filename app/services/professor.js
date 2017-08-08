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

        /* Function: createCourse(token, topic, CFU)
        |  Creates a course 
        */
        this.createCourse = function(token, topic, CFU){
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: 'http://localhost:8080/professor/addCourse',
                data: {'token':token, 'topic':topic, 'CFU':CFU}
            })
            .then(function(response){
                deferred.resolve(response);
            })
            .catch(function(err, code){
                deferred.reject(err);
            });
            
            return deferred.promise;
        };

        /* Function: getStages(token)
        |  returns the stages of the professor
        */
        this.getStages = function(token){
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: 'http://localhost:8080/professor/getStages',
                params: {token: token}
            })
            .then(function(response){
                deferred.resolve(response.data);
            })
            .catch(function(err, code){
                deferred.reject(err);
            });

            return deferred.promise;
        };

}]).run(function(ProfessorService){});
