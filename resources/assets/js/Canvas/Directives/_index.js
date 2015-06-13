module.exports = function(canvas)
{
    require('./Colorbox.js')(canvas);
    require('./ZoomTarget.js')(canvas);
    require('./Draggabilly.js')(canvas);
    require('./VideoPreview.js')(canvas);
    require('./AudioPreview.js')(canvas);
};