module.exports = function(canvas)
{
    canvas.controller('VideoController', [ '$scope', 'CanvasService', function($scope, CanvasService)
    {
        var scope = $scope.$parent;

        setTimeout(function(){ $('.video' + scope.object.object._id)[0].load(); }, 0);
    }]);
};
