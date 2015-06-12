module.exports = function(moderator)
{
    moderator.controller('GroupsRedirectController', [ '$scope', '$location', 'UserService',  function($scope, $location, UserService)
    {
        console.log('GroupsRedirectController');

        UserService.getUserInfo().success(function(data)
        {
            $location.path("/moderator/"+data[0].organization._id);
            
        }).error(function(status, data)
        {
            console.log(status);
            console.log(data);
        });

    }]);
};