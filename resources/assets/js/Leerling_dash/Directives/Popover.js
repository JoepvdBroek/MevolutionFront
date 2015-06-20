
module.exports = function(canvas)
{
    canvas.directive('popover', [ '$timeout','$compile', function($timeout, $compile)
    {
        return {

            restrict: 'AC',
            scope:true,
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
                            return $(element).find('.content').html();
                        }
                    });
                });

                scope.currentObject = function(object) {
                    scope.testobject.obj = object;
                    console.log(scope.testobject.obj);
                }
            }
        }
    }]);
};