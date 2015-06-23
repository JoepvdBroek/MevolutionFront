module.exports = function(admin)
{
    admin.controller('NavigationBarController', [ '$scope', 'AuthenticationService' , function($scope, AuthenticationService)
    {
        $scope.isAuthenticated = AuthenticationService.isAuthenticated;
        $scope.isAdmin = AuthenticationService.isAdmin;
        $scope.isModerator = AuthenticationService.isModerator;

        $scope.onlyModerator = function(){
            if($scope.isAdmin()){
                return false;
            } else if($scope.isModerator()){
                return true;
            }

            return false;
        }

        $scope.menu =
        [{
            showWhen: 'isAuthenticated()',
            href: '#/timeline',
            text: 'Timeline',
            faClass: 'fa-dashboard'
        },
        {
            showWhen: 'isAdmin()',
            href: '#/admin',
            text: 'Admin',
            faClass: 'fa-sitemap'
        },
        {
            showWhen: 'onlyModerator()',
            href: '#/groups' ,
            text: 'Groepen',
            faClass: 'fa-users'
        },
        {
            showWhen: 'onlyModerator()',
            href: '#/moderator',
            text: 'Leerlijnen',
            faClass: 'fa-briefcase'
        },
        {
            showWhen: 'onlyModerator()',
            href: '#/inbox',
            text: 'Inbox',
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