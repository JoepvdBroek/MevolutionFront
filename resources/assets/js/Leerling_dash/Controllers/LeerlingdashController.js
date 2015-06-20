module.exports = function(leerlingDash)
{
    leerlingDash.controller('LeerlingdashController', [ '$scope', '$location', '$window','$routeParams', '$anchorScroll', '$route', '$sce', 'LearningFactory', 'UserService', 'AuthenticationService',
                                                        function($scope, $location, $window, $routeParams, $anchorScroll, $route, $sce, LearningFactory, UserService, AuthenticationService)
    {

        $scope.isAdmin = AuthenticationService.isAdmin;
        $scope.isModerator = AuthenticationService.isModerator;

        $scope.goBack = function(){
            console.log("test");
            $window.history.back();
        };

        function fancyAlert(title, text){
            $('.dialog .d-success h2').html(title);
            $('.dialog .d-success p').html(text);

            $('.dialog').fadeTo( 500, 0.8, function(){
                $('.dialog').fadeTo( "slow", 0);
            }).delay(1000);
        };

        $scope.test = function(){
            alert();
        };

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
                var regex = /<br\s*[\/]?>/gi;
                //console.log(data2[0].niveaux.length);
                for(i = 0; i < data2.length; i++){
                    //console.log(data2[i].niveaux);
                    for(a = 0; a < data2[i].niveaux.length; a++){
                        console.log(data2[i].niveaux[a]);

                        data2[i].niveaux[a].descriptionEdited = data2[i].niveaux[a].description.replace(regex, "\n");
                    }
                }
                $scope.learningsParticipant = data2;

                console.log(data2);
            });
        }

        $scope.trustSrc = function(src)
        {
            return $sce.trustAsResourceUrl(src);
        };


        $scope.collapse = function(e) {
            $('.'+e).slideToggle(100);
        };


        $scope.accomplished = function(leerlijnId, niveauId, newAccomplished){
            LearningFactory.putLearningParticipant(organisationId, leerlijnId, niveauId, userId, newAccomplished).then(function(data, status, headers, config){
                LearningFactory.getLearningParticipant(organisationId, userId).then(function(data, status, headers, config)
                {
                    $scope.learningsParticipant = data;
                    if(newAccomplished){
                        fancyAlert("Succes!", "De leerlijn is afgerond.");
                    }else{
                        fancyAlert("Succes!", "De leerlijn is niet meer afgerond.");
                    }
                });
            });
        };




    }]);
};