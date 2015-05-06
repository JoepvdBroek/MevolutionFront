module.exports = function(app)
{
    var moderator = angular.module('app.moderator', [ 'app.api' ]);

    require('./Controllers/_index.js')(moderator);
    require('./Services/_index.js')(moderator);

    return moderator;
};