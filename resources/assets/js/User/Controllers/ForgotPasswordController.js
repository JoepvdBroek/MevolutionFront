module.exports = function(user)
{
    user.controller('ForgotPasswordController', [ '$scope', '$location', 'UserFactory', 'UserService', function($scope, $location, $UserFactory, UserService)
    {
        $scope.tokenSent = false; //Wanneer email verstuurd true: opent form voor nieuw password

        function tokenSent(bool) {
            $scope.tokenSent = bool;
        }

        $scope.sentPasswordReset = function sentPasswordReset(email){
            if(email != null){
                UserService.sentPasswordReset(email).success(function(data)
                {
                    tokenSent(true);
                    
                }).error(function(status, data)
                {
                    console.log(status);
                    console.log(data);
                });
            } else {
                alert('vul alsjeblieft alle velden in');
            }
        }

        $scope.setNewPassword = function setNewPassword(forgot) {
            if(forgot != null && forgot.token != null && forgot.new != null && forgot.repeat != null){
                if(forgot.new == forgot.repeat){
                    UserService.setNewPassword(forgot.token, forgot.new).success(function(data){
                        tokenSent(false);
                        $location.path("/profile");
                        
                    }).error(function(status, data) {
                        console.log(status);
                        console.log(data);
                    });
                } else {
                    alert('Het nieuwe wachtwoord komt niet overeen');
                }
            } else {
                alert('vul alsjeblieft alle velden in');
            }
        }

	}]);
};