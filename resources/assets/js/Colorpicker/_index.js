module.exports = function(app)
{
    var colorpicker = angular.module('app.colorpicker', ['app.api']);

    require('./Colorpicker.js')(colorpicker);

    return colorpicker;
};