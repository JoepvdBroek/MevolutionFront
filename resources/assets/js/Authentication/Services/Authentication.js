module.exports = function(authentication)
{
    authentication.factory('AuthenticationService', function()
    {
        var auth =
        {
            isAuthenticated: false,
            isAdmin: false
        };

        return auth;
    });

    authentication.factory('TokenInterceptor', [ '$q', '$window', '$location', 'API', 'AuthenticationService', function($q, $window, $location, API, AuthenticationService)
    {
        return {
            request: function(config)
            {
                config.headers = config.headers || {};

                if ($window.sessionStorage.access_token)
                {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.access_token;
                }

                config.headers["x-key"] = API.key;

                return config;
            },

            requestError: function(rejection)
            {
                return $q.reject(rejection);
            },

            response: function (response)
            {
                if (response != null && response.status == 200 && $window.sessionStorage.access_token/* && !AuthenticationService.isAuthenticated*/)
                {
                    AuthenticationService.isAuthenticated = true;
                    $window.sessionStorage.last_activity = new Date().getTime();//reset last_activity
                    console.log('reset last_activity');
                }

                return response || $q.when(response);
            },

            responseError: function(rejection)
            {
                //ALs je wel ingelogd bent maar waarschijnlijk de api tijd is verlopen
                if(rejection != null && rejection.status === 401 && ($window.sessionStorage.access_token || AuthenticationService.isAuthenticated))
                {
                    //TODO: acces_denied pagina aanmaken en naar verwijzen.

                    delete $window.sessionStorage.access_token;
                    delete $window.sessionStorage.refresh_token;
                    delete $window.sessionStorage.last_activity;

                    AuthenticationService.isAuthenticated = false;
                    
                    $location.path("/forbidden");
                }

                //Als je nog niet ingelogd bent 
                else if (rejection != null && rejection.status === 401)
                {
                    delete $window.sessionStorage.access_token;
                    delete $window.sessionStorage.refresh_token;
                    delete $window.sessionStorage.last_activity;

                    AuthenticationService.isAuthenticated = false;

                    $location.path("/unauthorized");
                }

                return $q.reject(rejection);
            }
        };
    }]);
};
