module.exports = function(app)
{
    var auth = angular.module('app.timeline', [ 'app.api' ]);

    require('./Controllers/_index.js')(auth); 

    return auth;
};