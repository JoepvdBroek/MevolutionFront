(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

            getUserInfo: function ()
            {
                return $http.get(API.url + '/users/@me');
            }
        };
    });
};

},{}],2:[function(require,module,exports){
module.exports = function(app)
{
    var api = angular.module('app.api', []);

    require('./Api.js')(api);

    return api;
};

},{"./Api.js":1}],3:[function(require,module,exports){
var app = angular.module('app', [ 'ngRoute', 'app.api', 'app.authentication' , 'app.user']);

app.config(function($httpProvider)
{
    $httpProvider.interceptors.push('TokenInterceptor');

}).config(function($interpolateProvider)
{
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

var authentication = require('./Authentication/_index')(app);
var user = require('./User/_index')(app);
var api = require('./Api/_index')(app);

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

app.config([ '$locationProvider', '$routeProvider', function($location, $routeProvider)
{
    $routeProvider.when('/auth/login',
    {
        templateUrl: 'partials/login.html',
        controller: 'AuthenticationController'
    })
    .when('/profile/edit',
    {
        templateUrl: 'partials/user/edit.html',
        controller: 'UserController'
    })
        /*when('/admin/login',
         {
         controller: 'AdminUserCtrl'
         }).*/
    .otherwise
    ({
        redirectTo: '/'
    });
}]);

},{"./Api/_index":2,"./Authentication/_index":8,"./User/_index":13}],4:[function(require,module,exports){
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

                    $location.path('/profile/edit');

                }).error(function(status, data)
                {
                    console.log(status);
                    console.log(data);
                });
            }
        };
    }]);
};

},{}],5:[function(require,module,exports){
module.exports = function(auth)
{
    require('./AuthenticationController.js')(auth);
};

},{"./AuthenticationController.js":4}],6:[function(require,module,exports){
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

                //if ($window.sessionStorage.token)
                if( AuthenticationService.isAuthenticated )
                {
                    console.log('authentication header');
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.access_token;
                    //config.headers["Authorization"] = 'Bearer ' + $window.sessionStorage.access_token;
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

},{}],7:[function(require,module,exports){
module.exports = function(auth)
{
    require('./Authentication.js')(auth);
};

},{"./Authentication.js":6}],8:[function(require,module,exports){
module.exports = function(app)
{
    var auth = angular.module('app.authentication', [ 'app.api' ]);

    require('./Controllers/_index.js')(auth);
    require('./Services/_index.js')(auth);

    return auth;
};

},{"./Controllers/_index.js":5,"./Services/_index.js":7}],9:[function(require,module,exports){
module.exports = function(user)
{
    user.controller('UserController', [ '$scope', '$location', '$window', 'UserFactory', function($scope, $location, $window, UserFactory)
    {

        $scope.user = UserFactory.getUser();

        $scope.UpdateUserInfo = function()
        {
            //test om waarde te bekijken
            console.log($scope.user);
        };
    }]);
};

},{}],10:[function(require,module,exports){
module.exports = function(user)
{
    require('./UserController.js')(user);
};

},{"./UserController.js":9}],11:[function(require,module,exports){
module.exports = function(user)
{
    user.factory('UserFactory', [ 'UserService', 'AuthenticationService', function(UserService, AuthenticationService)
    {
        var factory = {};

        //test data aangezien ik nog niet bij users/@me kan

        factory.user = 
	    {
	        "username": "JoepTest",
	        "hashedPassword": "3872822418e1325c97520b1e65aae2137359a2a8",
	        "salt": "U3WCVzqIyNLgADHRScp8ncbWMQDgNSbj+dl9ITauhPw=",
	        "email": "jjc.vandenbroek@student.avans.nl",
	        "firstName": "Joep",
	        "middleName": "van den",
	        "surName": "Broek",
	        "street": "leijzoom",
	        "houseNumber": "4",
	        "city": "Goirle",
	        "_id": "553e5c609f8bdebe785299a7",
	        "__v": 0,
	        "roles": [],
	        "organization": [],
	        "created": "2015-04-27T15:57:20.123Z"
	    };

	    factory.getUser = function(){
	    	//TODO: vul user met gegevens uit api call /users/@me
			return factory.user;
		}

		factory.getUserInfo = function(){
			if (AuthenticationService.isAuthenticated)
            {
                UserService.getUserInfo().success(function(data)
                {
                    factory.user = data[0];
                    
                }).error(function(status, data)
                {
                    console.log(status);
                    console.log(data);
                });
            } else {
                console.log('not authenticated');
            }
		}

		factory.updateUserInfo = function(){
			//TODO: doe PUT request naar /users/:id met factory.user
		}

        return factory;
    }]);
};

},{}],12:[function(require,module,exports){
module.exports = function(user)
{
    require('./UserService.js')(user);
};

},{"./UserService.js":11}],13:[function(require,module,exports){
module.exports = function(app)
{
    var user = angular.module('app.user', [ 'app.api' ]);

    require('./Controllers/_index.js')(user);
    require('./Services/_index.js')(user);

    return user;
};

},{"./Controllers/_index.js":10,"./Services/_index.js":12}]},{},[3]);
