module.exports = function(canvas)
{
    canvas.directive('colorbox', function($compile)
    {
        return {

            restrict: 'AC',
            link: function(scope, element, attrs)
            {
                element.click('bind', function(e)
                {
                    e.preventDefault();

                    var cb = $.colorbox
                    ({
                        href: attrs.colorbox,
                        onComplete: function()
                        {
                            var s = scope.$parent;

                            s.$apply(function()
                            {
                                var content = $('#cboxLoadedContent');
                                $compile(content)(s);

                                setTimeout(function()
                                {
                                    $('#video' + s.object.object._id)[0].load();

                                }, 1);
                            });
                        }
                    });
                });

                //$(element).colorbox(attrs.colorbox);
            }
        }
    });
};