var modules =
[
    'ngRoute', 'door3.css',
    'app.api', 'app.authentication',
    'app.user',
    'app.moderator', 'app.adminFunctions',

    'app.timeline',
    'app.bucket',

    'app.canvas'
];

var app = angular.module('app', modules);

app.config([ '$httpProvider', function($httpProvider)
{
    $httpProvider.interceptors.push('TokenInterceptor');
}]);

var authentication = require('./Authentication/_index')(app);

var api = require('./Api/_index')(app);

var user = require('./User/_index')(app);
var admin = require('./Admin/_index')(app);
var moderator = require('./Moderator/_index')(app);

var canvas = require('./Canvas/_index')(app);

var timeline = require('./Timeline/_index')(app);
var bucket = require('./Bucket/_index')(app);

// @todo Maybe create a general app file for this kind of stuff
app.config([ '$locationProvider', '$routeProvider', function($location, $routeProvider)
{
    $routeProvider.when('/auth/login',
    {
        templateUrl: 'partials/login.html',
        controller: 'AuthenticationController'
    })
    .when('/auth/register',
    {
        templateUrl: 'partials/register.html',
        controller: 'AuthenticationController'
    })
    .when('/profile',
    {
        templateUrl: 'partials/user/profile.html',
        controller: 'UserController',
        css:
        [{
             href: debug == true ? 'dev/css/edituser.css' : 'assets/css/edituser.min.css',
             bustCache: true
        }]
    })
    .when('/profile/password',
    {
        templateUrl: 'partials/user/password.html',
        controller: 'ChangePasswordController'
    })
    .when('/profile/forgot', {
        templateUrl: 'partials/user/forgot.html',
        controller: 'ForgotPasswordController'
    })
    .when('/moderator',
    {
        templateUrl: 'partials/moderator_dash.html',
        controller: 'ModeratorController'
    })
    .when('/admin',
    {
        templateUrl: 'partials/admin_dash.html',
        controller: 'AdminController',
        controllerAs: 'admin'
    })
    .when('/canvas/:canvasid',
    {
        templateUrl: 'partials/canvas/canvas.html',
        controller: 'CanvasController',
        css:
        [{
             href: debug == true ? 'dev/css/canvas.css' : 'assets/css/canvas.min.css',
             bustCache: true
        }]
    })
    .when('/admin/groups/:organisationid',
    {
        templateUrl: 'partials/admin_dash_groups.html',
        controller: 'AdminController',
        controllerAs: 'admin'
    })
    .when('/admin/users/:groupid',
    {
        templateUrl: 'partials/admin_dash_users.html',
        controller: 'AdminController',
        controllerAs: 'admin'
    })
    .when('/timeline',
    {
        templateUrl: 'partials/timeline/timeline.html',
        controller: 'TimelineController'
    })
    .when('/bucket',
    {
        templateUrl: 'partials/bucket.html',
        controller: 'BucketController'
    })
    .when('/', 
    {
        templateUrl: 'partials/index.html'
    })
    .otherwise
    ({
        redirectTo: '/auth/login'
    });

}]);

app.run([ '$rootScope', '$location', '$window', 'AuthenticationService', function($rootScope, $location, $window, AuthenticationService)
{
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute)
    {
        if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication && !AuthenticationService.isAuthenticated && !$window.sessionStorage.token)
        {
            $location.path("/auth/login");
        }
    });
}]);
