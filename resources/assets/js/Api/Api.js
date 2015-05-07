'use strict';

module.exports = function(api)
{
    api.constant('API',
    {
        url: 'http://merijncelie.nl:3000/api',
        key: 'EP3qxDM91vOA4FC3i0ERa7SE72le8L32',
        clientId: 'WebV1',
        clientSecret: 'Web123456'
    });

    api.factory('TestService', function(){ return {}});

    api.factory('UserService', function($http, API)
    {
        return { // <-- Fuck javascript
            login: function (username, password)
            {
                return $http.post(API.url + '/oauth/token',
                {
                    username: username,
                    password: password,
                    "grant_type": "password",
                    "client_id": API.clientId,
                    "client_secret": API.clientSecret
                });
            }
        };
    });

    api.factory('OrganisationService', function($http, API)
    {
        return {
            getOrganisations: function ()
            {
                return $http.get(API.url + '/groups/' + sessionStorage.access_token,
                {
                    username: 'terry',
                    password: 'terry',
                    "grant_type": "password",
                    "client_id": API.clientId,
                    "client_secret": API.clientSecret,
                    headers: {'Authorization': 'Bearer' + sessionStorage.access_token}
                });
            }
        };
    });

    api.factory('TimelineService', function($http, API)
    {
        return {
            getCanvases: function ()
            {
                console.log("lol");
                return $http.get(API.url + '/canvas',
                {
                    username: 'terry',
                    password: 'terry',
                    "grant_type": "password",
                    "client_id": API.clientId,
                    "client_secret": API.clientSecret,
                    headers: {'Authorization': 'Bearer' + sessionStorage.access_token}
                }).then(function(data){
                    return data.data;
                });
            }
        };
    });
};