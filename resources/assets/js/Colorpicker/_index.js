module.exports = function(app)
{
    var colorpicker = angular.module('app.colorpicker', ['app.api']);

    require('./ColorPicker.js')(colorpicker);

    return colorpicker;
};