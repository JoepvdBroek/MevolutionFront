module.exports = function(admin)
{
    admin.controller('NavigationBarController', [ '$scope', function($scope)
    {
        $scope.toggle = function()
        {
            angular.element(document.getElementById('wrapper')).toggleClass('unfolded');
        }
    }]);
}