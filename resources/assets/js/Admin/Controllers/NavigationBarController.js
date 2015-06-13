module.exports = function(admin)
{
    admin.controller('NavigationBarController', [ '$scope', 'AuthenticationService' , function($scope, AuthenticationService)
    {
        $scope.isAuthenticated = AuthenticationService.isAuthenticated;
        $scope.isAdmin = AuthenticationService.isAdmin;
        $scope.isModerator = AuthenticationService.isModerator;

        $scope.menu =
        [{
            showWhen: 'isAuthenticated()',
            href: '#/timeline',
            text: 'Timeline',
            faClass: 'fa-dashboard'
        },
        /*{
            showWhen: 'isAuthenticated()',
            href: '#/canvas',
            text: 'Canvas',
            faClass: 'fa-pie-chart'
        },*/
        {
            showWhen: 'isAdmin()',
            href: '#/admin',
            text: 'Admin',
            faClass: 'fa-sitemap'
        },
        {
            showWhen: 'isModerator()',
            href: '#/moderator',
            text: 'Moderator',
            faClass: 'fa-briefcase'
        },
        {
            showWhen: 'isModerator()',
            href: '#/bucket',
            text: 'Bucket',
            faClass: 'fa-inbox'
        },
        {
            showWhen: 'isAuthenticated()',
            href: '#/profile',
            text: 'Profiel',
            faClass: 'fa-user'
        }
        ,
        {
            showWhen: 'isAuthenticated()',
            href: '#/auth/logout',
            text: 'Log uit',
            faClass: 'fa-sign-out'
        }];

        $scope.toggle = function()
        {
            angular.element(document.getElementById('wrapper')).toggleClass('unfolded');
        }
    }]);
}