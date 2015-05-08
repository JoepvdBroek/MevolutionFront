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
    'app.user',
    'app.moderator', 'app.adminFunctions',

    'app.canvas'
];

var app = angular.module('app', modules);

app.config(function($httpProvider)
{
    $httpProvider.interceptors.push('TokenInterceptor');

}).config(function($interpolateProvider)
{
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

var authentication = require('./Authentication/_index')(app);

var api = require('./Api/_index')(app);

var user = require('./User/_index')(app);
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
    .when('/auth/register',
    {
        templateUrl: 'partials/register.html',
        controller: 'AuthenticationController'
    })
    .when('/profile',
    {
        templateUrl: 'partials/user/profile.html',
        controller: 'UserController'
    })
    .when('/profile/password',
    {
        templateUrl: 'partials/user/password.html',
        controller: 'UserController'
    })
        /*when('/admin/login',
         {
         controller: 'AdminUserCtrl'
         }).*/
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
        templateUrl: 'partials/canvas/spiral.html',
        controller: 'CanvasController',
        css:
        [{
            href: debug == true ? 'dev/css/canvas.css' : 'assets/css/canvas.css'
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


},{"./Admin/_index":7,"./Api/_index":9,"./Authentication/_index":15,"./Canvas/_index":18,"./Moderator/_index":23,"./User/_index":28}],11:[function(require,module,exports){
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

        $scope.register = function register(username, password1, password2, email, firstname, middlename,surname)
        {
            if (username != null && password1 != null && password2 != null && email != null && firstname != null && surname != null)
            {
                UserService.checkUsername(username).success(function(data)
                {
                
                    if (data == false)
                    {
                        if (password1 === password2)
                        {
                            var password = password1;
                            UserService.register(username, password, email, firstname, middlename, surname).success(function(data)
                            {
                                alert("Gebruiker: " + username + " is aangemaakt");
                                $location.path('/auth/login');

                            }).error(function(status, data)
                            {
                                console.log(status);
                                console.log(data);
                            });
                        }
                    }
                });
            }
        };

        $scope.checkUsername = function checkUsername(username)
        {
            if (username != null)
            {
                UserService.checkUsername(username).success(function(data)
                {
                    console.log(data);
                    if (data == true) 
                    {
                        alert("gebruikersnaam: " + username + " is al in gebruik");
                    } else 
                    {
                        alert("gebruikersnaam: " + username + " is beschikbaar");
                    }   
                    return data;

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

                if ($window.sessionStorage.refresh_token)
                {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.access_token;
                    AuthenticationService.isAuthenticated = true;
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
        $css.bind({ href: 'test.css' }, $scope);

        $scope.test = function()
        {
            console.log('test');
        }
    }]);
};

},{}],17:[function(require,module,exports){
module.exports = function(canvas)
{
    require('./CanvasController.js')(canvas);
};

},{"./CanvasController.js":16}],18:[function(require,module,exports){
module.exports = function(app)
{
    var canvas = angular.module('app.canvas', [ 'app.api' ]);

    require('./Controllers/_index.js')(canvas);

    return canvas;
};

},{"./Controllers/_index.js":17}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
module.exports = function(moderator)
{
    require('./ModeratorController.js')(moderator);
};

},{"./ModeratorController.js":19}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
module.exports = function(moderator)
{
    require('./ModeratorFactory.js')(moderator);
};

},{"./ModeratorFactory.js":21}],23:[function(require,module,exports){
module.exports = function(app)
{
    var moderator = angular.module('app.moderator', [ 'app.api' ]);

    require('./Controllers/_index.js')(moderator);
    require('./Services/_index.js')(moderator);

    return moderator;
};

},{"./Controllers/_index.js":20,"./Services/_index.js":22}],24:[function(require,module,exports){
module.exports = function(user)
{
    user.controller('UserController', [ '$scope', '$location', '$window', 'UserFactory', 'UserService', 'AuthenticationService', function($scope, $location, $window, UserFactory, UserService, AuthenticationService)
    {
        $scope.editmode = false;
        $scope.user = {};
        getUserInfo(); 

        function switchEditmodeOff(){
            $scope.editmode = false;
        }

        $scope.switchToEditmode = function switchToEditmode(){
            $scope.editmode = true;
        }     

        $scope.updateUserInfo = function updateUserInfo()
        {
            if (AuthenticationService.isAuthenticated)
            {
                UserService.updateUser($scope.user).success(function(data)
                {
                    switchEditmodeOff();
                    
                }).error(function(status, data)
                {
                    console.log(status);
                    console.log(data);
                });
            } else {
                console.log('not authenticated');
            }
        };

        $scope.changePassword = function changePassword(password){
            if(password != null && password.old != null && password.new != null && password.repeat != null){
                console.log('old: ' +password.old);
                console.log('new: ' +password.new);
                console.log('repeat: ' +password.repeat);
                if(password.new == password.repeat){
                    //TODO: maak call naar nog niet bestaande route met nieuw en oud wachtwoord
                } else {
                    alert('nieuw wachtwoord komt niet overeen');
                }
            } else {
                alert('vul alsjeblieft alle velden in');
            }
        }

        function getUserInfo(){
            if (AuthenticationService.isAuthenticated)
            {
                UserService.getUserInfo().success(function(data)
                {
                    $scope.user = data[0];
                    
                }).error(function(status, data)
                {
                    console.log(status);
                    console.log(data);
                });
            } else {
                console.log('not authenticated');
            }
        }
    }]);
};

},{}],25:[function(require,module,exports){
module.exports = function(user)
{
    require('./UserController.js')(user);
};

},{"./UserController.js":24}],26:[function(require,module,exports){
module.exports = function(user)
{
    user.factory('UserFactory', [ 'UserService', 'AuthenticationService', function(UserService, AuthenticationService)
    {
        var factory = {};

        //test data aangezien ik nog niet bij users/@me kan

        factory.user = {};
        /*factory.user = 
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
	    };*/

	    factory.getUser = function(){
	    	//TODO: vul user met gegevens uit api call /users/@me
	    	console.log('get user');
			return factory.user;
		}

		factory.fillUser = function(){
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
		}

		factory.getUserInfo = function(){
			if (AuthenticationService.isAuthenticated)
            {
                UserService.getUserInfo().success(function(data)
                {
                    factory.user = data[0];
                   	return data[0];
                                        
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

},{}],27:[function(require,module,exports){
module.exports = function(user)
{
    require('./UserService.js')(user);
};

},{"./UserService.js":26}],28:[function(require,module,exports){
module.exports = function(app)
{
    var user = angular.module('app.user', [ 'app.api' ]);

    require('./Controllers/_index.js')(user);
    require('./Services/_index.js')(user);

    return user;
};

},{"./Controllers/_index.js":25,"./Services/_index.js":27}]},{},[10]);
