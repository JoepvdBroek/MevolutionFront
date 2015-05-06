module.exports = function(admin)
{


    admin.controller('AdminController', [ '$scope', '$location', '$window', 'OrganisationService', 'AdminFactory', function($scope, $location, $window, OrganisationService, AdminFactory)
    {
        var groups = [];

        OrganisationService.getOrganisations().success(function(data, status, headers, config)
        {
            groups = data;

        }).error(function(data, status, headers, config)
        {
            console.log(status);
            console.log(data);
            console.log(headers);
            console.log(config);
        });

        $scope.allGroups = groups;
    }]);
};