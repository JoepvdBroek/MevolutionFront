module.exports = function(user)
{
    user.controller('UserController', [ '$scope', 'UserService', function($scope, UserService)
    {
        var fd = new FormData();
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
            getUserInfo();
            $scope.editmode = false;
        }    

        $scope.hasProfilePicture = function hasProfilePicture(){
            return $scope.user.profilePicture != undefined;
        } 

        $scope.updateUserInfo = function updateUserInfo()
        {
            
            UserService.updateUser($scope.user).success(function(data)
            {
                switchEditmodeOff();
                
            }).error(function(status, data)
            {
                console.log(status);
                console.log(data);
            });

            UserService.uploadImage($scope.user._id, fd).success(function(data){
                getUserInfo();
            }).error(function(status, data)
            {
                alert("Het uploaden van de afbeelding ging fout. Is het bestand wel een .JPG of .PNG?")
                console.log(status);
                console.log(data);
            });
            
        };

        $scope.setImage = function setImage(files) {
            //Take the first selected file
            fd.append("profile", files[0]);            
        };

        function getUserInfo(){
            
            UserService.getUserInfo().success(function(data)
            {
                $scope.user = data[0];
                currentProfilePicture = data[0].profilePicture;
                
            }).error(function(status, data)
            {
                console.log(status);
                console.log(data);
            });
            
        };
    }]);
};