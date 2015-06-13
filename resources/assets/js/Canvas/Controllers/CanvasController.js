module.exports = function(canvas)
{
    canvas.controller('CanvasController', [ '$scope', '$css', '$sce', '$routeParams', '$timeout', 'CanvasService', function($scope, $css, $sce, $routeParams, $timeout, CanvasService)
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

        $scope.dragEnd = function()
        {
            var objectId = $(this).data('id');
            var fase = $(this).data('fase');
            var $draggabilly = $(this).data('draggabilly');

            CanvasService.updateCanvasObjectPosition($routeParams.canvasid, objectId, fase, $draggabilly.position.x, $draggabilly.position.y);
        };
    }]);
};
