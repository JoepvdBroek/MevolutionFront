module.exports = function(user)
{
    user.controller('UserController', [ '$scope', '$location', '$window', 'UserFactory', function($scope, $location, $window, UserFactory)
    {

        $scope.user = UserFactory.getUser();

        $scope.UpdateUserInfo = function()
        {
            //test om waarde te bekijken
            console.log($scope.user);
        };
    }]);
};