hexTreWebApp.config(function($locationProvider, $routeProvider) {

    $locationProvider.hashPrefix('!');

    // ======= AngularJS Routes ========//
    $routeProvider
    .when("/", {
        templateUrl : "app/components/homepage/homepage.html"
    })
    .when("/login", {
        templateUrl : "app/components/login/login.html"
    })
    .when("/faq", {
        templateUrl : "app/components/faq/faq.html"
    })
    .when("/contacts", {
        templateUrl : "app/components/contacts/contacts.html"
    })
    .when("/registerstudent", {
        templateUrl : "app/components/register/registerStudent.html",
        controller : "registerCtrl"
    })
    .when("/registerprofessor", {
        templateUrl : "app/components/register/registerProfessor.html",
        controller : "registerCtrl"
    });
});