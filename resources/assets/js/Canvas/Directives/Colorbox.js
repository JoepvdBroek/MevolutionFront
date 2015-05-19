module.exports = function(canvas)
{
    canvas.directive('colorbox', function($compile)
    {
        return {

            restrict: 'AC',
            link: function(scope, element, attrs)
            {
                var colorbox = scope.$eval(attrs.colorbox);

                element.click('bind', function(e)
                {
                    if (e.preventDefault)
                    {
                        e.preventDefault();
                    }

                    if (e.preventPropagation)
                    {
                        e.preventPropagation();
                    }

                    var cb = angular.extend({}, colorbox,
                    {
                        href: colorbox.href,
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
    });
};