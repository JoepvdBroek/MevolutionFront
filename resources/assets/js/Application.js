var modules =
[
    'ngRoute', 'door3.css',
    'app.api', 'app.authentication',
    'app.user',
    'app.colorpicker',
    'app.moderator', 'app.adminFunctions',
    'app.leerlingDash',

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

var colorpicker = require('./Colorpicker/_index')(app);

var user = require('./User/_index')(app);
var admin = require('./Admin/_index')(app);
var moderator = require('./Moderator/_index')(app);

var canvas = require('./Canvas/_index')(app);

var timeline = require('./Timeline/_index')(app);
var bucket = require('./Bucket/_index')(app);

var leerlingDash = require('./Leerling_dash/_index')(app);

// @todo Maybe create a general app file for this kind of stuff
app.config([ '$locationProvider', '$routeProvider', function($location, $routeProvider)
{
    $routeProvider.when('/auth/login',
    {
        templateUrl: 'partials/authentication/login.html',
        controller: 'AuthenticationController',
        css:
        [{
             href: debug == true ? 'dev/css/login.css' : 'assets/css/login.min.css',
             bustCache: true
        }]
    })
    .when('/auth/logout', 
    {
        template: ' ',
        controller: 'SignOutController'
    })
    .when('/auth/register',
    {
        templateUrl: 'partials/authentication/register.html',
        controller: 'AuthenticationController',
        css:
        [{
             href: debug == true ? 'dev/css/register.css' : 'assets/css/register.min.css',
             bustCache: true
        }]
    })
    .when('/profile',
    {
        templateUrl: 'partials/user/profile.html',
        controller: 'UserController',
        css:
        [{
             href: debug == true ? 'dev/css/edituser.css' : 'assets/css/edituser.min.css',
             bustCache: true
        }],
        access: {
            requiresLogin: true
        }
    })
    .when('/profile/password',
    {
        templateUrl: 'partials/user/password.html',
        controller: 'ChangePasswordController'
        ,
        css:
        [{
             href: debug == true ? 'dev/css/password.css' : 'assets/css/password.min.css',
             bustCache: true
        }],
        access: {
            requiresLogin: true
        }
    })
    .when('/profile/forgot', {
        templateUrl: 'partials/user/forgot.html',
        controller: 'ForgotPasswordController'
        ,
        css:
        [{
             href: debug == true ? 'dev/css/forgot.css' : 'assets/css/forgot.min.css',
             bustCache: true
        }]
    })
    .when('/moderator',
    {
        templateUrl: 'partials/moderator/moderator_dash.html',
        controller: 'ModeratorController',
        controllerAs: 'moderator',
        css:
        [{
             href: debug == true ? 'dev/css/moderator/moderator_dash.css' : 'assets/css/moderator/moderator_dash.min.css',
             bustCache: true
        }],
        access: {
            requiresLogin: true,
            requiredPermissions: ['admin', 'moderator']
        }
    })
    .when('/moderator/:orgid/:learningid',
    {
        templateUrl: 'partials/moderator/moderator_dash_niveau.html',
        controller: 'ModeratorController',
        controllerAs: 'moderator',
        css:
        [{
             href: debug == true ? 'dev/css/moderator/moderator_dash.css' : 'assets/css/moderator/moderator_dash.min.css',
             bustCache: true
        }],
        access: {
            requiresLogin: true,
            requiredPermissions: ['admin', 'moderator']
        }
    })
    .when('/groups',
    {
        template: 'Groups',
        controller: 'GroupsRedirectController',
        access: {
            requiresLogin: true,
            requiredPermissions: ['moderator']
        }
    })
    .when('/moderator/:organisation',
    {
        templateUrl: 'partials/moderator/moderator_dash_groups.html',
        controller: 'ModeratorController',
        controllerAs: 'moderator',
        css:
        [{
             href: debug == true ? 'dev/css/moderator/moderator_dash.css' : 'assets/css/moderator/moderator_dash.min.css',
             bustCache: true
        }]
    })
    .when('/moderator/:organisation/groups/:groupid',
    {
        templateUrl: 'partials/moderator/moderator_dash_users.html',
        controller: 'ModeratorController',
        controllerAs: 'moderator',
        css:
        [{
             href: debug == true ? 'dev/css/moderator/moderator_dash.css' : 'assets/css/moderator/moderator_dash.min.css',
             bustCache: true
        }]
    })
    .when('/admin',
    {
        templateUrl: 'partials/admin/admin_dash.html',
        controller: 'AdminController',
        controllerAs: 'admin',
        css:
        [{
             href: debug == true ? 'dev/css/admin/admin_dash.css' : 'assets/css/admin/admin_dash.min.css',
             bustCache: true
        }],
        access: {
            requiresLogin: true,
            requiredPermissions: ['admin']
        }
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
        templateUrl: 'partials/admin/admin_dash_groups.html',
        controller: 'AdminController',
        controllerAs: 'admin',
        css:
        [{
             href: debug == true ? 'dev/css/admin/admin_dash.css' : 'assets/css/admin/admin_dash.min.css',
             bustCache: true
        }],
        access: {
            requiresLogin: true,
            requiredPermissions: ['admin']
        }
    })
    .when('/admin/users/:groupid',
    {
        templateUrl: 'partials/admin/admin_dash_users.html',
        controller: 'AdminController',
        controllerAs: 'admin',
        css:
        [{
             href: debug == true ? 'dev/css/admin/admin_dash.css' : 'assets/css/admin/admin_dash.min.css',
             bustCache: true
        }],
        access: {
            requiresLogin: true,
            requiredPermissions: ['admin']
        }
    })
    .when('/leerlingdash',
    {
        templateUrl: 'partials/leerlingdash/leerlingdash.html',
        controller: 'LeerlingdashController',
        controllerAs: 'leerlingdash',
        css:
        [{
            href: debug == true ? 'dev/css/leerlijn-dash.css' : 'assets/css/leerlijn-dash.min.css',
            bustCache: true
        }]
    })
    .when('/leerlingdash/:orgid/:userid',
    {
        templateUrl: 'partials/leerlingdash/leerlingdash.html',
        controller: 'LeerlingdashController',
        controllerAs: 'leerlingdash',
        css:
        [{
            href: debug == true ? 'dev/css/leerlijn-dash.css' : 'assets/css/leerlijn-dash.min.css',
            bustCache: true
        }]
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
    .when('/unauthorized',
    {
        templateUrl: 'partials/authentication/unauthorized.html'
    })
    .when('/forbidden',
    {
        templateUrl: 'partials/authentication/forbidden.html'
    })
    .when('/inbox',
    {
        templateUrl: 'partials/inbox.html',
        controller: 'InboxController',
        css:
        [{
             href: debug == true ? 'dev/css/inbox.css' : 'assets/css/inbox.min.css',
             bustCache: true
        }],
        access: {
            requiresLogin: true,
            requiredPermissions: ['admin', 'moderator']
        }
    })
    .when('/', 
    {
        templateUrl: 'partials/index.html',
        css:
        [{
             href: debug == true ? 'dev/css/index.css' : 'assets/css/index.min.css',
             bustCache: true
        }]
    })
    .otherwise
    ({
        redirectTo: '/auth/login'
    });

}]);

app.run([ '$rootScope', '$location', '$window', 'RouteAccess', function($rootScope, $location, $window, RouteAccess)
{
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute)
    {
        /*if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication && !AuthenticationService.isAuthenticated && !$window.sessionStorage.token)
        {
            $location.path("/auth/login");
        }*/

        if(nextRoute !== null && nextRoute.access !== undefined)
        {
            var hasAccess = RouteAccess.checkAccess(nextRoute.access.requiresLogin, nextRoute.access.requiredPermissions);

            /*console.log(hasAccess);

            if( hasAccess == 'forbidden' )
            {
                $location.path("/forbidden");
            } 
            else if( hasAccess == 'unauthorized' )
            {
                location.path("/unauthorized");
            }*/
        }
    });
}]);
