module.exports = function(app)
{
    var user = angular.module('app.user', [ 'app.api' ]);

    require('./Controllers/_index.js')(user);
    require('./Services/_index.js')(user);

    return user;
};