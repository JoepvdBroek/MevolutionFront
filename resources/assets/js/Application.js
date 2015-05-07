var app = angular.module('app', [ 'ngRoute', 'app.api', 'app.authentication', 'app.moderator', 'app.adminFunctions', 'app.timeline' ]);

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

var admin = require('./Admin/_index')(app);
var moderator = require('./Moderator/_index')(app);
var timline = require('./Timeline/_index')(app);

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

app.config([ '$locationProvider', '$routeProvider', function($location, $routeProvider)
{
    $routeProvider.when('/auth/login',
    {
        templateUrl: 'partials/login.html',
        controller: 'AuthenticationController'
    })
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
    .when('/admin/groups/:organisationid',
    {
        templateUrl: 'partials/admin_dash_groups.html',
        controller: 'AdminController'
    })
    .when('/admin/users/:groupid',
    {
        templateUrl: 'partials/admin_dash_users.html',
        controller: 'AdminController'
    })
    .when('/timeline',
    {
        templateUrl: 'partials/timeline/timeline.html',
        controller: 'TimelineController'
    })
        /*when('/admin/login',
         {
         controller: 'AdminUserCtrl'
         }).*/
    .otherwise
    ({
        redirectTo: '/'
    });
}]);