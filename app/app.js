var app = angular.module("hex3web", ["ngRoute"]);

app.config(function($locationProvider, $routeProvider) {

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
    });
});