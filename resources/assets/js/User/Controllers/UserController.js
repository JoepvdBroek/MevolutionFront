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
            console.log("getUserInfo()");
            /*if (AuthenticationService.isAuthenticated)
            {*/
                UserService.getUserInfo().success(function(data)
                {
                    $scope.user = data[0];
                    console.log(data);
                    
                }).error(function(status, data)
                {
                    console.log(status);
                    console.log(data);
                });
           /* } else {
                console.log('not authenticated');
            }*/
        }
    }]);
};