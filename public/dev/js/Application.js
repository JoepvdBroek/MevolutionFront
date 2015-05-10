(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(admin)
{
    admin.controller('AdminController', [ '$scope', '$location', '$window', '$routeParams', 'OrganisationService', 'GroupService', 'UserGroupService', 'AdminFactory', function($scope, $location, $window, $routeParams, OrganisationService, GroupService, UserGroupService, AdminFactory)
    {

        /* *  ADMIN DASH ORGANISATIONS  **/
        var organisations = [];

        OrganisationService.getOrganisations().then(function(data, status, headers, config)
                {
                    for(i=0;i<data.length;i++){
                        organisations.push(data[i]);
                    }
                	// groups = data;
                    //console.log(groups);

                });

        $scope.allOrganisations = organisations;

        $scope.addOrganisation = function(newName, newColor, newLogo){
            OrganisationService.postOrganisation(newName, newColor, newLogo).success(function(data, status, headers, config)
                {
                    $scope.allOrganisations = [];
                    OrganisationService.getOrganisations().then(function(data, status, headers, config)
                    {
                        for(i=0;i<data.length;i++){
                            $scope.allOrganisations.push(data[i]);
                        }
                    });
                    $scope.newGroupName = "";
                    $scope.newGroupColor = "";
                    $scope.newGroupLogo = "";

                }).error(function(data, status, headers, config)
                {
                    // console.log(status);
                    // console.log(data);
                    // console.log(headers);
                    // console.log(config);
                });
        };

        // submits new groupName
        $scope.submitNewOrganisationName = function submitNewOrganisationName(newName, organisation){
            OrganisationService.postNewOrganisationName(newName, organisation._id).then(function(data, status, headers, config)
                { 

                });
        };

        /* *  ADMIN DASH GROUPS  **/

        var groups = [];
        var moderatorsOfOrganisation = [];
        $scope.allModerators = [];


        GroupService.getGroups($routeParams.organisationid).then(function(data, status, headers, config)
                {
                    for(i=0;i<data.length;i++){
                        groups.push(data[i]);
                    }

                });

        $scope.allGroups = groups;

        $scope.addGroup = function(newName){
            GroupService.postGroup(newName, $routeParams.organisationid).success(function(data, status, headers, config)
                {
                    $scope.allGroups = [];
                    GroupService.getGroups($routeParams.organisationid).then(function(data, status, headers, config)
                    {
                        for(i=0;i<data.length;i++){
                        $scope.allGroups.push(data[i]);
                    }
                    });
                    $scope.newGroupName = "";

                }).error(function(data, status, headers, config)
                {
                    // console.log(status);
                    // console.log(data);
                    // console.log(headers);
                    // console.log(config);
                });
        };

        GroupService.getAllModeratorsOfOrganisation($routeParams.organisationid).then(function(data, status, headers, config)
                {
                    for(i=0;i<data.length;i++){
                        $scope.allModerators.push(data[i]);
                    }

                });

        $scope.selectionOfModerators = [];

        // when checked, push moderatorid to array, else splice the userid from the array
        $scope.toggleSelectionOfModerators = function toggleSelection(userId) {
            var idx = $scope.selectionOfUsers.indexOf(userId);

            // is currently selected
            if (idx > -1) {
              $scope.selectionOfModerators.splice(idx, 1);
            }

            // is newly selected
            else {
              $scope.selectionOfModerators.push(userId);
            }

            console.log($scope.selectionOfModerators);
        };

        // submits new groupName
        $scope.submitNewGroupName = function submitNewGroupName(newName, group){
            console.log($scope.selectionOfModerators);
            UserGroupService.pushNewGroupName(group._id, newName, $scope.selectionOfModerators).then(function(data, status, headers, config)
                { 

                });
        };

        /* *  ADMIN DASH USERS  **/

        var users = [];
        var moderators = [];
        var titleOfGroup = "";
        // gets users and moderators of group, and push them to array
        UserGroupService.getGroup($routeParams.groupid).then(function(data, status, headers, config)
                {
                    for(i=0;i<data[0].participants.length;i++){
                        users.push(data[0].participants[i]);   
                    }

                    for(i=0;i<data[0].moderators.length;i++){
                        moderators.push(data[0].moderators[i]);     
                    }

                    titleOfGroup = data[0].title;
                });
        
        $scope.usersOfGroup = users;
        $scope.moderatorsOfGroup = moderators;
        $scope.groupTitle = titleOfGroup;
        
        var allUsers = [];
        var moderatorsOfOrganisation = [];
        // gets all users so they can be displayed when adding users to a group
        UserGroupService.getAllUsers().then(function(data, status, headers, config)
                {
                    for(i=0;i<data.length;i++){
                        allUsers.push(data[i]);
                    }

                });
 
        $scope.allMevolutionUsers = allUsers;

        // submit the new userArray(selectionOfUsers) to the group which are checked in the view
        $scope.submitUsers = function() {

            UserGroupService.pushUsersToGroup($routeParams.groupid, $scope.selectionOfUsers).then(function(data, status, headers, config)
                { 
                    UserGroupService.getGroup($routeParams.groupid).then(function(data, status, headers, config)
                    {
                        $scope.usersOfGroup = [];
                        for(i=0;i<data[0].participants.length;i++){
                            $scope.usersOfGroup.push(data[0].participants[i]);        
                        }
                        console.log($scope.usersOfGroup);
                    });
                });
        }

        $scope.selectionOfUsers = [];

        // when checked, push userid to array, else splice the userid from the array
        $scope.toggleSelection = function toggleSelection(userId) {
            var idx = $scope.selectionOfUsers.indexOf(userId);

            // is currently selected
            if (idx > -1) {
              $scope.selectionOfUsers.splice(idx, 1);
            }

            // is newly selected
            else {
              $scope.selectionOfUsers.push(userId);
            }

        };

    }]);
 
};


},{}],2:[function(require,module,exports){
module.exports = function(admin)
{
    admin.controller('NavigationBarController', [ '$scope', function($scope)
    {
        $scope.toggle = function()
        {
            angular.element(document.getElementById('wrapper')).toggleClass('unfolded');
        }
    }]);
}

},{}],3:[function(require,module,exports){
module.exports = function(admin)
{
    require('./AdminController.js')(admin);
    require('./NavigationBarController.js')(admin);
};

},{"./AdminController.js":1,"./NavigationBarController.js":2}],4:[function(require,module,exports){
module.exports = function(admin)
{
    admin.factory('AdminFactory', function()
    {
        var admin = {};

        admin.organisations = [{name:'test1'},{name:'test2'}];

		admin.addOrganisation = function(newGroupName){
    		admin.organisations.push({name:newGroupName});
        };


        return admin;
    });

};

},{}],5:[function(require,module,exports){
module.exports = function(admin)
{
    require('./AdminFactory.js')(admin);
};

},{"./AdminFactory.js":4}],6:[function(require,module,exports){
module.exports = function(app)
{
    var admin = angular.module('app.adminFunctions', [ 'app.api' ]);

    require('./Controllers/_index.js')(admin);
    require('./Services/_index.js')(admin);

    return admin;
};

},{"./Controllers/_index.js":3,"./Services/_index.js":5}],7:[function(require,module,exports){
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
    });
    
    api.factory('GroupService', function($http, API)
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
    });

    api.factory('UserGroupService', function($http, API)
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
    });

    api.factory('TimelineService', function($http, API)
        {
        return {
            getCanvases: function ()
            {
                return $http.get(API.url + '/canvas',
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
        }
    });
    api.factory('CanvasService', function($http, API)
    {
        return {

            getCanvas: function(canvasId)
            {
                return $http.get(API.url + '/canvas/' + canvasId, {});
            }
        };

    });
};

},{}],8:[function(require,module,exports){
module.exports = function(app)
{
    var api = angular.module('app.api', []);

    require('./Api.js')(api);

    return api;
};

},{"./Api.js":7}],9:[function(require,module,exports){
var modules =
[
    'ngRoute', 'door3.css',
    'app.api', 'app.authentication',

    'app.moderator', 'app.adminFunctions',

    'app.canvas'
];

var app = angular.module('app', modules);

app.config(function($httpProvider)
{
    $httpProvider.interceptors.push('TokenInterceptor');

});

var authentication = require('./Authentication/_index')(app);
var api = require('./Api/_index')(app);

var admin = require('./Admin/_index')(app);
var moderator = require('./Moderator/_index')(app);

var canvas = require('./Canvas/_index')(app);

// @todo Maybe create a general app file for this kind of stuff
app.config([ '$locationProvider', '$routeProvider', function($location, $routeProvider)
{
    $routeProvider.when('/auth/login',
    {
        templateUrl: 'partials/login.html',
        controller: 'AuthenticationController'
    })
    .when('/moderator',
    {
        templateUrl: 'partials/moderator_dash.html',
        controller: 'ModeratorController'
    })
    .when('/admin',
    {
        templateUrl: 'partials/admin_dash.html',
        controller: 'AdminController'
    })
    .when('/canvas',
    {
        templateUrl: '/partials/canvas/canvas.html',
        controller: 'CanvasController',
        css:
        [{
             href: debug == true ? '/dev/css/canvas.css' : '/assets/css/canvas.css',
             bustCache: true
        }]
    })
    .when('/admin/groups/:organisationid',
    {
        templateUrl: 'partials/admin_dash_groups.html',
        controller: 'AdminController'
    })
    .when('/admin/users/:groupid',
    {
        templateUrl: 'partials/admin_dash_users.html',
        controller: 'AdminController'
    })
    .otherwise
    ({
        redirectTo: '/'
    });
}]);

app.run(function($rootScope, $location, $window, AuthenticationService)
{
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute)
    {
        if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication && !AuthenticationService.isAuthenticated && !$window.sessionStorage.token)
        {
            $location.path("/auth/login");
        }
    });
});


},{"./Admin/_index":6,"./Api/_index":8,"./Authentication/_index":14,"./Canvas/_index":21,"./Moderator/_index":26}],10:[function(require,module,exports){
module.exports = function(authentication)
{
    authentication.controller('AuthenticationController', [ '$scope', '$location', '$window', 'UserService', 'AuthenticationService', function($scope, $location, $window, UserService, AuthenticationService)
    {
        $scope.signIn = function signIn(username, password)
        {
            if (username != null && password != null)
            {
                UserService.login(username, password).success(function(data)
                {
                    AuthenticationService.isAuthenticated = true;
                    $window.sessionStorage.access_token = data.access_token;
                    $window.sessionStorage.refresh_token = data.refresh_token;

                    $location.path('/canvas');

                }).error(function(status, data)
                {
                    console.log(status);
                    console.log(data);
                });
            }
        };
    }]);
};

},{}],11:[function(require,module,exports){
module.exports = function(auth)
{
    require('./AuthenticationController.js')(auth);
};

},{"./AuthenticationController.js":10}],12:[function(require,module,exports){
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
                if (response != null && response.status == 200 && $window.sessionStorage.token && !AuthenticationService.isAuthenticated)
                {
                    AuthenticationService.isAuthenticated = true;
                }

                return response || $q.when(response);
            },

            responseError: function(rejection)
            {
                if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || AuthenticationService.isAuthenticated))
                {
                    delete $window.sessionStorage.token;

                    AuthenticationService.isAuthenticated = false;

                    $location.path("/login");
                }

                return $q.reject(rejection);
            }
        };
    }]);
};

},{}],13:[function(require,module,exports){
module.exports = function(auth)
{
    require('./Authentication.js')(auth);
};

},{"./Authentication.js":12}],14:[function(require,module,exports){
module.exports = function(app)
{
    var auth = angular.module('app.authentication', [ 'app.api' ]);

    require('./Controllers/_index.js')(auth);
    require('./Services/_index.js')(auth);

    return auth;
};

},{"./Controllers/_index.js":11,"./Services/_index.js":13}],15:[function(require,module,exports){
module.exports = function(canvas)
{
    canvas.controller('CanvasController', [ '$scope', '$css', '$sce', 'CanvasService', function($scope, $css, $sce, CanvasService)
    {
        $scope.fases = [];

        CanvasService.getCanvas('553f9914c757d2c505273250').success(function(data)
        {
            $scope.fases = data.fases;
        });

        $scope.trustSrc = function(src)
        {
            return $sce.trustAsResourceUrl(src);
        };
    }]);
};


},{}],16:[function(require,module,exports){
module.exports = function(canvas)
{
    require('./CanvasController.js')(canvas);
};

},{"./CanvasController.js":15}],17:[function(require,module,exports){
module.exports = function(canvas)
{
    canvas.directive('colorbox', function($compile)
    {
        return {

            restrict: 'AC',
            link: function(scope, element, attrs)
            {
                element.click('bind', function(e)
                {
                    e.preventDefault();

                    var cb = $.colorbox
                    ({
                        href: attrs.colorbox,
                        onComplete: function()
                        {
                            var s = scope.$parent;

                            s.$apply(function()
                            {
                                var content = $('#cboxLoadedContent');
                                $compile(content)(s);

                                setTimeout(function()
                                {
                                    $('#video' + s.object.object._id)[0].load();

                                }, 1);
                            });
                        }
                    });
                });

                //$(element).colorbox(attrs.colorbox);
            }
        }
    });
};

},{}],18:[function(require,module,exports){
module.exports = function(canvas)
{
    require('./Colorbox.js')(canvas);
};

},{"./Colorbox.js":17}],19:[function(require,module,exports){
module.exports = function(canvas)
{
    //canvas.factory('CanvasService', function($http, API)
    //{
    //    API.factory('CanvasService', function($http)
    //    {
    //        return {
    //
    //            getTest: function()
    //            {
    //                console.log('hi');
    //            }
    //        }
    //    });
    //});
};

},{}],20:[function(require,module,exports){
module.exports = function(canvas)
{
    require('./Canvas.js')(canvas);
};

},{"./Canvas.js":19}],21:[function(require,module,exports){
module.exports = function(app)
{
    var canvas = angular.module('app.canvas', [ 'app.api' ]);

    require('./Controllers/_index.js')(canvas);
    require('./Services/_index.js')(canvas);
    require('./Directives/_index.js')(canvas);

    return canvas;
};


},{"./Controllers/_index.js":16,"./Directives/_index.js":18,"./Services/_index.js":20}],22:[function(require,module,exports){
module.exports = function(moderator)
{
    moderator.controller('ModeratorController', [ '$scope', '$location', '$window', 'ModeratorFactory', function($scope, $location, $window, ModeratorFactory)
    {
        $scope.groups = ModeratorFactory.groups;

        $scope.addGroup = function(newName){
        	return ModeratorFactory.addGroup(newName);
        };
    }]);
};

},{}],23:[function(require,module,exports){
module.exports = function(moderator)
{
    require('./ModeratorController.js')(moderator);
};

},{"./ModeratorController.js":22}],24:[function(require,module,exports){
module.exports = function(moderator)
{
    moderator.factory('ModeratorFactory', function()
    {
        var moderator = {};

        moderator.groups = [{name:'test1'},{name:'test2'}];

        moderator.addGroup = function(newGroupName){
    		moderator.groups.push({name:newGroupName});
        };

        return moderator;
    });

};

},{}],25:[function(require,module,exports){
module.exports = function(moderator)
{
    require('./ModeratorFactory.js')(moderator);
};

},{"./ModeratorFactory.js":24}],26:[function(require,module,exports){
module.exports = function(app)
{
    var moderator = angular.module('app.moderator', [ 'app.api' ]);

    require('./Controllers/_index.js')(moderator);
    require('./Services/_index.js')(moderator);

    return moderator;
};

},{"./Controllers/_index.js":23,"./Services/_index.js":25}]},{},[9]);
