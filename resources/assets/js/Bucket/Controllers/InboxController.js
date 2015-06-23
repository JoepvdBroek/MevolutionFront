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
        $scope.organisation;
        $scope.selectedStudentId;
        var selectedObject;
        var selectedStudent;
        var tempToelichtingen = [];

        UserService.getUserInfo().then(function(userdata){
            if (userdata.data[0].organization !== 'null') {
                $scope.organisation = userdata.data[0].organization;
                GroupService.getGroups($scope.organisation._id).then(function(groupdata){
                    for (var i = 0; i<groupdata.length; i++) {
                        groups.push(groupdata[i]);
                    };
                    $scope.groups = groups;
                    $scope.selectedGroup = $scope.groups[0];
                    console.log(groupdata);
                });
            }
        });

        $scope.getStudents = function(id){
            UserGroupService.getGroup(id).then(function(data){
                console.log(data[0]);
                $scope.studentList = data[0].participants;
            });
        }

        var getInbox = function(id){
            selectedStudent = id;
            $scope.selectedStudentId = id;
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
            $scope.fullInbox = [];
            selectedStudent = id;
            $scope.selectedStudentId = id;
            tempToelichtingen = [];
            $scope.selectedStudent = ""+firstname+"";
            BucketService.getInbox(id).then(function(data){
                for (var i =0; i<data.length; i++) {
                    if (!data[i].filepath){
                        $scope.fullInbox.push(data[i]);
                    }
                }
            });
        }
        
        $scope.getPopUp = function(object){
            selectedObject = object;
            BucketService.getLeerlijnen($scope.organisation._id).then(function(data){
                var leerlijnen = data;
                var regex = /<br\s*[\/]?>/gi;
                for(i = 0; i < leerlijnen.length; i++){
                    var leerlijn = leerlijnen[i];
                    for(a = 0; a < leerlijn.niveaux.length; a++){
                        var niveaux = leerlijn.niveaux[a];
                        niveaux.newDescription = niveaux.description.replace(regex, '\n');
                    }
                }
                // for(i = 0; i < leerlijnen.niveaux.length; i++){
                //     data[i].newDescription = data[i].description.replace(regex, "\n");
                // }
                $scope.leerlijnen = leerlijnen;
                console.log(data);
            });
        }

        $scope.addObject = function(leerlijn, niveau){
            if (niveau.participants.length === 0) {
                createNewParticipant(niveau, leerlijn);
            } else { 
                checkParticipants(niveau, leerlijn);
            }
        }

        var combineObjectLeerlijn = function(leerlijn, niveau, participant){
            BucketService.addObject($scope.organisation._id, leerlijn._id, niveau._id, participant, selectedObject._id).then(function(data){
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
        };

        var createNewParticipant = function(niveau, leerlijn){
            BucketService.makeParticipant($scope.organisation._id, leerlijn._id, niveau._id, selectedStudent).then(function(participantData){
                    var participant = participantData;
                    console.log(participantData);
                    combineObjectLeerlijn(leerlijn, niveau, participant.participant);
                });
        }
    }]); 
};
