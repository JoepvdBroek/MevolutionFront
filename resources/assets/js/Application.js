
var modules =
[
    'ngRoute', 'door3.css',
    'app.api', 'app.authentication',
    'app.user',
    'app.moderator', 'app.adminFunctions',

    'app.canvas'
];

var app = angular.module('app', modules);

app.config(function($httpProvider)
{
    $httpProvider.interceptors.push('TokenInterceptor');

}).config(function($interpolateProvider)
{
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

var authentication = require('./Authentication/_index')(app);

var api = require('./Api/_index')(app);

var user = require('./User/_index')(app);
var admin = require('./Admin/_index')(app);
var moderator = require('./Moderator/_index')(app);

var canvas = require('./Canvas/_index')(app);

// @todo Maybe create a general app file for this kind of stuff
app.config([ '$locationProvider', '$routeProvider', function($location, $routeProvider)
{
    $routeProvider.when('/auth/login',
    {
        templateUrl: 'partials/login.html',
        controller: 'AuthenticationController'
    })
    .when('/profile',
    {
        templateUrl: 'partials/user/profile.html',
        controller: 'UserController'
    })
        /*when('/admin/login',
         {
         controller: 'AdminUserCtrl'
         }).*/
    .when('/moderator',
    {
        templateUrl: 'partials/moderator_dash.html',
        controller: 'ModeratorController'
    })
    .when('/admin',
    {
        templateUrl: 'partials/admin_dash.html',
        controller: 'AdminController'
    })
    .when('/canvas',
    {
        templateUrl: '/partials/canvas/spiral.html',
        controller: 'CanvasController',
        css:
        [{
            href: debug == true ? '/dev/css/canvas.css' : '/assets/css/canvas.css'
        }]
    })

    .otherwise
    ({
        redirectTo: '/'
    });

}]);

app.run(function($rootScope, $location, $window, AuthenticationService)
{
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute)
    {
        if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication && !AuthenticationService.isAuthenticated && !$window.sessionStorage.token)
        {
            $location.path("/auth/login");
        }
    });
});
