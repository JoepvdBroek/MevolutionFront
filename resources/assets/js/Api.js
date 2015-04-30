options.api = {};

options.api.url             = "http://merijncelie.nl:3000/api";
options.api.key             = "EP3qxDM91vOA4FC3i0ERa7SE72le8L32";
options.api.clientId        = "WebV1";
options.api.clientSecret    = "Web123456";

Api.factory('UserService', function($http)
{
    return { // <-- Fuck javascript
        login: function(username, password)
        {
            return $http.post(options.api.url + '/oauth/token',
            {
                username: username,
                password: password,
                "grant_type": "password",
                "client_id": options.api.clientId,
                "client_secret": options.api.clientSecret
            });
        }
    };
});