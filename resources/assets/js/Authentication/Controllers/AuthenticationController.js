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