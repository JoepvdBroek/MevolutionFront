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
                    $window.sessionStorage.last_activity = new Date().getTime();

                    $location.path('/timeline');

                }).error(function(status, data)
                {
                    alert("De door u gegeven inloggegevens zijn niet correct.");
                    console.log(status);
                    console.log(data);
                });
            }
        };

        $scope.register = function register(user)
        {
            if (user.username != null && user.password1 != null && user.password2 != null && user.email != null && user.firstname != null && user.surname != null)
            {
                UserService.checkUsername(user.username).success(function(data)
                {
                
                    if (data == false)
                    {
                        if (user.password1 === user.password2)
                        {
                            user.password = user.password1;
                            UserService.register(user).success(function(data)
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