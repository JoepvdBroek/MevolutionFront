module.exports = function(canvas)
{
    canvas.directive('colorbox', [ '$compile', function($compile)
    {
        return {

            restrict: 'AC',
            link: function(scope, element, attrs)
            {
                var colorbox = scope.$eval(attrs.colorbox);

                element.click('bind', function(e)
                {
                    var $parent = $(element).parent().parent();
                    var prevent = $parent.data('preventColorbox');

                    if (e.preventDefault)
                    {
                        e.preventDefault();
                    }

                    if (e.preventPropagation)
                    {
                        e.preventPropagation();
                    }

                    if (prevent == true)
                    {
                        $parent.data('preventColorbox', false);
                        return false;
                    }

                    var cb = angular.extend({}, colorbox,
                    {
                        onComplete: function()
                        {
                            var s = scope.$parent;

                            s.$apply(function()
                            {
                                var content = $('#cboxLoadedContent');
                                $compile(content)(s);
                            });
                        }
                    });

                    var cb = $.colorbox(cb);

                    return false;
                });

                //$(element).colorbox(attrs.colorbox);
            }
        }
    }]);
};