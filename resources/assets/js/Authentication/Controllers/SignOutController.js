module.exports = function(authentication)
{
    authentication.controller('SignOutController', [ '$scope', '$location', '$window', 'AuthenticationService', function($scope, $location, $window, AuthenticationService)
    {
    	delete $window.sessionStorage.access_token;
    	delete $window.sessionStorage.refresh_token;
        delete $window.sessionStorage.last_activity;

        AuthenticationService.isAuthenticated = false;

        $location.path("/");

    }]);
};