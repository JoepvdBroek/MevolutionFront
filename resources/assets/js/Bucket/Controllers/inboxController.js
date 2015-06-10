module.exports = function(inbox)
{
    inbox.controller('InboxController', [ '$scope', '$location', '$window', 'BucketService', 'UserService', 'GroupService', 'UserGroupService', function($scope, $location, $window, BucketService, UserService, GroupService, UserGroupService)
    {

        var groups = [];
        var studentList = [];
        $scope.studentList= [];
        $scope.leerlijnen = [];
        $scope.fullInbox = [];
        $scope.selectedStudent = "";
        var organisation;
        var selectedObject;
        var selectedStudent;

        UserService.getUserInfo().then(function(userdata){
            if (userdata.data[0].organization !== 'null') {
                organisation = userdata.data[0].organization;
                GroupService.getGroups(organisation._id).then(function(groupdata){
                    for (var i = 0; i<groupdata.length; i++) {
                        groups.push(groupdata[i]);
                    };
                    $scope.groups = groups;
                    $scope.selectedGroup = $scope.groups[0];
                    console.log(groupdata);
                });/*
                for (i = 0; i < data.data[0].organization.length; i++) {
                    organisations[i] = data.organization[i];
                    console.log(data.organization[i]);
                }*/
            }
        });

        $scope.getStudents = function(id){
            UserGroupService.getGroup(id).then(function(data){
                console.log(data[0]);
                $scope.studentList = data[0].participants;
            });
            


            /*
            UserGroupService.getGroup(id).then(function(data){
                for(i=0;i<data.length;i++){
                    studentList.push(data[i]);

                } console.log(studentList);
                $scope.studentList = studentList;
            });*/
        }


        //komt 404 terug, kan nu niet testen
        var getInbox = function(id){
            selectedStudent = id;
            BucketService.getInbox(id).then(function(data){
                $scope.fullInbox = data[0];
                if (data.length===0) {
                    $scope.fullInbox = [];
                } else {
                    $scope.fullInbox = data;
                };
            });
        };

            $scope.getInbox = function(id, firstname){
            selectedStudent = id;
            $scope.selectedStudent = ""+firstname+"";
            BucketService.getInbox(id).then(function(data){
                $scope.fullInbox = data[0];
                if (data.length===0) {
                    $scope.fullInbox = [];
                } else {
                    $scope.fullInbox = data;
                };
            });


            /*
            UserGroupService.getGroup(id).then(function(data){
                for(i=0;i<data.length;i++){
                    studentList.push(data[i]);

                } console.log(studentList);
                $scope.studentList = studentList;
            });*/
        }
        
        $scope.getPopUp = function(object){
            selectedObject = object;
            BucketService.getLeerlijnen(organisation._id).then(function(data){
                var leerlijnen = data;
                $scope.leerlijnen = leerlijnen;
                console.log(data);
            });
        }

        $scope.addObject = function(leerlijn, niveau){
            if (niveau.participants.length === 0) {
                createNewParticipant(niveau, leerlijn);
                /*
                BucketService.makeParticipant(organisation._id, leerlijn._id, niveau._id, selectedStudent).then(function(participantData){
                    var participant = participantData;
                    console.log(participantData);
                    combineObjectLeerlijn(leerlijn, niveau, participant);
                    
                });*/
            } else { 
                checkParticipants(niveau, leerlijn);
                /*
                var participant = niveau.participants[0].participant._id;
                console.log(participant);
                combineObjectLeerlijn(leerlijn, niveau, participant);
                */
            }
        }

        var combineObjectLeerlijn = function(leerlijn, niveau, participant){
            BucketService.addObject(organisation._id, leerlijn._id, niveau._id, participant, selectedObject._id).then(function(data){
                {
                    console.log(data);
                    alert("toegevoegd");
                    getInbox(selectedStudent);

                }
            });
        }

        var checkParticipants = function(niveau, leerlijn){
            var newParticipant;
            var tempParticipants = [];
            for (var i = 0; i < niveau.participants.length; i++) {
                tempParticipants.push(niveau.participants[i].participant._id);
            }
            if (_.contains(tempParticipants, selectedStudent)) {
                combineObjectLeerlijn(leerlijn, niveau, selectedStudent);
            } else {
                createNewParticipant(niveau, leerlijn);
            }

/*
            for (var i =0; i < niveau.participants.length; i++) {
                if (selectedStudent === (niveau.participants[i].participant._id)) {
                    console.log(selectedStudent);
                    console.log(niveau.participants[i].participant._id);

                    combineObjectLeerlijn(leerlijn, niveau, niveau.participants[i].participant._id);
                    //niet doen. participant komt overeen met user
                } else {
                    console.log(selectedStudent);
                    console.log(niveau.participants[i].participant._id);
                    newParticipant = selectedStudent;
                    
                    //nieuwe participant aanmaken. participant komt niet overheen met user
                };
            };
            */
        };

        var createNewParticipant = function(niveau, leerlijn){
            BucketService.makeParticipant(organisation._id, leerlijn._id, niveau._id, selectedStudent).then(function(participantData){
                    var participant = participantData;
                    console.log(participantData);
                    combineObjectLeerlijn(leerlijn, niveau, participant.participant);
                });
        }



/*








        $scope.fullInbox = [];

            BucketService.getInbox().then(function(data){
            for(i=0;i<data.length;i++){
                $scope.fullInbox.push(data[i]);
            }   
        });

        $scope.deleteItem = function(item){
            BucketService.deleteItem(item).then(function(data){
                alert("you deleted item: " + item);
            })
        }

        */
    }]);
};