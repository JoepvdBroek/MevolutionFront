var options = {};

var app = angular.module('Mevolution', [ 'ngRoute', 'Authentication', 'Api' ]);
var Authentication = angular.module('Authentication', []);
var Api = angular.module('Api', []);

app.config(function($httpProvider)
{
    $httpProvider.interceptors.push('TokenInterceptor');
});

app.run(function($rootScope, $location, $window, AuthenticationService)
{
    console.log(AuthenticationService.isAuthenticated);

    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute)
    {
        if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication && !AuthenticationService.isAuthenticated && !$window.sessionStorage.token)
        {
            $location.path("/auth/login");
        }
    });
});