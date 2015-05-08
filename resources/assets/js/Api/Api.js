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

            },

            register: function (username, password, email, firstname, middlename, surname)
            {
                return $http.post(API.url + '/users',
                {
                    username: username,
                    password: password,
                    email: email,
                    firstName: firstname,
                    middleName: middlename,
                    surName: surname
                });
            },

            checkUsername: function (username)
            {
                return $http.get(API.url + '/users/username/' + username,
                {
                    headers: 
                    {
                        'x-key': API.key,
                        'Authorization': 'Bearer ' + sessionStorage.access_token
                    }
                });
            },

            getUserInfo: function ()
            {
                return $http.get(API.url + '/users/@me');
            },

            updateUser: function (user)
            {
                return $http.put(API.url + '/users/' + user._id,
                {
                    //"password" : user.password,
                    "email" : user.emai,
                    "firstName" : user.firstName,
                    "middleName" : user.middleName,
                    "surName" : user.surName,
                    "street" : user.street,
                    "houseNumber" : user.houseNumber,
                    "city" : user.city,
                    "zipCode" : user.zipCode,
                    "phone1" : user.phone1,
                    "phone2" : user.phone2,
                    // "organization" : user.organization,
                    // "roles" : user.roles
                });
            },

            sentPasswordReset: function (user)
            {
                return $http.post(API.url + 'users/forgot',
                {
                    'email' : user.email
                });
            },

            changePassword: function (password)
            {
                return $http.post(API.url + 'users/' + user._id,
                {
                    'password' : password
                });
            },

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
};