(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(admin)
{


    admin.controller('AdminController', [ '$scope', '$location', '$window', 'OrganisationService', 'AdminFactory', function($scope, $location, $window, OrganisationService, AdminFactory)
    {
        var groups = [];

        OrganisationService.getOrganisations().success(function(data, status, headers, config)
        {
            groups = data;

        }).error(function(data, status, headers, config)
        {
            console.log(status);
            console.log(data);
            console.log(headers);
            console.log(config);
        });

        $scope.allGroups = groups;
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

};

},{}],5:[function(require,module,exports){
module.exports = function(admin)
{
    admin.factory('AdminFactory', function()
    {
        var admin = {};

        //admin.groups = [{name:'test1'},{name:'test2'}];
       // admin.groups = $

        // merijncelie.nl::3000/api/groups/

        return admin;
    });

};

},{}],6:[function(require,module,exports){
module.exports = function(admin)
{
    require('./AdminFactory.js')(admin);
};

},{"./AdminFactory.js":5}],7:[function(require,module,exports){
module.exports = function(app)
{
    var admin = angular.module('app.adminFunctions', [ 'app.api' ]);

    require('./Controllers/_index.js')(admin);
    require('./Services/_index.js')(admin);
    require('./Directives/_index.js')(admin);

    return admin;
};

},{"./Controllers/_index.js":3,"./Directives/_index.js":4,"./Services/_index.js":6}],8:[function(require,module,exports){
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
};

},{}],9:[function(require,module,exports){
module.exports = function(app)
{
    var api = angular.module('app.api', []);

    require('./Api.js')(api);

    return api;
};

},{"./Api.js":8}],10:[function(require,module,exports){
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

})/*.config(function($interpolateProvider)
{
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
})*/;

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

},{"./Admin/_index":7,"./Api/_index":9,"./Authentication/_index":15,"./Canvas/_index":20,"./Moderator/_index":25}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
module.exports = function(auth)
{
    require('./AuthenticationController.js')(auth);
};

},{"./AuthenticationController.js":11}],13:[function(require,module,exports){
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

                if ($window.sessionStorage.token)
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

},{}],14:[function(require,module,exports){
module.exports = function(auth)
{
    require('./Authentication.js')(auth);
};

},{"./Authentication.js":13}],15:[function(require,module,exports){
module.exports = function(app)
{
    var auth = angular.module('app.authentication', [ 'app.api' ]);

    require('./Controllers/_index.js')(auth);
    require('./Services/_index.js')(auth);

    return auth;
};

},{"./Controllers/_index.js":12,"./Services/_index.js":14}],16:[function(require,module,exports){
module.exports = function(canvas)
{
    canvas.controller('CanvasController', [ '$scope', '$css', function($scope, $css)
    {

    }]);
};

},{}],17:[function(require,module,exports){
module.exports = function(canvas)
{
    require('./CanvasController.js')(canvas);
};

},{"./CanvasController.js":16}],18:[function(require,module,exports){
module.exports = function(canvas)
{
    canvas.factory('CanvasService', function($http, API)
    {
        API.factory('CanvasService', function($http)
        {
            console.log('hoi');
        });
    });
};

},{}],19:[function(require,module,exports){
module.exports = function(canvas)
{
    require('./Canvas.js')(canvas);
};

},{"./Canvas.js":18}],20:[function(require,module,exports){
module.exports = function(app)
{
    var canvas = angular.module('app.canvas', [ 'app.api' ]);

    require('./Controllers/_index.js')(canvas);
    require('./Services/_index.js')(canvas);

    return canvas;
};

},{"./Controllers/_index.js":17,"./Services/_index.js":19}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
module.exports = function(moderator)
{
    require('./ModeratorController.js')(moderator);
};

},{"./ModeratorController.js":21}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
module.exports = function(moderator)
{
    require('./ModeratorFactory.js')(moderator);
};

},{"./ModeratorFactory.js":23}],25:[function(require,module,exports){
module.exports = function(app)
{
    var moderator = angular.module('app.moderator', [ 'app.api' ]);

    require('./Controllers/_index.js')(moderator);
    require('./Services/_index.js')(moderator);

    return moderator;
};

},{"./Controllers/_index.js":22,"./Services/_index.js":24}]},{},[10]);
