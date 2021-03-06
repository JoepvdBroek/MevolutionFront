module.exports = function(user)
{
    user.controller('ChangePasswordController', [ '$scope', '$location', 'UserFactory', 'UserService', 'AuthenticationService', function($scope, $location, $UserFactory, UserService, AuthenticationService)
    {
    	$scope.user = {};
    	getUserInfo();

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
        }

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
        }

	}]);
};