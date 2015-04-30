app.config([ '$locationProvider', '$routeProvider', function($location, $routeProvider)
{
    $routeProvider.when('/auth/login',
    {
        templateUrl: '/partials/login.html',
        controller: 'AuthenticationController'
    }).
    /*when('/admin/login',
    {
        controller: 'AdminUserCtrl'
    }).*/
    otherwise
    ({
        redirectTo: '/'
    });
}]);