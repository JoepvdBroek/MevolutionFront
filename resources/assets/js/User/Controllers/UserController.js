module.exports = function(user)
{
    user.controller('UserController', [ '$scope', '$location', '$window', 'UserFactory', 'UserService', 'AuthenticationService', function($scope, $location, $window, UserFactory, UserService, AuthenticationService)
    {
        $scope.editmode = false; //Profile pagina wanneer true: opent form om gegevens te wijzigen.
        $scope.user = {};
        getUserInfo(); 

        function switchEditmodeOff(){
            $scope.editmode = false;
        }

        $scope.switchToEditmode = function switchToEditmode(){
            $scope.editmode = true;
        }    

        $scope.switchToNonEditmode = function switchToEditmode(){
            $scope.editmode = false;
        }     

        $scope.updateUserInfo = function updateUserInfo()
        {
            /*if (AuthenticationService.isAuthenticated)
            {*/
                UserService.updateUser($scope.user).success(function(data)
                {
                    switchEditmodeOff();
                    
                }).error(function(status, data)
                {
                    console.log(status);
                    console.log(data);
                });
            /*} else {
                console.log('not authenticated');
            }*/
        };

        function getUserInfo(){
            /*if (AuthenticationService.isAuthenticated)
            {*/
                UserService.getUserInfo().success(function(data)
                {
                    $scope.user = data[0];
                    
                }).error(function(status, data)
                {
                    console.log(status);
                    console.log(data);
                });
           /* } else {
                console.log('not authenticated');
            }*/
        };

        $scope.changePassword = function changePassword(password){
            if(password != null && password.new != null && password.repeat != null)
            {
                if(password.new == password.repeat)
                {
                   
                    var user = {};
                    user._id = $scope.user._id;
                    user.currentPassword = password.current;
                    user.newPassword = password.new;

                    UserService.changePassword(user).success(function(data)
                    {
                        alert("Uw wachtwoord is gewijzigd!")
                        $location.path("/profile");
                        
                    }).error(function(data, status)
                    {
                        if(data.error == 'Old password is wrong'){
                            alert('Uw huidig wachtwoord klopt niet. Probeer het opnieuw');
                            $('#current').val(''); 
                        }
                        console.log(status);
                        console.log(data);
                    });
                    
                } else 
                {
                    alert('Het nieuwe wachtwoord komt niet overeen');
                }
            } else 
            {
                alert('Vul alsjeblieft alle velden in');
            }
        };
    }]);
};