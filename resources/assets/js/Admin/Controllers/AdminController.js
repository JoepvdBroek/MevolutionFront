module.exports = function(admin)
{
    admin.controller('AdminController', [ '$scope', '$location', '$window', 'AdminFactory', function($scope, $location, $window, AdminFactory)
    {
        $scope.groups = AdminFactory.groups;

    }]);
};