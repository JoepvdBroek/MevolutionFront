module.exports = function(canvas)
{
    canvas.directive('draggabilly', function($compile)
    {
        return {

            restrict: 'AC',
            link: function(scope, element, attrs)
            {
                var draggabilly = scope.$eval(attrs.draggabilly);

                $(element).draggabilly(draggabilly);
            }
        }
    });
};