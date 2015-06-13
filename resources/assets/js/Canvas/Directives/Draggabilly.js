module.exports = function(canvas)
{
    canvas.directive('draggabilly', [ '$compile', function($compile)
    {
        return {

            restrict: 'AC',
            link: function(scope, element, attrs)
            {
                var draggabilly = scope.$eval(attrs.draggabilly);

                $draggabilly = $(element).draggabilly(draggabilly);

                $draggabilly.on('staticClick', function()
                {
                    $(element).data('preventColorbox', false | $(element).data('preventColorbox'));
                    $(element).data('preventPreview', false | $(element).data('preventPreview'));
                });

                $draggabilly.on('dragStart', function()
                {
                    $(element).data('preventColorbox', true | $(element).data('preventColorbox'));
                    $(element).data('preventPreview', true | $(element).data('preventPreview'));
                });

                $draggabilly.on('dragEnd', function()
                {
                    if (typeof draggabilly.dragEnd !== 'undefined')
                    {
                        scope[draggabilly.dragEnd].call(this);
                    }
                });
            }
        }
    }]);
};