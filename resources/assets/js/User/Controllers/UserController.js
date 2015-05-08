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