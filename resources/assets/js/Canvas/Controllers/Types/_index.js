module.exports = function(canvas)
{
    require('./VideoController.js')(canvas);
    require('./PictureController.js')(canvas);
    require('./TextController.js')(canvas);
    require('./AudioController.js')(canvas);
};