module.exports = function(app)
{
    var leerlingDash = angular.module('app.leerlingDash', [ 'app.api' ]);

    require('./Controllers/_index.js')(leerlingDash);

    return leerlingDash;
};