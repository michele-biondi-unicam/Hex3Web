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

        /* Function: createExam(token, examDate, course, notes)
        |  Creates an exam
        */
        this.createExam = function(token, examDate, course, notes){
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: 'http://localhost:8080/professor/addExam',
                data: {'token':token, 'examDate':examDate, 'course':course, 'notes':notes}
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

        /* Function: getCourses(token)
        |  returns the courses of the professor
        */
        this.getCourses = function(token){
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: 'http://localhost:8080/professor/getCourses',
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

        /* Function: getExams(token)
        |  returns the exams of the professor
        */
        this.getExams = function(token){
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: 'http://localhost:8080/professor/getExams',
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
