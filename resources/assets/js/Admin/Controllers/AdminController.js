module.exports = function(admin)
{
    admin.controller('AdminController', [ '$scope', '$location', '$window', '$routeParams', '$rootScope', 'OrganisationService', 'GroupService', 'UserGroupService', 'AdminFactory', function($scope, $location, $window, $routeParams, $rootScope, OrganisationService, GroupService, UserGroupService, AdminFactory)
    {

        var history = [];

        $rootScope.$on('$routeChangeSuccess', function() {
            console.log('routeChange');
            history.push($location.$$path);
        });

        $rootScope.back = function () {
            var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
            $location.path(prevUrl);
        };

        /* *  ADMIN DASH ORGANISATIONS  **/
        var organisations = [];

        OrganisationService.getOrganisations().then(function(data, status, headers, config)
                {
                    for(i=0;i<data.length;i++){
                        organisations.push(data[i]);
                    }
                	// groups = data;
                    //console.log(groups);

                });

        $scope.allOrganisations = organisations;

        $scope.addOrganisation = function(newName, newColor, newLogo){
            OrganisationService.postOrganisation(newName, newColor, newLogo).success(function(data, status, headers, config)
                {
                    $scope.allOrganisations = [];
                    OrganisationService.getOrganisations().then(function(data, status, headers, config)
                    {
                        for(i=0;i<data.length;i++){
                            $scope.allOrganisations.push(data[i]);
                        }
                    });
                    $scope.newGroupName = "";
                    $scope.newGroupColor = "";
                    $scope.newGroupLogo = "";

                }).error(function(data, status, headers, config)
                {
                    // console.log(status);
                    // console.log(data);
                    // console.log(headers);
                    // console.log(config);
                });
        };

        // submits new groupName
        $scope.submitNewOrganisationName = function submitNewOrganisationName(newName, organisation){
            OrganisationService.postNewOrganisationName(newName, organisation._id).then(function(data, status, headers, config)
                { 

                });
        };

        /* *  ADMIN DASH GROUPS  **/

        var groups = [];
        var moderatorsOfOrganisation = [];
        var usersOfOrganisation = [];

        $scope.allModerators = [];
        $scope.usersOfOrganisation = [];

        GroupService.getGroups($routeParams.organisationid).then(function(data, status, headers, config)
                {
                    for(i=0;i<data.length;i++){
                        groups.push(data[i]);
                    }

                });

        $scope.allGroups = groups;

        $scope.addGroup = function(newName){
            GroupService.postGroup(newName, $routeParams.organisationid).success(function(data, status, headers, config)
                {
                    $scope.allGroups = [];
                    GroupService.getGroups($routeParams.organisationid).then(function(data, status, headers, config)
                    {
                        for(i=0;i<data.length;i++){
                        $scope.allGroups.push(data[i]);
                    }
                    });
                    $scope.newGroupName = "";

                }).error(function(data, status, headers, config)
                {
                    // console.log(status);
                    // console.log(data);
                    // console.log(headers);
                    // console.log(config);
                });
        };

        GroupService.getAllModeratorsOfOrganisation($routeParams.organisationid).then(function(data, status, headers, config)
                {
                    for(i=0;i<data.length;i++){
                        $scope.allModerators.push(data[i]);
                    }

                });

        $scope.selectionOfModerators = [];

        // when checked, push moderatorid to array, else splice the userid from the array
        $scope.toggleSelectionOfModerators = function toggleSelection(userId) {
            var idx = $scope.selectionOfUsers.indexOf(userId);

            // is currently selected
            if (idx > -1) {
              $scope.selectionOfModerators.splice(idx, 1);
            }

            // is newly selected
            else {
              $scope.selectionOfModerators.push(userId);
            }

            //console.log($scope.selectionOfModerators);
        };

        // submits new groupName
        $scope.submitNewGroupName = function submitNewGroupName(newName, group){
            UserGroupService.pushNewGroupName(group._id, newName, $scope.selectionOfModerators).then(function(data, status, headers, config)
                { 

                });
        };

        UserGroupService.getAllUsersOfOrganisation($routeParams.organisationid).then(function(data, status, headers, config)
                {
                    for(i=0;i<data.length;i++){
                        $scope.usersOfOrganisation.push(data[i]);
                    }

                });

        $scope.selectedUsersToMakeModerator = [];

        // when checked, push moderatorid to array, else splice the userid from the array
        $scope.toggleSelectionOfUsersMakingModerator = function toggleSelection(userId) {
            var idx = $scope.selectedUsersToMakeModerator.indexOf(userId);

            // is currently selected
            if (idx > -1) {
              $scope.selectedUsersToMakeModerator.splice(idx, 1);
            }

            // is newly selected
            else {
              $scope.selectedUsersToMakeModerator.push(userId);
            }

            console.log($scope.selectedUsersToMakeModerator);
        };

        // submits new moderatorlist
        $scope.submitNewModeratorList = function submitNewModeratorList(){
            for(i = 0; i < $scope.selectedUsersToMakeModerator.length; i++){
                //console.log($scope.selectedUsersToMakeModerator[i]);
                UserGroupService.makeUserModerator($scope.selectedUsersToMakeModerator[i]);
            }
        };

        /* *  ADMIN DASH USERS  **/

        var users = [];
        var moderators = [];
        var titleOfGroup = "";
        // gets users and moderators of group, and push them to array
        UserGroupService.getGroup($routeParams.groupid).then(function(data, status, headers, config)
                {
                    for(i=0;i<data[0].participants.length;i++){
                        users.push(data[0].participants[i]);   
                    }

                    for(i=0;i<data[0].moderators.length;i++){
                        moderators.push(data[0].moderators[i]);     
                    }

                    titleOfGroup = data[0].title;
                });
        
        $scope.usersOfGroup = users;
        $scope.moderatorsOfGroup = moderators;
        $scope.groupTitle = titleOfGroup;
        
        var allUsers = [];
        var moderatorsOfOrganisation = [];
        // gets all users so they can be displayed when adding users to a group
        UserGroupService.getAllUsers().then(function(data, status, headers, config)
                {
                    for(i=0;i<data.length;i++){
                        allUsers.push(data[i]);
                    }

                });
 
        $scope.allMevolutionUsers = allUsers;

        // submit the new userArray(selectionOfUsers) to the group which are checked in the view
        $scope.submitUsers = function() {

            UserGroupService.pushUsersToGroup($routeParams.groupid, $scope.selectionOfUsers).then(function(data, status, headers, config)
                { 
                    UserGroupService.getGroup($routeParams.groupid).then(function(data, status, headers, config)
                    {
                        $scope.usersOfGroup = [];
                        for(i=0;i<data[0].participants.length;i++){
                            $scope.usersOfGroup.push(data[0].participants[i]);        
                        }
                        //console.log($scope.usersOfGroup);
                    });
                });
        }

        $scope.selectionOfUsers = [];

        // when checked, push userid to array, else splice the userid from the array
        $scope.toggleSelection = function toggleSelection(userId) {
            var idx = $scope.selectionOfUsers.indexOf(userId);

            // is currently selected
            if (idx > -1) {
              $scope.selectionOfUsers.splice(idx, 1);
            }

            // is newly selected
            else {
              $scope.selectionOfUsers.push(userId);
            }

        };

    }]);
 
};
