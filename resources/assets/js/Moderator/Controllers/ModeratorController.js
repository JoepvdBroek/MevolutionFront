module.exports = function(moderator)
{
    moderator.controller('ModeratorController', [ '$scope', '$location', '$window', '$routeParams', 'ModeratorFactory', 'LearningFactory', 'NiveauFactory', 'UserService', 'OrganisationService', 'GroupService', 'UserGroupService', function($scope, $location, $window, $routeParams, ModeratorFactory, LearningFactory, NiveauFactory, UserService, OrganisationService, GroupService, UserGroupService)
    {
        /* *  MODERATOR LEARNINGS **/

        var organisationId = "";

        UserService.getUserInfo().then(function(data, status, headers, config){
        	$scope.user = data.data[0];
            organisationId = $scope.user.organization._id;
            LearningFactory.getLearningsOfOrganisation(organisationId).then(function(data, status, headers, config)
                {
                    $scope.learnings = data;
                });
        });

        $scope.orgId = organisationId;

        $scope.addLearning = function(newTitle, newColor){
            LearningFactory.postLearning(organisationId, newTitle, newColor).success(function(data, status, headers, config)
                {
                    LearningFactory.getLearningsOfOrganisation(organisationId).then(function(data, status, headers, config)
                    {
                        $scope.learnings = data;
                        alert('Leerlijn toegevoegd');
                        $scope.newTitle = "";
                        $scope.newColor = "";
                    });

                }).error(function(data, status, headers, config)
                {

                });
        };

        $scope.editLearning = function(newTitle, newColor, learning){
            LearningFactory.editLearning(organisationId, learning._id, newTitle, newColor).then(function(data, status, headers, config){
                LearningFactory.getLearningsOfOrganisation(organisationId).then(function(data, status, headers, config)
                    {
                        $scope.learnings = data;
                        alert('Leerlijn bijgewerkt');
                    });
            });
        };

        $scope.deleteLearning = function(learningId, index){
            if(confirm("Weet u zeker dat u deze leerlijn wilt verwijderen?")){
                LearningFactory.deleteLearning(organisationId, learningId).then(function(data, status, headers, config){
                    $scope.learnings.splice(index, 1);
                });
            }
        };

        /* *  MODERATOR NIVEAUS **/
        if(typeof($routeParams.learningid) != "undefined"){
            NiveauFactory.getNiveausOfLearning($routeParams.orgid, $routeParams.learningid).then(function(data, status, headers, config){
                $scope.niveaus = data;
                LearningFactory.getLearning($routeParams.orgid, $routeParams.learningid).then(function(data, status, headers, config){
                    $scope.learningName = data.title;
                });
            });
        }

        $scope.addNiveau = function(newTitle, newDescription, newSection){
            NiveauFactory.postNiveau($routeParams.orgid, $routeParams.learningid, newTitle, newDescription, newSection).success(function(data, status, headers, config)
            {
                NiveauFactory.getNiveausOfLearning($routeParams.orgid, $routeParams.learningid).then(function(data, status, headers, config){
                    $scope.niveaus = data;
                    alert('Niveau toegevoegd');
                    $scope.newTitle = "";
                    $scope.newDescription = "";
                    $scope.newSection = "";
                });
            }).error(function(data, status, headers, config)
            {

            });
        };

        $scope.editNiveau = function(newTitle, newDescription, newSection, niveau){
            NiveauFactory.editNiveau($routeParams.orgid, $routeParams.learningid, niveau._id, newTitle, newDescription, newSection).then(function(data, status, headers, config){
                alert('Niveau bijgewerkt');
            });
        };

        $scope.deleteNiveau = function(niveauId, index){
            if(confirm("Weet u zeker dat u dit niveau wilt verwijderen?")){
                NiveauFactory.deleteNiveau($routeParams.orgid, $routeParams.learningid, niveauId).then(function(data, status, headers, config){
                    $scope.niveaus.splice(index, 1);
                });
            } 
        };

        /* * MODERATOR GROUPS **/

        if(typeof($routeParams.organisation) != "undefined"){
            var groups = [];
            $scope.allModerators = [];
            $scope.usersOfOrganisation = [];
            $scope.allUsers = [];

            /* * GET ALL GROUPS **/
            GroupService.getGroups($routeParams.organisation).then(function(data, status, headers, config)
                    {
                        for(i=0;i<data.length;i++){
                            groups.push(data[i]);
                        }

                        OrganisationService.getOrganisation($routeParams.organisation).then(function(data, status, headers, config){
                            $scope.organisationName = data[0].name;
                            $scope.organisationId = data[0]._id;
                        });

                    });

            $scope.allGroups = groups;

            /* * POST NEW GROUP **/
            $scope.addGroup = function(newName){
                GroupService.postGroup(newName, $routeParams.organisation).success(function(data, status, headers, config)
                    {
                        $scope.allGroups = [];
                        GroupService.getGroups($routeParams.organisation).then(function(data, status, headers, config)
                        {
                            for(i=0;i<data.length;i++){
                            $scope.allGroups.push(data[i]);
                        }
                        });
                        $scope.newGroupName = "";
                        alert('Groep toegevoegd!');

                    }).error(function(data, status, headers, config)
                    {
                        // console.log(status);
                        // console.log(data);
                        // console.log(headers);
                        // console.log(config);
                    });
            };

            /* * ADD USERS TO ORGANISATION **/
            UserGroupService.getAllUsers().then(function(data, status, headers, config)
                {
                    for(i=0;i<data.length;i++){
                        $scope.allUsers.push(data[i]);
                    }

                });

            $scope.selectedUsersToAddToOrganisation = [];

            // when checked, push newUserId to array, else splice the userid from the array
            $scope.toggleSelectionOfUsersAddOrganisation = function toggleSelection(userId) {
                var idx = $scope.selectedUsersToAddToOrganisation.indexOf(userId);

                // is currently selected
                if (idx > -1) {
                  $scope.selectedUsersToAddToOrganisation.splice(idx, 1);
                }

                // is newly selected
                else {
                  $scope.selectedUsersToAddToOrganisation.push(userId);
                }
            };

            // submits new userList
            $scope.submitNewUsersToOrganisation = function submitNewUsersToOrganisation(){
                for(i = 0; i < $scope.selectedUsersToAddToOrganisation.length; i++){
                    //console.log($scope.selectedUsersToMakeModerator[i]);
                    UserGroupService.putUserToOrganisation($scope.selectedUsersToAddToOrganisation[i], $routeParams.organisationid).then(function(data){
                        GroupService.getAllModeratorsOfOrganisation($routeParams.organisation).then(function(data, status, headers, config)
                        {
                            $scope.allModerators = [];
                            for(i=0;i<data.length;i++){
                                $scope.allModerators.push(data[i]);
                            }
                            alert('Gebruikers zijn aan de organisatie toegevoegd!');

                        });
                    });
                }
            };

            /* * ADD MODERATORS TO GROUP AND EDIT GROUP **/
            GroupService.getAllModeratorsOfOrganisation($routeParams.organisation).then(function(data, status, headers, config)
                        {
                            for(i=0;i<data.length;i++){
                                $scope.allModerators.push(data[i]);
                            }

                        });

            $scope.selectionOfModerators = [];

            // when checked, push moderatorid to array, else splice the userid from the array
            $scope.toggleSelectionOfModerators = function toggleSelection(userId) {
                var idx = $scope.selectionOfModerators.indexOf(userId);

                // is currently selected
                if (idx > -1) {
                  $scope.selectionOfModerators.splice(idx, 1);
                }

                // is newly selected
                else {
                  $scope.selectionOfModerators.push(userId);
                }

                console.log($scope.selectionOfModerators);
            };

            // submits new groupName
            $scope.submitEditedGroup = function submitEditedGroup(newName, group){
                UserGroupService.pushNewGroupName(group._id, newName, $scope.selectionOfModerators).then(function(data, status, headers, config)
                    {
                        alert('Groep bijgewerkt!');
                    });
            };

            /* * MAKE USERS MODERATOR OF ORGANISATION **/
            UserGroupService.getAllUsersOfOrganisation($routeParams.organisation).then(function(data, status, headers, config)
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

            };

            // submits new moderatorlist
            $scope.submitNewModeratorList = function submitNewModeratorList(){
                for(i = 0; i < $scope.selectedUsersToMakeModerator.length; i++){
                    UserGroupService.makeUserModerator($scope.selectedUsersToMakeModerator[i]);
                }
                alert('Leraren aangemaakt!');
            };

            if(typeof($routeParams.groupid) != "undefined"){
                var users = [];

                // gets users and moderators of group, and push them to array
                UserGroupService.getGroup($routeParams.groupid).then(function(data, status, headers, config)
                        {
                            for(i=0;i<data[0].participants.length;i++){
                                users.push(data[0].participants[i]);
                            }

                            $scope.groupTitle = data[0].title;
                        });

                $scope.usersOfGroup = users;

                var allUsers = [];

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
                                alert('Leerlingen succesvol aan groep toegevoegd!');
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
            }
        }

    }]);
};