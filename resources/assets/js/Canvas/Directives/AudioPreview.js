module.exports = function(canvas)
{
    canvas.directive('audiopreview', [ '$timeout', function($timeout)
    {
        return {

            restrict: 'AC',
            link: function(scope, element, attrs)
            {
                var $parent = $(element).parent().parent();
                var options = scope.$eval(attrs.audiopreview);

                var $preview = '<div class="preview">' +
                                    '<audio autoplay>' +
                                        '<source src="' + options.href + '" type="' + options.mimetype + '">' +
                                        'Your browser does not support the audio element.' +
                                    '</audio>' +
                               '</div>';

                var timeout = null;
                var started = false;

                element.on('mousedown', function()
                {
                    timeout = $timeout(function()
                    {
                        if ($parent.data('preventPreview') == true)
                        {
                            $parent.data('preventPreview', false);
                            return;
                        }

                        $(element).addClass('listening').append($preview);

                        started = true;

                    }, 250);
                });

                element.on('mouseup', function()
                {
                    $timeout.cancel(timeout);

                    $(element).removeClass('listening').find('.preview').remove();

                    if (started)
                    {
                        $parent.data('preventColorbox', true | $parent.data('preventColorbox'));
                        started = false;
                    }
                });
            }
        }
    }]);
};