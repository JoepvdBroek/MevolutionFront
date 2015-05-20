module.exports = function(canvas)
{
    require('./CanvasController.js')(canvas);

    require('./Types/_index.js')(canvas);
};