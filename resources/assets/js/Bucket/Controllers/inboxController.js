module.exports = function(inbox)
{
    inbox.controller('InboxController', [ '$scope', '$location', '$window', 'BucketService', 'UserService', 'GroupService', 'UserGroupService', function($scope, $location, $window, BucketService, UserService, GroupService, UserGroupService)
    {

        var groups = [];
        var studentList = [];
        $scope.studentList= [];

        UserService.getUserInfo().then(function(userdata){
            if (userdata.data[0].organization !== 'null') {
                var organisation = userdata.data[0].organization;
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
        $scope.getInbox = function(id){
            BucketService.getInbox(id).then(function(data){
                $scope.fullInbox = data[0];
                if (data.length===0) {
                    alert("Deze gebruiker heeft geen objecten");
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