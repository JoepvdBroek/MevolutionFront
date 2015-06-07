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

    api.factory('UserService', [ '$http', 'API', function($http, API)
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

            getUser: function (user)
            {
                return $http.get(API.url + '/users/' + user).then(function(data) {
                    return data.data;
                });
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
                    "phone2" : user.phone2
                    // "organization" : user.organization,
                    // "roles" : user.roles
                });
            },

            sentPasswordReset: function (email)
            {
                return $http.post(API.url + '/users/forgot',
                {
                    'email' : email
                });
            },

            setNewPassword: function (token, password)
            {
                return $http.post(API.url + '/users/reset/' + token,
                {
                    'password' : password
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
    }]);

    api.factory('OrganisationService', [ '$http', 'API', function($http, API)
    {
        return {
            getOrganisations: function ()
            {
                return $http.get(API.url + '/organization',
                {
                    username: 'terry',
                    password: 'terry',
                    "grant_type": "password",
                    "client_id": API.clientId,
                    "client_secret": API.clientSecret,
                    headers: {'Authorization': 'Bearer ' + sessionStorage.access_token}
                }).then(function(data){
                    return data.data;
                });
            },
            postOrganisation: function(newName, newColor, newLogo){
                return $http.post(API.url + '/organization', {name:newName, color:newColor, logo:newLogo},
                {
                    username: 'terry',
                    password: 'terry',
                    "grant_type": "password",
                    "client_id": API.clientId,
                    "client_secret": API.clientSecret,
                    headers: {'Authorization': 'Bearer ' + sessionStorage.access_token}
                });
            },
            postNewOrganisationName: function(newName, organisationId){
                return $http.put(API.url + '/organization/' + organisationId, {name:newName},
                {
                    username: 'terry',
                    password: 'terry',
                    "grant_type": "password",
                    "client_id": API.clientId,
                    "client_secret": API.clientSecret,
                    headers: {'Authorization': 'Bearer ' + sessionStorage.access_token}
                });
            }
        };
    }]);
    
    api.factory('GroupService', [ '$http', 'API', function($http, API)
    {
        return {
            getGroups: function (organisationId)
            {
                return $http.get(API.url + '/groups?organization='+organisationId,
                {
                    username: 'terry',
                    password: 'terry',
                    "grant_type": "password",
                    "client_id": API.clientId,
                    "client_secret": API.clientSecret,
                    headers: {'Authorization': 'Bearer ' + sessionStorage.access_token}
                }).then(function(data){
                    return data.data;
                });
            },
            postGroup: function(newName, organisationId){
                return $http.post(API.url + '/groups', {title:newName, organization:organisationId},
                {
                    username: 'terry',
                    password: 'terry',
                    "grant_type": "password",
                    "client_id": API.clientId,
                    "client_secret": API.clientSecret,
                    headers: {'Authorization': 'Bearer ' + sessionStorage.access_token}
                });
            },
            getAllModeratorsOfOrganisation: function(organisationId){
                return $http.get(API.url + '/organization/moderators/' + organisationId,
                {
                    username: 'terry',
                    password: 'terry',
                    "grant_type": "password",
                    "client_id": API.clientId,
                    "client_secret": API.clientSecret,
                    headers: {'Authorization': 'Bearer ' + sessionStorage.access_token}
                }).then(function(data){
                    return data.data;
                });
            }
        };       
    }]);

    api.factory('UserGroupService', [ '$http', 'API', function($http, API)
        {
        return {
            getGroup: function (groupId)
            {
                return $http.get(API.url + '/groups/' + groupId,
                {
                    username: 'terry',
                    password: 'terry',
                    "grant_type": "password",
                    "client_id": API.clientId,
                    "client_secret": API.clientSecret,
                    headers: {'Authorization': 'Bearer ' + sessionStorage.access_token}
                }).then(function(data){
                    return data.data;
                });
             },
             getAllUsers: function(){
                return $http.get(API.url + '/users',
                {
                    username: 'terry',
                    password: 'terry',
                    "grant_type": "password",
                    "client_id": API.clientId,
                    "client_secret": API.clientSecret,
                    headers: {'Authorization': 'Bearer ' + sessionStorage.access_token}
                }).then(function(data){
                    return data.data;
                });
            },
            getAllUsersOfOrganisation: function(orgId){
                return $http.get(API.url + '/organization/users/' + orgId,
                {
                    username: 'terry',
                    password: 'terry',
                    "grant_type": "password",
                    "client_id": API.clientId,
                    "client_secret": API.clientSecret,
                    headers: {'Authorization': 'Bearer ' + sessionStorage.access_token}
                }).then(function(data){
                    return data.data;
                });
            },
            pushUsersToGroup: function(groupId, userArray){
                return $http.put(API.url + '/groups/' + groupId, {participants:userArray}, 
                {
                    username: 'terry',
                    password: 'terry',
                    "grant_type": "password",
                    "client_id": API.clientId,
                    "client_secret": API.clientSecret,
                    headers: {'Authorization': 'Bearer ' + sessionStorage.access_token}
                });
            },
            makeUserModerator: function(userId){
                return $http.put(API.url + '/users/role/' + userId, {roles:'moderator'}, 
                {
                    username: 'terry',
                    password: 'terry',
                    "grant_type": "password",
                    "client_id": API.clientId,
                    "client_secret": API.clientSecret,
                    headers: {'Authorization': 'Bearer ' + sessionStorage.access_token}
                });
            },
            pushNewGroupName: function(groupId, newName, moderatorArray){
                return $http.put(API.url + '/groups/' + groupId, {title:newName, moderators: moderatorArray},
                {
                    username: 'terry',
                    password: 'terry',
                    "grant_type": "password",
                    "client_id": API.clientId,
                    "client_secret": API.clientSecret,
                    headers: {'Authorization': 'Bearer ' + sessionStorage.access_token}
                });
            }
            
        };
    }]);

    api.factory('TimelineService', [ '$http', 'API', function($http, API)
        {
        return {
            getCanvases: function ()
            {
                return $http.get(API.url + '/canvas?orderBy=createdDate',
                {
                    username: 'terry',
                    password: 'terry',
                    "grant_type": "password",
                    "client_id": API.clientId,
                    "client_secret": API.clientSecret,
                    headers: {'Authorization': 'Bearer ' + sessionStorage.access_token}
                }).then(function(data){
                    return data.data;
                });
            },
            postCanvas: function(newName, type){
                return $http.post(API.url + '/canvas', {title:newName, type:type},
                {
                    username: 'terry',
                    password: 'terry',
                    "grant_type": "password",
                    "client_id": API.clientId,
                    "client_secret": API.clientSecret,
                    headers: {'Authorization': 'Bearer ' + sessionStorage.access_token}
                });
            }
        }
    }]);

    api.factory('CanvasService', [ '$http', 'API', function($http, API)
    {
        return {

            getCanvas: function(canvasId)
            {
                return $http.get(API.url + '/canvas/' + canvasId, {});
            }
        };

    }]);

    api.factory('BucketService', [ '$http', 'API', function($http, API)
    {
        return {

            getBucket: function()
            {
                return $http.get(API.url + '/objects/', {}).then(function(data) {
                    return data.data;
                });
            },

            deleteItem: function(id)
            {
                return $http.delete(API.url + '/objects/' + id , {}).then(function(data) {
                    return data.data;
                });
            },

            getInbox: function(id){
                return $http.get(API.url + '/objects/inbox/' + id, {}).then(function(data) {
                    return data.data;
                });
            },

            getLeerlijnen: function(id){
                return $http.get(API.url + '/organization/' + id + '/leerlijn', {}).then(function(data) {
                    return data.data;
                });
            },

            addObject: function(organizationId, leerlijnId, niveauId, participantId, objectId){
                return $http.post(API.url + '/organization/'+ organizationId +'/leerlijn/'+ leerlijnId +'/niveau/'+ niveauId +'/participant/'+ participantId +'/object',
                    {
                        objectId: objectId
                    }).then(function(data){
                    return data.data;
                });
            },
            makeParticipant: function(organizationId, leerlijnId, niveauId, studentId){
                return $http.post(API.url + '/organization/'+ organizationId +'/leerlijn/'+ leerlijnId +'/niveau/'+ niveauId +'/participant', 
                    {
                        participant: studentId
                    }).then(function(data){
                    return data.data;
                });
            }
        };

    }]);
};