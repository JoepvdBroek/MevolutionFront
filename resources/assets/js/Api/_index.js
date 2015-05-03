module.exports = function(app)
{
    var api = angular.module('app.api', []);

    require('./Api.js')(api);

    return api;
};