module.exports = function(admin)
{
    admin.controller('NavigationBarController', [ '$scope', function($scope)
    {
        $scope.menu =
        [{
            href: '#/timeline',
            text: 'Timeline',
            faClass: 'fa-dashboard'
        },
        {
            href: '#/canvas',
            text: 'Canvas',
            faClass: 'fa-pie-chart'
        },
        {
            href: '#/admin',
            text: 'Admin',
            faClass: 'fa-briefcase'
        },
        {
            href: '#/bucket',
            text: 'Bucket',
            faClass: 'fa-inbox'
        },
        {
            href: '#/profile',
            text: 'Profiel',
            faClass: 'fa-user'
        }];

        $scope.toggle = function()
        {
            angular.element(document.getElementById('wrapper')).toggleClass('unfolded');
        }
    }]);
}