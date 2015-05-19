module.exports = function(canvas)
{
    canvas.controller('AudioController', [ '$scope', 'CanvasService', function($scope, CanvasService)
    {
        var scope = $scope.$parent;

        setTimeout(function(){ $('.audio' + scope.object.object._id)[0].load(); }, 0);
    }]);
};
