module.exports = function(bucket)
{
    bucket.controller('BucketController', [ '$scope', '$location', '$window', 'BucketService', 'UserService', function($scope, $location, $window, BucketService, UserService)
    {

        $scope.fullBucket = [];
        /*
        $scope.getBucket = function(){
            BucketService.getBucket().then(function(data){
            for(i=0;i<data.length;i++){
                $scope.fullBucket.push(data[i]);
            }
        })
        }
*/
            BucketService.getBucket().then(function(data){
            for(i=0;i<data.length;i++){
                $scope.fullBucket.push(data[i]);
            }
        });

        $scope.deleteItem = function(item){
            BucketService.deleteItem(item).then(function(data){
                alert("you deleted item: " + item);
            })
        }
    }]);
};