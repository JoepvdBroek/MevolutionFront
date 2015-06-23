module.exports = function(admin)
{
    admin.controller('AdminController', [ '$scope', '$location', '$window', '$routeParams', '$rootScope', 'OrganisationService', 'GroupService', 'UserGroupService', 'AdminFactory' , 'LearningFactory', 'NiveauFactory', function($scope, $location, $window, $routeParams, $rootScope, OrganisationService, GroupService, UserGroupService, AdminFactory, LearningFactory, NiveauFactory)
    {

        $scope.go = function(path){
            console.log(path);
            $location.path(path);
        };

        // @TODO filter the ng-repeat on users who don't have an organisation yet???
        var history = [];

        $scope.goBack = function goBack(){
            $window.history.back();
        }

        function fancyAlert(title, text){
            $('.dialog .d-success h2').html(title);
            $('.dialog .d-success p').html(text);

            $('.dialog').fadeTo( 500, 0.8, function(){
                $('.dialog').fadeTo( "slow", 0);
            }).delay(1000);
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

        
        function getOrganisation(orgId){
            OrganisationService.getOrganisation(orgId).then(function(data, status, headers, config){
                $scope.organisationName = data[0].name;
               $scope.organisation = data[0];
           });
        }

        /* *  ADMIN DASH ORGANISATIONS  **/
        var organisations = [];

        OrganisationService.getOrganisations().then(function(data, status, headers, config)
                {
                    for(i=0;i<data.length;i++){
                        organisations.push(data[i]);
                    }

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
                    $('.modal').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();

                    fancyAlert("Succes!", "Organisatie toegevoegd");

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
        $scope.submitNewOrganisationName = function submitNewOrganisationName(newName, newColor, organisation){
            OrganisationService.postNewOrganisationName(newName, newColor, organisation._id).then(function(data, status, headers, config)
                {
                    $('.modal').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    fancyAlert("Succes!", "Organisatie bijgewerkt");
                });
        };

        /* *  ADMIN DASH GROUPS  **/

        var groups = [];
        var moderatorsOfOrganisation = [];
        var usersOfOrganisation = [];

        $scope.allModerators = [];
        $scope.usersOfOrganisation = [];
        $scope.allUsers = [];

        if(typeof $routeParams.organisationid !== 'undefined'){

            $scope.organisationId = $routeParams.organisationid;
            getOrganisation($scope.organisationId);

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
                    $('#newGroup').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    fancyAlert("Succes!", "Groep aangemaakt");
                    $scope.newGroupName = "";

                }).error(function(data, status, headers, config)
                {
                    // console.log(status);
                    // console.log(data);
                    // console.log(headers);
                    // console.log(config);
                });
            };

            var excistingUsersInOrganisation = [];

            UserGroupService.getAllUsers().then(function(data, status, headers, config)
                {
                    $scope.allUsers = [];
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

                console.log($scope.selectedUsersToAddToOrganisation);
            };

            // submits new userList
            $scope.submitNewUsersToOrganisation = function submitNewUsersToOrganisation(){
                for(i = 0; i < $scope.selectedUsersToAddToOrganisation.length; i++){
                    UserGroupService.putUserToOrganisation($scope.selectedUsersToAddToOrganisation[i], $routeParams.organisationid).then(function(data){
                        UserGroupService.getAllUsersOfOrganisation($routeParams.organisationid).then(function(data, status, headers, config)
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
                    });
                }
                
                fancyAlert("Succes!", "Gebruikers zijn aan de organisatie toegevoegd");
            };

            GroupService.getAllModeratorsOfOrganisation($routeParams.organisationid).then(function(data, status, headers, config)
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

                //console.log($scope.selectionOfModerators);
            };

            // submits new groupName
            $scope.submitNewGroupName = function submitNewGroupName(newName, group){
                UserGroupService.pushNewGroupName(group._id, newName, $scope.selectionOfModerators).then(function(data, status, headers, config)
                    { 
                        $scope.allGroups = [];
                        GroupService.getGroups($routeParams.organisationid).then(function(data, status, headers, config)
                        {
                            for(i=0;i<data.length;i++){
                                $scope.allGroups.push(data[i]);
                            }
                        });
                        
                        fancyAlert("Succes!", "Groep bijgewerkt");
                    });
            };

            var excistingModeratorsInOrganisation = [];

            UserGroupService.getAllUsersOfOrganisation($routeParams.organisationid).then(function(data, status, headers, config)
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

                console.log($scope.selectedUsersToMakeModerator);
            };

            // submits new moderatorlist
            $scope.submitNewModeratorList = function submitNewModeratorList(){
                for(i = 0; i < $scope.selectedUsersToMakeModerator.length; i++){
                    UserGroupService.makeUserModerator($scope.selectedUsersToMakeModerator[i]);
                    GroupService.getAllModeratorsOfOrganisation($routeParams.organisationid).then(function(data, status, headers, config)
                    {
                        $scope.allModerators = [];
                        for(i=0;i<data.length;i++){
                            $scope.allModerators.push(data[i]);
                        }

                    });
                }
                
                fancyAlert("Succes!", "Leraren aangemaakt");
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

                        fancyAlert("Succes!", "Gebruiker is aan de organisatie toegevoegd");

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
                    fancyAlert("Helaas!", "Wachtwoord komt niet overeen, vul deze aub opnieuw in");
                    $scope.password1 = "";
                    $scope.password2 = "";
                } else {
                    fancyAlert("Helaas", "Gebruikersnaam al in gebruik, kies aub een andere");
                    $scope.username = "";
                }
                
            };
        }

        /* *  ADMIN DASH USERS  **/

        var users = [];
        var moderators = [];
        var titleOfGroup = "";
        //var singleOrganisationId = "";
        if(typeof $routeParams.groupid !== 'undefined'){
            var allUsers = [];
            var moderatorsOfOrganisation = [];
            var excistingUsersInGroup = [];
            // gets users and moderators of group, and push them to array
            UserGroupService.getGroup($routeParams.groupid).then(function(data, status, headers, config)
                    {
                        for(i=0;i<data[0].participants.length;i++){
                            users.push(data[0].participants[i]);   
                        }

                        for(i=0;i<data[0].moderators.length;i++){
                            moderators.push(data[0].moderators[i]);     
                        }

                        $scope.singleOrganisationId = data[0].organization;

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


                        titleOfGroup = data[0].title;
                    });
            
            $scope.usersOfGroup = users;
            $scope.moderatorsOfGroup = moderators;
            $scope.groupTitle = titleOfGroup;
            
            
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
                            fancyAlert("Succes!", "Leerlingen succesvol aan groep toegevoegd");
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

            };
        }

        /* *  ADMIN DASH LEERLIJNEN/LEARNING  **/
        if(typeof $routeParams.orgid !== 'undefined'){
            var organisationId = $routeParams.orgid;
            $scope.organisationId = $routeParams.orgid;
            getOrganisation(organisationId);

            LearningFactory.getLearningsOfOrganisation(organisationId).then(function(data, status, headers, config)
            {
                $scope.learnings = data;
            });

            $scope.addLearning = function(newTitle, newColor){
                LearningFactory.postLearning(organisationId, newTitle, newColor).success(function(data, status, headers, config)
                    {
                        LearningFactory.getLearningsOfOrganisation(organisationId).then(function(data, status, headers, config)
                        {
                            $scope.learnings = data;
                            fancyAlert("Succes!", 'Leerlijn toegevoegd');
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
                            fancyAlert("Succes!", 'Leerlijn bijgewerkt');
                        });
                });
            };

            $scope.deleteLearning = function(learningId, index){
                LearningFactory.deleteLearning(organisationId, learningId).then(function(data, status, headers, config){
                    $scope.learnings.splice(index, 1);
                    fancyAlert("Succes!", 'Leerlijn verwijderd');
                });
            };

            function getNiveaus(){
                NiveauFactory.getNiveausOfLearning($routeParams.orgid, $routeParams.learningid).then(function(data, status, headers, config){ 
                    var regex = /<br\s*[\/]?>/gi;
                    $scope.niveaus = [];
                    for(i = 0; i < data.length; i++){
                        data[i].descriptionEdited = data[i].description.replace(regex, "\n");
                        console.log(data[i].descriptionEdited);
                        console.log(data[i].description);
                    }

                    $scope.niveaus = data;
                    LearningFactory.getLearning($routeParams.orgid, $routeParams.learningid).then(function(data, status, headers, config){
                        $scope.learningName = data.title;
                    });
                });
            }

            /* *  MODERATOR NIVEAUS **/
            if(typeof($routeParams.learningid) != "undefined"){
                $scope.organisationId = $routeParams.orgid;
                getNiveaus();
                getOrganisation($scope.organisationId)
            }

            $scope.addNiveau = function(newTitle, newDescription){

                newDescription = newDescription.replace(/\r?\n/g, '<br />');

                NiveauFactory.postNiveau($routeParams.orgid, $routeParams.learningid, newTitle, newDescription).success(function(data, status, headers, config)
                {
                    NiveauFactory.getNiveausOfLearning($routeParams.orgid, $routeParams.learningid).then(function(data, status, headers, config){
                        var regex = /<br\s*[\/]?>/gi;
                        for(i = 0; i < data.length; i++){
                            data[i].descriptionEdited = data[i].description.replace(regex, "\n");
                        }
                        $scope.niveaus = data;
                        $('#newNiveau').modal('hide');
                        fancyAlert("Succes!", 'Niveau toegevoegd');
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
                    fancyAlert("Succes!", 'Niveau bijgewerkt');
                    getNiveaus();
                });
            };

            $scope.deleteNiveau = function(niveauId, index){
                    NiveauFactory.deleteNiveau($routeParams.orgid, $routeParams.learningid, niveauId).then(function(data, status, headers, config){
                        $scope.niveaus.splice(index, 1);
                        fancyAlert("Succes!", 'Niveau verwijderd');
                    });
            };
        }

    }]);
 
};
