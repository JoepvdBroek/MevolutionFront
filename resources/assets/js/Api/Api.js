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

    api.factory('RefreshService', [ '$http', 'API', '$window', function($http, API, $window) {
        return {
            refreshTokenIfNeeded: function(){
                if($window.sessionStorage.last_activity)
                {
                    console.log('tijd in ms van laatste activiteit: '+ (new Date().getTime() - $window.sessionStorage.last_activity));
                    if((new Date().getTime() - $window.sessionStorage.last_activity) >= 3600000)
                    {
                        $http.post(API.url + '/oauth/token',
                        {
                            "refresh_token" : $window.sessionStorage.refresh_token,
                            "grant_type": "refresh_token",
                            "client_id": API.clientId,
                            "client_secret": API.clientSecret

                        }).success(function(data)
                        {
                            console.log(data);
                            $window.sessionStorage.access_token = data.access_token;
                            $window.sessionStorage.refresh_token = data.refresh_token;

                        }).error(function(status, data)
                        {
                            console.log(status);
                            console.log(data);
                        });
                    }
                }
            }
        }
    }]);

    api.factory('UserService', [ '$http', 'API', 'RefreshService', function($http, API, RefreshService)
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
                return $http.get(API.url + '/users/username/' + username);
            },

            getUserInfo: function ()
            {
                RefreshService.refreshTokenIfNeeded();
                return $http.get(API.url + '/users/@me');
            },

            getUser: function (user)
            {
                RefreshService.refreshTokenIfNeeded();
                return $http.get(API.url + '/users/' + user).then(function(data) {
                    return data.data;
                });
            },

            updateUser: function (user)
            {
                RefreshService.refreshTokenIfNeeded();
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

            changePassword: function (user)
            {
                RefreshService.refreshTokenIfNeeded();
                return $http.put(API.url + '/users/' + user._id,
                {
                    'password' : user.password
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
            getOrganisation: function (orgId)
            {
                return $http.get(API.url + '/organization/' + orgId,
                {
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
            postNewOrganisationName: function(newName, newColor, organisationId){
                return $http.put(API.url + '/organization/' + organisationId, {name:newName, color:newColor},
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
            putUserToOrganisation: function(userId, organisationId){
                return $http.put(API.url + '/users/' + userId, {organization:organisationId}, 
                {
                    "grant_type": "password",
                    "client_id": API.clientId,
                    "client_secret": API.clientSecret,
                    headers: {'Authorization': 'Bearer ' + sessionStorage.access_token}
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

    api.factory('LearningFactory', [ '$http', 'API', function($http, API)
        {
        return {
            getLearningsOfOrganisation: function(orgId){
                return $http.get(API.url + '/organization/' + orgId + '/leerlijn',
                {
                    "grant_type": "password",
                    "client_id": API.clientId,
                    "client_secret": API.clientSecret,
                    headers: {'Authorization': 'Bearer ' + sessionStorage.access_token}
                }).then(function(data){
                    return data.data;
                });
            },
            getLearning: function(orgId, learningId){
                return $http.get(API.url + '/organization/' + orgId + '/leerlijn/' + learningId,
                {
                    "grant_type": "password",
                    "client_id": API.clientId,
                    "client_secret": API.clientSecret,
                    headers: {'Authorization': 'Bearer ' + sessionStorage.access_token}
                }).then(function(data){
                    return data.data;
                });
            },
            postLearning: function(orgId, newTitle, newColor){
                return $http.post(API.url + '/organization/' + orgId + '/leerlijn', {title:newTitle, color:newColor},
                {
                    "grant_type": "password",
                    "client_id": API.clientId,
                    "client_secret": API.clientSecret,
                    headers: {'Authorization': 'Bearer ' + sessionStorage.access_token}
                });
            },
            editLearning: function(orgId, learningId, newTitle, newColor){
                return $http.put(API.url + '/organization/' + orgId + '/leerlijn/' + learningId, {title:newTitle, color: newColor},
                {
                    "grant_type": "password",
                    "client_id": API.clientId,
                    "client_secret": API.clientSecret,
                    headers: {'Authorization': 'Bearer ' + sessionStorage.access_token}
                });
            },
            deleteLearning: function(organisationId, learningId){
                return $http.delete(API.url + '/organization/' + organisationId + '/leerlijn/' + learningId, {},
                {
                    "grant_type": "password",
                    "client_id": API.clientId,
                    "client_secret": API.clientSecret,
                    headers: {'Authorization': 'Bearer ' + sessionStorage.access_token}
                });
            }
        };
    }]);

    api.factory('NiveauFactory', [ '$http', 'API', function($http, API)
        {
        return {
            getNiveausOfLearning: function(orgId, learningId){
                return $http.get(API.url + '/organization/' + orgId + '/leerlijn/' + learningId + '/niveau',
                {
                    "grant_type": "password",
                    "client_id": API.clientId,
                    "client_secret": API.clientSecret,
                    headers: {'Authorization': 'Bearer ' + sessionStorage.access_token}
                }).then(function(data){
                    return data.data;
                });
            },
            postNiveau: function(orgId, learningId, newTitle, newDescription, newSection){
                return $http.post(API.url + '/organization/' + orgId + '/leerlijn/' + learningId + '/niveau', 
                    {
                        title: newTitle, 
                        description: newDescription,
                        section: newSection
                    },
                {
                    "grant_type": "password",
                    "client_id": API.clientId,
                    "client_secret": API.clientSecret,
                    headers: {'Authorization': 'Bearer ' + sessionStorage.access_token}
                });
            },
            editNiveau: function(orgId, learningId, niveauId, newTitle, newDescription, newSection){
                return $http.put(API.url + '/organization/' + orgId + '/leerlijn/' + learningId + '/niveau/' + niveauId, 
                    {
                        title: newTitle, 
                        description: newDescription,
                        section: newSection
                    },
                {
                    "grant_type": "password",
                    "client_id": API.clientId,
                    "client_secret": API.clientSecret,
                    headers: {'Authorization': 'Bearer ' + sessionStorage.access_token}
                });
            },
            deleteNiveau: function(organisationId, learningId, niveauId){
                return $http.delete(API.url + '/organization/' + organisationId + '/leerlijn/' + learningId + '/niveau/' + niveauId, {},
                {
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
            },

            updateCanvasObjectPosition: function(canvasId, objectId, fase, x, y)
            {
                return $http.put(API.url + '/canvas/' + canvasId + '/objects/' + objectId,
                {
                    fase: fase,
                    xPosition: x,
                    yPosition: y
                });
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
            }/*,

            deleteItem: function(id)
            {
                return $http.delete(API.url + '/objects/' + id , {}).then(function(data) {
                    return data.data;
                });
            }*/
        };

    }]);
};