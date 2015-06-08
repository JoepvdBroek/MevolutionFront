module.exports = function(canvas)
{
    canvas.directive('popover', [ '$timeout', function($timeout)
    {
        return {

            restrict: 'AC',
            link: function(scope, element, attrs)
            {
                $timeout(function()
                {
                    $(element).popover
                    ({
                         //trigger: 'focus',
                         placement: 'bottom',
                         html: true,
                         content: function()
                         {
                             return $(element).find('.content').html()
                         }
                     });
                });
            }
        }
    }]);
};