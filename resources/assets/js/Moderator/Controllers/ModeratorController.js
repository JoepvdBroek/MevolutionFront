module.exports = function(moderator)
{
    moderator.controller('ModeratorController', [ '$scope', '$location', '$window', 'ModeratorFactory', 'LearningFactory', 'UserService', function($scope, $location, $window, ModeratorFactory, LearningFactory, UserService)
    {
        $scope.learnings = [{
        	'image': 'image1',
        	'title': 'Materie',
        	'color': '#00000'
        },
        {
        	'image': 'image2',
        	'title': 'Taal',
        	'color': '#00000'
        },
        {
        	'image': 'image3',
        	'title': 'Rekenen',
        	'color': '#00000'
        }];

        var user = "";

        UserService.getUserInfo().then(function(data, status, headers, config){
        	$scope.user = data.data[0];
        	console.log($scope.user);
        });


    }]);
};