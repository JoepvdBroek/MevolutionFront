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