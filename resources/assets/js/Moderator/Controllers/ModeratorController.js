module.exports = function(moderator)
{
    moderator.controller('ModeratorController', [ '$scope', '$location', '$window', '$routeParams', 'ModeratorFactory', 'LearningFactory', 'NiveauFactory', 'UserService', function($scope, $location, $window, $routeParams, ModeratorFactory, LearningFactory, NiveauFactory, UserService)
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
                    });

                }).error(function(data, status, headers, config)
                {

                });
        };

        $scope.editLearning = function(newTitle, newColor, learning){
            LearningFactory.editLearning(organisationId, learning._id, newTitle, newColor).then(function(data, status, headers, config){

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
                $scope.niveaus = data;
            });
        }

        $scope.addNiveau = function(newTitle, newDescription, newSection){
            NiveauFactory.postNiveau($routeParams.orgid, $routeParams.learningid, newTitle, newDescription, newSection).success(function(data, status, headers, config)
            {
                NiveauFactory.getNiveausOfLearning($routeParams.orgid, $routeParams.learningid).then(function(data, status, headers, config){
                    $scope.niveaus = data;
                });
            }).error(function(data, status, headers, config)
            {

            });
        };

        $scope.editNiveau = function(newTitle, newDescription, newSection, niveau){
            NiveauFactory.editNiveau($routeParams.orgid, $routeParams.learningid, niveau._id, newTitle, newDescription, newSection).then(function(data, status, headers, config){

            });
        };

        $scope.deleteNiveau = function(niveauId, index){
            NiveauFactory.deleteNiveau($routeParams.orgid, $routeParams.learningid, niveauId).then(function(data, status, headers, config){
                $scope.niveaus.splice(index, 1);
            });
        };

    }]);
};