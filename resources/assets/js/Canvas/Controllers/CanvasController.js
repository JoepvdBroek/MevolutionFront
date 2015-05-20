module.exports = function(canvas)
{
    canvas.controller('CanvasController', [ '$scope', '$css', '$sce', '$routeParams', 'CanvasService', function($scope, $css, $sce, $routeParams, CanvasService)
    {
        $scope.fases = [];

        CanvasService.getCanvas($routeParams.canvasid).success(function(data)
        {
            $scope.fases = data.fases;
        });

        $scope.trustSrc = function(src)
        {
            return $sce.trustAsResourceUrl(src);
        };
    }]);
};
