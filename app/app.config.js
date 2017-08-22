hexTreWebApp.config(function($locationProvider, $routeProvider) {

    // Prefix used for Hashbang URLs (used in Hashbang mode or in legacy browsers in HTML5 mode)
    $locationProvider.hashPrefix('!');

    // ======= AngularJS Routes ========//
    $routeProvider
    .when("/", {
        templateUrl : "/views/homepage/homepage.html",
        controller : "homepageCtrl"
    })
    .when("/login", {
        templateUrl : "/views/login/login.html",
        controller : "loginCtrl"
    })
    .when("/faq", {
        templateUrl : "/views/faq/faq.html"
    })
    .when("/register", {
        templateUrl : "/views/register/register.html",
        controller : "registerCtrl"
    })
    .when("/registerprofessor", {
        templateUrl : "/views/register/registerProfessor.html",
        controller : "registerCtrl"
    })
    .when("/redirect", {
        templateUrl : "/views/redirect/redirect.html",
        controller : "redirectCtrl"
    })
    .when("/forbidden", {
        templateUrl : "/views/forbidden/forbidden.html"
    })
    .when("/studentcourses", {
        templateUrl : "/views/student/studentCourses.html",
        controller: "studentCoursesCtrl"
    })
    .when("/studentexams", {
        templateUrl : "/views/student/studentExams.html"
    })
    .when("/studentstages", {
        templateUrl : "/views/student/studentStages.html"
    })
    .when("/professorcourses", {
        templateUrl : "/views/professor/professorCourses.html",
        controller : "professorCoursesCtrl"
    })
    .when("/professorexams", {
        templateUrl : "/views/professor/professorExams.html",
        controller : "professorExamsCtrl"
    })
    .when("/professorstages", {
        templateUrl : "/views/professor/professorStages.html",
        controller : "professorStagesCtrl"
    })
    .when("/admincareerchange", {
        templateUrl : "/views/admin/adminCareerChange.html"
    })
    .when("/adminstagechange", {
        templateUrl : "/views/admin/adminStageChange.html"
    })
    .when("/adminuserchange", {
        templateUrl : "/views/admin/adminUserChange.html"
    });
});