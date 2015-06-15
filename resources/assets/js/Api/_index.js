module.exports = function(app)
{
    var api = angular.module('app.api', []);

    require('./Api.js')(api);
    require('./TokenInterceptor.js')(api);

    return api;
};