module.exports = function(canvas)
{
    canvas.directive('zoomtarget', function()
    {
        return {

            restrict: 'AC',
            link: function(scope, element, attrs)
            {
                $(element).zoomTarget();
            }
        }
    });
};