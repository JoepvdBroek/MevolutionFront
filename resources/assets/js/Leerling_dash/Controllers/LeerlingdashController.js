module.exports = function(leerlingDash)
{
    leerlingDash.controller('LeerlingdashController', [ '$scope', '$location', '$window','$routeParams', '$anchorScroll', '$route', '$sce', 'LearningFactory', 'UserService',
                                                        function($scope, $location, $window, $routeParams, $anchorScroll, $route, $sce, LearningFactory, UserService)
    {

        if(typeof($routeParams.orgid) != "undefined" && typeof($routeParams.userid) != "undefined"){

            organisationId = $routeParams.orgid;
            userId = $routeParams.userid;

            populateDashboard(organisationId, userId);

        }else{
            UserService.getUserInfo().then(function(data, status, headers, config){

                $scope.user = data.data[0];
                organisationId = $scope.user.organization._id;
                userId = $scope.user._id;

                populateDashboard(organisationId, userId);         
            });
        }

        function populateDashboard(organisationId, userId){

            LearningFactory.getLearningParticipant(organisationId, userId).then(function(data2, status, headers, config)
            {
                $scope.learningsParticipant = data2;

                console.log(data2);
            });
        }

        $scope.trustSrc = function(src)
        {
            return $sce.trustAsResourceUrl(src);
        };


        $scope.collapse = function(e) {
            $('.'+e).toggleClass("display-inline", 1000);
        }

    }]);
};