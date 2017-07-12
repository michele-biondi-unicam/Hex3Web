hexTreWebApp.config(function($locationProvider, $routeProvider) {

    $locationProvider.hashPrefix('!');

    // ======= AngularJS Routes ========//
    $routeProvider
    .when("/", {
        templateUrl : "/components/homepage/homepage.html"
    })
    .when("/login", {
        templateUrl : "/components/login/login.html"
    })
    .when("/faq", {
        templateUrl : "/components/faq/faq.html"
    })
    .when("/contacts", {
        templateUrl : "/components/contacts/contacts.html"
    })
    .when("/registerstudent", {
        templateUrl : "/components/register/registerStudent.html",
        controller : "registerCtrl"
    })
    .when("/registerprofessor", {
        templateUrl : "/components/register/registerProfessor.html",
        controller : "registerCtrl"
    });
});