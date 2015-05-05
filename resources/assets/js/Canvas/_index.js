module.exports = function(app)
{
    var canvas = angular.module('app.canvas', [ 'app.api' ]);

    require('./Controllers/_index.js')(canvas);

    return canvas;
};