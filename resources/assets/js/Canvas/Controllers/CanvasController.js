module.exports = function(canvas)
{
    canvas.controller('CanvasController', [ '$scope', '$css', '$sce', 'CanvasService', function($scope, $css, $sce, CanvasService)
    {
        $scope.fases = [];

        CanvasService.getCanvas('553f9914c757d2c505273250').success(function(data)
        {
            $scope.fases = data.fases;
        });

        $scope.trustSrc = function(src)
        {
            return $sce.trustAsResourceUrl(src);
        };
    }]);
};
