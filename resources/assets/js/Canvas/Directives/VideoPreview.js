module.exports = function(canvas)
{
    canvas.directive('videopreview', [ '$timeout', function($timeout)
    {
        return {

            restrict: 'AC',
            link: function(scope, element, attrs)
            {
                var options = scope.$eval(attrs.videopreview);

                var $preview = '<div class="preview">' +
                                   '<video width="100%" height="100%" autoplay>' +
                                       '<source src="' + options.href + '" type="' + options.mimetype + '" />' +
                                   '</video>' +
                               '</div>';

                var timeout = null;

                element.on('mouseenter', function()
                {
                    timeout = $timeout(function()
                    {
                        $(element).append($preview);

                    }, 250);
                });

                element.on('mouseleave', function()
                {
                    $timeout.cancel(timeout);

                    $(element).find('.preview').remove();
                });
            }
        }
    }]);
};