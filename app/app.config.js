hexTreWebApp.config(function($locationProvider, $routeProvider) {

    // Prefix used for Hashbang URLs (used in Hashbang mode or in legacy browsers in HTML5 mode)
    $locationProvider.hashPrefix('!');

    // ======= AngularJS Routes ========//
    $routeProvider
    .when("/", {
        templateUrl : "/views/homepage/homepage.html"
    })
    .when("/login", {
        templateUrl : "/views/login/login.html"
    })
    .when("/faq", {
        templateUrl : "/views/faq/faq.html"
    })
    .when("/contactus", {
        templateUrl : "/views/contactus/contactus.html"
    })
    .when("/registerstudent", {
        templateUrl : "/views/register/registerStudent.html",
        controller : "registerCtrl"
    })
    .when("/registerprofessor", {
        templateUrl : "/views/register/registerProfessor.html",
        controller : "registerCtrl"
    });
});