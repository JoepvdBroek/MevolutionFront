module.exports = function(canvas)
{
    require('./Colorbox.js')(canvas);
    require('./ZoomTarget.js')(canvas);
    require('./Draggabilly.js')(canvas);
};