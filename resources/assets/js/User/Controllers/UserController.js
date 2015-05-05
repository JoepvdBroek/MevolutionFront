module.exports = function(user)
{
    user.controller('UserController', [ '$scope', '$location', '$window', 'UserFactory', 'UserService', 'AuthenticationService', function($scope, $location, $window, UserFactory, UserService, AuthenticationService)
    {
        $scope.user = {};
        getUserInfo();       

        $scope.updateUserInfo = function()
        {
            if (AuthenticationService.isAuthenticated)
            {
                UserService.updateUser($scope.user).success(function(data)
                {
                    alert('opgeslagen');
                    
                }).error(function(status, data)
                {
                    console.log(status);
                    console.log(data);
                });
            } else {
                console.log('not authenticated');
            }
        };

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