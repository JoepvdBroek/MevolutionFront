module.exports = function(bucket)
{
    bucket.controller('BucketController', [ '$scope', '$location', '$window', 'BucketService', 'UserService', function($scope, $location, $window, BucketService, UserService)
    {

    	var bucket = [];
        $scope.fullBucket = [];

            BucketService.getBucket().then(function(data){
                bucketSize = (data.length -1);
            for(i=0;i<data.length;i++){
                bucket.push(data[i]);
            }
            $scope.fullBucket = bucket;
        });

        $scope.deleteItem = function(item){
            //BucketService.deleteItem(item).then(function(data){
                alert("you deleted item: " + item);
            
        }
    }]);
};