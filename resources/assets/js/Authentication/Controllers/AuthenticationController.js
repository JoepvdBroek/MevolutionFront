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
            if (user != null && user.username != null && user.password1 != null && user.password2 != null && user.email != null && user.firstname != null && user.surname != null)
            {
                if (user.password1 === user.password2)
                {
                    UserService.checkUsername(user.username).success(function(data)
                    {
                        if (data == false)
                        {
                            UserService.checkEmail(user.email).success(function(data)
                            {
                                if (data == false)
                                {
                                    user.password = user.password1;
                                    UserService.register(user).success(function(data)
                                    {
                                        alert("Uw gebruiker is aangemaakt");
                                        $location.path('/auth/login');

                                    }).error(function(status, data)
                                    {
                                        console.log(status);
                                        console.log(data);
                                    });
                                }else {
                                    alert('Het e-mail is al in gebruik.');
                                    user.email = '';
                                }
                            }).error(function(status, data)
                            {
                                console.log(status);
                                console.log(data);
                            });
                        } else {
                            alert("Gebruikersnaam is al in gebruik");
                            $('#input-username').val('');
                        }
                    });
                } else {
                    alert('Uw wachtwoorden komen niet overeen. Probeer het nog eens.');
                    user.password1 = '';
                    user.password2 = '';
                }
            } else 
            {
                alert('Vul alsjeblieft alle velden in');
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
                        alert("Gebruikersnaam: " + username + " is al in gebruik");
                    } else 
                    {
                        alert("Gebruikersnaam: " + username + " is beschikbaar");
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