module.exports = function(moderator)
{
    moderator.controller('ModeratorController', [ '$scope', '$location', '$window', '$routeParams', 'ModeratorFactory', 'LearningFactory', 'NiveauFactory', 'UserService', 'OrganisationService', 'GroupService', 'UserGroupService', function($scope, $location, $window, $routeParams, ModeratorFactory, LearningFactory, NiveauFactory, UserService, OrganisationService, GroupService, UserGroupService)
    {
        /* *  MODERATOR LEARNINGS **/   

        $scope.go = function(path){
            console.log(path);
            $location.path(path);
        };

        var organisationId = "";

        $scope.goBack = function goBack(){
            $window.history.back();
        }

        function refillUsersOfOrganisation(){
            UserGroupService.getAllUsersOfOrganisation($routeParams.organisation).then(function(data, status, headers, config)
                {
                    $scope.usersOfOrganisation = [];
                    for(i=0;i<data.length;i++){
                        data[i].isChecked = false;
                        for(a = 0; a < $scope.allModerators.length; a++){
                            if($scope.allModerators[a]._id == data[i]._id){
                                data[i].isChecked = true;
                                excistingModeratorsInOrganisation.push(data[i]._id);
                            }
                        }
                        $scope.usersOfOrganisation.push(data[i]);
                    }
                });
        }

        function refillExcistingUsersInOrganisation(){
            $scope.allUsers = [];
            UserGroupService.getAllUsers().then(function(data, status, headers, config)
                {
                    for(i=0;i<data.length;i++){
                        data[i].isChecked = false;
                        for(a = 0; a < $scope.usersOfOrganisation.length; a++){
                            if($scope.usersOfOrganisation[a]._id == data[i]._id){
                                data[i].isChecked = true;
                                excistingUsersInOrganisation.push(data[i]._id);
                            }
                        }
                        $scope.allUsers.push(data[i]);
                    }
                    $scope.selectedUsersToAddToOrganisation = excistingUsersInOrganisation;
                });
        }

        function recheckModeratorList(){
            UserGroupService.getAllUsersOfOrganisation($routeParams.organisation).then(function(data, status, headers, config)
                {
                    $scope.usersOfOrganisation = [];
                    for(i=0;i<data.length;i++){
                        data[i].isChecked = false;
                        for(a = 0; a < $scope.allModerators.length; a++){
                            if($scope.allModerators[a]._id == data[i]._id){
                                data[i].isChecked = true;
                                excistingModeratorsInOrganisation.push(data[i]._id);
                            }
                        }
                        $scope.usersOfOrganisation.push(data[i]);
                    }
                });
        }


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
            LearningFactory.deleteLearning(organisationId, learningId).then(function(data, status, headers, config){
                $scope.learnings.splice(index, 1);
            });
        };

        /* *  MODERATOR NIVEAUS **/
        if(typeof($routeParams.learningid) != "undefined"){
            NiveauFactory.getNiveausOfLearning($routeParams.orgid, $routeParams.learningid).then(function(data, status, headers, config){ 
                var regex = /<br\s*[\/]?>/gi;
                for(i = 0; i < data.length; i++){
                    data[i].description = data[i].description.replace(regex, "\n");
                }

                $scope.niveaus = data;
                LearningFactory.getLearning($routeParams.orgid, $routeParams.learningid).then(function(data, status, headers, config){
                    $scope.learningName = data.title;
                });
            });
        }

        $scope.addNiveau = function(newTitle, newDescription){

            newDescription = newDescription.replace(/\r?\n/g, '<br />');

            NiveauFactory.postNiveau($routeParams.orgid, $routeParams.learningid, newTitle, newDescription).success(function(data, status, headers, config)
            {
                NiveauFactory.getNiveausOfLearning($routeParams.orgid, $routeParams.learningid).then(function(data, status, headers, config){
                    var regex = /<br\s*[\/]?>/gi;
                    for(i = 0; i < data.length; i++){
                        data[i].description = data[i].description.replace(regex, "\n");
                    }
                    $scope.niveaus = data;
                    $('#newNiveau').modal('hide');
                    alert('Niveau toegevoegd');
                    $scope.newTitle = "";
                    $scope.newDescription = "";
                    // $scope.newSection = "";
                });
            }).error(function(data, status, headers, config)
            {

            });
        };

        $scope.editNiveau = function(newTitle, newDescription, niveau){
            NiveauFactory.editNiveau($routeParams.orgid, $routeParams.learningid, niveau._id, newTitle, newDescription).then(function(data, status, headers, config){
                alert('Niveau bijgewerkt');
            });
        };

        $scope.deleteNiveau = function(niveauId, index){
                NiveauFactory.deleteNiveau($routeParams.orgid, $routeParams.learningid, niveauId).then(function(data, status, headers, config){
                    $scope.niveaus.splice(index, 1);
                });
        };

        /* * MODERATOR GROUPS **/

        if(typeof($routeParams.organisation) != "undefined"){
            var groups = [];
            $scope.allModerators = [];
            $scope.usersOfOrganisation = [];
            $scope.allUsers = [];

            $scope.singleOrganisationId = $routeParams.organisation;

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
                        $('#newGroup').modal('hide');
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        alert('Groep toegevoegd!');

                    }).error(function(data, status, headers, config)
                    {
                        // console.log(status);
                        // console.log(data);
                        // console.log(headers);
                        // console.log(config);
                    });
            };

            //$scope.selectedUsersToAddToOrganisation = [];
            var excistingUsersInOrganisation = [];
            /* * ADD USERS TO ORGANISATION **/
            UserGroupService.getAllUsers().then(function(data, status, headers, config)
                {
                    refillExcistingUsersInOrganisation();
                });
 
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

                //console.log($scope.selectedUsersToAddToOrganisation);
            };

            // submits new userList
            $scope.submitNewUsersToOrganisation = function submitNewUsersToOrganisation(){
                for(i = 0; i < $scope.selectedUsersToAddToOrganisation.length; i++){
                    UserGroupService.putUserToOrganisation($scope.selectedUsersToAddToOrganisation[i], $routeParams.organisation).then(function(data){
                        recheckModeratorList();
                    });
                    
                }
                
                alert('Gebruikers zijn aan de organisatie toegevoegd!');
            };

            /* * ADD MODERATORS TO GROUP AND EDIT GROUP **/

            GroupService.getAllModeratorsOfOrganisation($routeParams.organisation).then(function(data, status, headers, config)
                {
                    for(i=0;i<data.length;i++){
                        $scope.allModerators.push(data[i]);
                    }

                });

            $scope.selectionOfModerators = [];

            $scope.fillModeratorlist = function fillModeratorlist(groupId){
                $scope.selectionOfModerators = [];
                UserGroupService.getGroup(groupId).then(function(data){
                    for(i = 0; i < data[0].moderators.length; i++){
                         $scope.selectionOfModerators.push(data[0].moderators[i]._id);
                    }
                });
            }
            
            // when checked, push moderatorid to array, else splice the userid from the array
            $scope.toggleSelectionOfModerators = function toggleSelection(userId, groupId) {

                var idx = $scope.selectionOfModerators.indexOf(userId);

                // is currently selected
                if (idx > -1) {
                  $scope.selectionOfModerators.splice(idx, 1);
                }

                // is newly selected
                else {
                  $scope.selectionOfModerators.push(userId);
                }
                
            };

            // submits new groupName
            $scope.submitEditedGroup = function submitEditedGroup(newName, group){
                UserGroupService.pushNewGroupName(group._id, newName, $scope.selectionOfModerators).then(function(data, status, headers, config)
                    {
                        $scope.allGroups = [];
                        GroupService.getGroups($routeParams.organisation).then(function(data, status, headers, config)
                        {
                            for(i=0;i<data.length;i++){
                                $scope.allGroups.push(data[i]);
                            }
                        });
                        alert('Groep bijgewerkt!');
                    });
            };

            /* * MAKE USERS MODERATOR OF ORGANISATION **/

            var excistingModeratorsInOrganisation = [];

            UserGroupService.getAllUsersOfOrganisation($routeParams.organisation).then(function(data, status, headers, config)
                        {
                            for(i=0;i<data.length;i++){
                                data[i].isChecked = false;
                                for(a = 0; a < $scope.allModerators.length; a++){
                                    if($scope.allModerators[a]._id == data[i]._id){
                                        data[i].isChecked = true;
                                        excistingModeratorsInOrganisation.push(data[i]._id);
                                    }
                                }
                                $scope.usersOfOrganisation.push(data[i]);
                            }
                        });

            $scope.selectedUsersToMakeModerator = excistingModeratorsInOrganisation;

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

                //console.log($scope.selectedUsersToMakeModerator);

            };

            // submits new moderatorlist
            $scope.submitNewModeratorList = function submitNewModeratorList(){
                for(i = 0; i < $scope.selectedUsersToMakeModerator.length; i++){
                    UserGroupService.makeUserModerator($scope.selectedUsersToMakeModerator[i]);
                }
                GroupService.getAllModeratorsOfOrganisation($routeParams.organisation).then(function(data, status, headers, config)
                        {
                            $scope.allModerators = [];
                            for(i=0;i<data.length;i++){
                                $scope.allModerators.push(data[i]);
                            }

                        });
                alert('Leraren aangemaakt!');
            };

            // add user part
            $scope.submitNewUser = function submitNewUser(username, password1, password2, email, firstName, middleName, surName){
                var user = {
                    username: username,
                    password: password1,
                    email: email,
                    firstName: firstName,
                    middleName: middleName,
                    surName: surName
                };
                var usernameExists = false;
                for(i = 0; i < $scope.allUsers.length; i++){
                    if($scope.allUsers[i].username == username){
                        usernameExists = true;
                    }
                }
                if( password1 == password2 && !usernameExists){
                    GroupService.postUser(user, $routeParams.organisation).then(function(data){ 
                        $('.modal').modal('hide');
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        alert('Gebruiker is aan de organisatie toegevoegd.');
                        refillUsersOfOrganisation();
                        refillExcistingUsersInOrganisation();
                        $scope.username = "";
                        $scope.password1 = "";
                        $scope.password2 = "";
                        $scope.email = "";
                        $scope.firstName = "";
                        $scope.middleName = "";
                        $scope.surName = "";
                    });
                } else if(password1 != password2){
                    alert('Wachtwoord komt niet overeen, vul deze aub opnieuw in');
                    $scope.password1 = "";
                    $scope.password2 = "";
                } else {
                    alert('Gebruikersnaam al in gebruik, kies aub een andere');
                    $scope.username = "";
                }
                
            };

            if(typeof($routeParams.groupid) != "undefined"){
                var users = [];
                var allUsers = [];
                var excistingUsersInGroup = [];
                // gets users and moderators of group, and push them to array
                UserGroupService.getGroup($routeParams.groupid).then(function(data, status, headers, config)
                        {
                            for(i=0;i<data[0].participants.length;i++){
                                users.push(data[0].participants[i]);
                            }

                            $scope.groupTitle = data[0].title;
                            UserGroupService.getAllUsersOfOrganisation($scope.singleOrganisationId).then(function(data, status, headers, config)
                            {
                                for(i=0;i<data.length;i++){
                                    data[i].isChecked = false;
                                    for(a = 0; a < users.length; a++){
                                        if(users[a]._id == data[i]._id){
                                            data[i].isChecked = true;
                                            excistingUsersInGroup.push(data[i]._id);
                                        }
                                    }
                                    allUsers.push(data[i]);
                                }
                            });
                        });

                $scope.usersOfGroup = users;

                
                // gets all users so they can be displayed when adding users to a group
                // UserGroupService.getAllUsers().then(function(data, status, headers, config)
                //         {
                //             for(i=0;i<data.length;i++){
                //                 data[i].isChecked = false;
                //                 for(a = 0; a < users.length; a++){
                //                     if(users[a]._id == data[i]._id){
                //                         data[i].isChecked = true;
                //                         excistingUsersInGroup.push(data[i]._id);
                //                     }
                //                 }
                //                 allUsers.push(data[i]);
                //             }
                //         });

                

                

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

                $scope.selectionOfUsers = excistingUsersInGroup;

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
                    //console.log($scope.selectionOfUsers);

                };
            }
        }

    }]);
};