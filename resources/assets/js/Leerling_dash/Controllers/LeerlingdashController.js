module.exports = function(leerlingDash)
{
    leerlingDash.controller('LeerlingdashController', [ '$scope', '$location', '$window', '$anchorScroll', '$route', function($scope, $location, $window, $anchorScroll, $route)
    {
        var leerlijnen = [ {'name': 'leerlijn1', 'levels': [
                                {'name': 'niveau 1', 'objects': [
                                    {'type': 'video', 'icon': 'fa-play'},
                                    {'type': 'audio', 'icon': 'fa-music'},
                                    {'type': 'audio', 'icon': 'fa-music'}]
                                },
                                {'name': 'niveau 2', 'objects': [
                                    {'type': 'audio', 'icon': 'fa-music'},
                                    {'type': 'audio', 'icon': 'fa-music'}]
                                },
                                {'name': 'niveau 3', 'objects': [
                                    {'type': 'audio', 'icon': 'fa-music'}]
                                },
                                {'name': 'niveau 4', 'objects': [
                                    {'type': 'audio', 'icon': 'fa-music'}]
                                },
                                {'name': 'niveau 5', 'objects': []
                                }]
                            },
                            {'name': 'leerlijn2', 'levels': [
                                {'name': 'niveau 1', 'objects': [
                                    {'type': 'video', 'icon': 'fa-play'},
                                    {'type': 'audio', 'icon': 'fa-music'},
                                    {'type': 'audio', 'icon': 'fa-music'},
                                    {'type': 'audio', 'icon': 'fa-music'},
                                    {'type': 'audio', 'icon': 'fa-music'},
                                    {'type': 'audio', 'icon': 'fa-music'},
                                    {'type': 'audio', 'icon': 'fa-music'},
                                    {'type': 'audio', 'icon': 'fa-music'},
                                    {'type': 'audio', 'icon': 'fa-music'}]
                                },
                                {'name': 'niveau 2', 'objects': [
                                    {'type': 'audio', 'icon': 'fa-music'},
                                    {'type': 'audio', 'icon': 'fa-music'},
                                    {'type': 'audio', 'icon': 'fa-music'}]
                                },
                                {'name': 'niveau 3', 'objects': []
                                },
                                {'name': 'niveau 4', 'objects': []
                                },
                                {'name': 'niveau 5', 'objects': []
                                }]
                            },
                            {'name': 'leerlijn3', 'levels': [
                                {'name': 'niveau 1', 'objects': [
                                    {'type': 'video', 'icon': 'fa-play'},
                                    {'type': 'audio', 'icon': 'fa-music'},
                                    {'type': 'audio', 'icon': 'fa-music'}]
                                },
                                {'name': 'niveau 2', 'objects': [
                                    {'type': 'audio', 'icon': 'fa-music'},
                                    {'type': 'audio', 'icon': 'fa-music'},
                                    {'type': 'audio', 'icon': 'fa-music'}]
                                },
                                {'name': 'niveau 3', 'objects': [
                                    {'type': 'audio', 'icon': 'fa-music'}]
                                },
                                {'name': 'niveau 4', 'objects': [
                                    {'type': 'audio', 'icon': 'fa-music'},
                                    {'type': 'audio', 'icon': 'fa-music'}]
                                },
                                {'name': 'niveau 5', 'objects': [
                                    {'type': 'audio', 'icon': 'fa-music'}]
                                }]
                            }
                         ]

        $scope.leerlijnen = leerlijnen;
		
        $scope.collapse = function(e) {
            console.log('.'+e);
            $('.'+e).toggleClass("display-inline");
        }

    }]);
};