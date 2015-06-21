
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

                scope.currentObject = function(object, e) {
                    scope.testobject.obj = object;
                    scope.clickedElement = '.'+e.currentTarget.classList[0];
                    
                    $(scope.clickedElement).on('click', function (e) {
                        $(scope.clickedElement).not(this).popover('hide');
                    });
                }
            }
        }
    }]);
};