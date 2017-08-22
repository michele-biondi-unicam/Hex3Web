var hexTreWebApp = angular.module("hexTreWeb");

hexTreWebApp.service('StudentService', ['$q','$http', function($q, $http){
    //============ FUNCTIONS ==============//

    /* Function getAvailableCourses(token)
        returns all available courses from the database
    */
    this.getAvailableCourses = function(token){
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: 'http://localhost:8080/student/getAvailableCourses',
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

    this.subscribeCourse = function(token, courseId){
        var deferred = $q.defer();

        $http({
            method: 'POST',
            url: 'http://localhost:8080/student/subscribeCourse',
            data: {
                    'token' : token,
                    'courseId' : courseId
            }
        })
        .then(function(response){
            deferred.resolve(response);
        })
        .catch(function(err,code){
            deferred.reject(err);
        });

        return deferred.promise;
    };


}]).run(function(StudentService){});