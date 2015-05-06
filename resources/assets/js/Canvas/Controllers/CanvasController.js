module.exports = function(canvas)
{
    canvas.controller('CanvasController', [ '$scope', '$css', function($scope, $css)
    {
        $css.bind({ href: 'test.css' }, $scope);

        $scope.test = function()
        {
            console.log('test');
        }
    }]);
};