var app = angular.module("hex3web", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "components/homepage/homepage.html"
    })
    .when("/login", {
        templateUrl : "components/login/login.html"
    })
    .when("/faq", {
        templateUrl : "components/faq/faq.html"
    })
    .when("/contacts", {
        templateUrl : "components/contacts/contacts.html"
    });
});